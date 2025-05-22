import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScanBarcodeIcon as BarcodeScannerIcon, RefreshCw, Filter, Printer } from "lucide-react"
import { FinishingItems } from "@/components/finishing-items"
import { DeliverySchedule } from "@/components/delivery-schedule"
import { PackagingInstructions } from "@/components/packaging-instructions"

export default function FinishingPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finishing & Delivery</h1>
          <p className="text-muted-foreground">Manage final processing and delivery of completed items</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            <span>Print Labels</span>
          </Button>
          <Button size="sm">
            <BarcodeScannerIcon className="mr-2 h-4 w-4" />
            <span>Scan Item</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="finishing">
        <TabsList>
          <TabsTrigger value="finishing">Finishing Queue</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Schedule</TabsTrigger>
          <TabsTrigger value="packaging">Packaging Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="finishing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Items Ready for Finishing</CardTitle>
              <CardDescription>Items that have passed QC and are ready for final processing</CardDescription>
            </CardHeader>
            <CardContent>
              <FinishingItems />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="delivery" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Schedule</CardTitle>
              <CardDescription>Upcoming deliveries and pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <DeliverySchedule />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packaging" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Packaging Instructions</CardTitle>
              <CardDescription>Client-specific packaging requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <PackagingInstructions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
