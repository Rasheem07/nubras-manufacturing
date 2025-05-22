import type { Metadata } from "next"
import { LogisticsOverview } from "@/components/logistics-overview"
import { ShippingManagement } from "@/components/shipping-management"
import { MaterialsTracking } from "@/components/materials-tracking"

export const metadata: Metadata = {
  title: "Manufacturing Logistics",
  description: "Manage manufacturing logistics, shipping, and materials tracking",
}

export default function LogisticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Manufacturing Logistics</h1>
      <div className="grid grid-cols-1 gap-6">
        <LogisticsOverview />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaterialsTracking />
          <ShippingManagement />
        </div>
      </div>
    </div>
  )
}
