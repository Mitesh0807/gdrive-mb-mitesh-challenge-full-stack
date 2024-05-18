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
// import PeopleWithAccess from "@/components/core/peoplewithaccess";
import FindingSession from "@/components/core/findingsession";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { baseUrl } from "@/env";
import PublicAccessTable from "@/components/core/publicaccesstable";
import { Button } from "@/components/ui/button";
import { FileData, ResponseOfAnalysis } from "@/types/analysis.types";
import googleDriveIcon from "@/assets/Google_Drive_icon_(2020).svg";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";


const DriveReport = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileData[]>([]);
  const [externalFiles, setExternalFiles] = useState<FileData[]>([]);
  const [overallRiskPercentage, setOverallRiskPercentage] = useState<number>(0);
  const [data, setData] = useState<ResponseOfAnalysis | null>(null)
  const [id, setId] = useState('')
  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("_id");
      if (!id) return
      setId(id);
      const res = await fetch(`${baseUrl}google/drive/metadata?id=${encodeURIComponent(id)}`);
      const jsonData = await res.json();
      console.log(jsonData)
      if (!jsonData) return
      setData(jsonData)
      setFiles(jsonData?.files)
      setOverallRiskPercentage(jsonData?.overallRiskPercentage)
      if (!jsonData?.externalFiles) return
      setExternalFiles(jsonData?.externalFiles);
      console.log(jsonData?.externalFiles)
    })()
  }, [])

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
          <img className="w-10 h-10" src={googleDriveIcon} /> Revoke Access
          <ExternalLink className="ml-2" />
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
        {/* <PeopleWithAccess publicNo={highRiskedFile?.length} className="w-1/4 h-2/5" /> */}
      </div>
      <Separator />
      <div className="flex justify-center items-center space-x-4 pt-10 pb-10">
        <FindingSession
          riskLevel={10}
          className="w-1/4 h-2/5"
          highRiskCount={data?.highRiskCount || 0}
        />
      </div>
      <Separator />
      {/* {highRiskedFile && highRiskedFile?.length > 0 ? (
        <>
            <div className="flex flex-col items-center justify-center p-20 ">
                <Button className="w-1/3 mb-10 h-1/3 border-double bg-gray-800" onClick={revokeAccess} variant={'destructive'}><img className="w-10 h-10" src={googleDriveIcon} />Revoke Your Google Drive Access<ExternalLink className="ml-2 " /></Button>
            </div>
            <div>
                Your Google Drive Files Anaylsis
            </div>
            <div className='flex justify-center items-center space-x-4 w-full pt-20 pb-10 border-solid	'>
                <Card className="w-1/4 h-2/5 border-size-2">
                    <CardHeader>
                        <CardTitle>Your Google Drive Risk Report</CardTitle>
                        <CardDescription className="text-sm m-5">Overall Risk Percentage <Crosshair2Icon className="h-6 w-6 inline-block" /></CardDescription>
                    </CardHeader>
                    <CardContent>

                        <SpeedoGraph value={overallRiskPercentage / 100} />
                    </CardContent>
                </Card>
                <Publicaccesscard publicNo={data ? data?.externalShareCount : 0} className="w-1/4 h-2/5" />
                <PeopleWithAccess publicNo={10} className="w-1/4 h-2/5" />
            </div >
            <Separator />
            <div className='flex justify-center items-center w-full space-x-4 pt-10 pb-10'>
                <FindingSession riskLevel={10} className="w-1/4 h-2/5" publicAccsedNo={10} peopleWithAccess={10} />
            </div>
            <Separator />
            <div className='flex justify-center items-center space-x-4 pt-10 pb-10'>
                <p className="text-lg font-bold text-center">Files You Have Access To</p>
            </div>
            <div className='flex justify-center items-center space-x-4 pt-10'>
                <PublicAccessTable files={files} />
            </div>
            {
                externalFiles && externalFiles.length ?
                    <><Separator /><div className='flex justify-center items-center space-x-4 pt-10'>
                        <PublicAccessTable files={externalFiles} />
                    </div></>
                    : null
            }
        </>
      ) : null} */}
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