"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Package, Calendar, Clock, AlertTriangle } from "lucide-react"

// Sample shipping data
const shippingData = [
  {
    id: "SHP-2023-001",
    orderNumber: "ORD-2023-0458",
    customer: "Al Majid Tailoring",
    items: [{ name: "Kandura Batch #A123", quantity: 10 }],
    scheduledDate: "2023-04-25",
    status: "scheduled",
    carrier: "Emirates Post",
    trackingNumber: "EP12345678AE",
  },
  {
    id: "SHP-2023-002",
    orderNumber: "ORD-2023-0462",
    customer: "Dubai Fashion House",
    items: [{ name: "Abaya Order #B456", quantity: 5 }],
    scheduledDate: "2023-04-23",
    status: "in-transit",
    carrier: "Aramex",
    trackingNumber: "ARX87654321",
    estimatedDelivery: "2023-04-24",
  },
  {
    id: "SHP-2023-003",
    orderNumber: "ORD-2023-0470",
    customer: "Royal Garments",
    items: [
      { name: "Kandura Batch #D234", quantity: 8 },
      { name: "Embroidery Work #E567", quantity: 3 },
    ],
    scheduledDate: "2023-04-22",
    status: "delayed",
    carrier: "DHL",
    trackingNumber: "DHL23456789",
    estimatedDelivery: "2023-04-26",
    delayReason: "Weather conditions",
  },
  {
    id: "SHP-2023-004",
    orderNumber: "ORD-2023-0475",
    customer: "Luxury Abayas LLC",
    items: [{ name: "Premium Abaya Collection", quantity: 12 }],
    scheduledDate: "2023-04-20",
    status: "delivered",
    carrier: "FedEx",
    trackingNumber: "FDX34567890",
    deliveryDate: "2023-04-21",
  },
]

export function ShippingManagement() {
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <Calendar className="h-3 w-3" />
            <span>Scheduled</span>
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
            <Truck className="h-3 w-3" />
            <span>In Transit</span>
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3" />
            <span>Delayed</span>
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <Package className="h-3 w-3" />
            <span>Delivered</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Management</CardTitle>
        <CardDescription>Track and manage product shipments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shippingData.map((shipment) => (
            <div key={shipment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{shipment.id}</h4>
                    {getStatusBadge(shipment.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Order: {shipment.orderNumber} • Customer: {shipment.customer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Carrier: </span>
                    {shipment.carrier}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Tracking: </span>
                    {shipment.trackingNumber}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <h5 className="text-sm font-medium mb-1">Items:</h5>
                <ul className="text-sm space-y-1">
                  {shipment.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {shipment.status === "scheduled" && (
                <div className="mt-3 flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Scheduled for: {shipment.scheduledDate}</span>
                </div>
              )}

              {shipment.status === "in-transit" && (
                <div className="mt-3 flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Estimated delivery: {shipment.estimatedDelivery}</span>
                </div>
              )}

              {shipment.status === "delayed" && (
                <div className="mt-3">
                  <div className="flex items-center text-sm text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Delay reason: {shipment.delayReason}</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>New estimated delivery: {shipment.estimatedDelivery}</span>
                  </div>
                </div>
              )}

              {shipment.status === "delivered" && (
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <Package className="h-4 w-4 mr-1" />
                  <span>Delivered on: {shipment.deliveryDate}</span>
                </div>
              )}

              <div className="flex justify-end mt-3">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
