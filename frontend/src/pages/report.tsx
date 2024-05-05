import SpeedoGraph from "@/components/ui/graph"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Crosshair2Icon } from '@radix-ui/react-icons';
import Publicaccesscard from "@/components/core/publicaccesscard";
import PeopleWithAccess from "@/components/core/peoplewithaccess";
import FindingSession from "@/components/core/findingsession";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { baseUrl } from "@/env";
import PublicAccessTable, { FileData } from "@/components/core/publicaccesstable";
import { Button } from "@/components/ui/button";

const DriveReport = () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [externalFiles, setExternalFiles] = useState<FileData[]>([]);
    const [overallRiskPercentage, setOverallRiskPercentage] = useState(0);
    const [data, setData] = useState({} as any)
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
            setExternalFiles(jsonData?.externalFiles)
        })()
    }, [])

    const revokeAccess = async () => {
        const res = await fetch(`${baseUrl}google/drive/revoke?id=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (data?.status === 200) {
            window.location.href = `${baseUrl}`
        }
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <Button className="w-1/4" onClick={revokeAccess} >Revoke Access</Button>
            </div>
            <div className='flex justify-center items-center space-x-4 w-full pt-20 pb-10'>
                <Card className="w-1/4 h-2/5 border-size-2">
                    <CardHeader>
                        <CardTitle>Risk Report</CardTitle>
                        <CardDescription className="text-sm m-5">Overall Risk <Crosshair2Icon className="h-6 w-6 inline-block" /></CardDescription>
                    </CardHeader>
                    <CardContent>

                        <SpeedoGraph value={overallRiskPercentage / 100} />
                    </CardContent>
                </Card>
                <Publicaccesscard publicNo={data ? data?.externalShareCount : 0} className="w-1/4 h-2/5" />
                <PeopleWithAccess publicNo={10} className="w-1/4 h-2/5" />
            </div >
            <Separator />
            <div className='flex justify-center items-center space-x-4 pt-10 pb-10'>
                <FindingSession riskLevel={10} className="w-1/4 h-2/5" publicAccsedNo={10} peopleWithAccess={10} />
            </div>
            <Separator />
            <div className='flex justify-center items-center space-x-4 pt-10'>
                <PublicAccessTable files={files} />
            </div>
            {
                externalFiles && externalFiles.length ?
                    <><Separator /><div className='flex justify-center items-center space-x-4 pt-10'>
                        <p>External Files</p>
                        <PublicAccessTable files={externalFiles} />
                    </div></>
                    : null
            }
        </>
    )
}

export default DriveReport;
