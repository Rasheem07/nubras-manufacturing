"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Settings, RefreshCw } from "lucide-react"
import Link from "next/link"
import { WorkstationSchedule } from "@/components/workstation-schedule"
import { WorkstationList } from "@/components/workstation-list"

export default function WorkstationsPage() {
  const [activeTab, setActiveTab] = useState("schedule")

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workstation Management</h1>
          <p className="text-muted-foreground">Schedule and manage production workstations</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/manufacturing/workstations/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/manufacturing/workstations/create">
              <Plus className="mr-2 h-4 w-4" />
              <span>New Workstation</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="schedule">Schedule View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workstation Schedule</CardTitle>
              <CardDescription>Drag and drop tasks to schedule production</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkstationSchedule />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workstation List</CardTitle>
              <CardDescription>View and manage all workstations</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkstationList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
