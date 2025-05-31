import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, FileText, Stethoscope, AlertCircle } from "lucide-react"
import { DentistLayout } from "@/components/layouts/dentist-layout"

export default function DentistDashboard() {
  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "John Smith",
      type: "Routine Checkup",
      status: "confirmed",
      duration: "30 min",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Sarah Johnson",
      type: "Root Canal",
      status: "in-progress",
      duration: "90 min",
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Mike Wilson",
      type: "Teeth Cleaning",
      status: "confirmed",
      duration: "45 min",
    },
    {
      id: 4,
      time: "03:30 PM",
      patient: "Lisa Anderson",
      type: "Filling",
      status: "pending",
      duration: "60 min",
    },
  ]

  const recentPatients = [
    { name: "Emma Davis", lastVisit: "2024-01-10", condition: "Cavity treatment completed" },
    { name: "Robert Chen", lastVisit: "2024-01-08", condition: "Crown placement scheduled" },
    { name: "Maria Garcia", lastVisit: "2024-01-05", condition: "Orthodontic consultation" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DentistLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Good morning, Dr. Smith!</h1>
          <p className="text-gray-600">You have 4 appointments scheduled for today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 completed, 2 remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Treatment notes to complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Cases</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{appointment.time}</span>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <p className="text-sm font-medium">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">
                        {appointment.type} • {appointment.duration}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Recent Patients
              </CardTitle>
              <CardDescription>Patients you've seen recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                      <p className="text-xs text-gray-400">{patient.condition}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Records
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                Add Treatment Note
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                View Patient Records
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Schedule Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DentistLayout>
  )
}
