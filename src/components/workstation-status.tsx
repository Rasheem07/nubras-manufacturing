import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WorkstationStatus() {
  const workstations = [
    {
      id: "WS-001",
      name: "Cutting Station 1",
      status: "Active",
      operator: "Ahmed Ali",
      currentTask: "Wedding Kandura (Order #1234)",
    },
    {
      id: "WS-002",
      name: "Stitching Station 1",
      status: "Active",
      operator: "Fatima Hassan",
      currentTask: "School Uniforms (Order #1235)",
    },
    { id: "WS-003", name: "Stitching Station 2", status: "Inactive", operator: "Unassigned", currentTask: "None" },
    {
      id: "WS-004",
      name: "Embroidery Station 1",
      status: "Active",
      operator: "Mohammed Khalid",
      currentTask: "VIP Abaya (Order #1236)",
    },
    {
      id: "WS-005",
      name: "QC Station 1",
      status: "Active",
      operator: "Layla Ahmed",
      currentTask: "Corporate Uniforms (Order #1237)",
    },
    {
      id: "WS-006",
      name: "Finishing Station 1",
      status: "Active",
      operator: "Omar Saeed",
      currentTask: "Casual Kanduras (Order #1238)",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workstation Status</CardTitle>
        <CardDescription>Current activity at each workstation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workstations.map((station) => (
            <div key={station.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{station.name}</p>
                <p className="text-sm text-muted-foreground">{station.operator}</p>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(station.status)} variant="outline">
                  {station.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{station.currentTask}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
