"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Camera, CheckCircle2, AlertCircle } from "lucide-react"

// Sample quality control checklist data
const checklistData = {
  productName: "Premium Kandura",
  orderNumber: "PO-1234",
  batchNumber: "B-567",
  inspector: "Omar Jamal",
  date: new Date().toISOString().split("T")[0],
  categories: [
    {
      name: "Fabric Quality",
      items: [
        { id: "fabric-1", label: "No visible defects in fabric", checked: false },
        { id: "fabric-2", label: "Correct fabric type used", checked: false },
        { id: "fabric-3", label: "Fabric color matches specification", checked: false },
        { id: "fabric-4", label: "Fabric weight/thickness is correct", checked: false },
      ],
    },
    {
      name: "Stitching",
      items: [
        { id: "stitch-1", label: "Stitches are even and consistent", checked: false },
        { id: "stitch-2", label: "No loose threads", checked: false },
        { id: "stitch-3", label: "Seams are straight", checked: false },
        { id: "stitch-4", label: "Correct thread color used", checked: false },
        { id: "stitch-5", label: "Stitch density meets requirements (min. 12 per inch)", checked: false },
      ],
    },
    {
      name: "Measurements",
      items: [
        { id: "measure-1", label: "Overall length within tolerance (±0.5cm)", checked: false },
        { id: "measure-2", label: "Chest width within tolerance (±0.5cm)", checked: false },
        { id: "measure-3", label: "Sleeve length within tolerance (±0.5cm)", checked: false },
        { id: "measure-4", label: "Collar size within tolerance (±0.25cm)", checked: false },
      ],
    },
    {
      name: "Appearance",
      items: [
        { id: "appear-1", label: "No stains or marks", checked: false },
        { id: "appear-2", label: "Embroidery is clean and as specified", checked: false },
        { id: "appear-3", label: "Buttons properly attached", checked: false },
        { id: "appear-4", label: "Garment is properly pressed", checked: false },
      ],
    },
  ],
}

export function QualityControlChecklist() {
  const [checklist, setChecklist] = useState(checklistData)
  const [overallResult, setOverallResult] = useState<"pass" | "fail" | "pending">("pending")
  const [notes, setNotes] = useState("")
  const [photoUploaded, setPhotoUploaded] = useState(false)

  const toggleChecklistItem = (categoryIndex: number, itemIndex: number) => {
    const newChecklist = { ...checklist }
    newChecklist.categories[categoryIndex].items[itemIndex].checked =
      !newChecklist.categories[categoryIndex].items[itemIndex].checked
    setChecklist(newChecklist)
  }

  const calculateProgress = () => {
    let totalItems = 0
    let checkedItems = 0

    checklist.categories.forEach((category) => {
      totalItems += category.items.length
      checkedItems += category.items.filter((item) => item.checked).length
    })

    return (checkedItems / totalItems) * 100
  }

  const progress = calculateProgress()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quality Control Checklist</CardTitle>
          <CardDescription>Inspection checklist for {checklist.productName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Order Number</p>
              <p>{checklist.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
              <p>{checklist.batchNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inspector</p>
              <p>{checklist.inspector}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p>{checklist.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Inspection Progress</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Separator />

          {checklist.categories.map((category, categoryIndex) => (
            <div key={category.name} className="space-y-4">
              <h3 className="font-medium">{category.name}</h3>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() => toggleChecklistItem(categoryIndex, itemIndex)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={item.id} className="text-sm">
                        {item.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
              {categoryIndex < checklist.categories.length - 1 && <Separator />}
            </div>
          ))}

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Defect Documentation</h3>
            <div className="space-y-2">
              <Label htmlFor="photo-evidence">Photo Evidence</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                {photoUploaded ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-sm font-medium">Photo uploaded successfully</p>
                    <Button variant="outline" size="sm" onClick={() => setPhotoUploaded(false)}>
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Drag and drop a photo here, or click to upload</p>
                    <Button variant="outline" size="sm" onClick={() => setPhotoUploaded(true)}>
                      Upload Photo
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Inspection Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any defects or issues found during inspection..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Overall Result</h3>
            <RadioGroup
              value={overallResult}
              onValueChange={(value) => setOverallResult(value as "pass" | "fail" | "pending")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pass" id="result-pass" />
                <Label htmlFor="result-pass" className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Pass - Product meets quality standards
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fail" id="result-fail" />
                <Label htmlFor="result-fail" className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                  Fail - Product does not meet quality standards
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Draft</Button>
          <Button>Submit Inspection</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
