import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera, Save, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReportDefectPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/manufacturing/quality-control">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Report Quality Defect</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Defect Details</CardTitle>
          <CardDescription>Report a quality issue or defect found during inspection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="item-id">Item ID</Label>
              <Input id="item-id" placeholder="Enter item ID or scan barcode" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-id">Order ID</Label>
              <Input id="order-id" placeholder="Enter order ID" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="garment-type">Garment Type</Label>
              <Select>
                <SelectTrigger id="garment-type">
                  <SelectValue placeholder="Select garment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kandura">Kandura</SelectItem>
                  <SelectItem value="abaya">Abaya</SelectItem>
                  <SelectItem value="school-uniform">School Uniform</SelectItem>
                  <SelectItem value="corporate-uniform">Corporate Uniform</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Defect Severity</Label>
              <Select>
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Defect Description</Label>
            <Textarea id="description" placeholder="Describe the defect in detail" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Defect Location</Label>
            <Textarea id="location" placeholder="Describe where on the garment the defect is located" rows={2} />
          </div>

          <div className="space-y-2">
            <Label>Defect Images</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40">
                <Button variant="outline" className="w-full h-full flex flex-col gap-2">
                  <Camera className="h-6 w-6" />
                  <span>Take Photo</span>
                </Button>
              </div>
              <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40">
                <Button variant="outline" className="w-full h-full flex flex-col gap-2">
                  <Upload className="h-6 w-6" />
                  <span>Upload Image</span>
                </Button>
              </div>
              <div className="border rounded-md p-1 h-40 relative">
                <Image
                  src="/fabric-defect.png"
                  alt="Sample defect"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded"
                />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6">
                  <span className="sr-only">Remove</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="assigned-to">Assign To</Label>
              <Select>
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fatima">Fatima Hassan</SelectItem>
                  <SelectItem value="ahmed">Ahmed Ali</SelectItem>
                  <SelectItem value="mohammed">Mohammed Khalid</SelectItem>
                  <SelectItem value="layla">Layla Ahmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">Recommended Action</Label>
              <Select>
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rework">Rework</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="accept">Accept with Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/manufacturing/quality-control">Cancel</Link>
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
