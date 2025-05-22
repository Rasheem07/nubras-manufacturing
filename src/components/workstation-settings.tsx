"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

const workstationTypes = [
  {
    id: 1,
    name: "Cutting Station",
    capacity: 8,
    setupTime: 15,
  },
  {
    id: 2,
    name: "Sewing Station",
    capacity: 10,
    setupTime: 20,
  },
  {
    id: 3,
    name: "Embroidery Station",
    capacity: 5,
    setupTime: 30,
  },
  {
    id: 4,
    name: "Finishing Station",
    capacity: 12,
    setupTime: 10,
  },
  {
    id: 5,
    name: "Quality Control Station",
    capacity: 15,
    setupTime: 5,
  },
]

export function WorkstationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workstation Settings</CardTitle>
        <CardDescription>Configure workstation types and capacities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workstationTypes.map((station) => (
            <div key={station.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">{station.name}</h4>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`capacity-${station.id}`}>Daily Capacity</Label>
                  <Input id={`capacity-${station.id}`} type="number" defaultValue={station.capacity} min="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`setup-${station.id}`}>Setup Time (min)</Label>
                  <Input id={`setup-${station.id}`} type="number" defaultValue={station.setupTime} min="0" />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            Add Workstation Type
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
