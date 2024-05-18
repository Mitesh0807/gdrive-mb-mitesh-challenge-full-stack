import { FileData } from "@/types/analysis.types";
import PublicAccessTable from "@/components/core/publicaccesstable";

const HighRiskFilesSection = ({ files }: { files: FileData[] }) => (
    <>
        <p className="text-amber-500 pt-10">High Risked Files that need your urgent attention</p>
        <div className="flex justify-center items-center space-x-4 w-full pt-20 pb-10">
            <PublicAccessTable files={files} />
        </div>
    </>
);

export default HighRiskFilesSection