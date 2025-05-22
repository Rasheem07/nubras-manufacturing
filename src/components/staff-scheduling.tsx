"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function StaffScheduling() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedStaff, setSelectedStaff] = useState<string>("all")

  // Sample staff schedule data
  const staffSchedules = {
    "2023-04-15": [
      { id: 1, name: "Ali Hassan", shift: "Morning", workstation: "Cutting" },
      { id: 2, name: "Fatima Khan", shift: "Morning", workstation: "Sewing" },
      { id: 3, name: "Mohammed Al-Farsi", shift: "Afternoon", workstation: "Finishing" },
      { id: 4, name: "Sara Ahmed", shift: "Afternoon", workstation: "Quality Control" },
      { id: 5, name: "Yusuf Malik", shift: "Morning", workstation: "Embroidery" },
    ],
    "2023-04-16": [
      { id: 1, name: "Ali Hassan", shift: "Afternoon", workstation: "Cutting" },
      { id: 2, name: "Fatima Khan", shift: "Morning", workstation: "Sewing" },
      { id: 3, name: "Mohammed Al-Farsi", shift: "Morning", workstation: "Finishing" },
      { id: 4, name: "Sara Ahmed", shift: "Afternoon", workstation: "Quality Control" },
      { id: 5, name: "Yusuf Malik", shift: "Afternoon", workstation: "Embroidery" },
    ],
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const getScheduleForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return staffSchedules[dateStr as keyof typeof staffSchedules] || []
  }

  const filteredSchedule = date
    ? getScheduleForDate(date).filter((staff) => selectedStaff === "all" || staff.name === selectedStaff)
    : []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Scheduling</CardTitle>
        <CardDescription>Manage and view staff schedules by date and person</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="Ali Hassan">Ali Hassan</SelectItem>
                  <SelectItem value="Fatima Khan">Fatima Khan</SelectItem>
                  <SelectItem value="Mohammed Al-Farsi">Mohammed Al-Farsi</SelectItem>
                  <SelectItem value="Sara Ahmed">Sara Ahmed</SelectItem>
                  <SelectItem value="Yusuf Malik">Yusuf Malik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Schedule for {date?.toLocaleDateString()}</h3>
            {filteredSchedule.length > 0 ? (
              <ul className="space-y-3">
                {filteredSchedule.map((staff) => (
                  <li key={staff.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{staff.name}</span>
                      <Badge variant={staff.shift === "Morning" ? "default" : "secondary"}>{staff.shift} Shift</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Workstation: {staff.workstation}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center p-4 border rounded-md text-muted-foreground">
                No schedules found for this date
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
