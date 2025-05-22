import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function StaffTraining() {
  const trainingData = [
    {
      name: "Ahmed Khan",
      role: "Cutter",
      completedTrainings: 5,
      totalTrainings: 7,
      nextTraining: "Advanced Pattern Making",
      scheduledDate: "2023-06-15",
      certifications: ["Basic Cutting", "Pattern Making", "Fabric Knowledge"],
    },
    {
      name: "Fatima Saeed",
      role: "Tailor",
      completedTrainings: 4,
      totalTrainings: 6,
      nextTraining: "Advanced Embroidery",
      scheduledDate: "2023-06-20",
      certifications: ["Basic Sewing", "Machine Operation", "Quality Standards"],
    },
    {
      name: "Mohammed Ali",
      role: "Embroiderer",
      completedTrainings: 6,
      totalTrainings: 8,
      nextTraining: "Digital Embroidery Systems",
      scheduledDate: "2023-06-25",
      certifications: ["Basic Embroidery", "Advanced Embroidery", "Design Software"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Training</CardTitle>
        <CardDescription>Training progress and upcoming sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trainingData.map((staff, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{staff.name}</h4>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
                </div>
                <div className="text-sm text-right">
                  <div>Next: {staff.nextTraining}</div>
                  <div className="text-muted-foreground">{new Date(staff.scheduledDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>Training Progress</div>
                <div>
                  {staff.completedTrainings}/{staff.totalTrainings} Completed
                </div>
              </div>
              <Progress value={(staff.completedTrainings / staff.totalTrainings) * 100} />
              <div className="flex flex-wrap gap-1 pt-2">
                {staff.certifications.map((cert, i) => (
                  <Badge key={i} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
              {index < trainingData.length - 1 && <div className="border-t my-4"></div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
