"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ReceptionistLayout } from "@/components/layouts/receptionist-layout"
import { UserCheck, Search, Clock, CheckCircle, AlertCircle, User } from "lucide-react"

export default function ReceptionistCheckin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "John Smith",
      phone: "+1 (555) 123-4567",
      type: "Routine Checkup",
      dentist: "Dr. Johnson",
      status: "waiting",
      checkedIn: false,
      insuranceVerified: false,
    },
    {
      id: 2,
      time: "09:30",
      patient: "Sarah Wilson",
      phone: "+1 (555) 234-5678",
      type: "Root Canal",
      dentist: "Dr. Chen",
      status: "checked-in",
      checkedIn: true,
      insuranceVerified: true,
    },
    {
      id: 3,
      time: "10:30",
      patient: "Mike Davis",
      phone: "+1 (555) 345-6789",
      type: "Teeth Cleaning",
      dentist: "Dr. Johnson",
      status: "in-treatment",
      checkedIn: true,
      insuranceVerified: true,
    },
    {
      id: 4,
      time: "11:15",
      patient: "Lisa Brown",
      phone: "+1 (555) 456-7890",
      type: "Consultation",
      dentist: "Dr. Chen",
      status: "waiting",
      checkedIn: false,
      insuranceVerified: false,
    },
  ]

  const filteredAppointments = todayAppointments.filter((appointment) =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800"
      case "checked-in":
        return "bg-blue-100 text-blue-800"
      case "in-treatment":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting":
        return <Clock className="h-4 w-4" />
      case "checked-in":
        return <UserCheck className="h-4 w-4" />
      case "in-treatment":
        return <User className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const handleCheckIn = (appointmentId: number) => {
    // In a real app, this would update the appointment status
    console.log("Checking in appointment:", appointmentId)
  }

  const waitingCount = todayAppointments.filter((a) => a.status === "waiting").length
  const checkedInCount = todayAppointments.filter((a) => a.status === "checked-in").length
  const inTreatmentCount = todayAppointments.filter((a) => a.status === "in-treatment").length

  return (
    <ReceptionistLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Patient Check-in</h1>
          <p className="text-gray-600">Manage patient arrivals and check-in process</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waiting</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waitingCount}</div>
              <p className="text-xs text-muted-foreground">Patients waiting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checkedInCount}</div>
              <p className="text-xs text-muted-foreground">Ready for treatment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Treatment</CardTitle>
              <User className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inTreatmentCount}</div>
              <p className="text-xs text-muted-foreground">Currently with dentist</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled appointments</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Manage patient check-ins and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{appointment.time}</span>
                          <Badge className={getStatusColor(appointment.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(appointment.status)}
                              {appointment.status}
                            </div>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">{appointment.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{appointment.type}</p>
                            <p className="text-sm text-gray-600">with {appointment.dentist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Checkbox checked={appointment.checkedIn} />
                            <span>Checked In</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={appointment.insuranceVerified} />
                            <span>Insurance Verified</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {appointment.status === "waiting" && (
                          <Button size="sm" onClick={() => handleCheckIn(appointment.id)}>
                            Check In
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(appointment)}>
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Check-in Form */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Check-in</CardTitle>
              <CardDescription>Process patient check-in</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPatient ? (
                <Tabs defaultValue="checkin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="checkin">Check-in</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                  </TabsList>

                  <TabsContent value="checkin" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">{selectedPatient.patient}</h3>
                      <p className="text-sm text-gray-600">{selectedPatient.type}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="arrived" />
                        <Label htmlFor="arrived">Patient has arrived</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="insurance" />
                        <Label htmlFor="insurance">Insurance verified</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="forms" />
                        <Label htmlFor="forms">Forms completed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="payment" />
                        <Label htmlFor="payment">Payment method confirmed</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Check-in Notes</Label>
                      <Textarea id="notes" placeholder="Any special notes or concerns..." />
                    </div>

                    <Button className="w-full">Complete Check-in</Button>
                  </TabsContent>

                  <TabsContent value="forms" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medical History Form</span>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Insurance Information</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consent Forms</span>
                        <Badge variant="outline">Not Started</Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Send Forms to Patient
                    </Button>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a patient to begin check-in process</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ReceptionistLayout>
  )
}
