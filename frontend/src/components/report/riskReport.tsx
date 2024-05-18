import { Crosshair2Icon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpeedoGraph from "@/components/ui/graph";

const RiskReportCard = ({ overallRiskPercentage }: { overallRiskPercentage: number }) => (
    <Card className="w-1/4 h-2/5 border-size-2">
        <CardHeader>
            <CardTitle>Risk Report</CardTitle>
            <CardDescription className="text-sm m-5">
                Overall Risk <Crosshair2Icon className="h-6 w-6 inline-block" />
            </CardDescription>
        </CardHeader>
        <CardContent>
            <SpeedoGraph value={overallRiskPercentage / 100} />
        </CardContent>
    </Card>
);

export default RiskReportCard