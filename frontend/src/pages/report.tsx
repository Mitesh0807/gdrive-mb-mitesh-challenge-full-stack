import SpeedoGraph from "@/components/ui/graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crosshair2Icon } from "@radix-ui/react-icons";
import Publicaccesscard from "@/components/core/publicaccesscard";
import PeopleWithAccess from "@/components/core/peoplewithaccess";
import FindingSession from "@/components/core/findingsession";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { baseUrl } from "@/env";
import PublicAccessTable, {
  FileData,
} from "@/components/core/publicaccesstable";
import { Button } from "@/components/ui/button";
import HighRiskTable from "@/components/core/highriskTable";
import { useNavigate } from 'react-router-dom';


const DriveReport = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileData[]>([]);
  const [externalFiles, setExternalFiles] = useState<FileData[]>([]);
  const [overallRiskPercentage, setOverallRiskPercentage] = useState(0);
  const [data, setData] = useState({} as any);
  const [id, setId] = useState("");
  const [highRiskedFile, setHighRiskedFiles] = useState<FileData[]>([]);
  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("_id");
      if (!id) {
        console.log("test")
        navigate("/");
        return;
      };
      setId(id);
      const res = await fetch(
        `${baseUrl}google/drive/metadata?id=${encodeURIComponent(id)}`
      );
      const jsonData = await res.json();
      if (!jsonData) return;
      setData(jsonData);
      if (jsonData?.highRiskedFiles?.length) {
        setHighRiskedFiles(jsonData?.highRiskedFiles);
      }
      setFiles(jsonData?.files);
      setOverallRiskPercentage(jsonData?.overallRiskPercentage);
      if (!jsonData?.externalFiles) return;
      setExternalFiles(jsonData?.externalFiles);
    })();
  }, []);

  const revokeAccess = async () => {
    await fetch(
      `${baseUrl}google/revoke?id=${encodeURIComponent(id)}`
    );
    localStorage.removeItem('_id')
    navigate("/")
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Button className={`w-1/4`} onClick={revokeAccess}>
          Revoke Access
        </Button>
      </div>
      <div className="flex justify-center items-center space-x-4 w-full pt-20 pb-10">
        <Card className="w-1/4 h-2/5 border-size-2">
          <CardHeader>
            <CardTitle>Risk Report</CardTitle>
            <CardDescription className="text-sm m-5">
              Overall Risk <Crosshair2Icon className="h-6 w-6 inline-block" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SpeedoGraph value={overallRiskPercentage / 100} />
          </CardContent>
        </Card>
        <Publicaccesscard
          publicNo={data ? data?.externalShareCount : 0}
          className="w-1/4 h-2/5"
        />
        <PeopleWithAccess publicNo={highRiskedFile?.length} className="w-1/4 h-2/5" />
      </div>
      <Separator />
      <div className="flex justify-center items-center space-x-4 pt-10 pb-10">
        <FindingSession
          riskLevel={10}
          className="w-1/4 h-2/5"
          highRiskCount={highRiskedFile?.length}
        />
      </div>
      <Separator />
      {highRiskedFile && highRiskedFile?.length > 0 ? (
        <>
          <Separator />
          <p className="text-amber-500 pt-10">
            This Files Require high Attention
          </p>

          <div className="flex justify-center items-center space-x-4 pt-10 pb-10">
            <HighRiskTable files={highRiskedFile} />
          </div>
        </>
      ) : null}
      {externalFiles && externalFiles.length ? (
        <>
          <Separator />
          <p className="text-amber-500 pt-10">Your Files</p>

          <div className="flex justify-center items-center space-x-4 pt-10">
            <PublicAccessTable accessText="Your File Link" files={externalFiles} />
          </div>
        </>
      ) : null}
      <p className="text-amber-500 pt-10">You Acccessed Files Of exernal</p>

      <div className="flex justify-center items-center space-x-4 pt-10">
        <PublicAccessTable
          captionText="You Acccessed Files Of exernal"
          files={files}
        />
      </div>
    </>
  );
};

export default DriveReport;
