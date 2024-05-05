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
import PublicAccessTable from "@/components/core/publicaccesstable";

const DriveReport = () => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        (async () => {
            const id = localStorage.getItem("_id");
            console.log(id);
            if (!id) return
            const res = await fetch(`${baseUrl}google/drive/metadata?id=${encodeURIComponent(id)}`);
            const jsonData = await res.json();
            setFiles(jsonData?.files)
            console.log(jsonData);
        })()
    }, [])
    return (
        <>
            <div className='flex justify-center items-center space-x-4 w-full pt-20 pb-10'>
                <Card className="w-1/4 h-2/5 border-size-2">
                    <CardHeader>
                        <CardTitle>Risk Report</CardTitle>
                        <CardDescription className="text-sm m-5">Overall Risk <Crosshair2Icon className="h-6 w-6 inline-block" /></CardDescription>
                    </CardHeader>
                    <CardContent>

                        <SpeedoGraph value={0.5} />
                    </CardContent>
                </Card>
                <Card className="w-1/4 h-2/5">
                    <CardHeader>
                        <CardTitle></CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SpeedoGraph value={0.5} />  </CardContent>
                </Card>
                <Publicaccesscard publicNo={10} className="w-1/4 h-2/5" />
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
        </>
    )
}

export default DriveReport;
