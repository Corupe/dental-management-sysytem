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
import { DentistLayout } from "../../../components/layouts/dentist-layout";
import { CalendarIcon, Clock, User, FileText, Phone } from "lucide-react";

export default function DentistAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [viewMode, setViewMode] = useState("day");

  const appointments = [
    {
      id: 1,
      time: "09:00",
      duration: 30,
      patient: "John Smith",
      phone: "+1 (555) 123-4567",
      type: "Routine Checkup",
      status: "confirmed",
      notes: "Regular 6-month checkup",
    },
    {
      id: 2,
      time: "09:30",
      duration: 60,
      patient: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      type: "Root Canal",
      status: "confirmed",
      notes: "Follow-up for root canal treatment",
    },
    {
      id: 3,
      time: "11:00",
      duration: 45,
      patient: "Mike Wilson",
      phone: "+1 (555) 345-6789",
      type: "Teeth Cleaning",
      status: "pending",
      notes: "First visit, new patient",
    },
    {
      id: 4,
      time: "14:00",
      duration: 90,
      patient: "Lisa Anderson",
      phone: "+1 (555) 456-7890",
      type: "Crown Placement",
      status: "confirmed",
      notes: "Crown placement for molar",
    },
    {
      id: 5,
      time: "15:30",
      duration: 30,
      patient: "David Brown",
      phone: "+1 (555) 567-8901",
      type: "Consultation",
      status: "pending",
      notes: "Orthodontic consultation",
    },
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
    <DentistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-gray-600">
              Manage your daily schedule and patient appointments
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
            <Button>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule
            </Button>
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
              </div>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule - {selectedDate?.toLocaleDateString()}
              </CardTitle>
              <CardDescription>
                Your appointments for the selected day
              </CardDescription>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              {appointment.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Notes
                        </Button>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Patient
                        </Button>
                        {appointment.status === "pending" && (
                          <Button size="sm">Confirm</Button>
                        )}
                        {appointment.status === "confirmed" && (
                          <Button size="sm">Start</Button>
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
                Total Duration
              </CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.reduce((sum, apt) => sum + apt.duration, 0)} min
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  appointments.reduce((sum, apt) => sum + apt.duration, 0) / 60
                )}{" "}
                hours total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Need confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Patient
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
    </DentistLayout>
  );
}
