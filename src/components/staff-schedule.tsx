"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const scheduleData = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Cutter",
    monday: { shift: "Morning", hours: "8:00 - 16:00" },
    tuesday: { shift: "Morning", hours: "8:00 - 16:00" },
    wednesday: { shift: "Morning", hours: "8:00 - 16:00" },
    thursday: { shift: "Morning", hours: "8:00 - 16:00" },
    friday: { shift: "Off", hours: "" },
    saturday: { shift: "Morning", hours: "8:00 - 16:00" },
    sunday: { shift: "Off", hours: "" },
  },
  {
    id: 2,
    name: "Fatima Saeed",
    role: "Tailor",
    monday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    tuesday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    wednesday: { shift: "Off", hours: "" },
    thursday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    friday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    saturday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    sunday: { shift: "Off", hours: "" },
  },
  {
    id: 3,
    name: "Mohammed Ali",
    role: "Embroiderer",
    monday: { shift: "Morning", hours: "8:00 - 16:00" },
    tuesday: { shift: "Morning", hours: "8:00 - 16:00" },
    wednesday: { shift: "Morning", hours: "8:00 - 16:00" },
    thursday: { shift: "Off", hours: "" },
    friday: { shift: "Off", hours: "" },
    saturday: { shift: "Morning", hours: "8:00 - 16:00" },
    sunday: { shift: "Morning", hours: "8:00 - 16:00" },
  },
  {
    id: 4,
    name: "Layla Mahmoud",
    role: "Quality Control",
    monday: { shift: "Morning", hours: "8:00 - 16:00" },
    tuesday: { shift: "Morning", hours: "8:00 - 16:00" },
    wednesday: { shift: "Morning", hours: "8:00 - 16:00" },
    thursday: { shift: "Morning", hours: "8:00 - 16:00" },
    friday: { shift: "Morning", hours: "8:00 - 16:00" },
    saturday: { shift: "Off", hours: "" },
    sunday: { shift: "Off", hours: "" },
  },
  {
    id: 5,
    name: "Omar Tariq",
    role: "Finisher",
    monday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    tuesday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    wednesday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    thursday: { shift: "Afternoon", hours: "16:00 - 00:00" },
    friday: { shift: "Off", hours: "" },
    saturday: { shift: "Off", hours: "" },
    sunday: { shift: "Afternoon", hours: "16:00 - 00:00" },
  },
]

export function StaffSchedule() {
  const getShiftBadge = (shift: string) => {
    switch (shift) {
      case "Morning":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Morning</Badge>
      case "Afternoon":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Afternoon</Badge>
      case "Night":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Night</Badge>
      case "Off":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Off</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{shift}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff</TableHead>
            <TableHead>Monday</TableHead>
            <TableHead>Tuesday</TableHead>
            <TableHead>Wednesday</TableHead>
            <TableHead>Thursday</TableHead>
            <TableHead>Friday</TableHead>
            <TableHead>Saturday</TableHead>
            <TableHead>Sunday</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-xs text-muted-foreground">{staff.role}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.monday.shift)}
                  {staff.monday.hours && <span className="text-xs">{staff.monday.hours}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.tuesday.shift)}
                  {staff.tuesday.hours && <span className="text-xs">{staff.tuesday.hours}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.wednesday.shift)}
                  {staff.wednesday.hours && <span className="text-xs">{staff.wednesday.hours}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.thursday.shift)}
                  {staff.thursday.hours && <span className="text-xs">{staff.thursday.hours}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.friday.shift)}
                  {staff.friday.hours && <span className="text-xs">{staff.friday.hours}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.saturday.shift)}
                  {staff.saturday.hours && <span className="text-xs">{staff.saturday.hours}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getShiftBadge(staff.sunday.shift)}
                  {staff.sunday.hours && <span className="text-xs">{staff.sunday.hours}</span>}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
