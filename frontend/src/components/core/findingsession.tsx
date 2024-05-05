import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

function FindingSession({ riskLevel, className, publicAccsedNo, peopleWithAccess }: { riskLevel: number, className?: string, publicAccsedNo: number, peopleWithAccess: number }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Finding Session</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">{riskLevel}</p>
                <p className="text-lg font-bold">Risk Level</p>
                <p className="text-sm">{peopleWithAccess} people have access</p>
                <p className="text-sm">{publicAccsedNo} public access</p>
            </CardContent>
        </Card>
    )
}
export default FindingSession