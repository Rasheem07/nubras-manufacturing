import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, RotateCcw } from "lucide-react"
import Link from "next/link"

export function QualityControlDefects() {
  const defects = [
    {
      id: "DEF-1001",
      itemId: "ITEM-1234",
      orderId: "ORD-1234",
      description: "Uneven hem on right side",
      garmentType: "Kandura",
      severity: "Minor",
      status: "Pending Rework",
      reportedBy: "Layla Ahmed",
      reportedDate: "2023-05-09",
      assignedTo: "Fatima Hassan",
    },
    {
      id: "DEF-1002",
      itemId: "ITEM-1236",
      orderId: "ORD-1236",
      description: "Loose button on front",
      garmentType: "Abaya",
      severity: "Minor",
      status: "Pending Rework",
      reportedBy: "Layla Ahmed",
      reportedDate: "2023-05-09",
      assignedTo: "Mohammed Khalid",
    },
    {
      id: "DEF-1003",
      itemId: "ITEM-1237",
      orderId: "ORD-1237",
      description: "Fabric tear near collar",
      garmentType: "Corporate Uniform",
      severity: "Major",
      status: "Pending Rework",
      reportedBy: "Layla Ahmed",
      reportedDate: "2023-05-08",
      assignedTo: "Ahmed Ali",
    },
    {
      id: "DEF-1004",
      itemId: "ITEM-1235",
      orderId: "ORD-1235",
      description: "Stitch defect on sleeve",
      garmentType: "School Uniform",
      severity: "Minor",
      status: "Reworked",
      reportedBy: "Omar Saeed",
      reportedDate: "2023-05-07",
      assignedTo: "Fatima Hassan",
    },
    {
      id: "DEF-1005",
      itemId: "ITEM-1238",
      orderId: "ORD-1238",
      description: "Color variation on fabric",
      garmentType: "Kandura",
      severity: "Major",
      status: "Rejected",
      reportedBy: "Layla Ahmed",
      reportedDate: "2023-05-06",
      assignedTo: "Unassigned",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Minor":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Major":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Rework":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Reworked":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Defect ID</TableHead>
          <TableHead>Item ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Garment Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Reported Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {defects.map((defect) => (
          <TableRow key={defect.id}>
            <TableCell className="font-medium">{defect.id}</TableCell>
            <TableCell>{defect.itemId}</TableCell>
            <TableCell>{defect.description}</TableCell>
            <TableCell>{defect.garmentType}</TableCell>
            <TableCell>
              <Badge className={getSeverityColor(defect.severity)} variant="outline">
                {defect.severity}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(defect.status)} variant="outline">
                {defect.status}
              </Badge>
            </TableCell>
            <TableCell>{defect.assignedTo}</TableCell>
            <TableCell>{new Date(defect.reportedDate).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" disabled={defect.status !== "Pending Rework"}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Rework
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/manufacturing/quality-control/defects/${defect.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
