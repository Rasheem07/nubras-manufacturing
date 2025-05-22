"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"

// Sample data for delivery status
const deliveryStatusData = [
  { name: "On Time", value: 75 },
  { name: "Delayed", value: 15 },
  { name: "Early", value: 10 },
]

// Sample data for delivery methods
const deliveryMethodData = [
  { name: "Standard", count: 45 },
  { name: "Express", count: 25 },
  { name: "Pickup", count: 15 },
  { name: "Special", count: 5 },
]

// Colors for the pie chart
const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336"]

export function LogisticsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logistics Overview</CardTitle>
        <CardDescription>Summary of delivery performance and methods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Delivery Status</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deliveryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deliveryMethodData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Deliveries" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Logistics Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-muted-foreground">On-Time Delivery Rate</h4>
              <p className="text-3xl font-bold mt-2">92%</p>
              <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">+2% from last month</Badge>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-muted-foreground">Average Delivery Time</h4>
              <p className="text-3xl font-bold mt-2">2.3 days</p>
              <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">-0.2 days from last month</Badge>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-muted-foreground">Delivery Cost per Order</h4>
              <p className="text-3xl font-bold mt-2">$12.50</p>
              <Badge className="mt-2 bg-amber-100 text-amber-800 border-amber-200">+$0.75 from last month</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
