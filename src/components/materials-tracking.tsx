"use client"

import { ArrowRight, Package, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const materialsData = [
  {
    id: "MAT-001",
    name: "Premium Cotton Fabric",
    supplier: "Textile Innovations LLC",
    orderDate: "2023-04-10",
    expectedArrival: "2023-04-25",
    status: "in-transit",
    trackingNumber: "TRK12345678",
    quantity: 200,
    unit: "meters",
    transitProgress: 65,
  },
  {
    id: "MAT-002",
    name: "Gold Embroidery Thread",
    supplier: "Luxury Threads Co.",
    orderDate: "2023-04-12",
    expectedArrival: "2023-04-22",
    status: "in-transit",
    trackingNumber: "TRK87654321",
    quantity: 50,
    unit: "spools",
    transitProgress: 80,
  },
  {
    id: "MAT-003",
    name: "Pearl Buttons",
    supplier: "Fashion Accessories Inc.",
    orderDate: "2023-04-15",
    expectedArrival: "2023-04-30",
    status: "ordered",
    quantity: 1000,
    unit: "pieces",
  },
  {
    id: "MAT-004",
    name: "Silk Lining",
    supplier: "Premium Fabrics Ltd.",
    orderDate: "2023-04-08",
    expectedArrival: "2023-04-20",
    status: "delayed",
    trackingNumber: "TRK23456789",
    quantity: 150,
    unit: "meters",
    transitProgress: 40,
    delayReason: "Weather conditions",
  },
]

export function MaterialsTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Materials Tracking</CardTitle>
        <CardDescription>Track incoming materials for production</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {materialsData.map((material) => (
            <div key={material.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{material.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {material.supplier} • {material.quantity} {material.unit}
                  </p>
                </div>
                <StatusBadge status={material.status} />
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Ordered: {new Date(material.orderDate).toLocaleDateString()}</span>
                  <span>Expected: {new Date(material.expectedArrival).toLocaleDateString()}</span>
                </div>

                {material.status === "in-transit" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Transit Progress</span>
                      <span>{material.transitProgress}%</span>
                    </div>
                    <Progress value={material.transitProgress} className="h-2" />
                    <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                      <span>Origin</span>
                      <span>Destination</span>
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Tracking: </span>
                      <span className="text-muted-foreground">{material.trackingNumber}</span>
                    </div>
                  </div>
                )}

                {material.status === "delayed" && (
                  <div className="mt-2">
                    <div className="flex items-center text-amber-600 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span>Delay reason: {material.delayReason}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Transit Progress</span>
                        <span>{material.transitProgress}%</span>
                      </div>
                      <Progress value={material.transitProgress} className="h-2" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline">
                    Track Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "in-transit":
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
          <ArrowRight className="h-3 w-3" />
          <span>In Transit</span>
        </Badge>
      )
    case "ordered":
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          <span>Ordered</span>
        </Badge>
      )
    case "delayed":
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
          <AlertTriangle className="h-3 w-3" />
          <span>Delayed</span>
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
