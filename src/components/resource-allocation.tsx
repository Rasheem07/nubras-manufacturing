"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const resourceData = [
  {
    id: 1,
    name: "Cutting Station 1",
    operator: "Ali Hassan",
    capacity: 8,
    allocated: 6,
    orders: [
      { id: 101, name: "Kandura Batch #A123", quantity: 3 },
      { id: 102, name: "Abaya Order #B456", quantity: 3 },
    ],
  },
  {
    id: 2,
    name: "Sewing Station 2",
    operator: "Fatima Khan",
    capacity: 10,
    allocated: 8,
    orders: [
      { id: 103, name: "Kandura Batch #A123", quantity: 3 },
      { id: 104, name: "Abaya Order #B456", quantity: 5 },
    ],
  },
  {
    id: 3,
    name: "Embroidery Station 1",
    operator: "Mohammed Al-Farsi",
    capacity: 5,
    allocated: 5,
    orders: [{ id: 105, name: "Embroidery Work #C789", quantity: 5 }],
  },
  {
    id: 4,
    name: "Quality Control Station",
    operator: "Sara Ahmed",
    capacity: 15,
    allocated: 4,
    orders: [{ id: 106, name: "Quality Check Batch #A123", quantity: 4 }],
  },
]

export function ResourceAllocation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Allocation</CardTitle>
        <CardDescription>Current workstation capacity and allocation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resourceData.map((resource) => (
            <div key={resource.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{resource.name}</h4>
                  <p className="text-sm text-muted-foreground">Operator: {resource.operator}</p>
                </div>
                <div className="text-sm font-medium">
                  {resource.allocated}/{resource.capacity} units
                </div>
              </div>

              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Capacity Utilization</span>
                  <span>{Math.round((resource.allocated / resource.capacity) * 100)}%</span>
                </div>
                <Progress value={(resource.allocated / resource.capacity) * 100} className="h-2" />
              </div>

              {resource.orders.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Allocated Orders:</h5>
                  <ul className="space-y-1">
                    {resource.orders.map((order) => (
                      <li key={order.id} className="text-sm flex justify-between">
                        <span>{order.name}</span>
                        <span className="text-muted-foreground">{order.quantity} units</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
