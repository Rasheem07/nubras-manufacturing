import type { Metadata } from "next"
import { ProductionCalendar } from "@/components/production-calendar"
import { ProductionTimeline } from "@/components/production-timeline"
import { ResourceAllocation } from "@/components/resource-allocation"

export const metadata: Metadata = {
  title: "Manufacturing Scheduling",
  description: "Schedule and manage production activities",
}

export default function ManufacturingSchedulingPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Production Scheduling</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="min-h-[700px] w-full">
          <ProductionCalendar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResourceAllocation />
          <ProductionTimeline />
        </div>
      </div>
    </div>
  )
}
