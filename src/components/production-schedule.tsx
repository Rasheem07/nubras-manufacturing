"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, GanttChartIcon, ListIcon } from "lucide-react"

// Sample production schedule data
const scheduleData = [
  {
    id: "PO-1234",
    product: "Premium Kandura",
    client: "Al Futtaim Group",
    quantity: 25,
    startDate: "2023-06-15",
    dueDate: "2023-06-30",
    status: "in-progress",
    priority: "high",
    workstation: "Cutting Station",
    assignee: "Fatima H.",
  },
  {
    id: "PO-1235",
    product: "School Uniforms",
    client: "Emirates International School",
    quantity: 100,
    startDate: "2023-06-18",
    dueDate: "2023-07-10",
    status: "scheduled",
    priority: "medium",
    workstation: "Cutting Station",
    assignee: "Ahmed K.",
  },
  {
    id: "PO-1236",
    product: "Corporate Uniforms",
    client: "Etihad Airways",
    quantity: 50,
    startDate: "2023-06-20",
    dueDate: "2023-07-05",
    status: "scheduled",
    priority: "medium",
    workstation: "Sewing Station",
    assignee: "Layla M.",
  },
  {
    id: "PO-1237",
    product: "Designer Abayas",
    client: "Dubai Mall Boutique",
    quantity: 15,
    startDate: "2023-06-16",
    dueDate: "2023-06-25",
    status: "in-progress",
    priority: "high",
    workstation: "Embroidery Station",
    assignee: "Mohammed A.",
  },
  {
    id: "PO-1238",
    product: "Custom Kanduras",
    client: "Sheikha Fatima",
    quantity: 5,
    startDate: "2023-06-22",
    dueDate: "2023-06-29",
    status: "scheduled",
    priority: "urgent",
    workstation: "Cutting Station",
    assignee: "Pending",
  },
]

// Sample workstations
const workstations = [
  { id: "WS1", name: "Cutting Station" },
  { id: "WS2", name: "Sewing Station" },
  { id: "WS3", name: "Embroidery Station" },
  { id: "WS4", name: "Finishing Station" },
  { id: "WS5", name: "Quality Control" },
]

export function ProductionSchedule() {
  const [view, setView] = useState<"list" | "calendar" | "gantt">("list")
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 5, 15), // June 15, 2023
    to: new Date(2023, 6, 15), // July 15, 2023
  })
  const [selectedWorkstation, setSelectedWorkstation] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2023, 5, 1)) // June 2023

  const filteredSchedule = scheduleData.filter((item) => {
    if (selectedWorkstation !== "all" && item.workstation !== selectedWorkstation) return false
    if (selectedStatus !== "all" && item.status !== selectedStatus) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Completed
          </Badge>
        )
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return (
          <Badge variant="destructive" className="bg-orange-500">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Function to format date as YYYY-MM-DD
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Function to calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Function to get calendar day class based on scheduled items
  const getDayClass = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    const hasItems = scheduleData.some((item) => {
      const start = new Date(item.startDate).toISOString().split("T")[0]
      const due = new Date(item.dueDate).toISOString().split("T")[0]
      return dateString >= start && dateString <= due
    })

    if (hasItems) {
      return "bg-blue-100 hover:bg-blue-200"
    }
    return ""
  }

  // Function to get items for a specific date
  const getItemsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return scheduleData.filter((item) => {
      const start = new Date(item.startDate).toISOString().split("T")[0]
      const due = new Date(item.dueDate).toISOString().split("T")[0]
      return dateString >= start && dateString <= due
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Production Schedule</h2>

        <div className="flex items-center space-x-2">
          <TabsList>
            <TabsTrigger
              value="list"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-primary text-primary-foreground" : ""}
            >
              <ListIcon className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              onClick={() => setView("calendar")}
              className={view === "calendar" ? "bg-primary text-primary-foreground" : ""}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="gantt"
              onClick={() => setView("gantt")}
              className={view === "gantt" ? "bg-primary text-primary-foreground" : ""}
            >
              <GanttChartIcon className="h-4 w-4 mr-2" />
              Gantt
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Select value={selectedWorkstation} onValueChange={setSelectedWorkstation}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by workstation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workstations</SelectItem>
              {workstations.map((station) => (
                <SelectItem key={station.id} value={station.name}>
                  {station.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Button variant="outline" className="w-full">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {view === "list" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Production Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead className="hidden md:table-cell">Start Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Workstation</TableHead>
                  <TableHead className="hidden lg:table-cell">Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.quantity}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(item.startDate)}</TableCell>
                    <TableCell>
                      {formatDate(item.dueDate)}
                      {getDaysRemaining(item.dueDate) <= 3 && getDaysRemaining(item.dueDate) > 0 && (
                        <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                          {getDaysRemaining(item.dueDate)} days left
                        </Badge>
                      )}
                      {getDaysRemaining(item.dueDate) <= 0 && (
                        <Badge variant="destructive" className="ml-2">
                          Overdue
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{item.workstation}</TableCell>
                    <TableCell className="hidden lg:table-cell">{item.assignee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {view === "calendar" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Production Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2">
                <Calendar
                  mode="single"
                  selected={new Date()}
                  onSelect={(date) => date && setCurrentMonth(date)}
                  className="rounded-md border"
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  modifiers={{
                    busy: (date) => getItemsForDate(date).length > 0,
                  }}
                  modifiersClassNames={{
                    busy: "bg-blue-100 hover:bg-blue-200 font-bold",
                  }}
                />
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-lg font-semibold mb-4">
                  Schedule for {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="space-y-4">
                  {Array.from(
                    { length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() },
                    (_, i) => i + 1,
                  )
                    .map((day) => {
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                      const items = getItemsForDate(date)
                      if (items.length === 0) return null

                      return (
                        <div key={day} className="border rounded-md p-3">
                          <h4 className="font-medium">
                            {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </h4>
                          <div className="mt-2 space-y-2">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded"
                              >
                                <div>
                                  <span className="font-medium">{item.product}</span>
                                  <span className="text-gray-500 ml-2">({item.id})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(item.status)}
                                  {getPriorityBadge(item.priority)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })
                    .filter(Boolean)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {view === "gantt" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Production Gantt Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="flex border-b pb-2">
                  <div className="w-1/4 font-medium">Order</div>
                  <div className="w-3/4 flex">
                    {Array.from({ length: 30 }, (_, i) => {
                      const date = new Date(2023, 5, i + 1)
                      return (
                        <div key={i} className="flex-1 text-center text-xs">
                          {i + 1}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {filteredSchedule.map((item) => {
                  const startDay = new Date(item.startDate).getDate()
                  const endDay = new Date(item.dueDate).getDate()
                  const duration = endDay - startDay + 1
                  const startOffset = startDay - 1

                  return (
                    <div key={item.id} className="flex py-2 border-b">
                      <div className="w-1/4 pr-4">
                        <div className="font-medium">{item.product}</div>
                        <div className="text-sm text-gray-500">
                          {item.id} • {item.workstation}
                        </div>
                      </div>
                      <div className="w-3/4 flex items-center">
                        <div className="flex-1 flex">
                          <div
                            style={{ marginLeft: `${(startOffset / 30) * 100}%`, width: `${(duration / 30) * 100}%` }}
                            className={`h-6 rounded-md flex items-center justify-center text-xs text-white font-medium ${
                              item.priority === "urgent"
                                ? "bg-red-500"
                                : item.priority === "high"
                                  ? "bg-orange-500"
                                  : item.priority === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                          >
                            {item.product}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
