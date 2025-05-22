"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const timelineData = [
  {
    id: 1,
    orderNumber: "ORD-2023-0458",
    product: "Kandura Batch #A123",
    stages: [
      { name: "Cutting", status: "completed", startDate: "2023-04-10", endDate: "2023-04-12" },
      { name: "Sewing", status: "completed", startDate: "2023-04-12", endDate: "2023-04-15" },
      { name: "Embroidery", status: "in-progress", startDate: "2023-04-15", endDate: "2023-04-18" },
      { name: "Quality Control", status: "pending", startDate: "2023-04-18", endDate: "2023-04-19" },
      { name: "Finishing", status: "pending", startDate: "2023-04-19", endDate: "2023-04-20" },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-2023-0462",
    product: "Abaya Order #B456",
    stages: [
      { name: "Cutting", status: "completed", startDate: "2023-04-12", endDate: "2023-04-14" },
      { name: "Sewing", status: "in-progress", startDate: "2023-04-14", endDate: "2023-04-18" },
      { name: "Embroidery", status: "pending", startDate: "2023-04-18", endDate: "2023-04-21" },
      { name: "Quality Control", status: "pending", startDate: "2023-04-21", endDate: "2023-04-22" },
      { name: "Finishing", status: "pending", startDate: "2023-04-22", endDate: "2023-04-23" },
    ],
  },
]

export function ProductionTimeline() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "delayed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Timeline</CardTitle>
        <CardDescription>View production stages and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineData.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{order.product}</h4>
              <p className="text-sm text-muted-foreground mb-4">Order: {order.orderNumber}</p>

              <div className="space-y-3">
                {order.stages.map((stage, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1/4 text-sm font-medium">{stage.name}</div>
                    <div className="w-3/4">
                      <div className="flex items-center">
                        <Badge variant="outline" className={`mr-2 ${getStatusColor(stage.status)}`}>
                          {stage.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(stage.startDate).toLocaleDateString()} -{" "}
                          {new Date(stage.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
