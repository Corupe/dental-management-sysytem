"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientLayout } from "@/components/layouts/patient-layout"
import { Download, Calendar, Heart, AlertTriangle, Pill } from "lucide-react"

export default function PatientRecords() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  const medicalHistory = {
    allergies: ["Penicillin", "Latex"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    surgeries: ["Appendectomy (2015)"],
  }

  const treatmentHistory = [
    {
      id: 1,
      date: "2024-01-15",
      dentist: "Dr. Johnson",
      procedure: "Routine Checkup",
      findings: "Good oral health, minor plaque buildup",
      treatment: "Professional cleaning and fluoride treatment",
      notes: "Continue current oral hygiene routine. Next checkup in 6 months.",
      cost: 150,
    },
    {
      id: 2,
      date: "2023-07-20",
      dentist: "Dr. Johnson",
      procedure: "Dental Filling",
      findings: "Cavity detected on upper right molar (#3)",
      treatment: "Composite filling placed",
      notes: "Filling completed successfully. Avoid hard foods for 24 hours.",
      cost: 250,
    },
    {
      id: 3,
      date: "2023-01-10",
      dentist: "Dr. Johnson",
      procedure: "Routine Checkup",
      findings: "Excellent oral hygiene maintained",
      treatment: "Routine cleaning",
      notes: "Patient maintains excellent oral health. Continue current routine.",
      cost: 150,
    },
  ]

  const xrayHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Bitewing X-rays",
      findings: "No new cavities detected. Previous filling intact.",
      dentist: "Dr. Johnson",
    },
    {
      id: 2,
      date: "2023-07-20",
      type: "Periapical X-ray",
      findings: "Cavity confirmed on tooth #3. Root structure healthy.",
      dentist: "Dr. Johnson",
    },
  ]

  const labResults = [
    {
      id: 1,
      date: "2024-01-15",
      test: "Oral Cancer Screening",
      result: "Negative",
      status: "Normal",
    },
    {
      id: 2,
      date: "2023-07-20",
      test: "Periodontal Assessment",
      result: "Mild Gingivitis",
      status: "Attention Needed",
    },
  ]

  const prescriptions = [
    {
      id: 1,
      date: "2023-07-20",
      medication: "Amoxicillin 500mg",
      dosage: "3 times daily for 7 days",
      purpose: "Post-filling antibiotic",
      prescriber: "Dr. Johnson",
      status: "Completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "attention needed":
        return "bg-yellow-100 text-yellow-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <p className="text-gray-600">View your complete dental and medical history</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Records
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="xrays">X-Rays</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Medical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Allergies
                    </h4>
                    {medicalHistory.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {medicalHistory.allergies.map((allergy, idx) => (
                          <Badge key={idx} variant="destructive">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No known allergies</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Pill className="h-4 w-4 text-blue-500" />
                      Current Medications
                    </h4>
                    {medicalHistory.medications.length > 0 ? (
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {medicalHistory.medications.map((medication, idx) => (
                          <li key={idx}>{medication}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No current medications</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Medical Conditions</h4>
                    {medicalHistory.conditions.length > 0 ? (
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {medicalHistory.conditions.map((condition, idx) => (
                          <li key={idx}>{condition}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No medical conditions</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Previous Surgeries</h4>
                    {medicalHistory.surgeries.length > 0 ? (
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {medicalHistory.surgeries.map((surgery, idx) => (
                          <li key={idx}>{surgery}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No previous surgeries</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {treatmentHistory.slice(0, 3).map((treatment) => (
                      <div key={treatment.id} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{treatment.procedure}</h4>
                          <span className="text-xs text-gray-500">{treatment.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{treatment.dentist}</p>
                        <p className="text-xs text-gray-500">{treatment.findings}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatments">
            <div className="space-y-4">
              {treatmentHistory.map((treatment) => (
                <Card key={treatment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{treatment.procedure}</CardTitle>
                        <CardDescription>{treatment.dentist} • {treatment.date}</CardDescription>
                      </div>
                      <Badge variant="outline">${treatment.cost}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Findings</h4>
                      <p className="text-sm text-gray-600">{treatment.findings}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Treatment</h4>
                      <p className="text-sm text-gray-600">{treatment.treatment}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Notes</h4>
                      <p className="text-sm text-gray-600">{treatment.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="xrays">
            <div className="space-y-4">
              {xrayHistory.map((xray) => (
                <Card key={xray.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{xray.type}</CardTitle>
                        <CardDescription>{xray.dentist} • {xray.date}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        View Image
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Findings</h4>
                      <p className="text-sm text-gray-600">{xray.findings}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="labs">
            <div className="space-y-4">
              {labResults.map((lab) => (
                <Card key={lab.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{lab.test}</CardTitle>
                        <CardDescription>{lab.date}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(lab.status)}>{lab.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Result</h4>
                      <p className="text-sm text-gray-600">{lab.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                        <CardDescription>{prescription.prescriber} • {prescription.date}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Dosage</h4>
                      <p className="text-sm text-gray-600">{prescription.dosage}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Purpose</h4>
                      <p className="text-sm text-gray-600">{prescription.purpose}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs
