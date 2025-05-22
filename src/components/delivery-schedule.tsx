import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Printer, Truck } from "lucide-react"

export function DeliverySchedule() {
  const deliveries = [
    {
      id: "DEL-1001",
      orderId: "ORD-1236",
      client: "Sheikha Fatima",
      items: "Designer Abaya (1 pc)",
      deliveryDate: "2023-05-10",
      deliveryTime: "14:00",
      status: "Scheduled",
      method: "Delivery",
      address: "Villa 42, Al Barsha",
      notes: "VIP delivery, call before arrival",
    },
    {
      id: "DEL-1002",
      orderId: "ORD-1234",
      client: "Ahmed Al Nahyan",
      items: "Wedding Kandura (3 pcs)",
      deliveryDate: "2023-05-15",
      deliveryTime: "10:00",
      status: "Scheduled",
      method: "Delivery",
      address: "Palace 7, Jumeirah",
      notes: "Deliver to client's majlis",
    },
    {
      id: "DEL-1003",
      orderId: "ORD-1238",
      client: "Dubai Mall Boutique",
      items: "Casual Kanduras (10 pcs)",
      deliveryDate: "2023-05-20",
      deliveryTime: "11:30",
      status: "Pending",
      method: "Delivery",
      address: "Dubai Mall, Fashion Avenue, Shop 123",
      notes: "Deliver during mall hours (10 AM - 8 PM)",
    },
    {
      id: "DEL-1004",
      orderId: "ORD-1237",
      client: "Etihad Airways",
      items: "Corporate Uniforms (25 pcs)",
      deliveryDate: "2023-05-25",
      deliveryTime: "09:00",
      status: "Pending",
      method: "Pickup",
      address: "N/A",
      notes: "Client will pick up from store",
    },
    {
      id: "DEL-1005",
      orderId: "ORD-1235",
      client: "Emirates International School",
      items: "School Uniforms (50 pcs)",
      deliveryDate: "2023-05-30",
      deliveryTime: "08:30",
      status: "Pending",
      method: "Delivery",
      address: "Emirates International School, Jumeirah",
      notes: "Deliver to school reception",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "In Transit":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pending":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "Delivery":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Pickup":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Delivery ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deliveries.map((delivery) => (
          <TableRow key={delivery.id}>
            <TableCell className="font-medium">{delivery.id}</TableCell>
            <TableCell>{delivery.client}</TableCell>
            <TableCell>{delivery.items}</TableCell>
            <TableCell>
              {new Date(delivery.deliveryDate).toLocaleDateString()} at {delivery.deliveryTime}
            </TableCell>
            <TableCell>
              <Badge className={getMethodColor(delivery.method)} variant="outline">
                {delivery.method}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(delivery.status)} variant="outline">
                {delivery.status}
              </Badge>
            </TableCell>
            <TableCell className="max-w-[200px] truncate" title={delivery.notes}>
              {delivery.notes}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                {delivery.method === "Delivery" && (
                  <Button variant="outline" size="sm">
                    <Truck className="mr-2 h-4 w-4" />
                    Dispatch
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
