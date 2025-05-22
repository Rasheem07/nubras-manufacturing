"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProductionTrackingKanban() {
  const stages = ["Cutting", "Stitching", "Embroidery", "Quality Control", "Packaging"]

  const items = [
    {
      id: "ITEM-1234",
      orderId: "ORD-1234",
      description: "Wedding Kandura",
      client: "Ahmed Al Nahyan",
      stage: "Cutting",
      priority: "Rush",
    },
    {
      id: "ITEM-1235",
      orderId: "ORD-1235",
      description: "School Uniforms (Batch 1)",
      client: "Emirates International School",
      stage: "Cutting",
      priority: "Bulk",
    },
    {
      id: "ITEM-1236",
      orderId: "ORD-1236",
      description: "Designer Abaya",
      client: "Sheikha Fatima",
      stage: "Embroidery",
      priority: "VIP",
    },
    {
      id: "ITEM-1237",
      orderId: "ORD-1237",
      description: "Corporate Uniforms (Batch 1)",
      client: "Etihad Airways",
      stage: "Stitching",
      priority: "Standard",
    },
    {
      id: "ITEM-1238",
      orderId: "ORD-1238",
      description: "Casual Kanduras (Batch 1)",
      client: "Dubai Mall Boutique",
      stage: "Quality Control",
      priority: "Standard",
    },
    {
      id: "ITEM-1239",
      orderId: "ORD-1235",
      description: "School Uniforms (Batch 2)",
      client: "Emirates International School",
      stage: "Stitching",
      priority: "Bulk",
    },
    {
      id: "ITEM-1240",
      orderId: "ORD-1237",
      description: "Corporate Uniforms (Batch 2)",
      client: "Etihad Airways",
      stage: "Cutting",
      priority: "Standard",
    },
    {
      id: "ITEM-1241",
      orderId: "ORD-1238",
      description: "Casual Kanduras (Batch 2)",
      client: "Dubai Mall Boutique",
      stage: "Packaging",
      priority: "Standard",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Rush":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "VIP":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Standard":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Bulk":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getItemsForStage = (stage: string) => {
    return items.filter((item) => item.stage === stage)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {stages.map((stage) => (
        <div key={stage} className="flex flex-col h-full">
          <div className="bg-muted p-2 rounded-t-md font-medium text-center">{stage}</div>
          <div className="flex-1 border rounded-b-md p-2 bg-muted/30 min-h-[400px] space-y-2">
            {getItemsForStage(stage).map((item) => (
              <Card key={item.id} className="mb-2">
                <CardContent className="p-3">
                  <div className="text-sm font-medium">{item.description}</div>
                  <div className="text-xs text-muted-foreground mb-2">{item.client}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{item.orderId}</span>
                    <Badge className={getPriorityColor(item.priority)} variant="outline">
                      {item.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            {getItemsForStage(stage).length === 0 && (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No items</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
