"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Trash, AlertCircle, Check } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ManufacturingOrderItem } from "@/lib/shared/order-types"

export default function CreateOrderPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [orderSource, setOrderSource] = useState<string>("manufacturing")
  const [materialCheckStatus, setMaterialCheckStatus] = useState<
    "unchecked" | "checking" | "available" | "unavailable"
  >("unchecked")
  const [items, setItems] = useState<Partial<ManufacturingOrderItem>[]>([
    { id: "1", name: "", quantity: 1, unitPrice: 0, description: "", total: 0 },
  ])
  const [formData, setFormData] = useState({
    customerName: "",
    customerId: "",
    orderDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    priority: "",
    notes: "",
    subtotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    total: 0,
    paymentTerms: "30_days",
  })

  const addItem = () => {
    const newId = items.length > 0 ? `${Number.parseInt(items[items.length - 1].id || "0") + 1}` : "1"
    setItems([...items, { id: newId, name: "", quantity: 1, unitPrice: 0, description: "", total: 0 }])
    recalculateTotals([...items, { id: newId, name: "", quantity: 1, unitPrice: 0, description: "", total: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      recalculateTotals(updatedItems)
    }
  }

  const updateItem = (id: string, field: string, value: string | number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // Recalculate total if quantity or unitPrice changes
        if (field === "quantity" || field === "unitPrice") {
          const quantity = field === "quantity" ? Number(value) : Number(item.quantity) || 0
          const unitPrice = field === "unitPrice" ? Number(value) : Number(item.unitPrice) || 0
          updatedItem.total = quantity * unitPrice
        }

        return updatedItem
      }
      return item
    })

    setItems(updatedItems)
    recalculateTotals(updatedItems)
  }

  const recalculateTotals = (currentItems: Partial<ManufacturingOrderItem>[]) => {
    const subtotal = currentItems.reduce((sum, item) => sum + (item.total || 0), 0)
    const taxAmount = subtotal * 0.05 // 5% VAT
    const total = subtotal + taxAmount - (formData.discountAmount || 0)

    setFormData((prev) => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Recalculate totals if discount changes
    if (name === "discountAmount") {
      const discountValue = Number.parseFloat(value) || 0
      const total = formData.subtotal + formData.taxAmount - discountValue
      setFormData((prev) => ({ ...prev, discountAmount: discountValue, total }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const checkMaterialAvailability = () => {
    setMaterialCheckStatus("checking")
    // Simulate API call to check material availability
    setTimeout(() => {
      // Random result for demo purposes
      setMaterialCheckStatus(Math.random() > 0.3 ? "available" : "unavailable")
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the order object based on form data
    const order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Date.now().toString().substring(6)}`,
      customerName: formData.customerName,
      customerId: formData.customerId,
      orderDate: formData.orderDate,
      dueDate: formData.dueDate,
      status: "pending",
      priority: formData.priority,
      items: items.map((item) => ({
        id: item.id || "",
        name: item.name || "",
        description: item.description || "",
        quantity: Number(item.quantity) || 0,
        unitPrice: Number(item.unitPrice) || 0,
        total: Number(item.total) || 0,
      })),
      subtotal: formData.subtotal,
      taxAmount: formData.taxAmount,
      discountAmount: formData.discountAmount,
      total: formData.total,
      notes: formData.notes,
      paymentTerms: formData.paymentTerms,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: orderSource as "manufacturing" | "crm" | "pos" | "finance" | "other",

      // Manufacturing specific fields
      productionStatus: "pending",
      materialAllocated: materialCheckStatus === "available",
      estimatedProductionTime: items.reduce((total, item) => total + (Number(item.quantity) || 0) * 30, 0), // 30 min per item
    }

    console.log("Submitting order:", order)

    // In a real app, you would send this to your API
    // For now, just redirect to the orders list
    router.push("/manufacturing/orders")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/manufacturing/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create Production Order</h1>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="orderSource">Order Source</Label>
          <Select value={orderSource} onValueChange={setOrderSource}>
            <SelectTrigger id="orderSource" className="w-[180px]">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="crm">CRM</SelectItem>
              <SelectItem value="pos">POS</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="items">Order Items</TabsTrigger>
          <TabsTrigger value="production">Production Details</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>Enter the basic details for the new production order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Select
                      name="customerName"
                      onValueChange={(value) => handleSelectChange("customerName", value)}
                      required
                    >
                      <SelectTrigger id="customerName">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ahmed Al Nahyan">Ahmed Al Nahyan</SelectItem>
                        <SelectItem value="Emirates International School">Emirates International School</SelectItem>
                        <SelectItem value="Sheikha Fatima">Sheikha Fatima</SelectItem>
                        <SelectItem value="Etihad Airways">Etihad Airways</SelectItem>
                        <SelectItem value="Dubai Mall Boutique">Dubai Mall Boutique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      name="customerId"
                      placeholder="e.g., CUST-001"
                      value={formData.customerId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderDate">Order Date</Label>
                    <Input
                      type="date"
                      id="orderDate"
                      name="orderDate"
                      value={formData.orderDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority" onValueChange={(value) => handleSelectChange("priority", value)} required>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rush">Rush (24h)</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="standard">Standard (3 days)</SelectItem>
                        <SelectItem value="bulk">Bulk (1 week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      defaultValue={formData.paymentTerms}
                      onValueChange={(value) => handleSelectChange("paymentTerms", value)}
                    >
                      <SelectTrigger id="paymentTerms">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                        <SelectItem value="prepaid">Prepaid</SelectItem>
                        <SelectItem value="15_days">Net 15</SelectItem>
                        <SelectItem value="30_days">Net 30</SelectItem>
                        <SelectItem value="60_days">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions or requirements..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/manufacturing/orders">Cancel</Link>
                </Button>
                <Button type="button" onClick={() => setActiveTab("items")}>
                  Next: Order Items
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>Add the items to be produced for this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Order Items</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>

                  {items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 p-4 border rounded-md">
                      <div className="md:col-span-3 space-y-2">
                        <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                        <Select
                          value={item.name?.toString() || ""}
                          onValueChange={(value) => updateItem(item.id!, "name", value)}
                        >
                          <SelectTrigger id={`item-name-${item.id}`}>
                            <SelectValue placeholder="Select item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kandura">Kandura</SelectItem>
                            <SelectItem value="abaya">Abaya</SelectItem>
                            <SelectItem value="uniform">School Uniform</SelectItem>
                            <SelectItem value="corporate">Corporate Uniform</SelectItem>
                            <SelectItem value="custom">Custom Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                        <Input
                          type="number"
                          id={`item-quantity-${item.id}`}
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id!, "quantity", Number.parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`item-price-${item.id}`}>Unit Price</Label>
                        <Input
                          type="number"
                          id={`item-price-${item.id}`}
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id!, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`item-total-${item.id}`}>Total</Label>
                        <Input
                          type="number"
                          id={`item-total-${item.id}`}
                          value={item.total}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`item-description-${item.id}`}>Description</Label>
                        <Textarea
                          id={`item-description-${item.id}`}
                          placeholder="Size, color, special instructions..."
                          value={item.description || ""}
                          onChange={(e) => updateItem(item.id!, "description", e.target.value)}
                          rows={1}
                        />
                      </div>
                      <div className="md:col-span-1 flex items-end justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id!)}
                          disabled={items.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subtotal</span>
                    <span>AED {formData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">VAT (5%)</span>
                    <span>AED {formData.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="discountAmount">Discount</Label>
                    <div className="flex items-center gap-2">
                      <span>AED</span>
                      <Input
                        id="discountAmount"
                        name="discountAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discountAmount}
                        onChange={handleInputChange}
                        className="w-24"
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>AED {formData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("production")}>
                  Next: Production Details
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <Card>
              <CardHeader>
                <CardTitle>Production Details</CardTitle>
                <CardDescription>Configure production-specific details for this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="materialCheck">Material Availability</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        id="materialCheck"
                        onClick={checkMaterialAvailability}
                        disabled={materialCheckStatus === "checking"}
                      >
                        {materialCheckStatus === "checking" ? "Checking..." : "Check Material Availability"}
                      </Button>

                      {materialCheckStatus === "available" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" /> Materials Available
                        </Badge>
                      )}

                      {materialCheckStatus === "unavailable" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <AlertCircle className="mr-1 h-3 w-3" /> Materials Unavailable
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Verify if all required materials are in stock for this production order
                    </p>
                  </div>

                  {materialCheckStatus === "unavailable" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Material Shortage</AlertTitle>
                      <AlertDescription>
                        Some materials required for this order are not available in sufficient quantity. Please check
                        inventory or create purchase orders for the missing materials.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedStartDate">Estimated Start Date</Label>
                      <Input type="date" id="estimatedStartDate" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCompletionDate">Estimated Completion Date</Label>
                      <Input type="date" id="estimatedCompletionDate" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignWorkstation">Assign Workstation</Label>
                      <Select>
                        <SelectTrigger id="assignWorkstation">
                          <SelectValue placeholder="Select workstation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ws1">Cutting Station 1</SelectItem>
                          <SelectItem value="ws2">Sewing Station 2</SelectItem>
                          <SelectItem value="ws3">Embroidery Station</SelectItem>
                          <SelectItem value="ws4">Finishing Station</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignStaff">Assign Staff</Label>
                      <Select>
                        <SelectTrigger id="assignStaff">
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff1">Mohammed Al Farsi</SelectItem>
                          <SelectItem value="staff2">Fatima Al Zaabi</SelectItem>
                          <SelectItem value="staff3">Ahmed Al Mansoori</SelectItem>
                          <SelectItem value="staff4">Layla Al Hashimi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="productionNotes">Production Notes</Label>
                    <Textarea
                      id="productionNotes"
                      placeholder="Special production instructions, quality requirements, etc."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("items")}>
                  Back
                </Button>
                <Button type="submit">Create Production Order</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
