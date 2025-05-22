import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductionSettings } from "@/components/production-settings"
import { WorkstationSettings } from "@/components/workstation-settings"
import { QualityControlSettings } from "@/components/quality-control-settings"
import { IntegrationSettings } from "@/components/integration-settings"

export const metadata: Metadata = {
  title: "Manufacturing Settings",
  description: "Configure manufacturing module settings",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Manufacturing Settings</h1>

      <Tabs defaultValue="production" className="space-y-4">
        <TabsList>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="workstations">Workstations</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="production">
          <ProductionSettings />
        </TabsContent>

        <TabsContent value="workstations">
          <WorkstationSettings />
        </TabsContent>

        <TabsContent value="quality">
          <QualityControlSettings />
        </TabsContent>

        <TabsContent value="integration">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
