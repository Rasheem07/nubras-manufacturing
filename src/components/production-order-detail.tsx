"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, Package, Truck, Users } from "lucide-react"
import { ManufacturingOrder } from "@/lib/shared/order-types"

// Sample production order data
const productionOrder = {
  id: "PO-1234",
  type: "custom tailoring",
  client: {
    id: "1",
    name: "Al Futtaim Group",
    contactPerson: "Ahmed Al Maktoum",
    email: "ahmed@alfuttaim.ae",
    phone: "+971 50 123 4567",
  },
  status: "in-progress",
  priority: "high",
  progress: 65,
  startDate: "2023-06-15",
  dueDate: "2023-06-30",
  description: "Custom tailored kanduras for corporate event",
  notes: "Client requires special embroidery on collar and cuffs",
  materials: [
    { id: "M1", name: "Premium Cotton", quantity: 50, unit: "meters", allocated: true },
    { id: "M2", name: "Gold Thread", quantity: 5, unit: "spools", allocated: true },
    { id: "M3", name: "Pearl Buttons", quantity: 200, unit: "pieces", allocated: false },
  ],
  workstations: [
    {
      id: "W1",
      name: "Cutting Station",
      status: "completed",
      assignee: "Fatima H.",
      startDate: "2023-06-15",
      endDate: "2023-06-17",
    },
    {
      id: "W2",
      name: "Embroidery",
      status: "in-progress",
      assignee: "Mohammed A.",
      startDate: "2023-06-18",
      endDate: null,
    },
    { id: "W3", name: "Stitching", status: "pending", assignee: "Aisha K.", startDate: null, endDate: null },
    { id: "W4", name: "Quality Control", status: "pending", assignee: "Omar J.", startDate: null, endDate: null },
  ],
  timeline: [
    { date: "2023-06-14", event: "Order created", user: "Sara M." },
    { date: "2023-06-15", event: "Materials allocated", user: "Khalid R." },
    { date: "2023-06-15", event: "Production started", user: "Fatima H." },
    { date: "2023-06-17", event: "Cutting completed", user: "Fatima H." },
    { date: "2023-06-18", event: "Embroidery started", user: "Mohammed A." },
  ],
}

export function ProductionOrderDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Production Order: {productionOrder.id}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={productionOrder.priority === "high" ? "destructive" : "secondary"}>
              {productionOrder.priority.toUpperCase()}
            </Badge>
            <Badge variant={productionOrder.status === "in-progress" ? "default" : "outline"}>
              {productionOrder.status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="sm">Update Status</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order Progress</CardTitle>
          <CardDescription>Overall production completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{productionOrder.progress}%</span>
            </div>
            <Progress value={productionOrder.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="text-sm font-medium">{productionOrder.startDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="text-sm font-medium">{productionOrder.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Time Remaining</p>
                <p className="text-sm font-medium">8 days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Assigned Staff</p>
                <p className="text-sm font-medium">4 people</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Order Type</h3>
                  <p>{productionOrder.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                  <p>{productionOrder.client.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                  <p>{productionOrder.client.contactPerson}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                  <p>
                    {productionOrder.client.email} | {productionOrder.client.phone}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p>{productionOrder.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Production Notes</h3>
                <p>{productionOrder.notes}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Materials</CardTitle>
              <CardDescription>Materials needed for this production order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {productionOrder.materials.map((material) => (
                      <tr key={material.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{material.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{material.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{material.unit}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge variant={material.allocated ? "default" : "outline"}>
                            {material.allocated ? "Allocated" : "Pending"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                <Package className="mr-2 h-4 w-4" />
                Allocate Materials
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Workflow</CardTitle>
              <CardDescription>Current status of each production stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {productionOrder.workstations.map((station, index) => (
                  <div key={station.id} className="relative">
                    {index < productionOrder.workstations.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border" />
                    )}
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-none w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(station.status)}`}
                      >
                        {station.status === "completed" ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-white font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{station.name}</h3>
                          <Badge
                            variant={
                              station.status === "completed"
                                ? "default"
                                : station.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {station.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {station.assignee.split(" ")[0][0]}
                              {station.assignee.split(" ")[1][0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{station.assignee}</span>
                        </div>
                        {station.startDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Started: {station.startDate}
                            {station.endDate && ` • Completed: ${station.endDate}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                <Truck className="mr-2 h-4 w-4" />
                Update Production Status
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>History of events for this production order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {productionOrder.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    {index < productionOrder.timeline.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex-none w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.event}</h3>
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">By {event.user}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
