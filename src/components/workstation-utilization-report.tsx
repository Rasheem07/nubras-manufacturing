"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export function WorkstationUtilizationReport() {
  // Sample data for the workstation utilization report
  const utilizationSummary = {
    totalWorkstations: 12,
    activeWorkstations: 10,
    averageUtilization: 78,
    peakUtilization: 92,
    idleTime: 22,
  }

  const utilizationByWorkstation = [
    { name: "Cutting 1", utilization: 85, capacity: 100, status: "active" },
    { name: "Cutting 2", utilization: 65, capacity: 100, status: "active" },
    { name: "Sewing 1", utilization: 95, capacity: 100, status: "active" },
    { name: "Sewing 2", utilization: 80, capacity: 100, status: "active" },
    { name: "Sewing 3", utilization: 75, capacity: 100, status: "active" },
    { name: "Embroidery 1", utilization: 90, capacity: 100, status: "active" },
    { name: "Embroidery 2", utilization: 0, capacity: 100, status: "maintenance" },
    { name: "QC 1", utilization: 70, capacity: 100, status: "active" },
    { name: "QC 2", utilization: 65, capacity: 100, status: "active" },
    { name: "Finishing 1", utilization: 85, capacity: 100, status: "active" },
    { name: "Finishing 2", utilization: 75, capacity: 100, status: "active" },
    { name: "Packaging", utilization: 0, capacity: 100, status: "inactive" },
  ]

  const utilizationByDepartment = [
    { name: "Cutting", utilization: 75, capacity: 100 },
    { name: "Sewing", utilization: 83, capacity: 100 },
    { name: "Embroidery", utilization: 90, capacity: 100 },
    { name: "QC", utilization: 68, capacity: 100 },
    { name: "Finishing", utilization: 80, capacity: 100 },
    { name: "Packaging", utilization: 65, capacity: 100 },
  ]

  const utilizationTrend = [
    { date: "2023-05-01", utilization: 65 },
    { date: "2023-05-02", utilization: 70 },
    { date: "2023-05-03", utilization: 75 },
    { date: "2023-05-04", utilization: 72 },
    { date: "2023-05-05", utilization: 78 },
    { date: "2023-05-06", utilization: 80 },
    { date: "2023-05-07", utilization: 75 },
    { date: "2023-05-08", utilization: 82 },
    { date: "2023-05-09", utilization: 85 },
    { date: "2023-05-10", utilization: 80 },
    { date: "2023-05-11", utilization: 78 },
    { date: "2023-05-12", utilization: 83 },
    { date: "2023-05-13", utilization: 85 },
    { date: "2023-05-14", utilization: 78 },
  ]

  const bottlenecks = [
    { workstation: "Sewing 1", queuedOrders: 5, waitTime: 120 },
    { workstation: "Embroidery 1", queuedOrders: 4, waitTime: 90 },
    { workstation: "Cutting 1", queuedOrders: 3, waitTime: 60 },
    { workstation: "Finishing 1", queuedOrders: 2, waitTime: 45 },
    { workstation: "QC 1", queuedOrders: 1, waitTime: 30 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workstation Utilization Report</CardTitle>
          <CardDescription>Overview of workstation utilization metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="workstations">By Workstation</TabsTrigger>
              <TabsTrigger value="departments">By Department</TabsTrigger>
              <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{utilizationSummary.averageUtilization}%</div>
                    <Progress value={utilizationSummary.averageUtilization} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Peak: {utilizationSummary.peakUtilization}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Workstations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {utilizationSummary.activeWorkstations}/{utilizationSummary.totalWorkstations}
                    </div>
                    <Progress
                      value={(utilizationSummary.activeWorkstations / utilizationSummary.totalWorkstations) * 100}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {utilizationSummary.totalWorkstations - utilizationSummary.activeWorkstations} inactive
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Idle Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{utilizationSummary.idleTime}%</div>
                    <Progress value={utilizationSummary.idleTime} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Opportunity for {Math.round(utilizationSummary.idleTime * 0.8)}% improvement
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Utilization Trend (Last 14 Days)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={utilizationTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="utilization"
                        name="Utilization %"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Utilization by Department</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={utilizationByDepartment}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="utilization" name="Utilization %" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workstations">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Utilization by Workstation</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={utilizationByWorkstation} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="utilization" name="Utilization %" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Workstation</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utilizationByWorkstation.map((station, index) => (
                        <TableRow key={index}>
                          <TableCell>{station.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{station.utilization}%</span>
                              <Progress value={station.utilization} className="w-20" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                station.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : station.status === "maintenance"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {station.status === "active"
                                ? "Active"
                                : station.status === "maintenance"
                                  ? "Maintenance"
                                  : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                station.utilization >= 85
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : station.utilization >= 70
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : station.utilization > 0
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {station.utilization >= 85
                                ? "Optimal"
                                : station.utilization >= 70
                                  ? "Good"
                                  : station.utilization > 0
                                    ? "Underutilized"
                                    : "Not in use"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="departments">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Utilization by Department</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={utilizationByDepartment}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="utilization" name="Utilization %" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Workstations</TableHead>
                        <TableHead>Recommendation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cutting</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>75%</span>
                            <Progress value={75} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>Maintain current capacity</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sewing</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>83%</span>
                            <Progress value={83} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Maintain current capacity</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Embroidery</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>90%</span>
                            <Progress value={90} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>Consider capacity expansion</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>QC</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>68%</span>
                            <Progress value={68} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>Optimize workflow</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Finishing</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>80%</span>
                            <Progress value={80} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>Maintain current capacity</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Packaging</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>65%</span>
                            <Progress value={65} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>Optimize workflow</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bottlenecks">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Production Bottlenecks</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bottlenecks}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="workstation" />
                      <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="queuedOrders" name="Queued Orders" fill="hsl(var(--primary))" />
                      <Bar yAxisId="right" dataKey="waitTime" name="Wait Time (min)" fill="hsl(var(--destructive))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Workstation</TableHead>
                        <TableHead>Queued Orders</TableHead>
                        <TableHead>Wait Time (min)</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Recommendation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bottlenecks.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.workstation}</TableCell>
                          <TableCell>{item.queuedOrders}</TableCell>
                          <TableCell>{item.waitTime}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.queuedOrders >= 4
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : item.queuedOrders >= 2
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                              }
                            >
                              {item.queuedOrders >= 4 ? "High" : item.queuedOrders >= 2 ? "Medium" : "Low"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item.queuedOrders >= 4
                              ? "Add capacity"
                              : item.queuedOrders >= 2
                                ? "Optimize workflow"
                                : "Monitor"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
