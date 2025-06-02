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
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { DentistLayout } from "../../../components/layouts/dentist-layout";
import {
  Stethoscope,
  Search,
  FileText,
  AlertTriangle,
  Heart,
  Calendar,
} from "lucide-react";

export default function DentistHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 34,
      lastVisit: "2024-01-15",
      totalVisits: 12,
      medicalHistory: {
        allergies: ["Penicillin"],
        medications: ["Lisinopril", "Metformin"],
        conditions: ["Diabetes Type 2", "Hypertension"],
        surgeries: ["Appendectomy (2015)"],
      },
      dentalHistory: [
        {
          date: "2024-01-15",
          procedure: "Routine Checkup",
          findings: "Good oral health, minor plaque buildup",
          treatment: "Professional cleaning",
          dentist: "Dr. Johnson",
        },
        {
          date: "2023-07-20",
          procedure: "Dental Filling",
          findings: "Cavity on upper right molar",
          treatment: "Composite filling placed",
          dentist: "Dr. Johnson",
        },
        {
          date: "2023-01-10",
          procedure: "Routine Checkup",
          findings: "Excellent oral hygiene",
          treatment: "Routine cleaning and fluoride treatment",
          dentist: "Dr. Johnson",
        },
      ],
      xrays: [
        {
          date: "2024-01-15",
          type: "Bitewing",
          findings: "No cavities detected",
        },
        {
          date: "2023-07-20",
          type: "Periapical",
          findings: "Cavity confirmed on tooth #3",
        },
      ],
      notes: [
        {
          date: "2024-01-15",
          note: "Patient maintains excellent oral hygiene. Recommend continuing current routine.",
        },
        {
          date: "2023-07-20",
          note: "Patient was anxious about filling procedure. Procedure completed successfully.",
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 28,
      lastVisit: "2024-01-10",
      totalVisits: 8,
      medicalHistory: {
        allergies: ["Latex"],
        medications: ["Birth Control"],
        conditions: ["None"],
        surgeries: ["None"],
      },
      dentalHistory: [
        {
          date: "2024-01-10",
          procedure: "Root Canal",
          findings: "Infected pulp in lower left premolar",
          treatment: "Root canal therapy initiated",
          dentist: "Dr. Johnson",
        },
        {
          date: "2023-12-15",
          procedure: "Emergency Visit",
          findings: "Severe tooth pain, possible infection",
          treatment: "Antibiotics prescribed, root canal scheduled",
          dentist: "Dr. Johnson",
        },
      ],
      xrays: [
        {
          date: "2024-01-10",
          type: "Periapical",
          findings: "Root canal treatment progress",
        },
        {
          date: "2023-12-15",
          type: "Periapical",
          findings: "Infection confirmed",
        },
      ],
      notes: [
        {
          date: "2024-01-10",
          note: "Root canal procedure going well. Second appointment scheduled for completion.",
        },
      ],
    },
  ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskLevel = (patient: any) => {
    const conditions = patient.medicalHistory.conditions.length;
    const allergies = patient.medicalHistory.allergies.length;
    if (conditions > 1 || allergies > 1) return "high";
    if (conditions > 0 || allergies > 0) return "medium";
    return "low";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DentistLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Medical History</h1>
          <p className="text-gray-600">
            Comprehensive patient medical and dental records
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => {
            const riskLevel = getRiskLevel(patient);
            return (
              <Card
                key={patient.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>
                        Age: {patient.age} • {patient.totalVisits} visits
                      </CardDescription>
                    </div>
                    <Badge className={getRiskColor(riskLevel)}>
                      {riskLevel} risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                      <span>
                        {patient.medicalHistory.allergies.length > 0
                          ? `Allergies: ${patient.medicalHistory.allergies.join(
                              ", "
                            )}`
                          : "No known allergies"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-gray-500" />
                      <span>
                        {patient.medicalHistory.conditions.length > 0
                          ? `${patient.medicalHistory.conditions.length} medical condition(s)`
                          : "No medical conditions"}
                      </span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full mt-4"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Full History
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {patient.name} - Complete Medical History
                        </DialogTitle>
                        <DialogDescription>
                          Comprehensive patient records and treatment history
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="medical" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="medical">Medical</TabsTrigger>
                          <TabsTrigger value="dental">Dental</TabsTrigger>
                          <TabsTrigger value="xrays">X-Rays</TabsTrigger>
                          <TabsTrigger value="notes">Notes</TabsTrigger>
                        </TabsList>

                        <TabsContent value="medical" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">
                                  Allergies
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {patient.medicalHistory.allergies.length > 0 ? (
                                  <ul className="list-disc list-inside text-sm">
                                    {patient.medicalHistory.allergies.map(
                                      (allergy: string, idx: number) => (
                                        <li key={idx}>{allergy}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No known allergies
                                  </p>
                                )}
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">
                                  Current Medications
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {patient.medicalHistory.medications.length >
                                0 ? (
                                  <ul className="list-disc list-inside text-sm">
                                    {patient.medicalHistory.medications.map(
                                      (medication: string, idx: number) => (
                                        <li key={idx}>{medication}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No current medications
                                  </p>
                                )}
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">
                                  Medical Conditions
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {patient.medicalHistory.conditions.length >
                                0 ? (
                                  <ul className="list-disc list-inside text-sm">
                                    {patient.medicalHistory.conditions.map(
                                      (condition: string, idx: number) => (
                                        <li key={idx}>{condition}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No medical conditions
                                  </p>
                                )}
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">
                                  Previous Surgeries
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {patient.medicalHistory.surgeries.length > 0 ? (
                                  <ul className="list-disc list-inside text-sm">
                                    {patient.medicalHistory.surgeries.map(
                                      (surgery: string, idx: number) => (
                                        <li key={idx}>{surgery}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No previous surgeries
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="dental" className="space-y-4">
                          <div className="space-y-3">
                            {patient.dentalHistory.map(
                              (record: any, idx: number) => (
                                <Card key={idx}>
                                  <CardHeader>
                                    <div className="flex justify-between items-start">
                                      <CardTitle className="text-sm">
                                        {record.procedure}
                                      </CardTitle>
                                      <span className="text-xs text-gray-500">
                                        {record.date}
                                      </span>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="text-sm space-y-2">
                                    <div>
                                      <strong>Findings:</strong>{" "}
                                      {record.findings}
                                    </div>
                                    <div>
                                      <strong>Treatment:</strong>{" "}
                                      {record.treatment}
                                    </div>
                                    <div>
                                      <strong>Dentist:</strong> {record.dentist}
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="xrays" className="space-y-4">
                          <div className="space-y-3">
                            {patient.xrays.map((xray: any, idx: number) => (
                              <Card key={idx}>
                                <CardHeader>
                                  <div className="flex justify-between items-start">
                                    <CardTitle className="text-sm">
                                      {xray.type} X-Ray
                                    </CardTitle>
                                    <span className="text-xs text-gray-500">
                                      {xray.date}
                                    </span>
                                  </div>
                                </CardHeader>
                                <CardContent className="text-sm">
                                  <div>
                                    <strong>Findings:</strong> {xray.findings}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="notes" className="space-y-4">
                          <div className="space-y-3">
                            {patient.notes.map((note: any, idx: number) => (
                              <Card key={idx}>
                                <CardHeader>
                                  <CardTitle className="text-sm">
                                    Clinical Note
                                  </CardTitle>
                                  <span className="text-xs text-gray-500">
                                    {note.date}
                                  </span>
                                </CardHeader>
                                <CardContent className="text-sm">
                                  {note.note}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Stethoscope className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground">In your care</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {patients.filter((p) => getRiskLevel(p) === "high").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need special attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Visits
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  patients.filter(
                    (p) =>
                      new Date(p.lastVisit) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Visits</CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  patients.reduce((sum, p) => sum + p.totalVisits, 0) /
                    patients.length
                )}
              </div>
              <p className="text-xs text-muted-foreground">Per patient</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DentistLayout>
  );
}
