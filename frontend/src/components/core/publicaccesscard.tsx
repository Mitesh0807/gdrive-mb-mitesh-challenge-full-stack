import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
function Publicaccesscard({ publicNo, className }: { publicNo: number, className?: string }) {
    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <CardTitle>External Access</CardTitle>
                    <CardDescription>Number of external access</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{publicNo}</div>
                </CardContent>
            </Card>
        </>
    )
}


export default Publicaccesscard