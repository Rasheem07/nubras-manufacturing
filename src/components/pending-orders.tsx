import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PendingOrders() {
  const orders = [
    {
      id: "ORD-1234",
      client: "Ahmed Al Nahyan",
      items: "Wedding Kandura",
      quantity: 1,
      priority: "Rush",
      dueDate: "2023-05-15",
    },
    {
      id: "ORD-1235",
      client: "Emirates International School",
      items: "School Uniforms",
      quantity: 250,
      priority: "Bulk",
      dueDate: "2023-05-30",
    },
    {
      id: "ORD-1236",
      client: "Sheikha Fatima",
      items: "Designer Abaya",
      quantity: 1,
      priority: "VIP",
      dueDate: "2023-05-10",
    },
    {
      id: "ORD-1237",
      client: "Etihad Airways",
      items: "Corporate Uniforms",
      quantity: 100,
      priority: "Standard",
      dueDate: "2023-05-25",
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Order ID</TableHead>
            <TableHead className="whitespace-nowrap">Client</TableHead>
            <TableHead className="whitespace-nowrap">Items</TableHead>
            <TableHead className="whitespace-nowrap">Quantity</TableHead>
            <TableHead className="whitespace-nowrap">Priority</TableHead>
            <TableHead className="whitespace-nowrap">Due Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium whitespace-nowrap">{order.id}</TableCell>
              <TableCell className="max-w-[150px] truncate">{order.client}</TableCell>
              <TableCell className="max-w-[150px] truncate">{order.items}</TableCell>
              <TableCell className="whitespace-nowrap">{order.quantity}</TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge className={getPriorityColor(order.priority)} variant="outline">
                  {order.priority}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">{new Date(order.dueDate).toLocaleDateString()}</TableCell>
              <TableCell className="text-right whitespace-nowrap">
                <Button variant="outline" size="sm">
                  <span>Start Production</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
