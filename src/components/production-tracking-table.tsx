import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ProductionTrackingTable() {
  const items = [
    {
      id: "ITEM-1234",
      orderId: "ORD-1234",
      description: "Wedding Kandura",
      client: "Ahmed Al Nahyan",
      stage: "Cutting",
      priority: "Rush",
      startDate: "2023-05-01",
      estimatedCompletion: "2023-05-15",
    },
    {
      id: "ITEM-1235",
      orderId: "ORD-1235",
      description: "School Uniforms (Batch 1)",
      client: "Emirates International School",
      stage: "Cutting",
      priority: "Bulk",
      startDate: "2023-05-02",
      estimatedCompletion: "2023-05-30",
    },
    {
      id: "ITEM-1236",
      orderId: "ORD-1236",
      description: "Designer Abaya",
      client: "Sheikha Fatima",
      stage: "Embroidery",
      priority: "VIP",
      startDate: "2023-04-25",
      estimatedCompletion: "2023-05-10",
    },
    {
      id: "ITEM-1237",
      orderId: "ORD-1237",
      description: "Corporate Uniforms (Batch 1)",
      client: "Etihad Airways",
      stage: "Stitching",
      priority: "Standard",
      startDate: "2023-05-03",
      estimatedCompletion: "2023-05-25",
    },
    {
      id: "ITEM-1238",
      orderId: "ORD-1238",
      description: "Casual Kanduras (Batch 1)",
      client: "Dubai Mall Boutique",
      stage: "Quality Control",
      priority: "Standard",
      startDate: "2023-05-05",
      estimatedCompletion: "2023-05-20",
    },
    {
      id: "ITEM-1239",
      orderId: "ORD-1235",
      description: "School Uniforms (Batch 2)",
      client: "Emirates International School",
      stage: "Stitching",
      priority: "Bulk",
      startDate: "2023-05-02",
      estimatedCompletion: "2023-05-30",
    },
    {
      id: "ITEM-1240",
      orderId: "ORD-1237",
      description: "Corporate Uniforms (Batch 2)",
      client: "Etihad Airways",
      stage: "Cutting",
      priority: "Standard",
      startDate: "2023-05-03",
      estimatedCompletion: "2023-05-25",
    },
    {
      id: "ITEM-1241",
      orderId: "ORD-1238",
      description: "Casual Kanduras (Batch 2)",
      client: "Dubai Mall Boutique",
      stage: "Packaging",
      priority: "Standard",
      startDate: "2023-05-05",
      estimatedCompletion: "2023-05-20",
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

  const getNextStage = (currentStage: string) => {
    const stages = ["Cutting", "Stitching", "Embroidery", "Quality Control", "Packaging"]
    const currentIndex = stages.indexOf(currentStage)
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : "Complete"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Item ID</TableHead>
          <TableHead className="whitespace-nowrap">Order ID</TableHead>
          <TableHead className="whitespace-nowrap">Description</TableHead>
          <TableHead className="whitespace-nowrap">Client</TableHead>
          <TableHead className="whitespace-nowrap">Current Stage</TableHead>
          <TableHead className="whitespace-nowrap">Priority</TableHead>
          <TableHead className="whitespace-nowrap">Start Date</TableHead>
          <TableHead className="whitespace-nowrap">Est. Completion</TableHead>
          <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium whitespace-nowrap">{item.id}</TableCell>
            <TableCell className="whitespace-nowrap">{item.orderId}</TableCell>
            <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
            <TableCell className="max-w-[150px] truncate">{item.client}</TableCell>
            <TableCell className="whitespace-nowrap">{item.stage}</TableCell>
            <TableCell className="whitespace-nowrap">
              <Badge className={getPriorityColor(item.priority)} variant="outline">
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell className="whitespace-nowrap">{new Date(item.startDate).toLocaleDateString()}</TableCell>
            <TableCell className="whitespace-nowrap">
              {new Date(item.estimatedCompletion).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right whitespace-nowrap">
              <Button variant="outline" size="sm">
                <span>Move to {getNextStage(item.stage)}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
