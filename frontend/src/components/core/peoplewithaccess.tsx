
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
function PeopleWithAccess({ publicNo, className }: { publicNo: number, className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>People with access</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">{publicNo}</p>
                <p className="text-lg font-bold">High Risked Files</p>
                <p className="text-sm">{publicNo}</p>
            </CardContent>
        </Card>
    )
}

export default PeopleWithAccess;