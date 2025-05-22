import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye } from "lucide-react"
import Link from "next/link"

export function PackagingInstructions() {
  const packagingInstructions = [
    {
      id: "PKG-001",
      clientName: "Ahmed Al Nahyan",
      clientType: "VIP Individual",
      garmentType: "Kandura",
      instructions: "Hang delivery, use premium garment bag, include care instructions in Arabic and English",
      lastUpdated: "2023-04-15",
    },
    {
      id: "PKG-002",
      clientName: "Sheikha Fatima",
      clientType: "VIP Individual",
      garmentType: "Abaya",
      instructions:
        "Fold with acid-free tissue paper, use premium box with gold embossing, include personalized thank you note",
      lastUpdated: "2023-04-20",
    },
    {
      id: "PKG-003",
      clientName: "Emirates International School",
      clientType: "Institution",
      garmentType: "School Uniform",
      instructions: "Group by size and class, use clear plastic bags with size labels, include bulk delivery note",
      lastUpdated: "2023-04-25",
    },
    {
      id: "PKG-004",
      clientName: "Etihad Airways",
      clientType: "Corporate",
      garmentType: "Corporate Uniform",
      instructions: "Group by department and size, use branded garment bags, include employee name tags",
      lastUpdated: "2023-04-30",
    },
    {
      id: "PKG-005",
      clientName: "Dubai Mall Boutique",
      clientType: "Retail",
      garmentType: "Casual Kandura",
      instructions: "Use branded shopping bags, include store tags and care instructions, add promotional materials",
      lastUpdated: "2023-05-05",
    },
  ]

  const getClientTypeColor = (clientType: string) => {
    switch (clientType) {
      case "VIP Individual":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Institution":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Corporate":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Retail":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Client Type</TableHead>
          <TableHead>Garment Type</TableHead>
          <TableHead>Packaging Instructions</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packagingInstructions.map((instruction) => (
          <TableRow key={instruction.id}>
            <TableCell className="font-medium">{instruction.id}</TableCell>
            <TableCell>{instruction.clientName}</TableCell>
            <TableCell>
              <Badge className={getClientTypeColor(instruction.clientType)} variant="outline">
                {instruction.clientType}
              </Badge>
            </TableCell>
            <TableCell>{instruction.garmentType}</TableCell>
            <TableCell className="max-w-[300px]">{instruction.instructions}</TableCell>
            <TableCell>{new Date(instruction.lastUpdated).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/manufacturing/finishing/packaging-instructions/${instruction.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/manufacturing/finishing/packaging-instructions/${instruction.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
