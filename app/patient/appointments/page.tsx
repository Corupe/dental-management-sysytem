"use client";

import type React from "react";

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
import { PatientLayout } from "../../../components/layouts/patient-layout";
import { CalendarIcon, Clock, Plus, Loader2 } from "lucide-react";
import { useAppointments } from "../../../hooks/use-appointments";
import { useUsers } from "../../../hooks/use-users";
import { Alert, AlertDescription } from "../../../components/ui/alert";

export default function PatientAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    dentistId: "",
    date: "",
    time: "",
    type: "",
    notes: "",
  });

  const {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();
  const { users: dentists } = useUsers("dentist");

  const availableSlots = [
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      ...formData,
      status: "pending",
      duration: 30,
    };

    const success = await createAppointment(appointmentData);
    if (success) {
      setIsBookingOpen(false);
      setFormData({
        dentistId: "",
        date: "",
        time: "",
        type: "",
        notes: "",
      });
    }
  };

  const handleCancel = async (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      await updateAppointment(id, { status: "cancelled" });
    }
  };

  const handleReschedule = async (id: string) => {
    // In a real app, this would open a reschedule dialog
    alert("Reschedule functionality would open a dialog here");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-gray-600">Manage your dental appointments</p>
          </div>

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
                  Schedule your next dental visit
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setFormData({
                            ...formData,
                            date: date?.toISOString().split("T")[0] || "",
                          });
                        }}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dentist">Dentist</Label>
                      <Select
                        value={formData.dentistId}
                        onValueChange={(value) =>
                          setFormData({ ...formData, dentistId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose dentist" />
                        </SelectTrigger>
                        <SelectContent>
                          {dentists.map((dentist: any) => (
                            <SelectItem key={dentist._id} value={dentist._id}>
                              Dr. {dentist.firstName} {dentist.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
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

                    <div>
                      <Label>Available Times</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={
                              formData.time === slot ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setFormData({ ...formData, time: slot })
                            }
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsBookingOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !formData.dentistId ||
                      !formData.date ||
                      !formData.time ||
                      !formData.type
                    }
                  >
                    Book Appointment
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled dental visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No appointments scheduled. Book your first appointment!
                    </div>
                  ) : (
                    appointments.map((appointment: any) => (
                      <div
                        key={appointment._id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">
                              {appointment.date}
                            </span>
                            <Clock className="h-4 w-4 text-gray-500 ml-2" />
                            <span>{appointment.time}</span>
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">
                            {appointment.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            Dr. {appointment.dentistName || "TBD"} •{" "}
                            {appointment.duration || 30} min
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReschedule(appointment._id)}
                            disabled={
                              appointment.status === "cancelled" ||
                              appointment.status === "completed"
                            }
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancel(appointment._id)}
                            disabled={
                              appointment.status === "cancelled" ||
                              appointment.status === "completed"
                            }
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Emergency Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Appointment History
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Appointment Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Please arrive 15 minutes early</p>
                <p>• Bring your insurance card</p>
                <p>• Cancel at least 24 hours in advance</p>
                <p>• Emergency appointments available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
