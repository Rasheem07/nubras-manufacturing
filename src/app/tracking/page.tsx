import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScanBarcodeIcon as BarcodeScannerIcon, RefreshCw, Filter } from "lucide-react"
import { ProductionTrackingTable } from "@/components/production-tracking-table"
import { ProductionTrackingKanban } from "@/components/production-tracking-kanban"
import { ProductionBottlenecks } from "@/components/production-bottlenecks"
import { BarcodeScanner } from "@/components/barcode-scanner"

export default function ProductionTrackingPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Tracking</h1>
          <p className="text-muted-foreground">Track production progress and identify bottlenecks</p>
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
          <Button size="sm">
            <BarcodeScannerIcon className="mr-2 h-4 w-4" />
            <span>Scan Barcode</span>
          </Button>
        </div>
      </div>

      <BarcodeScanner />

      <ProductionBottlenecks />

      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Status</CardTitle>
              <CardDescription>Current status of all production items by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductionTrackingKanban />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="table" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Items</CardTitle>
              <CardDescription>Detailed list of all items in production</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductionTrackingTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
