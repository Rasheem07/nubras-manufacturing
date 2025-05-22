import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Plus, Filter, Download } from "lucide-react"
import Link from "next/link"

export default function ProductionOrdersPage() {
  const orders = [
    {
      id: "ORD-1234",
      client: "Ahmed Al Nahyan",
      items: "Wedding Kandura (3 pcs)",
      orderDate: "2023-05-01",
      deadline: "2023-05-15",
      priority: "Rush",
      status: "In Production",
      stage: "Cutting",
    },
    {
      id: "ORD-1235",
      client: "Emirates International School",
      items: "School Uniforms (50 pcs)",
      orderDate: "2023-05-02",
      deadline: "2023-05-30",
      priority: "Bulk",
      status: "In Production",
      stage: "Stitching",
    },
    {
      id: "ORD-1236",
      client: "Sheikha Fatima",
      items: "Designer Abaya (1 pc)",
      orderDate: "2023-04-25",
      deadline: "2023-05-10",
      priority: "VIP",
      status: "In Production",
      stage: "Embroidery",
    },
    {
      id: "ORD-1237",
      client: "Etihad Airways",
      items: "Corporate Uniforms (25 pcs)",
      orderDate: "2023-05-03",
      deadline: "2023-05-25",
      priority: "Standard",
      status: "In Production",
      stage: "Quality Control",
    },
    {
      id: "ORD-1238",
      client: "Dubai Mall Boutique",
      items: "Casual Kanduras (10 pcs)",
      orderDate: "2023-05-05",
      deadline: "2023-05-20",
      priority: "Standard",
      status: "In Production",
      stage: "Finishing",
    },
    {
      id: "ORD-1239",
      client: "Mohammed Al Maktoum",
      items: "Formal Kandura (2 pcs)",
      orderDate: "2023-04-20",
      deadline: "2023-05-05",
      priority: "Rush",
      status: "Completed",
      stage: "Delivered",
    },
    {
      id: "ORD-1240",
      client: "Jumeirah Hotel Staff",
      items: "Staff Uniforms (15 pcs)",
      orderDate: "2023-05-07",
      deadline: "2023-05-28",
      priority: "Standard",
      status: "In Production",
      stage: "Cutting",
    },
    {
      id: "ORD-1241",
      client: "Zayed University",
      items: "Graduation Abayas (30 pcs)",
      orderDate: "2023-04-15",
      deadline: "2023-06-01",
      priority: "Bulk",
      status: "In Production",
      stage: "Stitching",
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
      case "In Production":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Delayed":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Orders</h1>
          <p className="text-muted-foreground">Manage and track all production orders</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button size="sm" asChild>
            <Link href="/manufacturing/orders/create">
              <Plus className="mr-2 h-4 w-4" />
              <span>New Order</span>
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Production Orders</CardTitle>
          <CardDescription>View and manage all production orders in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(order.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(order.priority)} variant="outline">
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)} variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.stage}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/manufacturing/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
