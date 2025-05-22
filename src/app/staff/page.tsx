import { Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaffDirectory } from "@/components/staff-directory"
import { StaffSchedule } from "@/components/staff-schedule"
import { StaffPerformance } from "@/components/staff-performance"
import { StaffTraining } from "@/components/staff-training"

export default function StaffManagementPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold">Staff Management</h1>
          <p className="text-sm text-muted-foreground">Manage manufacturing staff, schedules, and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="directory" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="directory">Directory</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search staff..." className="w-full sm:w-[250px] pl-8" />
            </div>
          </div>

          <TabsContent value="directory" className="space-y-4">
            <StaffDirectory />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <StaffSchedule />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <StaffPerformance />
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <StaffTraining />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
