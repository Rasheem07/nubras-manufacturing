import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QualityMetrics() {
  const defectTypes = [
    { type: "Uneven Hem", count: 5 },
    { type: "Loose Button", count: 3 },
    { type: "Fabric Tear", count: 2 },
    { type: "Stitch Defect", count: 4 },
    { type: "Color Variation", count: 1 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Metrics</CardTitle>
        <CardDescription>Top defect types this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {defectTypes.map((defect) => (
            <div key={defect.type} className="flex items-center justify-between">
              <span className="text-sm">{defect.type}</span>
              <div className="flex items-center">
                <span className="font-medium">{defect.count}</span>
                <div className="ml-2 h-2 bg-red-500 rounded-full" style={{ width: `${defect.count * 10}px` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">First-time pass rate</span>
            <span className="text-green-600 font-bold">92%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
