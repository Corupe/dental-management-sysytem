import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Phone, DollarSign, Clock, UserPlus, Bell } from "lucide-react"
import { ReceptionistLayout } from "@/components/layouts/receptionist-layout"

export default function ReceptionistDashboard() {
  const todayStats = {
    appointments: 18,
    newPatients: 3,
    payments: 8,
    calls: 12,
  }

  const upcomingAppointments = [
    {
      time: "09:00 AM",
      patient: "John Smith",
      dentist: "Dr. Johnson",
      type: "Checkup",
      status: "confirmed",
    },
    {
      time: "09:30 AM",
      patient: "Sarah Wilson",
      dentist: "Dr. Chen",
      type: "Cleaning",
      status: "pending",
    },
    {
      time: "10:00 AM",
      patient: "Mike Davis",
      dentist: "Dr. Johnson",
      type: "Filling",
      status: "confirmed",
    },
  ]

  const pendingTasks = [
    { task: "Confirm tomorrow's appointments", priority: "high", count: 8 },
    { task: "Process insurance claims", priority: "medium", count: 5 },
    { task: "Update patient records", priority: "low", count: 12 },
    { task: "Send payment reminders", priority: "medium", count: 3 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ReceptionistLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reception Dashboard</h1>
          <p className="text-gray-600">Manage appointments, patients, and daily operations</p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.appointments}</div>
              <p className="text-xs text-muted-foreground">3 pending confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Patients</CardTitle>
              <UserPlus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.newPatients}</div>
              <p className="text-xs text-muted-foreground">Registered today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payments Processed</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.payments}</div>
              <p className="text-xs text-muted-foreground">$2,450 total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phone Calls</CardTitle>
              <Phone className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.calls}</div>
              <p className="text-xs text-muted-foreground">2 callbacks needed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Next Appointments
              </CardTitle>
              <CardDescription>Upcoming appointments requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{appointment.time}</span>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <p className="text-sm font-medium">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">
                        {appointment.dentist} • {appointment.type}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Pending Tasks
              </CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{task.task}</span>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{task.count} items</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Start
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
            <CardDescription>Common reception tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Book Appointment
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <UserPlus className="h-6 w-6" />
                Register Patient
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <DollarSign className="h-6 w-6" />
                Process Payment
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Phone className="h-6 w-6" />
                Call Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ReceptionistLayout>
  )
}
