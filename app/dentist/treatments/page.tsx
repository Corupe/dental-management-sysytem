"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DentistLayout } from "@/components/layouts/dentist-layout"
import { FileText, Plus, Search, Calendar, User, DollarSign } from "lucide-react"

export default function DentistTreatments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState(false)

  const treatments = [
    {
      id: 1,
      patient: "John Smith",
      date: "2024-01-15",
      type: "Dental Filling",
      tooth: "Upper Right Molar #3",
      status: "completed",
      cost: 250,
      notes: "Composite filling placed successfully. Patient advised on oral hygiene.",
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      date: "2024-01-14",
      type: "Root Canal",
      tooth: "Lower Left Premolar #20",
      status: "in-progress",
      cost: 800,
      notes: "First session completed. Second session scheduled for next week.",
    },
    {
      id: 3,
      patient: "Mike Wilson",
      date: "2024-01-12",
      type: "Crown Placement",
      tooth: "Upper Left Canine #11",
      status: "planned",
      cost: 1200,
      notes: "Impression taken. Crown ordered from lab. Placement scheduled.",
    },
    {
      id: 4,
      patient: "Lisa Anderson",
      date: "2024-01-10",
      type: "Teeth Cleaning",
      tooth: "Full Mouth",
      status: "completed",
      cost: 150,
      notes: "Routine cleaning completed. Good oral health maintained.",
    },
    {
      id: 5,
      patient: "David Brown",
      date: "2024-01-08",
      type: "Tooth Extraction",
      tooth: "Wisdom Tooth #32",
      status: "completed",
      cost: 300,
      notes: "Simple extraction. Post-op instructions given. Healing well.",
    },
  ]

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesSearch =
      treatment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || treatment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalRevenue = treatments.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.cost, 0)
  const inProgressCount = treatments.filter((t) => t.status === "in-progress").length
  const plannedCount = treatments.filter((t) => t.status === "planned").length

  return (
    <DentistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Treatment Records</h1>
            <p className="text-gray-600">Manage patient treatments and clinical notes</p>
          </div>

          <Dialog open={isAddTreatmentOpen} onOpenChange={setIsAddTreatmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Treatment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Treatment Record</DialogTitle>
                <DialogDescription>Record a new treatment for a patient</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Treatment Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Treatment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="filling">Dental Filling</SelectItem>
                        <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                        <SelectItem value="root-canal">Root Canal</SelectItem>
                        <SelectItem value="crown">Crown Placement</SelectItem>
                        <SelectItem value="extraction">Tooth Extraction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tooth">Tooth/Area</Label>
                    <Input id="tooth" placeholder="e.g., Upper Right Molar #3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cost">Cost ($)</Label>
                    <Input id="cost" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Treatment Notes</Label>
                  <Textarea id="notes" placeholder="Detailed treatment notes and observations..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddTreatmentOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Treatment</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Treatments</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{treatments.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From completed treatments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground">Active treatments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planned</CardTitle>
              <User className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plannedCount}</div>
              <p className="text-xs text-muted-foreground">Upcoming treatments</p>
            </CardContent>
          </Card>
        </div>

        {/* Treatments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Treatment History</CardTitle>
            <CardDescription>Complete record of all patient treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search treatments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Tooth/Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium">{treatment.patient}</TableCell>
                    <TableCell>{treatment.date}</TableCell>
                    <TableCell>{treatment.type}</TableCell>
                    <TableCell>{treatment.tooth}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
                    </TableCell>
                    <TableCell>${treatment.cost}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DentistLayout>
  )
}
