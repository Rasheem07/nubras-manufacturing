import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Save, Trash } from "lucide-react"
import Link from "next/link"

export default function CreateChecklistPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/manufacturing/quality-control">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create Quality Control Checklist</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checklist Details</CardTitle>
          <CardDescription>Create a new quality control checklist for your garments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Checklist Name</Label>
              <Input id="name" placeholder="Enter checklist name" />
            </div>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter checklist description" rows={3} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Checklist Items</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`item-${item}`}>Check Item</Label>
                        <Input id={`item-${item}`} defaultValue={`Check item ${item}`} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`severity-${item}`}>Severity</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id={`severity-${item}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="major">Major</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="minor">Minor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`instructions-${item}`}>Instructions</Label>
                      <Textarea id={`instructions-${item}`} placeholder="Enter detailed instructions" rows={2} />
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox id={`required-${item}`} defaultChecked />
                      <Label htmlFor={`required-${item}`}>Required item</Label>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/manufacturing/quality-control">Cancel</Link>
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Checklist
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
