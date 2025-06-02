"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Calendar } from "../../../components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { ReceptionistLayout } from "../../../components/layouts/receptionist-layout";
import { CalendarIcon, Clock, Plus, Phone, User, Edit } from "lucide-react";

export default function ReceptionistAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [viewMode, setViewMode] = useState("day");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const appointments = [
    {
      id: 1,
      time: "09:00",
      duration: 30,
      patient: "John Smith",
      phone: "+1 (555) 123-4567",
      dentist: "Dr. Johnson",
      type: "Routine Checkup",
      status: "confirmed",
      notes: "Regular 6-month checkup",
    },
    {
      id: 2,
      time: "09:30",
      duration: 60,
      patient: "Sarah Wilson",
      phone: "+1 (555) 234-5678",
      dentist: "Dr. Chen",
      type: "Root Canal",
      status: "confirmed",
      notes: "Follow-up appointment",
    },
    {
      id: 3,
      time: "10:30",
      duration: 45,
      patient: "Mike Davis",
      phone: "+1 (555) 345-6789",
      dentist: "Dr. Johnson",
      type: "Teeth Cleaning",
      status: "pending",
      notes: "New patient",
    },
    {
      id: 4,
      time: "11:15",
      duration: 30,
      patient: "Lisa Brown",
      phone: "+1 (555) 456-7890",
      dentist: "Dr. Chen",
      type: "Consultation",
      status: "confirmed",
      notes: "Orthodontic consultation",
    },
    {
      id: 5,
      time: "14:00",
      duration: 90,
      patient: "David Wilson",
      phone: "+1 (555) 567-8901",
      dentist: "Dr. Johnson",
      type: "Crown Placement",
      status: "confirmed",
      notes: "Crown placement procedure",
    },
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const dentists = [
    { id: "1", name: "Dr. Johnson" },
    { id: "2", name: "Dr. Chen" },
    { id: "3", name: "Dr. Smith" },
  ];

  const appointmentTypes = [
    "Routine Checkup",
    "Teeth Cleaning",
    "Dental Filling",
    "Root Canal",
    "Crown Placement",
    "Tooth Extraction",
    "Consultation",
    "Emergency",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeSlotColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-l-green-500 bg-green-50";
      case "pending":
        return "border-l-yellow-500 bg-yellow-50";
      case "completed":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <ReceptionistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Appointment Management</h1>
            <p className="text-gray-600">
              Schedule and manage patient appointments
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day View</SelectItem>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                  <DialogDescription>
                    Schedule an appointment for a patient
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patient">Patient Name</Label>
                      <Input id="patient" placeholder="Enter patient name" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dentist">Dentist</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dentist" />
                        </SelectTrigger>
                        <SelectContent>
                          {dentists.map((dentist) => (
                            <SelectItem key={dentist.id} value={dentist.id}>
                              {dentist.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes or special instructions"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsBookingOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Book Appointment</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Confirmed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Cancelled</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Schedule */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Daily Schedule - {selectedDate?.toLocaleDateString()}
              </CardTitle>
              <CardDescription>Manage today's appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 border-l-4 rounded-lg ${getTimeSlotColor(
                      appointment.status
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">
                              {appointment.time} ({appointment.duration} min)
                            </span>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">
                                {appointment.patient}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{appointment.phone}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {appointment.type}
                            </p>
                            <p className="text-sm text-gray-600">
                              with {appointment.dentist}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              {appointment.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {appointment.status === "pending" && (
                          <Button size="sm">Confirm</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">
                {appointments.filter((a) => a.status === "confirmed").length}{" "}
                confirmed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Confirmations
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Need to confirm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Slots
              </CardTitle>
              <Plus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {timeSlots.length - appointments.length}
              </div>
              <p className="text-xs text-muted-foreground">Open time slots</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Appointment
              </CardTitle>
              <User className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{appointments[0]?.time}</div>
              <p className="text-xs text-muted-foreground">
                {appointments[0]?.patient}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ReceptionistLayout>
  );
}
