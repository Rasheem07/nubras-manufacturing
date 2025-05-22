import { Button } from "@/components/ui/button"
import { Calendar, Download, Plus, RefreshCw } from "lucide-react"
import Link from "next/link"

export function ManufacturingHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manufacturing Dashboard</h1>
        <p className="text-muted-foreground">Overview of production activities, workstations, and pending orders</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Today</span>
        </Button>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Refresh</span>
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          <span>Export</span>
        </Button>
        <Button size="sm" asChild>
          <Link href="/manufacturing/orders/create">
            <Plus className="mr-2 h-4 w-4" />
            <span>New Order</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
