"use client"

import { useState } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Clock, CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Sample production events data
type ProductionEvent = {
  id: number
  title: string
  workstation: string
  status: string
  time: string
}

type ProductionEvents = {
  [date: string]: ProductionEvent[]
}

const productionEvents: ProductionEvents = {
  "2023-04-15": [
    { id: 1, title: "Kandura Batch #A123", workstation: "Cutting", status: "in-progress", time: "09:00" },
    { id: 2, title: "Abaya Order #B456", workstation: "Sewing", status: "scheduled", time: "14:30" },
  ],
  "2023-04-16": [
    { id: 3, title: "Embroidery Work #C789", workstation: "Embroidery", status: "scheduled", time: "10:15" },
  ],
  "2023-04-17": [
    { id: 4, title: "Quality Check Batch #A123", workstation: "QC", status: "scheduled", time: "11:00" },
    { id: 5, title: "Finishing Abaya #B456", workstation: "Finishing", status: "scheduled", time: "15:45" },
  ],
  "2023-04-20": [{ id: 6, title: "Kandura Batch #D234", workstation: "Cutting", status: "scheduled", time: "08:30" }],
  "2023-04-22": [
    { id: 7, title: "Embroidery Work #E567", workstation: "Embroidery", status: "scheduled", time: "13:00" },
    { id: 8, title: "Sewing Batch #D234", workstation: "Sewing", status: "scheduled", time: "16:15" },
  ],
}

// Add today's events
const today = new Date()
const todayStr = format(today, "yyyy-MM-dd")
if (!productionEvents[todayStr]) {
  productionEvents[todayStr] = [
    {
      id: 100,
      title: "Today's Production",
      workstation: "Cutting",
      status: "in-progress",
      time: "10:00",
    },
  ]
}

export function ProductionCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"day" | "month">("month")
  const [workstation, setWorkstation] = useState<string>("all")
  const [events, setEvents] = useState(productionEvents)

  // Add event modal state
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    workstation: "Cutting",
    status: "scheduled",
    time: "09:00",
  })

  // Navigation functions
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextDay = () => setSelectedDate(new Date(selectedDate.getTime() + 86400000))
  const prevDay = () => setSelectedDate(new Date(selectedDate.getTime() - 86400000))

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Format date to string for event lookup
  const formatDateKey = (date: Date) => format(date, "yyyy-MM-dd")

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return events[dateKey] || []
  }

  // Filter events by workstation
  const filteredEvents = getEventsForDate(selectedDate).filter(
    (event) => workstation === "all" || event.workstation === workstation,
  )

  // Check if a date has events
  const hasEvents = (date: Date) => {
    const dateKey = formatDateKey(date)
    return !!events[dateKey]
  }

  // Get events for a specific hour in day view
  const getEventsForHour = (hour: number) => {
    const dateEvents = getEventsForDate(selectedDate)
    return dateEvents
      .filter((event) => {
        const eventHour = Number.parseInt(event.time.split(":")[0])
        return eventHour === hour
      })
      .filter((event) => workstation === "all" || event.workstation === workstation)
  }

  // Handle adding a new event
  const handleAddEvent = () => {
    const dateKey = formatDateKey(selectedDate)
    const newId =
      Math.max(
        0,
        ...Object.values(events)
          .flat()
          .map((e) => e.id),
      ) + 1

    const updatedEvents = { ...events }

    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = []
    }

    updatedEvents[dateKey] = [
      ...updatedEvents[dateKey],
      {
        id: newId,
        ...newEvent,
      },
    ]

    setEvents(updatedEvents)
    setIsAddEventOpen(false)
    setNewEvent({
      title: "",
      workstation: "Cutting",
      status: "scheduled",
      time: "09:00",
    })

    toast.success(`${newEvent.title} has been scheduled for ${format(selectedDate, "MMM d, yyyy")} at ${newEvent.time}`)
  }

  // Style helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "delayed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return ""
    }
  }

  const getWorkstationColor = (workstation: string) => {
    switch (workstation) {
      case "Cutting":
        return "border-l-4 border-l-blue-500"
      case "Sewing":
        return "border-l-4 border-l-green-500"
      case "Embroidery":
        return "border-l-4 border-l-purple-500"
      case "QC":
        return "border-l-4 border-l-amber-500"
      case "Finishing":
        return "border-l-4 border-l-rose-500"
      default:
        return ""
    }
  }

  // Render day cells for month view
  const renderDays = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
    )
  }

  // Render calendar cells
  const renderCells = () => {
    const dateFormat = "d"
    const rows = []
    let days = []
    let day = monthStart
    let formattedDate = ""

    // Create blank cells for days not in current month
    const startDay = monthStart.getDay()
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border rounded-md bg-muted/20"></div>)
    }

    // Fill in the days of the month
    while (day <= monthEnd) {
      formattedDate = format(day, dateFormat)
      const cloneDay = new Date(day)
      const hasEventsToday = hasEvents(day)
      const isToday = isSameDay(day, new Date())
      const isSelected = isSameDay(day, selectedDate)

      days.push(
        <div
          key={day.toString()}
          className={`h-24 border rounded-md p-1 cursor-pointer transition-colors hover:bg-muted/20 ${
            isToday ? "border-primary border-2" : ""
          } ${isSelected ? "bg-muted/30" : ""}`}
          onClick={() => setSelectedDate(cloneDay)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{formattedDate}</span>
            {hasEventsToday && <span className="h-2 w-2 rounded-full bg-primary"></span>}
          </div>
          {hasEventsToday && (
            <div className="mt-1 overflow-hidden max-h-[calc(100%-20px)]">
              {getEventsForDate(cloneDay)
                .slice(0, 2)
                .map((event, idx) => (
                  <div
                    key={idx}
                    className="text-xs truncate mb-1 pl-1 border-l-2"
                    style={{
                      borderLeftColor:
                        event.workstation === "Cutting"
                          ? "#3b82f6"
                          : event.workstation === "Sewing"
                            ? "#22c55e"
                            : event.workstation === "Embroidery"
                              ? "#a855f7"
                              : event.workstation === "QC"
                                ? "#f59e0b"
                                : "#f43f5e",
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              {getEventsForDate(cloneDay).length > 2 && (
                <div className="text-xs text-muted-foreground">+{getEventsForDate(cloneDay).length - 2} more</div>
              )}
            </div>
          )}
        </div>,
      )

      // Start a new row when we reach the end of a week
      if ((startDay + Number.parseInt(formattedDate)) % 7 === 0) {
        rows.push(
          <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
            {days}
          </div>,
        )
        days = []
      }

      day = new Date(day.getTime() + 86400000)
    }

    // Add any remaining days
    if (days.length > 0) {
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>,
      )
    }

    return <div className="flex flex-col">{rows}</div>
  }

  // Render day view
  const renderDayView = () => {
    return (
      <div className="border rounded-md p-4 flex-grow overflow-y-auto max-h-[600px]">
        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
            const hourEvents = getEventsForHour(hour)
            return (
              <div key={hour} className="flex items-start border-t pt-2">
                <div className="w-16 text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {hour}:00
                </div>
                <div className="flex-1 min-h-[80px] pl-2">
                  {hourEvents.length > 0 ? (
                    <div className="space-y-2">
                      {hourEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`p-2 rounded-md border ${getWorkstationColor(event.workstation)}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{event.title}</span>
                            <Badge variant="outline" className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {event.time} • {event.workstation}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Production Calendar</CardTitle>
              <CardDescription>Schedule and view production activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                Month
              </Button>
              <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                Day
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col">
              {view === "month" ? (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-grow">
                    {renderDays()}
                    {renderCells()}
                  </div>

                  {/* Event indicators for month view */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                      <span className="text-xs">Cutting</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs">Sewing</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                      <span className="text-xs">Embroidery</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                      <span className="text-xs">QC</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-rose-500 mr-1"></div>
                      <span className="text-xs">Finishing</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <Button variant="outline" size="icon" onClick={prevDay}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
                    <Button variant="outline" size="icon" onClick={nextDay}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  {renderDayView()}
                </div>
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="mb-4">
                <Select value={workstation} onValueChange={setWorkstation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by workstation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Workstations</SelectItem>
                    <SelectItem value="Cutting">Cutting</SelectItem>
                    <SelectItem value="Sewing">Sewing</SelectItem>
                    <SelectItem value="Embroidery">Embroidery</SelectItem>
                    <SelectItem value="QC">Quality Control</SelectItem>
                    <SelectItem value="Finishing">Finishing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Events for {format(selectedDate, "MMM d, yyyy")}</h3>
              </div>
              {filteredEvents.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className={`p-3 border rounded-md ${getWorkstationColor(event.workstation)}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{event.title}</span>
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                        <div>Workstation: {event.workstation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 border rounded-md text-muted-foreground flex flex-col items-center">
                  <CalendarIcon className="h-8 w-8 mb-2 text-muted-foreground/60" />
                  <p>No events scheduled for this date</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Select a different date or add a new event</p>
                </div>
              )}
              <Button className="w-full mt-4" onClick={() => setIsAddEventOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Production Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Production Event</DialogTitle>
            <DialogDescription>
              Create a new production event for {format(selectedDate, "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workstation">Workstation</Label>
              <Select
                value={newEvent.workstation}
                onValueChange={(value) => setNewEvent({ ...newEvent, workstation: value })}
              >
                <SelectTrigger id="workstation">
                  <SelectValue placeholder="Select workstation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cutting">Cutting</SelectItem>
                  <SelectItem value="Sewing">Sewing</SelectItem>
                  <SelectItem value="Embroidery">Embroidery</SelectItem>
                  <SelectItem value="QC">Quality Control</SelectItem>
                  <SelectItem value="Finishing">Finishing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newEvent.status} onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent} disabled={!newEvent.title}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
