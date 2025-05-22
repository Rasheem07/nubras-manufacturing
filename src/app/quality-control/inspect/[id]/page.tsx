"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Camera, CheckCircle, X, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InspectItemPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("checklist")
  const [selectedDefect, setSelectedDefect] = useState("")
  const [defectNotes, setDefectNotes] = useState("")
  const [photoUploaded, setPhotoUploaded] = useState(false)
  const [inspectionResult, setInspectionResult] = useState<"pending" | "approved" | "rejected">("pending")
  const [checklistItems, setChecklistItems] = useState([
    { id: "check-1", label: "Neckline symmetry", category: "Appearance", checked: false },
    { id: "check-2", label: "Cuff stitch count (minimum 12 stitches per inch)", category: "Stitching", checked: false },
    { id: "check-3", label: "Hem evenness", category: "Appearance", checked: false },
    { id: "check-4", label: "Button alignment", category: "Appearance", checked: false },
    { id: "check-5", label: "Fabric quality (no pulls or snags)", category: "Material", checked: false },
    { id: "check-6", label: "Seam strength", category: "Stitching", checked: false },
    { id: "check-7", label: "Color consistency", category: "Material", checked: false },
    { id: "check-8", label: "Embroidery quality", category: "Embellishment", checked: false },
    { id: "check-9", label: "Size accuracy according to specifications", category: "Measurements", checked: false },
    { id: "check-10", label: "Overall finish and presentation", category: "Appearance", checked: false },
  ])

  // Mock data for the item being inspected
  const item = {
    id: params.id,
    orderId: "ORD-1238",
    description: "Casual Kanduras (Batch 1)",
    client: "Dubai Mall Boutique",
    garmentType: "Kandura",
    priority: "Standard",
    quantity: 10,
    completedQuantity: 8,
    defectiveQuantity: 1,
  }

  // Mock data for common defects
  const commonDefects = [
    { value: "uneven-hem", label: "Uneven hem" },
    { value: "loose-button", label: "Loose button" },
    { value: "fabric-tear", label: "Fabric tear" },
    { value: "stitch-defect", label: "Stitch defect" },
    { value: "color-variation", label: "Color variation" },
    { value: "size-mismatch", label: "Size mismatch" },
    { value: "embroidery-flaw", label: "Embroidery flaw" },
    { value: "other", label: "Other (specify in notes)" },
  ]

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(
      checklistItems.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked }
        }
        return item
      }),
    )
  }

  const handleApproveItem = () => {
    setInspectionResult("approved")
    // In a real app, you would submit this to your API
    setTimeout(() => {
      router.push("/manufacturing/quality-control")
    }, 1500)
  }

  const handleRejectItem = () => {
    setInspectionResult("rejected")
    // In a real app, you would submit this to your API
    setTimeout(() => {
      router.push("/manufacturing/quality-control")
    }, 1500)
  }

  const getPassRate = () => {
    const totalChecked = checklistItems.filter((item) => item.checked).length
    return Math.round((totalChecked / checklistItems.length) * 100)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/manufacturing/quality-control">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Quality Control Inspection</h1>
      </div>

      {inspectionResult !== "pending" && (
        <Alert variant={inspectionResult === "approved" ? "default" : "destructive"}>
          {inspectionResult === "approved" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <AlertTitle>{inspectionResult === "approved" ? "Item Approved" : "Item Rejected"}</AlertTitle>
          <AlertDescription>
            {inspectionResult === "approved"
              ? "This item has passed quality control inspection."
              : "This item has failed quality control inspection."}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="checklist">Inspection Checklist</TabsTrigger>
              <TabsTrigger value="defects">Report Defects</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
            </TabsList>

            <TabsContent value="checklist">
              <Card>
                <CardHeader>
                  <CardTitle>Inspection Checklist</CardTitle>
                  <CardDescription>Kandura Quality Checklist</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {checklistItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleChecklistItem(item.id)}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor={item.id} className="font-medium">
                            {item.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 border rounded-md bg-muted/50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Pass Rate:</span>
                      <span className="font-bold">{getPassRate()}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className={`h-2.5 rounded-full ${
                          getPassRate() >= 80 ? "bg-green-600" : getPassRate() >= 50 ? "bg-yellow-400" : "bg-red-600"
                        }`}
                        style={{ width: `${getPassRate()}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {getPassRate() >= 80
                        ? "Item meets quality standards"
                        : getPassRate() >= 50
                          ? "Item needs minor corrections"
                          : "Item requires significant rework"}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Check all items that pass inspection. Any unchecked items will be marked as defects.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="defects">
              <Card>
                <CardHeader>
                  <CardTitle>Report Defect</CardTitle>
                  <CardDescription>If any defects are found, report them here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defect-type">Defect Type</Label>
                    <Select value={selectedDefect} onValueChange={setSelectedDefect}>
                      <SelectTrigger id="defect-type">
                        <SelectValue placeholder="Select defect type" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonDefects.map((defect) => (
                          <SelectItem key={defect.value} value={defect.value}>
                            {defect.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defect-severity">Defect Severity</Label>
                    <RadioGroup defaultValue="minor">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="minor" id="severity-minor" />
                        <Label htmlFor="severity-minor">Minor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="severity-moderate" />
                        <Label htmlFor="severity-moderate">Moderate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="critical" id="severity-critical" />
                        <Label htmlFor="severity-critical">Critical</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defect-notes">Defect Notes</Label>
                    <Textarea
                      id="defect-notes"
                      placeholder="Describe the defect in detail..."
                      value={defectNotes}
                      onChange={(e) => setDefectNotes(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Photo Evidence</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      {photoUploaded ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </div>
                          <p className="text-sm font-medium">Photo uploaded successfully</p>
                          <Button variant="outline" size="sm" onClick={() => setPhotoUploaded(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Drag and drop a photo here, or click to upload
                          </p>
                          <Button variant="outline" size="sm" onClick={() => setPhotoUploaded(true)}>
                            Upload Photo
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full" disabled={!selectedDefect}>
                    Add Defect
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="measurements">
              <Card>
                <CardHeader>
                  <CardTitle>Measurements</CardTitle>
                  <CardDescription>Record and verify product measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="length">Length (cm)</Label>
                        <Input type="number" id="length" placeholder="e.g., 150" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chest">Chest (cm)</Label>
                        <Input type="number" id="chest" placeholder="e.g., 110" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sleeve">Sleeve (cm)</Label>
                        <Input type="number" id="sleeve" placeholder="e.g., 65" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shoulder">Shoulder (cm)</Label>
                        <Input type="number" id="shoulder" placeholder="e.g., 45" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collar">Collar (cm)</Label>
                        <Input type="number" id="collar" placeholder="e.g., 40" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cuff">Cuff (cm)</Label>
                        <Input type="number" id="cuff" placeholder="e.g., 25" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="measurement-notes">Measurement Notes</Label>
                      <Textarea
                        id="measurement-notes"
                        placeholder="Any notes about measurements or size adjustments..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button>Save Measurements</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Information about the item being inspected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Item ID</p>
                <p>{item.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Order ID</p>
                <p>{item.orderId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Description</p>
                <p>{item.description}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Client</p>
                <p>{item.client}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Garment Type</p>
                <p>{item.garmentType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Priority</p>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {item.priority}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-sm font-medium">Production Progress</p>
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Completed: {item.completedQuantity}/{item.quantity}
                  </span>
                  <span>Defective: {item.defectiveQuantity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${(item.completedQuantity / item.quantity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inspection Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                variant="outline"
                onClick={handleApproveItem}
                disabled={inspectionResult !== "pending"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Item
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleRejectItem}
                disabled={inspectionResult !== "pending"}
              >
                <X className="mr-2 h-4 w-4" />
                Reject Item
              </Button>
              <Separator />
              <Button className="w-full" asChild>
                <Link href="/manufacturing/quality-control">Back to Quality Control</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
