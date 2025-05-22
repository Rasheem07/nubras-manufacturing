"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function ProductionEfficiencyReport() {
  // Sample data for the production efficiency report
  const efficiencySummary = {
    overallEfficiency: 78,
    targetEfficiency: 85,
    onTimeDelivery: 92,
    qualityRate: 96.5,
    cycleTime: 4.2,
  }

  const efficiencyByProduct = [
    { name: "Kandura", efficiency: 82, target: 85, volume: 120 },
    { name: "Abaya", efficiency: 76, target: 85, volume: 85 },
    { name: "School Uniform", efficiency: 88, target: 85, volume: 200 },
    { name: "Corporate Uniform", efficiency: 72, target: 85, volume: 65 },
    { name: "Custom Design", efficiency: 68, target: 85, volume: 30 },
  ]

  const efficiencyTrend = [
    { date: "Week 1", efficiency: 72, target: 85 },
    { date: "Week 2", efficiency: 74, target: 85 },
    { date: "Week 3", efficiency: 76, target: 85 },
    { date: "Week 4", efficiency: 75, target: 85 },
    { date: "Week 5", efficiency: 78, target: 85 },
    { date: "Week 6", efficiency: 80, target: 85 },
    { date: "Week 7", efficiency: 79, target: 85 },
    { date: "Week 8", efficiency: 82, target: 85 },
  ]

  const bottlenecks = [
    { stage: "Cutting", efficiency: 82, impact: "Medium", issue: "Tool maintenance", solution: "Scheduled sharpening" },
    { stage: "Sewing", efficiency: 68, impact: "High", issue: "Machine downtime", solution: "Preventive maintenance" },
    {
      stage: "Embroidery",
      efficiency: 75,
      impact: "Medium",
      issue: "Pattern complexity",
      solution: "Design optimization",
    },
    { stage: "Quality Check", efficiency: 90, impact: "Low", issue: "Manual inspection", solution: "Digital QC tools" },
    { stage: "Finishing", efficiency: 85, impact: "Low", issue: "Staff shortage", solution: "Cross-training" },
  ]

  const staffEfficiency = [
    { name: "Team A", efficiency: 84, target: 85 },
    { name: "Team B", efficiency: 76, target: 85 },
    { name: "Team C", efficiency: 81, target: 85 },
    { name: "Team D", efficiency: 72, target: 85 },
  ]

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
    "hsl(var(--secondary))",
    "hsl(var(--muted))",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Production Efficiency Report</CardTitle>
          <CardDescription>Analysis of manufacturing efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="products">By Product</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{efficiencySummary.overallEfficiency}%</div>
                    <Progress
                      value={efficiencySummary.overallEfficiency}
                      max={efficiencySummary.targetEfficiency}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Target: {efficiencySummary.targetEfficiency}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{efficiencySummary.onTimeDelivery}%</div>
                    <Progress value={efficiencySummary.onTimeDelivery} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: 95%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Quality Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{efficiencySummary.qualityRate}%</div>
                    <Progress value={efficiencySummary.qualityRate} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: 98%</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Efficiency Trend (Last 8 Weeks)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={efficiencyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        name="Efficiency %"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target %"
                        stroke="hsl(var(--destructive))"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Efficiency by Product</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={efficiencyByProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" name="Efficiency %" fill="hsl(var(--primary))" />
                        <Bar dataKey="target" name="Target %" fill="hsl(var(--destructive))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Production Bottlenecks</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bottlenecks} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[60, 100]} />
                        <YAxis type="category" dataKey="stage" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" name="Efficiency %" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Product Efficiency Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {efficiencyByProduct.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{product.efficiency}%</span>
                            <Progress value={product.efficiency} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>{product.target}%</TableCell>
                        <TableCell>{product.volume} units</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              product.efficiency >= product.target
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : product.efficiency >= product.target - 5
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {product.efficiency >= product.target
                              ? "On Target"
                              : product.efficiency >= product.target - 5
                                ? "Near Target"
                                : "Below Target"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Efficiency vs Volume</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={efficiencyByProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="efficiency" name="Efficiency %" fill="hsl(var(--primary))" />
                        <Bar yAxisId="right" dataKey="volume" name="Volume" fill="hsl(var(--destructive))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Staff Efficiency</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={staffEfficiency}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" name="Efficiency %" fill="hsl(var(--primary))" />
                        <Bar dataKey="target" name="Target %" fill="hsl(var(--destructive))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>
                          <strong>School Uniform:</strong> Analyze production methods for potential application to other
                          product lines
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">!</span>
                        <span>
                          <strong>Custom Design:</strong> Implement standardized templates to improve efficiency while
                          maintaining customization
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">⚠</span>
                        <span>
                          <strong>Corporate Uniform:</strong> Review production line setup and optimize for batch
                          processing
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">⚠</span>
                        <span>
                          <strong>Abaya:</strong> Provide additional training for staff to improve handling of delicate
                          materials
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Weekly Efficiency Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={efficiencyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        name="Efficiency %"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target %"
                        stroke="hsl(var(--destructive))"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">↑ 13.9%</div>
                    <p className="text-xs text-muted-foreground mt-2">Improvement over 8 weeks</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.7%</div>
                    <p className="text-xs text-muted-foreground mt-2">Average weekly improvement</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Target Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Week 10</div>
                    <p className="text-xs text-muted-foreground mt-2">Projected date to reach target</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Factors Affecting Efficiency</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead>Week Observed</TableHead>
                      <TableHead>Action Taken</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>New equipment installation</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Positive
                        </Badge>
                      </TableCell>
                      <TableCell>Week 3</TableCell>
                      <TableCell>Installed automated cutting machines</TableCell>
                      <TableCell>+3% efficiency</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Staff shortage</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                          Negative
                        </Badge>
                      </TableCell>
                      <TableCell>Week 4</TableCell>
                      <TableCell>Temporary staff hired</TableCell>
                      <TableCell>-2% efficiency</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Process optimization</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Positive
                        </Badge>
                      </TableCell>
                      <TableCell>Week 6</TableCell>
                      <TableCell>Reorganized workflow</TableCell>
                      <TableCell>+4% efficiency</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Material quality issue</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                          Negative
                        </Badge>
                      </TableCell>
                      <TableCell>Week 7</TableCell>
                      <TableCell>Changed supplier</TableCell>
                      <TableCell>-1% efficiency</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="bottlenecks">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Production Bottlenecks Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Production Stage</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead>Primary Issue</TableHead>
                      <TableHead>Recommended Solution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bottlenecks.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.stage}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{item.efficiency}%</span>
                            <Progress value={item.efficiency} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.impact === "High"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : item.impact === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {item.impact}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.issue}</TableCell>
                        <TableCell>{item.solution}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Bottleneck Impact Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bottlenecks}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="efficiency"
                        nameKey="stage"
                        label={({ stage, percent }) => `${stage}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {bottlenecks.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Action Plan</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Immediate Actions (1-2 weeks)</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Implement preventive maintenance schedule for sewing machines</li>
                          <li>Cross-train staff from finishing to support sewing operations</li>
                          <li>Schedule regular tool maintenance for cutting department</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Short-term Actions (1-3 months)</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Review and optimize complex embroidery patterns</li>
                          <li>Evaluate digital quality control tools for implementation</li>
                          <li>Develop standardized training program for new staff</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Long-term Actions (3-6 months)</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Evaluate equipment upgrade for sewing department</li>
                          <li>Implement automated quality control system</li>
                          <li>Develop comprehensive staff cross-training program</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
