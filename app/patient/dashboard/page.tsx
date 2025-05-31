import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, DollarSign, Clock, Download, Upload } from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"

export default function PatientDashboard() {
  const upcomingAppointments = [
    {
      date: "2024-01-20",
      time: "10:00 AM",
      dentist: "Dr. Sarah Johnson",
      type: "Routine Checkup",
      status: "confirmed",
    },
    {
      date: "2024-02-15",
      time: "02:30 PM",
      dentist: "Dr. Robert Chen",
      type: "Teeth Cleaning",
      status: "pending",
    },
  ]

  const recentTreatments = [
    {
      date: "2024-01-05",
      treatment: "Dental Filling",
      dentist: "Dr. Johnson",
      status: "completed",
    },
    {
      date: "2023-12-20",
      treatment: "Routine Checkup",
      dentist: "Dr. Johnson",
      status: "completed",
    },
  ]

  const pendingBills = [
    {
      id: "INV-001",
      date: "2024-01-05",
      amount: "$150.00",
      description: "Dental Filling",
      status: "pending",
    },
    {
      id: "INV-002",
      date: "2023-12-20",
      amount: "$75.00",
      description: "Routine Checkup",
      status: "overdue",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-600">Here's an overview of your dental care</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Jan 20, 2024</div>
              <p className="text-xs text-muted-foreground">10:00 AM with Dr. Johnson</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">$225.00</div>
              <p className="text-xs text-muted-foreground">2 pending invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Jan 5, 2024</div>
              <p className="text-xs text-muted-foreground">Dental Filling</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Your scheduled dental visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{appointment.date}</span>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <p className="text-sm">
                        {appointment.time} - {appointment.type}
                      </p>
                      <p className="text-xs text-gray-500">{appointment.dentist}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Appointment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Treatments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Treatments
              </CardTitle>
              <CardDescription>Your treatment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTreatments.map((treatment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{treatment.treatment}</span>
                        <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
                      </div>
                      <p className="text-sm">{treatment.date}</p>
                      <p className="text-xs text-gray-500">{treatment.dentist}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View Full History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pending Bills
              </CardTitle>
              <CardDescription>Outstanding invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingBills.map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{bill.id}</span>
                        <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                      </div>
                      <p className="text-sm">{bill.description}</p>
                      <p className="text-xs text-gray-500">{bill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{bill.amount}</p>
                      <div className="flex gap-1 mt-1">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm">Pay</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common patient tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button className="h-16 flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Book Appointment</div>
                    <div className="text-xs opacity-70">Schedule your next visit</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 flex items-center gap-3">
                  <Upload className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Upload Documents</div>
                    <div className="text-xs opacity-70">Insurance or medical files</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-16 flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">View Records</div>
                    <div className="text-xs opacity-70">Access your medical history</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PatientLayout>
  )
}
