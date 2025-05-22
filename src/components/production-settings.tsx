"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ProductionSettings() {
  const [autoAssignOrders, setAutoAssignOrders] = useState(true)
  const [notifyBottlenecks, setNotifyBottlenecks] = useState(true)
  const [defaultPriority, setDefaultPriority] = useState("medium")
  const [capacityBuffer, setCapacityBuffer] = useState("15")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Settings</CardTitle>
        <CardDescription>Configure general production settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-assign">Auto-assign production orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically assign new orders to available workstations
                  </p>
                </div>
                <Switch id="auto-assign" checked={autoAssignOrders} onCheckedChange={setAutoAssignOrders} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-priority">Default order priority</Label>
                <Select value={defaultPriority} onValueChange={setDefaultPriority}>
                  <SelectTrigger id="default-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity-buffer">Capacity buffer (%)</Label>
                <Input
                  id="capacity-buffer"
                  type="number"
                  value={capacityBuffer}
                  onChange={(e) => setCapacityBuffer(e.target.value)}
                  min="0"
                  max="50"
                />
                <p className="text-xs text-muted-foreground">Buffer percentage to prevent workstation overloading</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduling">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="work-hours-start">Work hours start</Label>
                <Input id="work-hours-start" type="time" defaultValue="08:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-hours-end">Work hours end</Label>
                <Input id="work-hours-end" type="time" defaultValue="17:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-days">Working days</Label>
                <div className="flex flex-wrap gap-2">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                    <Button
                      key={day}
                      variant={day === "Friday" || day === "Saturday" ? "outline" : "default"}
                      className="text-xs"
                      size="sm"
                    >
                      {day.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="bottleneck-notify">Bottleneck notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify when production bottlenecks are detected</p>
                </div>
                <Switch id="bottleneck-notify" checked={notifyBottlenecks} onCheckedChange={setNotifyBottlenecks} />
              </div>

              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="completion-notify">Order completion notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify when production orders are completed</p>
                </div>
                <Switch id="completion-notify" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="delay-notify">Delay notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify when production orders are delayed</p>
                </div>
                <Switch id="delay-notify" defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}
