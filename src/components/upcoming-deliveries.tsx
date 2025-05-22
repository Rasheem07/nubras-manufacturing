import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck } from "lucide-react"

export function UpcomingDeliveries() {
  const deliveries = [
    {
      id: "DEL-1234",
      orderId: "ORD-1236",
      client: "Sheikha Fatima",
      items: "Designer Abaya",
      status: "Ready",
      deliveryDate: "2023-05-10",
    },
    {
      id: "DEL-1235",
      orderId: "ORD-1234",
      client: "Ahmed Al Nahyan",
      items: "Wedding Kandura",
      status: "In Progress",
      deliveryDate: "2023-05-15",
    },
    {
      id: "DEL-1236",
      orderId: "ORD-1238",
      client: "Dubai Mall Boutique",
      items: "Casual Kanduras",
      status: "Ready",
      deliveryDate: "2023-05-20",
    },
    {
      id: "DEL-1237",
      orderId: "ORD-1237",
      client: "Etihad Airways",
      items: "Corporate Uniforms",
      status: "In Progress",
      deliveryDate: "2023-05-25",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "In Progress":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Delivery ID</TableHead>
            <TableHead className="whitespace-nowrap">Order ID</TableHead>
            <TableHead className="whitespace-nowrap">Client</TableHead>
            <TableHead className="whitespace-nowrap">Items</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Delivery Date</TableHead>
            <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium whitespace-nowrap">{delivery.id}</TableCell>
              <TableCell className="whitespace-nowrap">{delivery.orderId}</TableCell>
              <TableCell className="max-w-[150px] truncate">{delivery.client}</TableCell>
              <TableCell className="max-w-[150px] truncate">{delivery.items}</TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge className={getStatusColor(delivery.status)} variant="outline">
                  {delivery.status}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(delivery.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                <Button variant="outline" size="sm">
                  <Truck className="mr-2 h-4 w-4" />
                  <span>Schedule Delivery</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
