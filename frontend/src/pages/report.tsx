import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import PublicAccessCard from "@/components/core/publicaccesscard";
import FindingSession from "@/components/core/findingsession";
import PublicAccessTable from "@/components/core/publicaccesstable";
import PeopleWithAccess from "@/components/core/peoplewithaccess";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileData, ResponseOfAnalysis } from "@/types/analysis.types";
import googleDriveIcon from "@/assets/Google_Drive_icon_(2020).svg";
import { baseUrl } from "@/env";
import { Skeleton } from "@/components/ui/skeleton";
import CollapsibleSection from "@/components/report/collapsibleSection";
import RiskReportCard from "@/components/report/riskReport";
import HighRiskFilesSection from "@/components/report/highRiskerFilesSections";

const DriveReport = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileData[]>([]);
  const [externalFiles, setExternalFiles] = useState<FileData[]>([]);
  const [overallRiskPercentage, setOverallRiskPercentage] = useState<number>(0);
  const [data, setData] = useState<ResponseOfAnalysis | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}google/drive/metadata?id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const jsonData = await res.json();
      setData(jsonData);
      setFiles(jsonData.files);
      setOverallRiskPercentage(jsonData.overallRiskPercentage);
      setExternalFiles(jsonData.externalFiles || []);
      setLoading(false);
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("_id");
    if (storedId) {
      setId(storedId);
      fetchData(storedId);
    } else {
      setLoading(false);
      navigate("/");
    }
  }, [fetchData, navigate]);

  const revokeAccess = async () => {
    if (id) {
      await fetch(`${baseUrl}google/revoke?id=${encodeURIComponent(id)}`);
      localStorage.removeItem("_id");
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[400px] w-[600px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-20">
        <Button
          className="w-1/3 mb-10 h-1/3 border-double bg-gray-800"
          onClick={revokeAccess}
          variant="destructive"
        >
          <img className="w-10 h-10" src={googleDriveIcon} alt="Google Drive Icon" />
          Revoke Your Google Drive Access
          <ExternalLink className="ml-2" />
        </Button>
      </div>
      <div>Your Google Drive Files Analysis</div>
      <div className="flex justify-center items-center space-x-4 w-full pt-20 pb-10">
        <RiskReportCard overallRiskPercentage={overallRiskPercentage} />
        <PublicAccessCard publicNo={data?.externalShareCount || 0} className="w-1/4 h-2/5" />
        <PeopleWithAccess publicNo={data?.highRiskedFiles?.length || 0} className="w-1/4 h-2/5" />
      </div>
      <Separator />
      <div className="flex justify-center items-center space-x-4 pt-10 pb-10">
        <FindingSession className="w-1/4 h-2/5" highRiskCount={data?.highRiskCount || 0} />
      </div>
      <Separator />
      {data && data?.highRiskedFiles?.length > 0 && (
        <>
          <HighRiskFilesSection files={data.highRiskedFiles} />
          <Separator />
        </>
      )}
      {externalFiles.length > 0 && (
        <>
          <Separator />
          <p className="text-amber-500 pt-10">Your Google Drive Files</p>
          <div className="flex justify-center items-center space-x-4 pt-10">
            <PublicAccessTable accessText="Your File Link" files={externalFiles} />
          </div>
        </>
      )}
      <CollapsibleSection files={files} />
    </>
  );
};

export default DriveReport;
