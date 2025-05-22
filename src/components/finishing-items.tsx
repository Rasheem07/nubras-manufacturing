import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Eye, Package } from "lucide-react"
import Link from "next/link"

export function FinishingItems() {
  const items = [
    {
      id: "ITEM-1238",
      orderId: "ORD-1238",
      description: "Casual Kanduras (Batch 1)",
      client: "Dubai Mall Boutique",
      completedQC: "2023-05-10",
      priority: "Standard",
      deliveryDate: "2023-05-20",
      status: "Ready for Packaging",
    },
    {
      id: "ITEM-1236",
      orderId: "ORD-1236",
      description: "Designer Abaya",
      client: "Sheikha Fatima",
      completedQC: "2023-05-10",
      priority: "VIP",
      deliveryDate: "2023-05-10",
      status: "Ready for Packaging",
    },
    {
      id: "ITEM-1237",
      orderId: "ORD-1237",
      description: "Corporate Uniforms (Batch 1)",
      client: "Etihad Airways",
      completedQC: "2023-05-09",
      priority: "Standard",
      deliveryDate: "2023-05-25",
      status: "Packaging in Progress",
    },
    {
      id: "ITEM-1234",
      orderId: "ORD-1234",
      description: "Wedding Kandura",
      client: "Ahmed Al Nahyan",
      completedQC: "2023-05-08",
      priority: "Rush",
      deliveryDate: "2023-05-15",
      status: "Packaged",
    },
    {
      id: "ITEM-1239",
      orderId: "ORD-1235",
      description: "School Uniforms (Batch 2)",
      client: "Emirates International School",
      completedQC: "2023-05-07",
      priority: "Bulk",
      deliveryDate: "2023-05-30",
      status: "Ready for Packaging",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Packaging":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Packaging in Progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Packaged":
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
          <TableHead>Priority</TableHead>
          <TableHead>Delivery Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.client}</TableCell>
            <TableCell>
              <Badge className={getPriorityColor(item.priority)} variant="outline">
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell>{new Date(item.deliveryDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(item.status)} variant="outline">
                {item.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={item.status === "Packaged"}
                  asChild={item.status !== "Packaged"}
                >
                  {item.status === "Packaged" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    <Link href={`/manufacturing/finishing/package/${item.id}`}>
                      <Package className="mr-2 h-4 w-4" />
                      Package
                    </Link>
                  )}
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
