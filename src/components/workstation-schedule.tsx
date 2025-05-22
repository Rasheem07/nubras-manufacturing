"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WorkstationSchedule() {
  // Mock data for workstations and tasks
  const workstations = [
    { id: "WS-001", name: "Cutting Station 1", type: "Cutting" },
    { id: "WS-002", name: "Stitching Station 1", type: "Stitching" },
    { id: "WS-003", name: "Stitching Station 2", type: "Stitching" },
    { id: "WS-004", name: "Embroidery Station 1", type: "Embroidery" },
    { id: "WS-005", name: "QC Station 1", type: "Quality Control" },
    { id: "WS-006", name: "Finishing Station 1", type: "Finishing" },
  ]

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 8 // Starting from 8 AM
    return `${hour}:00 ${hour < 12 ? "AM" : "PM"}`
  })

  // Prayer times
  const prayerTimes = [
    { name: "Dhuhr", time: "12:30 PM" },
    { name: "Asr", time: "3:45 PM" },
  ]

  // Task and schedule types
  type Task = {
    id: string
    orderId: string
    time: string
    duration: number
    description: string
  }

  type ScheduledTasks = {
    [workstationId: string]: Task[]
  }

  // Tasks scheduled for each workstation
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTasks>({
    "WS-001": [
      { id: "T1", orderId: "ORD-1234", time: "8:00 AM", duration: 2, description: "Cut Wedding Kandura Fabric" },
      { id: "T2", orderId: "ORD-1235", time: "11:00 AM", duration: 3, description: "Cut School Uniform Fabric" },
    ],
    "WS-002": [
      { id: "T3", orderId: "ORD-1234", time: "10:00 AM", duration: 3, description: "Stitch Wedding Kandura" },
      { id: "T4", orderId: "ORD-1237", time: "2:00 PM", duration: 2, description: "Stitch Corporate Uniforms" },
    ],
    "WS-003": [{ id: "T5", orderId: "ORD-1235", time: "9:00 AM", duration: 4, description: "Stitch School Uniforms" }],
    "WS-004": [
      { id: "T6", orderId: "ORD-1236", time: "8:00 AM", duration: 4, description: "Embroider Designer Abaya" },
    ],
    "WS-005": [{ id: "T7", orderId: "ORD-1238", time: "1:00 PM", duration: 2, description: "QC Casual Kanduras" }],
    "WS-006": [{ id: "T8", orderId: "ORD-1238", time: "3:00 PM", duration: 2, description: "Finish Casual Kanduras" }],
  })

  // Function to get task for a specific workstation and time slot
  const getTask = (workstationId: string, timeSlot: string) => {
    const tasks = scheduledTasks[workstationId] || []
    return tasks.find((task) => task.time === timeSlot)
  }

  // Function to check if a time slot is a prayer time
  const isPrayerTime = (timeSlot: string) => {
    return prayerTimes.some((prayer) => prayer.time === timeSlot)
  }

  // Function to get prayer name for a time slot
  const getPrayerName = (timeSlot: string) => {
    const prayer = prayerTimes.find((prayer) => prayer.time === timeSlot)
    return prayer ? prayer.name : ""
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Time slots header */}
        <div className="grid grid-cols-[150px_repeat(9,1fr)] gap-1 mb-2">
          <div className="font-medium">Workstation</div>
          {timeSlots.map((slot) => (
            <div
              key={slot}
              className={`text-center text-sm font-medium p-1 ${isPrayerTime(slot) ? "bg-amber-100 rounded" : ""}`}
            >
              {slot}
              {isPrayerTime(slot) && <div className="text-xs text-amber-600">{getPrayerName(slot)}</div>}
            </div>
          ))}
        </div>

        {/* Workstation rows */}
        {workstations.map((station) => (
          <div key={station.id} className="grid grid-cols-[150px_repeat(9,1fr)] gap-1 mb-1">
            <div className="bg-muted p-2 rounded flex flex-col">
              <span className="font-medium">{station.name}</span>
              <Badge variant="outline" className="mt-1 w-fit">
                {station.type}
              </Badge>
            </div>

            {timeSlots.map((slot) => {
              const task = getTask(station.id, slot)
              const isPrayer = isPrayerTime(slot)

              return (
                <div
                  key={`${station.id}-${slot}`}
                  className={`border rounded p-1 min-h-[60px] ${isPrayer ? "bg-amber-50" : ""}`}
                >
                  {task && (
                    <Card className="h-full bg-blue-50 border-blue-200">
                      <CardContent className="p-2 text-xs">
                        <div className="font-medium">{task.orderId}</div>
                        <div className="text-muted-foreground">{task.description}</div>
                      </CardContent>
                    </Card>
                  )}
                  {isPrayer && !task && (
                    <div className="h-full flex items-center justify-center text-xs text-amber-600">Prayer Break</div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Drag and drop tasks to reschedule. Prayer times are automatically blocked for breaks.</p>
      </div>
    </div>
  )
}
