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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function StaffPerformanceReport() {
  // Sample data for the staff performance report
  const performanceSummary = {
    averageProductivity: 85,
    attendanceRate: 96.5,
    skillCompetency: 82,
    trainingCompletion: 78,
  }

  const departmentPerformance = [
    { department: "Cutting", productivity: 88, attendance: 97, skillLevel: 85 },
    { department: "Sewing", productivity: 82, attendance: 95, skillLevel: 90 },
    { department: "Embroidery", productivity: 86, attendance: 98, skillLevel: 92 },
    { department: "Quality Control", productivity: 90, attendance: 99, skillLevel: 88 },
    { department: "Finishing", productivity: 84, attendance: 96, skillLevel: 80 },
  ]

  const productivityTrend = [
    { month: "Jan", productivity: 80, target: 85 },
    { month: "Feb", productivity: 82, target: 85 },
    { month: "Mar", productivity: 83, target: 85 },
    { month: "Apr", productivity: 84, target: 85 },
    { month: "May", productivity: 85, target: 85 },
    { month: "Jun", productivity: 87, target: 85 },
  ]

  const topPerformers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      department: "Quality Control",
      productivity: 95,
      attendance: 100,
      skillLevel: 92,
    },
    {
      id: 2,
      name: "Fatima Al-Mansoori",
      department: "Embroidery",
      productivity: 94,
      attendance: 98,
      skillLevel: 95,
    },
    {
      id: 3,
      name: "Mohammed Al-Farsi",
      department: "Cutting",
      productivity: 93,
      attendance: 99,
      skillLevel: 90,
    },
    {
      id: 4,
      name: "Layla Mahmoud",
      department: "Sewing",
      productivity: 92,
      attendance: 97,
      skillLevel: 94,
    },
    {
      id: 5,
      name: "Omar Saeed",
      department: "Finishing",
      productivity: 91,
      attendance: 98,
      skillLevel: 88,
    },
  ]

  const skillsRadar = [
    { subject: "Technical Skills", A: 85, fullMark: 100 },
    { subject: "Quality Focus", A: 90, fullMark: 100 },
    { subject: "Efficiency", A: 82, fullMark: 100 },
    { subject: "Problem Solving", A: 78, fullMark: 100 },
    { subject: "Teamwork", A: 88, fullMark: 100 },
    { subject: "Adaptability", A: 80, fullMark: 100 },
  ]

  const trainingData = [
    { name: "Technical Training", completed: 85, target: 100 },
    { name: "Quality Standards", completed: 92, target: 100 },
    { name: "Safety Procedures", completed: 98, target: 100 },
    { name: "Efficiency Methods", completed: 75, target: 100 },
    { name: "New Equipment", completed: 68, target: 100 },
    { name: "Leadership Skills", completed: 50, target: 100 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance Report</CardTitle>
          <CardDescription>Analysis of staff productivity and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="departments">By Department</TabsTrigger>
              <TabsTrigger value="individuals">Top Performers</TabsTrigger>
              <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Productivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceSummary.averageProductivity}%</div>
                    <Progress value={performanceSummary.averageProductivity} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: 90%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceSummary.attendanceRate}%</div>
                    <Progress value={performanceSummary.attendanceRate} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: 98%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Skill Competency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceSummary.skillCompetency}%</div>
                    <Progress value={performanceSummary.skillCompetency} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: 85%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceSummary.trainingCompletion}%</div>
                    <Progress value={performanceSummary.trainingCompletion} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: 90%</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Productivity Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[75, 95]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="productivity"
                        name="Productivity %"
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

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Department Performance</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="productivity" name="Productivity %" fill="hsl(var(--primary))" />
                      <Bar dataKey="attendance" name="Attendance %" fill="hsl(var(--secondary))" />
                      <Bar dataKey="skillLevel" name="Skill Level %" fill="hsl(var(--warning))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="departments">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Department Performance Analysis</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="productivity" name="Productivity %" fill="hsl(var(--primary))" />
                      <Bar dataKey="attendance" name="Attendance %" fill="hsl(var(--secondary))" />
                      <Bar dataKey="skillLevel" name="Skill Level %" fill="hsl(var(--warning))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Productivity</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Skill Level</TableHead>
                        <TableHead>Overall Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentPerformance.map((dept, index) => {
                        const overallScore = (dept.productivity + dept.attendance + dept.skillLevel) / 3
                        return (
                          <TableRow key={index}>
                            <TableCell>{dept.department}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{dept.productivity}%</span>
                                <Progress value={dept.productivity} className="w-20" />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{dept.attendance}%</span>
                                <Progress value={dept.attendance} className="w-20" />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{dept.skillLevel}%</span>
                                <Progress value={dept.skillLevel} className="w-20" />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  overallScore >= 90
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : overallScore >= 85
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                      : overallScore >= 80
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {overallScore >= 90
                                  ? "Excellent"
                                  : overallScore >= 85
                                    ? "Very Good"
                                    : overallScore >= 80
                                      ? "Good"
                                      : "Needs Improvement"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Top Performing Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Quality Control</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        90% productivity, 99% attendance, 88% skill level
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Department Needing Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Sewing</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        82% productivity, 95% attendance, 90% skill level
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="individuals">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Top Performing Staff</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Productivity</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Skill Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformers.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{staff.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{staff.productivity}%</span>
                            <Progress value={staff.productivity} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{staff.attendance}%</span>
                            <Progress value={staff.attendance} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{staff.skillLevel}%</span>
                            <Progress value={staff.skillLevel} className="w-20" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>AH</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">Ahmed Hassan</div>
                          <p className="text-xs text-muted-foreground">Quality Control</p>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Productivity</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-1" />
                        <div className="flex justify-between text-xs">
                          <span>Attendance</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-1" />
                        <div className="flex justify-between text-xs">
                          <span>Skill Level</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-1" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Most Improved</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>LM</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">Layla Mahmoud</div>
                          <p className="text-xs text-muted-foreground">Sewing</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Productivity improvement</p>
                        <div className="text-lg font-bold text-green-600">↑ 15%</div>
                        <p className="text-xs text-muted-foreground mt-2">Over last 6 months</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>FA</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">Fatima Al-Mansoori</div>
                          <p className="text-xs text-muted-foreground">Embroidery</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Highest skill level</p>
                        <div className="text-lg font-bold">95%</div>
                        <p className="text-xs text-muted-foreground mt-2">Specialized in complex designs</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Skills Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium mb-2">Overall Skill Competency</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsRadar}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Average Skill Level"
                            dataKey="A"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.6}
                          />
                          <Tooltip />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2">Training Completion</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trainingData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" width={120} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" name="Completion %" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium mb-2">Skill Development Recommendations</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Skill Area</TableHead>
                        <TableHead>Current Level</TableHead>
                        <TableHead>Target Level</TableHead>
                        <TableHead>Gap</TableHead>
                        <TableHead>Recommended Training</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Technical Skills</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>85%</span>
                            <Progress value={85} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>90%</TableCell>
                        <TableCell>5%</TableCell>
                        <TableCell>Advanced machinery operation workshop</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Problem Solving</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>78%</span>
                            <Progress value={78} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>85%</TableCell>
                        <TableCell>7%</TableCell>
                        <TableCell>Critical thinking and troubleshooting course</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Adaptability</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>80%</span>
                            <Progress value={80} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>85%</TableCell>
                        <TableCell>5%</TableCell>
                        <TableCell>Cross-training program</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Leadership Skills</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>50%</span>
                            <Progress value={50} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>75%</TableCell>
                        <TableCell>25%</TableCell>
                        <TableCell>Leadership development program</TableCell>
                      </TableRow>
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
