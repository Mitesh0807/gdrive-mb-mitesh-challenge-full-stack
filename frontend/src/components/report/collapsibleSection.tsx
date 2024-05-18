import { FileData } from "@/types/analysis.types";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useState } from "react";
import PublicAccessTable from "../core/publicaccesstable";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const CollapsibleSection = ({ files }: { files: FileData[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full mt-10">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger
                    className="w-full mb-10 h-12 flex items-center justify-between px-4 py-2 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className="text-amber-500 text-right">You Accessed Files Of external</p>
                    {isOpen ? (
                        <ArrowUpIcon className="h-6 w-6" />
                    ) : (
                        <ArrowDownIcon className="h-6 w-6" />
                    )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex justify-center items-center space-x-4 pt-10">
                        <PublicAccessTable captionText="You Accessed Files Of external" files={files} />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default CollapsibleSection;