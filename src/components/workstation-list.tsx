import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, PauseCircle, PlayCircle } from "lucide-react"

export function WorkstationList() {
  const workstations = [
    {
      id: "WS-001",
      name: "Cutting Station 1",
      operator: "Mohammed Ali",
      status: "Active",
      currentTask: "Wedding Kandura (ITEM-1234)",
      efficiency: "95%",
      nextAvailable: "2023-05-10",
    },
    {
      id: "WS-002",
      name: "Cutting Station 2",
      operator: "Ahmed Hassan",
      status: "Active",
      currentTask: "School Uniforms (ITEM-1235)",
      efficiency: "92%",
      nextAvailable: "2023-05-12",
    },
    {
      id: "WS-003",
      name: "Stitching Station 1",
      operator: "Fatima Zahra",
      status: "Maintenance",
      currentTask: "N/A",
      efficiency: "88%",
      nextAvailable: "2023-05-08",
    },
    {
      id: "WS-004",
      name: "Stitching Station 2",
      operator: "Aisha Mohammed",
      status: "Active",
      currentTask: "Corporate Uniforms (ITEM-1237)",
      efficiency: "97%",
      nextAvailable: "2023-05-15",
    },
    {
      id: "WS-005",
      name: "Embroidery Station 1",
      operator: "Omar Khalid",
      status: "Active",
      currentTask: "Designer Abaya (ITEM-1236)",
      efficiency: "94%",
      nextAvailable: "2023-05-09",
    },
    {
      id: "WS-006",
      name: "Quality Control Station",
      operator: "Layla Ahmed",
      status: "Active",
      currentTask: "Casual Kanduras (ITEM-1238)",
      efficiency: "98%",
      nextAvailable: "2023-05-11",
    },
    {
      id: "WS-007",
      name: "Packaging Station",
      operator: "Khalid Ibrahim",
      status: "Idle",
      currentTask: "N/A",
      efficiency: "90%",
      nextAvailable: "Available Now",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Idle":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Maintenance":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">ID</TableHead>
          <TableHead className="whitespace-nowrap">Workstation</TableHead>
          <TableHead className="whitespace-nowrap">Operator</TableHead>
          <TableHead className="whitespace-nowrap">Status</TableHead>
          <TableHead className="whitespace-nowrap">Current Task</TableHead>
          <TableHead className="whitespace-nowrap">Efficiency</TableHead>
          <TableHead className="whitespace-nowrap">Next Available</TableHead>
          <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workstations.map((station) => (
          <TableRow key={station.id}>
            <TableCell className="font-medium whitespace-nowrap">{station.id}</TableCell>
            <TableCell className="whitespace-nowrap">{station.name}</TableCell>
            <TableCell className="whitespace-nowrap">{station.operator}</TableCell>
            <TableCell className="whitespace-nowrap">
              <Badge className={getStatusColor(station.status)} variant="outline">
                {station.status}
              </Badge>
            </TableCell>
            <TableCell className="max-w-[200px] truncate">{station.currentTask}</TableCell>
            <TableCell className="whitespace-nowrap">{station.efficiency}</TableCell>
            <TableCell className="whitespace-nowrap">{station.nextAvailable}</TableCell>
            <TableCell className="text-right whitespace-nowrap">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                {station.status === "Active" ? (
                  <Button variant="outline" size="icon">
                    <PauseCircle className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" size="icon">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
