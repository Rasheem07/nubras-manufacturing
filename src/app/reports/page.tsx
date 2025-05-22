"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Printer, Mail } from "lucide-react"

import { ProductionEfficiencyReport } from "@/components/production-efficiency-report"
import { QualityControlReport } from "@/components/quality-control-report"
import { WorkstationUtilizationReport } from "@/components/workstation-utilization-report"
import { MaterialConsumptionReport } from "@/components/material-consumption-report"
import { StaffPerformanceReport } from "@/components/staff-performance-report"
import { ReportSelector } from "@/components/report-selector"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("production")

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manufacturing Reports</h1>
          <p className="text-muted-foreground">View and generate reports for manufacturing operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <ReportSelector />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="workstation">Workstations</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="production">
          <ProductionEfficiencyReport />
        </TabsContent>

        <TabsContent value="quality">
          <QualityControlReport />
        </TabsContent>

        <TabsContent value="workstation">
          <WorkstationUtilizationReport />
        </TabsContent>

        <TabsContent value="materials">
          <MaterialConsumptionReport />
        </TabsContent>

        <TabsContent value="staff">
          <StaffPerformanceReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
