"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ManufacturingOrder } from "@/lib/shared/order-types"

const formSchema = z.object({
  orderNumber: z.string().min(1, { message: "Order number is required" }),
  orderType: z.string().min(1, { message: "Order type is required" }),
  clientId: z.string().min(1, { message: "Client is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  startDate: z.date(),
  dueDate: z.date(),
  description: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// Sample client data
const clients = [
  { id: "1", name: "Al Futtaim Group" },
  { id: "2", name: "Emaar Properties" },
  { id: "3", name: "Dubai Holding" },
  { id: "4", name: "Majid Al Futtaim" },
  { id: "5", name: "Chalhoub Group" },
]

export function ProductionOrderForm() {
  const [startDate, setStartDate] = useState<Date | undefined | null>(new Date())
  const [dueDate, setDueDate] = useState<Date | undefined | null>(new Date(new Date().setDate(new Date().getDate() + 14)))

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: `PO-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      orderType: "custom tailoring",
      priority: "medium",
      startDate: startDate as Date,
      dueDate: dueDate as Date,
      description: "",
      notes: "",
    },
  })

  function onSubmit(data: FormValues) {
    console.log(data)
    // Submit form data to server
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create Production Order</CardTitle>
          <CardDescription>Create a new production order for manufacturing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="production">Production Details</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input id="orderNumber" {...form.register("orderNumber")} readOnly />
                  {form.formState.errors.orderNumber && (
                    <p className="text-sm text-red-500">{form.formState.errors.orderNumber.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select
                    defaultValue={form.getValues("orderType")}
                    onValueChange={(value) => form.setValue("orderType", value)}
                  >
                    <SelectTrigger id="orderType">
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"custom tailoring"}>Custom Tailoring</SelectItem>
                      <SelectItem value={"bulk production"}>Bulk Production</SelectItem>
                      <SelectItem value={"alternations"}>Alterations</SelectItem>
                      <SelectItem value={"repairs"}>Repairs</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.orderType && (
                    <p className="text-sm text-red-500">{form.formState.errors.orderType.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client</Label>
                  <Select defaultValue="" onValueChange={(value) => form.setValue("clientId", value)}>
                    <SelectTrigger id="clientId">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.clientId && (
                    <p className="text-sm text-red-500">{form.formState.errors.clientId.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    defaultValue={form.getValues("priority")}
                    onValueChange={(value) => form.setValue("priority", value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.priority && (
                    <p className="text-sm text-red-500">{form.formState.errors.priority.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <DatePicker
                    id="startDate"
                    date={startDate}
                    setDate={(date) => {
                      setStartDate(date)
                      form.setValue("startDate", date as Date)
                    }}
                  />
                  {form.formState.errors.startDate && (
                    <p className="text-sm text-red-500">{form.formState.errors.startDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <DatePicker
                    id="dueDate"
                    date={dueDate}
                    setDate={(date) => {
                      setDueDate(date)
                      form.setValue("dueDate", date as Date)
                    }}
                  />
                  {form.formState.errors.dueDate && (
                    <p className="text-sm text-red-500">{form.formState.errors.dueDate.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter order description" {...form.register("description")} />
              </div>
            </TabsContent>
            <TabsContent value="materials" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Required Materials</h3>
                <Separator />

                {/* Material selection would go here */}
                <p className="text-sm text-muted-foreground">
                  No materials have been added yet. Add materials from inventory to continue.
                </p>

                <Button type="button" variant="outline" className="mt-4">
                  Add Material
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="production" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Production Workflow</h3>
                <Separator />

                {/* Workstation assignment would go here */}
                <p className="text-sm text-muted-foreground">
                  No workstations have been assigned yet. Assign workstations to create a production workflow.
                </p>

                <Button type="button" variant="outline" className="mt-4">
                  Assign Workstation
                </Button>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="notes">Production Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any special instructions or notes for production"
                  {...form.register("notes")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Create Production Order</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
