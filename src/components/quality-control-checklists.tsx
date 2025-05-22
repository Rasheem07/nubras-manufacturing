import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Edit, Eye, Trash } from "lucide-react"
import Link from "next/link"

export function QualityControlChecklists() {
  const checklists = [
    {
      id: "CL-001",
      name: "Kandura Quality Checklist",
      garmentType: "Kandura",
      itemCount: 12,
      lastUpdated: "2023-04-15",
      status: "Active",
    },
    {
      id: "CL-002",
      name: "Abaya Quality Checklist",
      garmentType: "Abaya",
      itemCount: 10,
      lastUpdated: "2023-04-20",
      status: "Active",
    },
    {
      id: "CL-003",
      name: "School Uniform Quality Checklist",
      garmentType: "School Uniform",
      itemCount: 8,
      lastUpdated: "2023-04-25",
      status: "Active",
    },
    {
      id: "CL-004",
      name: "Corporate Uniform Quality Checklist",
      garmentType: "Corporate Uniform",
      itemCount: 9,
      lastUpdated: "2023-04-30",
      status: "Active",
    },
    {
      id: "CL-005",
      name: "Wedding Kandura Premium Checklist",
      garmentType: "Kandura",
      itemCount: 15,
      lastUpdated: "2023-05-05",
      status: "Draft",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Draft":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Checklist ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Garment Type</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {checklists.map((checklist) => (
          <TableRow key={checklist.id}>
            <TableCell className="font-medium">{checklist.id}</TableCell>
            <TableCell>{checklist.name}</TableCell>
            <TableCell>{checklist.garmentType}</TableCell>
            <TableCell>{checklist.itemCount}</TableCell>
            <TableCell>{new Date(checklist.lastUpdated).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(checklist.status)} variant="outline">
                {checklist.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/manufacturing/quality-control/checklists/${checklist.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/manufacturing/quality-control/checklists/${checklist.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
