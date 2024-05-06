import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

function FindingSession({ riskLevel ,highRiskCount}: { riskLevel: number, className?: string,highRiskCount?:number }) {
    return (
        <Card className="w-full h-full ">
            <CardHeader>
                <CardTitle>Finding Session</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
            <p className="text-sm">{highRiskCount ? highRiskCount : 0} high risked file</p>
                <p className="text-3xl font-bold">{riskLevel}</p>
                <p className="text-lg font-bold">Risk Level</p>
            </CardContent>
        </Card>
    )
}
export default FindingSession
