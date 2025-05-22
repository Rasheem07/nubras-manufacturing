"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
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
  AreaChart,
  Area,
} from "recharts"
import { Download, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function QualityControlReport() {
  const [dateRange, setDateRange] = useState("This Month")
  const [department, setDepartment] = useState("All Departments")

  // Sample data for the quality control report
  const qualitySummary = {
    overallQuality: 96.5,
    targetQuality: 98,
    defectRate: 3.5,
    reworkRate: 2.1,
    customerReturns: 0.8,
  }

  const qualityByProduct = [
    { name: "Kandura", quality: 97.2, target: 98, defects: 2.8 },
    { name: "Abaya", quality: 96.8, target: 98, defects: 3.2 },
    { name: "School Uniform", quality: 98.5, target: 98, defects: 1.5 },
    { name: "Corporate Uniform", quality: 95.4, target: 98, defects: 4.6 },
    { name: "Custom Design", quality: 94.6, target: 98, defects: 5.4 },
  ]

  const qualityTrend = [
    { month: "Jan", quality: 94.2, target: 98 },
    { month: "Feb", quality: 94.8, target: 98 },
    { month: "Mar", quality: 95.3, target: 98 },
    { month: "Apr", quality: 95.9, target: 98 },
    { month: "May", quality: 96.5, target: 98 },
  ]

  const defectTypes = [
    { name: "Stitching", value: 42 },
    { name: "Fabric", value: 28 },
    { name: "Color", value: 12 },
    { name: "Size", value: 10 },
    { name: "Embroidery", value: 8 },
  ]

  const defectsByStage = [
    { stage: "Cutting", defects: 15, impact: "Medium" },
    { stage: "Sewing", defects: 42, impact: "High" },
    { stage: "Embroidery", defects: 22, impact: "Medium" },
    { stage: "Finishing", defects: 12, impact: "Low" },
    { stage: "Packaging", defects: 9, impact: "Low" },
  ]

  const productDefectHistory = [
    { month: "Jan", kandura: 3.1, abaya: 3.4, uniform: 1.8 },
    { month: "Feb", kandura: 2.9, abaya: 3.3, uniform: 1.7 },
    { month: "Mar", kandura: 2.8, abaya: 3.1, uniform: 1.6 },
    { month: "Apr", kandura: 2.7, abaya: 3.0, uniform: 1.5 },
    { month: "May", kandura: 2.8, abaya: 3.2, uniform: 1.5 },
  ]

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
    "hsl(var(--secondary))",
    "hsl(var(--muted))",
  ]

  // A function to get color based on quality score
  const getQualityColor = (quality: number, target: number) => {
    if (quality >= target) return "text-green-500"
    if (quality >= target - 1) return "text-amber-500"
    return "text-red-500"
  }

  // A function to get color based on defect rate
  const getDefectColor = (defects: number) => {
    if (defects <= 2) return "text-green-500"
    if (defects <= 4) return "text-amber-500"
    return "text-red-500"
  }

  // A function to format impact text with color
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">High</span>
      case "Medium":
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Medium</span>
      case "Low":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Low</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{impact}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quality Control Report</h2>
          <p className="text-muted-foreground">Comprehensive analysis of product quality metrics and defect patterns</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
              <SelectItem value="This Year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Departments">All Departments</SelectItem>
              <SelectItem value="Cutting">Cutting</SelectItem>
              <SelectItem value="Sewing">Sewing</SelectItem>
              <SelectItem value="Embroidery">Embroidery</SelectItem>
              <SelectItem value="Finishing">Finishing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Control Report</CardTitle>
          <CardDescription>Analysis of product quality and defect metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="defects">Defect Analysis</TabsTrigger>
              <TabsTrigger value="products">By Product</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{qualitySummary.overallQuality}%</div>
                    <Progress value={qualitySummary.overallQuality} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: {qualitySummary.targetQuality}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Defect Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{qualitySummary.defectRate}%</div>
                    <Progress value={qualitySummary.defectRate} max={10} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: Below 2%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Customer Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{qualitySummary.customerReturns}%</div>
                    <Progress value={qualitySummary.customerReturns} max={5} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: Below 0.5%</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Quality Trend</CardTitle>
                    <CardDescription>Quality score trend over the past 5 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={qualityTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[90, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="quality"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name="Quality Score"
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="5 5"
                            name="Target"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Defect Types</CardTitle>
                    <CardDescription>Distribution of defects by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={defectTypes}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {defectTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} defects`, "Count"]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Quality By Product</CardTitle>
                  <CardDescription>Quality scores across different product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={qualityByProduct} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[90, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quality" name="Quality Score" fill="hsl(var(--primary))" />
                        <Bar dataKey="target" name="Target" fill="hsl(var(--muted-foreground))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="defects" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Defect Types</CardTitle>
                    <CardDescription>Distribution of defects by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={defectTypes}
                          margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Number of Defects" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Defects by Production Stage</CardTitle>
                    <CardDescription>Number of defects detected at each stage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={defectsByStage} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="stage" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="defects" name="Number of Defects" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Defects by Stage and Impact</CardTitle>
                  <CardDescription>Detailed breakdown of defects by production stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Production Stage</TableHead>
                        <TableHead className="text-right">Number of Defects</TableHead>
                        <TableHead className="text-right">% of Total Defects</TableHead>
                        <TableHead className="text-right">Business Impact</TableHead>
                        <TableHead className="text-right">Avg. Rework Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {defectsByStage.map((stage) => {
                        const totalDefects = defectsByStage.reduce((sum, s) => sum + s.defects, 0)
                        const percentOfTotal = ((stage.defects / totalDefects) * 100).toFixed(1)
                        // Simulate rework time based on defects and impact
                        const reworkTime =
                          stage.impact === "High"
                            ? stage.defects * 0.5
                            : stage.impact === "Medium"
                              ? stage.defects * 0.3
                              : stage.defects * 0.2

                        return (
                          <TableRow key={stage.stage}>
                            <TableCell className="font-medium">{stage.stage}</TableCell>
                            <TableCell className="text-right">{stage.defects}</TableCell>
                            <TableCell className="text-right">{percentOfTotal}%</TableCell>
                            <TableCell className="text-right">{getImpactBadge(stage.impact)}</TableCell>
                            <TableCell className="text-right">{reworkTime.toFixed(1)} hours</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Defect Pareto Analysis</CardTitle>
                  <CardDescription>
                    Identifying the vital few defect causes that lead to the majority of quality issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {(() => {
                        // Prepare sorted data and cumulative percentage
                        const sortedDefects = [...defectTypes].sort((a, b) => b.value - a.value)
                        const total = sortedDefects.reduce((acc, curr) => acc + curr.value, 0)
                        let cumulative = 0
                        const paretoData = sortedDefects.map((item) => {
                          cumulative += item.value
                          return {
                            ...item,
                            cumulativePercent: (cumulative / total) * 100,
                          }
                        })
                        return (
                          <BarChart
                            data={paretoData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar
                              yAxisId="left"
                              dataKey="value"
                              name="Defect Count"
                              fill="hsl(var(--primary))"
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="cumulativePercent"
                              name="Cumulative %"
                              stroke="hsl(var(--destructive))"
                              strokeWidth={2}
                            />
                          </BarChart>
                        )
                      })()}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Quality Score by Product</CardTitle>
                    <CardDescription>Comparison of quality metrics across product lines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={qualityByProduct} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[90, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="quality" name="Quality Score" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Defect Rate by Product</CardTitle>
                    <CardDescription>Defect percentage across product lines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={qualityByProduct} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="defects" name="Defect Rate (%)" fill="hsl(var(--destructive))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Product Quality Details</CardTitle>
                  <CardDescription>Detailed quality metrics by product line</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quality Score</TableHead>
                        <TableHead className="text-right">Target</TableHead>
                        <TableHead className="text-right">Defect Rate</TableHead>
                        <TableHead className="text-right">Units Inspected</TableHead>
                        <TableHead className="text-right">Units Rejected</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {qualityByProduct.map((product) => {
                        // Calculate simulated values for units
                        const unitsInspected = Math.floor(Math.random() * 300) + 100
                        const unitsRejected = Math.floor(unitsInspected * (product.defects / 100))

                        return (
                          <TableRow key={product.name}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className={`text-right ${getQualityColor(product.quality, product.target)}`}>
                              {product.quality}%
                            </TableCell>
                            <TableCell className="text-right">{product.target}%</TableCell>
                            <TableCell className={`text-right ${getDefectColor(product.defects)}`}>
                              {product.defects}%
                            </TableCell>
                            <TableCell className="text-right">{unitsInspected}</TableCell>
                            <TableCell className="text-right">{unitsRejected}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Product Defect History</CardTitle>
                  <CardDescription>Defect rate trends by product over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productDefectHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="kandura"
                          name="Kandura"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="abaya"
                          name="Abaya"
                          stroke="hsl(var(--destructive))"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="uniform"
                          name="Uniform"
                          stroke="hsl(var(--warning))"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Quality Score Trend</CardTitle>
                    <CardDescription>Overall quality score over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={qualityTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[92, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="quality"
                            name="Quality Score"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            name="Target"
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Quality Gap Analysis</CardTitle>
                    <CardDescription>Gap between actual quality and target</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={qualityTrend.map((item) => ({
                            ...item,
                            gap: item.target - item.quality,
                          }))}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="gap"
                            name="Quality Gap"
                            fill="hsl(var(--destructive) / 0.2)"
                            stroke="hsl(var(--destructive))"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Defect Type Trends</CardTitle>
                  <CardDescription>Evolution of defect categories over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { month: "Jan", stitching: 48, fabric: 32, color: 14, size: 12, embroidery: 10 },
                          { month: "Feb", stitching: 45, fabric: 30, color: 14, size: 11, embroidery: 9 },
                          { month: "Mar", stitching: 44, fabric: 29, color: 13, size: 11, embroidery: 9 },
                          { month: "Apr", stitching: 43, fabric: 28, color: 12, size: 10, embroidery: 8 },
                          { month: "May", stitching: 42, fabric: 28, color: 12, size: 10, embroidery: 8 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="stitching"
                          stackId="1"
                          name="Stitching"
                          fill={COLORS[0]}
                          stroke={COLORS[0]}
                        />
                        <Area
                          type="monotone"
                          dataKey="fabric"
                          stackId="1"
                          name="Fabric"
                          fill={COLORS[1]}
                          stroke={COLORS[1]}
                        />
                        <Area
                          type="monotone"
                          dataKey="color"
                          stackId="1"
                          name="Color"
                          fill={COLORS[2]}
                          stroke={COLORS[2]}
                        />
                        <Area
                          type="monotone"
                          dataKey="size"
                          stackId="1"
                          name="Size"
                          fill={COLORS[3]}
                          stroke={COLORS[3]}
                        />
                        <Area
                          type="monotone"
                          dataKey="embroidery"
                          stackId="1"
                          name="Embroidery"
                          fill={COLORS[4]}
                          stroke={COLORS[4]}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Quality Performance Forecast</CardTitle>
                  <CardDescription>Projected quality metrics for the next 3 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          ...qualityTrend,
                          { month: "Jun", quality: 96.8, target: 98 },
                          { month: "Jul", quality: 97.1, target: 98 },
                          { month: "Aug", quality: 97.4, target: 98 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[94, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="quality"
                          name="Quality Score"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target"
                          stroke="hsl(var(--muted-foreground))"
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="quality"
                          name="Forecast"
                          stroke="hsl(var(--warning))"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
