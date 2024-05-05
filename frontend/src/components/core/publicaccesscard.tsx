import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
function Publicaccesscard({ publicNo, className }: { publicNo: number, className?: string }) {
    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Public Access</CardTitle>
                    <CardDescription>Number of public access</CardDescription>
                </CardHeader>
                <CardContent>
                    <InfoIcon />
                    <div className="text-3xl font-bold">{publicNo}</div>
                </CardContent>
            </Card>
        </>
    )
}


export default Publicaccesscard