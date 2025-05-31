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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DentistLayout } from "@/components/layouts/dentist-layout"
import { Users, Search, FileText, Calendar, AlertTriangle, Heart } from "lucide-react"

export default function DentistPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 34,
      phone: "+1 (555) 123-4567",
      email: "john@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-20",
      riskLevel: "low",
      conditions: ["Gingivitis"],
      allergies: ["Penicillin"],
      treatments: [
        { date: "2024-01-15", type: "Routine Checkup", notes: "Good oral health" },
        { date: "2023-12-10", type: "Cleaning", notes: "Minor plaque buildup" },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 28,
      phone: "+1 (555) 234-5678",
      email: "sarah@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-15",
      riskLevel: "medium",
      conditions: ["Cavity", "Sensitive teeth"],
      allergies: ["Latex"],
      treatments: [
        { date: "2024-01-10", type: "Filling", notes: "Composite filling on molar" },
        { date: "2023-11-20", type: "Consultation", notes: "Discussed treatment options" },
      ],
    },
    {
      id: 3,
      name: "Mike Wilson",
      age: 45,
      phone: "+1 (555) 345-6789",
      email: "mike@email.com",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-03-01",
      riskLevel: "high",
      conditions: ["Periodontal disease", "Tooth decay"],
      allergies: ["None"],
      treatments: [
        { date: "2024-01-08", type: "Deep Cleaning", notes: "Significant tartar removal" },
        { date: "2023-10-15", type: "Root Canal", notes: "Successful procedure" },
      ],
    },
  ]

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DentistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Patients</h1>
            <p className="text-gray-600">Manage patient records and treatment history</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.filter((p) => p.riskLevel === "high").length}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.filter((p) => p.nextAppointment).length}</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treatments</CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.reduce((sum, p) => sum + p.treatments.length, 0)}</div>
              <p className="text-xs text-muted-foreground">Total completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>View and manage your patient information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{patient.phone}</div>
                        <div className="text-gray-500">{patient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {patient.conditions.slice(0, 2).map((condition, idx) => (
                          <div key={idx}>{condition}</div>
                        ))}
                        {patient.conditions.length > 2 && (
                          <div className="text-gray-500">+{patient.conditions.length - 2} more</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                            <FileText className="h-4 w-4 mr-1" />
                            View Records
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>{patient.name} - Medical Records</DialogTitle>
                            <DialogDescription>Complete patient information and treatment history</DialogDescription>
                          </DialogHeader>

                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="treatments">Treatments</TabsTrigger>
                              <TabsTrigger value="notes">Notes</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Patient Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <div>Age: {patient.age}</div>
                                    <div>Phone: {patient.phone}</div>
                                    <div>Email: {patient.email}</div>
                                    <div>
                                      Risk Level:{" "}
                                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Medical Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <strong>Conditions:</strong>
                                      <ul className="list-disc list-inside ml-2">
                                        {patient.conditions.map((condition, idx) => (
                                          <li key={idx}>{condition}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <strong>Allergies:</strong>
                                      <ul className="list-disc list-inside ml-2">
                                        {patient.allergies.map((allergy, idx) => (
                                          <li key={idx}>{allergy}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="treatments" className="space-y-4">
                              <div className="space-y-3">
                                {patient.treatments.map((treatment, idx) => (
                                  <div key={idx} className="p-3 border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                      <h5 className="font-medium">{treatment.type}</h5>
                                      <span className="text-sm text-gray-500">{treatment.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{treatment.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="notes" className="space-y-4">
                              <div className="space-y-3">
                                <div className="p-3 border rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-medium">Treatment Plan</h5>
                                    <span className="text-sm text-gray-500">2024-01-15</span>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    Continue regular checkups every 6 months. Monitor gingivitis progression.
                                  </p>
                                </div>
                                <div className="p-3 border rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-medium">Follow-up Required</h5>
                                    <span className="text-sm text-gray-500">2024-01-10</span>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    Schedule follow-up in 2 weeks to check filling integrity.
                                  </p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
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
