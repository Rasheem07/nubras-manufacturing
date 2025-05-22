"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { DatePickerWithRange } from "@/components/ui/date-picker"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Sample data for material consumption
const materialConsumptionData = [
  { name: "Cotton Fabric", planned: 450, actual: 475 },
  { name: "Silk", planned: 200, actual: 185 },
  { name: "Polyester", planned: 300, actual: 310 },
  { name: "Linen", planned: 150, actual: 145 },
  { name: "Wool", planned: 100, actual: 90 },
  { name: "Buttons", planned: 1000, actual: 980 },
  { name: "Zippers", planned: 500, actual: 510 },
  { name: "Thread", planned: 2000, actual: 2100 },
]

export function MaterialConsumptionReport() {
  // Import DateRange type from your date-picker component or define it here
  type DateRange = { from: Date | undefined; to?: Date | undefined };

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })

  const [materialType, setMaterialType] = useState("all")

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Material Consumption Report</CardTitle>
            <CardDescription>Comparison of planned vs actual material usage</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <DatePickerWithRange
              date={dateRange}
              setDate={(date) => {
                if (date) setDateRange(date)
              }}
              className="w-full sm:w-auto"
            />
            <Select value={materialType} onValueChange={setMaterialType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Material Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                <SelectItem value="fabric">Fabrics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="thread">Thread & Yarn</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            planned: {
              label: "Planned Usage",
              color: "hsl(var(--chart-1))",
            },
            actual: {
              label: "Actual Usage",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={materialConsumptionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="planned" fill="var(--color-planned)" name="Planned Usage" />
              <Bar dataKey="actual" fill="var(--color-actual)" name="Actual Usage" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Planned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,700 units</div>
              <p className="text-xs text-muted-foreground">Across all materials</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,795 units</div>
              <p className="text-xs text-muted-foreground">Across all materials</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">+95 units</div>
              <p className="text-xs text-muted-foreground">2.02% over planned</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cost Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">+$1,425</div>
              <p className="text-xs text-muted-foreground">Additional material cost</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
