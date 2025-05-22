import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProductionOverview() {
  const productionStages = [
    { name: "Cutting", completed: 85, total: 100, color: "bg-blue-500" },
    { name: "Stitching", completed: 62, total: 100, color: "bg-green-500" },
    { name: "Embroidery", completed: 45, total: 100, color: "bg-yellow-500" },
    { name: "Quality Control", completed: 30, total: 100, color: "bg-purple-500" },
    { name: "Finishing", completed: 25, total: 100, color: "bg-pink-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Overview</CardTitle>
        <CardDescription>Current status across all production stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {productionStages.map((stage) => (
            <div key={stage.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stage.name}</span>
                <span className="text-sm text-muted-foreground">
                  {stage.completed} / {stage.total}
                </span>
              </div>
              <Progress value={(stage.completed / stage.total) * 100} className={stage.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
