"use client"

import { Checkbox } from "@/components/ui/checkbox"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function CreateWorkstationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    capacity: "1",
    setupTime: "15",
    isActive: true,
    description: "",
    assignedStaff: [],
    maintenanceSchedule: "monthly",
  })

  const [equipment, setEquipment] = useState([
    { id: "1", name: "", type: "", serialNumber: "", purchaseDate: "", warrantyExpiry: "" },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const addEquipment = () => {
    const newId = equipment.length > 0 ? `${Number.parseInt(equipment[equipment.length - 1].id || "0") + 1}` : "1"
    setEquipment([
      ...equipment,
      {
        id: newId,
        name: "",
        type: "",
        serialNumber: "",
        purchaseDate: "",
        warrantyExpiry: "",
      },
    ])
  }

  const removeEquipment = (id: string) => {
    if (equipment.length > 1) {
      setEquipment(equipment.filter((item) => item.id !== id))
    }
  }

  const updateEquipment = (id: string, field: string, value: string) => {
    setEquipment(
      equipment.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting workstation:", { ...formData, equipment })
    // In a real app, you would send this to your API
    router.push("/manufacturing/workstations")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/manufacturing/workstations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create Workstation</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Basic Details</TabsTrigger>
          <TabsTrigger value="capacity">Capacity & Staff</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Workstation Details</CardTitle>
                <CardDescription>Enter the basic details for the new workstation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Workstation Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Cutting Station 1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Workstation Type</Label>
                    <Select name="type" onValueChange={(value) => handleSelectChange("type", value)} required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cutting">Cutting Station</SelectItem>
                        <SelectItem value="sewing">Sewing Station</SelectItem>
                        <SelectItem value="embroidery">Embroidery Station</SelectItem>
                        <SelectItem value="finishing">Finishing Station</SelectItem>
                        <SelectItem value="quality">Quality Control Station</SelectItem>
                        <SelectItem value="packaging">Packaging Station</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select name="location" onValueChange={(value) => handleSelectChange("location", value)} required>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main-floor">Main Production Floor</SelectItem>
                        <SelectItem value="second-floor">Second Floor</SelectItem>
                        <SelectItem value="east-wing">East Wing</SelectItem>
                        <SelectItem value="west-wing">West Wing</SelectItem>
                        <SelectItem value="annex">Annex Building</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isActive">Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                      />
                      <Label htmlFor="isActive">{formData.isActive ? "Active" : "Inactive"}</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the workstation, its purpose, and any special features..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/manufacturing/workstations">Cancel</Link>
                </Button>
                <Button type="button" onClick={() => setActiveTab("capacity")}>
                  Next: Capacity & Staff
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="capacity">
            <Card>
              <CardHeader>
                <CardTitle>Capacity & Staff</CardTitle>
                <CardDescription>Configure workstation capacity and staff assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Daily Capacity (items)</Label>
                    <Input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum number of items that can be processed per day
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setupTime">Setup Time (minutes)</Label>
                    <Input
                      type="number"
                      id="setupTime"
                      name="setupTime"
                      value={formData.setupTime}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Average time required to set up the workstation for a new batch
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedStaff">Assigned Staff</Label>
                  <Select>
                    <SelectTrigger id="assignedStaff">
                      <SelectValue placeholder="Select staff members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff1">Mohammed Al Farsi</SelectItem>
                      <SelectItem value="staff2">Fatima Al Zaabi</SelectItem>
                      <SelectItem value="staff3">Ahmed Al Mansoori</SelectItem>
                      <SelectItem value="staff4">Layla Al Hashimi</SelectItem>
                      <SelectItem value="staff5">Omar Al Suwaidi</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Staff members who are trained to operate this workstation
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skill-cutting" />
                      <Label htmlFor="skill-cutting">Cutting</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skill-sewing" />
                      <Label htmlFor="skill-sewing">Sewing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skill-embroidery" />
                      <Label htmlFor="skill-embroidery">Embroidery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skill-finishing" />
                      <Label htmlFor="skill-finishing">Finishing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skill-quality" />
                      <Label htmlFor="skill-quality">Quality Control</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skill-machine" />
                      <Label htmlFor="skill-machine">Machine Operation</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("maintenance")}>
                  Next: Maintenance
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
                <CardDescription>Configure maintenance schedule and equipment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceSchedule">Maintenance Schedule</Label>
                    <Select
                      name="maintenanceSchedule"
                      value={formData.maintenanceSchedule}
                      onValueChange={(value) => handleSelectChange("maintenanceSchedule", value)}
                    >
                      <SelectTrigger id="maintenanceSchedule">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextMaintenance">Next Scheduled Maintenance</Label>
                    <Input type="date" id="nextMaintenance" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="equipment">Equipment</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEquipment}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Equipment
                    </Button>
                  </div>

                  {equipment.map((item) => (
                    <div key={item.id} className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Equipment #{item.id}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEquipment(item.id)}
                          disabled={equipment.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`equipment-name-${item.id}`}>Equipment Name</Label>
                          <Input
                            id={`equipment-name-${item.id}`}
                            value={item.name}
                            onChange={(e) => updateEquipment(item.id, "name", e.target.value)}
                            placeholder="e.g., Sewing Machine"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`equipment-type-${item.id}`}>Equipment Type</Label>
                          <Select value={item.type} onValueChange={(value) => updateEquipment(item.id, "type", value)}>
                            <SelectTrigger id={`equipment-type-${item.id}`}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sewing-machine">Sewing Machine</SelectItem>
                              <SelectItem value="cutting-machine">Cutting Machine</SelectItem>
                              <SelectItem value="embroidery-machine">Embroidery Machine</SelectItem>
                              <SelectItem value="pressing-machine">Pressing Machine</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`equipment-serial-${item.id}`}>Serial Number</Label>
                          <Input
                            id={`equipment-serial-${item.id}`}
                            value={item.serialNumber}
                            onChange={(e) => updateEquipment(item.id, "serialNumber", e.target.value)}
                            placeholder="e.g., SN12345678"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`equipment-purchase-${item.id}`}>Purchase Date</Label>
                          <Input
                            type="date"
                            id={`equipment-purchase-${item.id}`}
                            value={item.purchaseDate}
                            onChange={(e) => updateEquipment(item.id, "purchaseDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`equipment-warranty-${item.id}`}>Warranty Expiry</Label>
                          <Input
                            type="date"
                            id={`equipment-warranty-${item.id}`}
                            value={item.warrantyExpiry}
                            onChange={(e) => updateEquipment(item.id, "warrantyExpiry", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="maintenanceNotes">Maintenance Notes</Label>
                  <Textarea
                    id="maintenanceNotes"
                    placeholder="Special maintenance instructions or requirements..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("capacity")}>
                  Back
                </Button>
                <Button type="submit">Create Workstation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
