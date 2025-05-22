"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Pencil,
  Trash,
  UserCog,
  Filter,
  Download,
  Plus,
  Search,
  Calendar,
  ClipboardList,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Sample staff data
const staffData = [
  {
    id: "EMP-001",
    name: "Ahmed Khan",
    role: "Cutter",
    department: "Cutting",
    shift: "Morning",
    experience: "5 years",
    skills: ["Cutting", "Pattern Making"],
    status: "active",
  },
  {
    id: "EMP-002",
    name: "Fatima Saeed",
    role: "Cutter",
    department: "Cutting",
    shift: "Morning",
    experience: "3 years",
    skills: ["Cutting", "Measurement"],
    status: "active",
  },
  {
    id: "EMP-003",
    name: "Mohammed Ali",
    role: "Cutter",
    department: "Cutting",
    shift: "Afternoon",
    experience: "7 years",
    skills: ["Cutting", "Pattern Making", "Design"],
    status: "active",
  },
  {
    id: "EMP-004",
    name: "Layla Mahmoud",
    role: "Tailor",
    department: "Sewing",
    shift: "Morning",
    experience: "10 years",
    skills: ["Sewing", "Embroidery"],
    status: "active",
  },
  {
    id: "EMP-005",
    name: "Omar Tariq",
    role: "Tailor",
    department: "Sewing",
    shift: "Morning",
    experience: "6 years",
    skills: ["Sewing", "Finishing"],
    status: "active",
  },
  {
    id: "EMP-006",
    name: "Zainab Qasim",
    role: "Tailor",
    department: "Sewing",
    shift: "Afternoon",
    experience: "8 years",
    skills: ["Sewing", "Quality Control"],
    status: "active",
  },
  {
    id: "EMP-007",
    name: "Khalid Rahman",
    role: "Tailor",
    department: "Sewing",
    shift: "Afternoon",
    experience: "4 years",
    skills: ["Sewing", "Alterations"],
    status: "on-leave",
  },
  {
    id: "EMP-008",
    name: "Aisha Bashir",
    role: "Tailor",
    department: "Sewing",
    shift: "Evening",
    experience: "2 years",
    skills: ["Sewing", "Embroidery"],
    status: "active",
  },
  {
    id: "EMP-009",
    name: "Noor Hassan",
    role: "Finisher",
    department: "Finishing",
    shift: "Morning",
    experience: "5 years",
    skills: ["Finishing", "Ironing", "Packaging"],
    status: "active",
  },
  {
    id: "EMP-010",
    name: "Yusuf Dawood",
    role: "Finisher",
    department: "Finishing",
    shift: "Afternoon",
    experience: "3 years",
    skills: ["Finishing", "Quality Control"],
    status: "inactive",
  },
]

export function StaffDirectory() {
  const [staff, setStaff] = useState(staffData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterShift, setFilterShift] = useState("all")

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "on-leave":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "inactive":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Get unique departments for filter
  const departments = ["all", ...new Set(staffData.map((member) => member.department))]

  // Get unique shifts for filter
  const shifts = ["all", ...new Set(staffData.map((member) => member.shift))]

  // Get unique statuses for filter
  const statuses = ["all", ...new Set(staffData.map((member) => member.status))]

  // Filter staff based on search and filters
  const filteredStaff = staff.filter((member) => {
    // Search term filter
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Department filter
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment

    // Status filter
    const matchesStatus = filterStatus === "all" || member.status === filterStatus

    // Shift filter
    const matchesShift = filterShift === "all" || member.shift === filterShift

    return matchesSearch && matchesDepartment && matchesStatus && matchesShift
  })

  // Function to handle staff deletion
  const handleDelete = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterShift} onValueChange={setFilterShift}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              {shifts.map((shift) => (
                <SelectItem key={shift} value={shift}>
                  {shift === "all" ? "All Shifts" : shift}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status === "on-leave"
                      ? "On Leave"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{staff.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCog className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                <p className="text-2xl font-bold">{staff.filter((m) => m.status === "active").length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">{staff.filter((m) => m.status === "on-leave").length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.shift}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="whitespace-nowrap">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{member.experience}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status === "on-leave"
                        ? "On Leave"
                        : member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Manage Skills
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ClipboardList className="mr-2 h-4 w-4" />
                          View Performance
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(member.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No staff members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredStaff.length}</strong> of <strong>{staff.length}</strong> staff members
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled={filteredStaff.length === 0}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={filteredStaff.length === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
