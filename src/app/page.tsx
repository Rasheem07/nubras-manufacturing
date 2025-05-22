import { ManufacturingHeader } from "@/components/manufacturing-header"
import { ManufacturingStats } from "@/components/manufacturing-stats"
import { ProductionOverview } from "@/components/production-overview"
import { WorkstationStatus } from "@/components/workstation-status"
import { QualityMetrics } from "@/components/quality-metrics"
import { PendingOrders } from "@/components/pending-orders"
import { UpcomingDeliveries } from "@/components/upcoming-deliveries"

export default function ManufacturingDashboard() {
  return (
    <div className="space-y-6 p-6">
      <ManufacturingHeader />
      <ManufacturingStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductionOverview />
        <WorkstationStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PendingOrders />
        </div>
        <QualityMetrics />
      </div>

      <UpcomingDeliveries />
    </div>
  )
}
