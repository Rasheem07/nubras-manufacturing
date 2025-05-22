import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle } from "lucide-react"

export function ProductionBottlenecks() {
  const bottlenecks = [
    {
      stage: "Embroidery",
      items: 15,
      description: "15 abayas stuck at embroidery",
      impact: "High",
      color: "bg-red-500",
    },
    {
      stage: "Quality Control",
      items: 8,
      description: "8 kanduras awaiting QC approval",
      impact: "Medium",
      color: "bg-yellow-500",
    },
    {
      stage: "Cutting",
      items: 5,
      description: "5 school uniforms pending cutting",
      impact: "Low",
      color: "bg-blue-500",
    },
  ]

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <CardTitle>Production Bottlenecks</CardTitle>
        </div>
        <CardDescription>Areas where production is being delayed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bottlenecks.map((bottleneck) => (
            <div key={bottleneck.stage} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{bottleneck.stage}</span>
                <span className="text-sm text-muted-foreground">{bottleneck.items} items</span>
              </div>
              <Progress value={bottleneck.items * 5} className={bottleneck.color} />
              <div className="flex items-center justify-between text-xs">
                <span>{bottleneck.description}</span>
                <span
                  className={`font-medium ${
                    bottleneck.impact === "High"
                      ? "text-red-600"
                      : bottleneck.impact === "Medium"
                        ? "text-yellow-600"
                        : "text-blue-600"
                  }`}
                >
                  {bottleneck.impact} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
