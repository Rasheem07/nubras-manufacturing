"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QualityControlSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Control Settings</CardTitle>
        <CardDescription>Configure quality control parameters and checklists</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between space-y-0">
            <div className="space-y-0.5">
              <Label htmlFor="auto-qc">Automatic QC scheduling</Label>
              <p className="text-sm text-muted-foreground">Automatically schedule quality control checks</p>
            </div>
            <Switch id="auto-qc" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qc-frequency">QC Frequency</Label>
            <Select defaultValue="batch">
              <SelectTrigger id="qc-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item">Every Item</SelectItem>
                <SelectItem value="batch">Every Batch</SelectItem>
                <SelectItem value="order">Every Order</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sampling-rate">Sampling Rate (%)</Label>
            <Input id="sampling-rate" type="number" defaultValue="20" min="1" max="100" />
            <p className="text-xs text-muted-foreground">Percentage of items to check in each batch</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defect-threshold">Defect Threshold (%)</Label>
            <Input id="defect-threshold" type="number" defaultValue="5" min="0" max="100" />
            <p className="text-xs text-muted-foreground">Maximum acceptable defect rate before rejection</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qc-notes">Default QC Notes Template</Label>
            <Textarea
              id="qc-notes"
              defaultValue="1. Check stitching quality\n2. Verify measurements\n3. Inspect fabric for defects\n4. Check buttons and fasteners\n5. Verify pattern alignment"
              rows={5}
            />
          </div>

          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}
