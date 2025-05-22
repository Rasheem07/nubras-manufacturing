"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ClipboardList,
  Factory,
  FileText,
  Home,
  Layers,
  Package,
  Settings,
  Truck,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ManufacturingSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <Factory className="h-6 w-6" />
        <span className="text-lg font-semibold">Manufacturing</span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/manufacturing"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/manufacturing" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/manufacturing/orders"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/orders") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <ClipboardList className="h-4 w-4" />
            <span>Production Orders</span>
          </Link>

          <Link
            href="/manufacturing/workstations"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/workstations") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Factory className="h-4 w-4" />
            <span>Workstations</span>
          </Link>

          <Link
            href="/manufacturing/tracking"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/tracking") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Layers className="h-4 w-4" />
            <span>Production Tracking</span>
          </Link>

          <Link
            href="/manufacturing/quality-control"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/quality-control")
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <CheckSquare className="h-4 w-4" />
            <span>Quality Control</span>
          </Link>

          <Link
            href="/manufacturing/finishing"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/finishing") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Package className="h-4 w-4" />
            <span>Finishing & Delivery</span>
          </Link>

          <Link
            href="/manufacturing/scheduling"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/scheduling") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Calendar className="h-4 w-4" />
            <span>Scheduling</span>
          </Link>

          <Link
            href="/manufacturing/reports"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/reports") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </Link>

          <Link
            href="/manufacturing/staff"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/staff") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Users className="h-4 w-4" />
            <span>Staff Management</span>
          </Link>

          <Link
            href="/manufacturing/logistics"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/logistics") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Truck className="h-4 w-4" />
            <span>Logistics</span>
          </Link>

          <Link
            href="/manufacturing/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith("/manufacturing/settings") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
