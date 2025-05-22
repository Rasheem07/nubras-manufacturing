import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Eye } from "lucide-react"
import Link from "next/link"

export function QualityControlItems() {
  const items = [
    {
      id: "ITEM-1238",
      orderId: "ORD-1238",
      description: "Casual Kanduras (Batch 1)",
      client: "Dubai Mall Boutique",
      arrivalTime: "2023-05-10T09:30:00",
      priority: "Standard",
      garmentType: "Kandura",
    },
    {
      id: "ITEM-1236",
      orderId: "ORD-1236",
      description: "Designer Abaya",
      client: "Sheikha Fatima",
      arrivalTime: "2023-05-10T10:15:00",
      priority: "VIP",
      garmentType: "Abaya",
    },
    {
      id: "ITEM-1237",
      orderId: "ORD-1237",
      description: "Corporate Uniforms (Batch 1)",
      client: "Etihad Airways",
      arrivalTime: "2023-05-10T11:00:00",
      priority: "Standard",
      garmentType: "Corporate Uniform",
    },
    {
      id: "ITEM-1239",
      orderId: "ORD-1235",
      description: "School Uniforms (Batch 2)",
      client: "Emirates International School",
      arrivalTime: "2023-05-10T13:45:00",
      priority: "Bulk",
      garmentType: "School Uniform",
    },
    {
      id: "ITEM-1234",
      orderId: "ORD-1234",
      description: "Wedding Kandura",
      client: "Ahmed Al Nahyan",
      arrivalTime: "2023-05-10T14:30:00",
      priority: "Rush",
      garmentType: "Kandura",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Rush":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "VIP":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Standard":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Bulk":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Garment Type</TableHead>
          <TableHead>Arrival Time</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.client}</TableCell>
            <TableCell>{item.garmentType}</TableCell>
            <TableCell>{new Date(item.arrivalTime).toLocaleTimeString()}</TableCell>
            <TableCell>
              <Badge className={getPriorityColor(item.priority)} variant="outline">
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/manufacturing/quality-control/inspect/${item.id}`}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Inspect
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/manufacturing/orders/${item.orderId}`}>
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
