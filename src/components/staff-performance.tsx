"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const staffPerformanceData = [
  {
    name: "Ali Hassan",
    efficiency: 92,
    quality: 95,
    attendance: 98,
  },
  {
    name: "Fatima Khan",
    efficiency: 88,
    quality: 97,
    attendance: 100,
  },
  {
    name: "Mohammed Al-Farsi",
    efficiency: 95,
    quality: 90,
    attendance: 92,
  },
  {
    name: "Sara Ahmed",
    efficiency: 85,
    quality: 88,
    attendance: 95,
  },
  {
    name: "Yusuf Malik",
    efficiency: 90,
    quality: 93,
    attendance: 97,
  },
]

export function StaffPerformance() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Staff Performance</h3>
          <p className="text-sm text-muted-foreground">Efficiency, quality, and attendance metrics</p>
        </div>
      </div>
      <ChartContainer
        config={{
          efficiency: {
            label: "Efficiency",
            color: "hsl(var(--chart-1))",
          },
          quality: {
            label: "Quality",
            color: "hsl(var(--chart-2))",
          },
          attendance: {
            label: "Attendance",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="aspect-[4/3]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={staffPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="efficiency" fill="var(--color-efficiency)" name="Efficiency" />
            <Bar dataKey="quality" fill="var(--color-quality)" name="Quality" />
            <Bar dataKey="attendance" fill="var(--color-attendance)" name="Attendance" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="rounded-md bg-muted p-2 text-center">
          <div className="text-2xl font-bold">92%</div>
          <div className="text-xs text-muted-foreground">Avg. Efficiency</div>
        </div>
        <div className="rounded-md bg-muted p-2 text-center">
          <div className="text-2xl font-bold">94%</div>
          <div className="text-xs text-muted-foreground">Avg. Quality</div>
        </div>
        <div className="rounded-md bg-muted p-2 text-center">
          <div className="text-2xl font-bold">96%</div>
          <div className="text-xs text-muted-foreground">Avg. Attendance</div>
        </div>
      </div>
    </div>
  )
}
