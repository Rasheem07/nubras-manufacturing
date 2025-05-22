import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScanBarcodeIcon as BarcodeScannerIcon, Plus, RefreshCw, Filter } from "lucide-react"
import Link from "next/link"
import { QualityControlItems } from "@/components/quality-control-items"
import { QualityControlDefects } from "@/components/quality-control-defects"
import { QualityControlChecklists } from "@/components/quality-control-checklists"

export default function QualityControlPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quality Control</h1>
          <p className="text-muted-foreground">Inspect items and manage quality control processes</p>
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
            <BarcodeScannerIcon className="mr-2 h-4 w-4" />
            <span>Scan Item</span>
          </Button>
          <Button size="sm" asChild>
            <Link href="/manufacturing/quality-control/defects/create">
              <Plus className="mr-2 h-4 w-4" />
              <span>Report Defect</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/manufacturing/quality-control/checklists/create">
              <Plus className="mr-2 h-4 w-4" />
              <span>New Checklist</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Inspection</TabsTrigger>
          <TabsTrigger value="defects">Defects</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Items Pending Inspection</CardTitle>
              <CardDescription>Items that need quality control inspection</CardDescription>
            </CardHeader>
            <CardContent>
              <QualityControlItems />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="defects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Defect Tracking</CardTitle>
              <CardDescription>Track and manage quality issues</CardDescription>
            </CardHeader>
            <CardContent>
              <QualityControlDefects />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="checklists" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Control Checklists</CardTitle>
              <CardDescription>Manage predefined quality control checklists</CardDescription>
            </CardHeader>
            <CardContent>
              <QualityControlChecklists />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
