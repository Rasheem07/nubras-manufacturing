"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, X } from "lucide-react"
import type { DateRange } from "react-day-picker"

export function ReportSelector() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 30)),
  })
  const [reportType, setReportType] = useState("all")
  const [department, setDepartment] = useState("all")
  const [filters, setFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="production">Production Reports</SelectItem>
                <SelectItem value="quality">Quality Control Reports</SelectItem>
                <SelectItem value="efficiency">Efficiency Reports</SelectItem>
                <SelectItem value="staff">Staff Performance Reports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Department</label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cutting">Cutting</SelectItem>
                <SelectItem value="sewing">Sewing</SelectItem>
                <SelectItem value="embroidery">Embroidery</SelectItem>
                <SelectItem value="quality">Quality Control</SelectItem>
                <SelectItem value="finishing">Finishing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium mb-1 block">Additional Filters</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Add filters</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <div className="p-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => addFilter("High Priority")}>
                  High Priority
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => addFilter("Low Stock")}>
                  Low Stock
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => addFilter("Quality Issues")}>
                  Quality Issues
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => addFilter("Efficiency Below Target")}
                >
                  Efficiency Below Target
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.map((filter) => (
              <Badge key={filter} variant="secondary" className="px-2 py-1">
                {filter}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters([])}>
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
