"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Settings</CardTitle>
        <CardDescription>Configure how manufacturing integrates with other modules</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inventory">
          <TabsList className="mb-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-material">Automatic material requisition</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically create material requisitions for production orders
                  </p>
                </div>
                <Switch id="auto-material" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="real-time-inventory">Real-time inventory updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Update inventory in real-time as materials are consumed
                  </p>
                </div>
                <Switch id="real-time-inventory" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="low-stock-action">Low stock action</Label>
                <Select defaultValue="notify">
                  <SelectTrigger id="low-stock-action">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notify">Notify Only</SelectItem>
                    <SelectItem value="auto-order">Auto-generate Purchase Order</SelectItem>
                    <SelectItem value="pause">Pause Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-production">Auto-create production orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically create production orders from sales orders
                  </p>
                </div>
                <Switch id="auto-production" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="order-status-sync">Order status synchronization</Label>
                  <p className="text-sm text-muted-foreground">Sync production status with sales order status</p>
                </div>
                <Switch id="order-status-sync" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-priority">Order priority calculation</Label>
                <Select defaultValue="due-date">
                  <SelectTrigger id="order-priority">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due-date">Based on Due Date</SelectItem>
                    <SelectItem value="customer-tier">Based on Customer Tier</SelectItem>
                    <SelectItem value="order-value">Based on Order Value</SelectItem>
                    <SelectItem value="custom">Custom Formula</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="finance">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="cost-tracking">Production cost tracking</Label>
                  <p className="text-sm text-muted-foreground">Track and report production costs to finance module</p>
                </div>
                <Switch id="cost-tracking" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="labor-tracking">Labor cost tracking</Label>
                  <p className="text-sm text-muted-foreground">Track labor costs per production order</p>
                </div>
                <Switch id="labor-tracking" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost-allocation">Cost allocation method</Label>
                <Select defaultValue="direct">
                  <SelectTrigger id="cost-allocation">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct Allocation</SelectItem>
                    <SelectItem value="activity">Activity-Based Costing</SelectItem>
                    <SelectItem value="standard">Standard Costing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button>Save Integration Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}
