import { type NextRequest, NextResponse } from "next/server"
import { createAppointment, getAppointments } from "@/lib/database-operations"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")
    const dentistId = searchParams.get("dentistId")
    const date = searchParams.get("date")

    const filter: any = {}

    if (session.user.role === "patient") {
      filter.patientId = session.user.id
    } else if (session.user.role === "dentist") {
      filter.dentistId = session.user.id
    } else if (patientId) {
      filter.patientId = patientId
    } else if (dentistId) {
      filter.dentistId = dentistId
    }

    if (date) {
      filter.date = date
    }

    const appointments = await getAppointments(filter)
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const appointmentData = await request.json()

    // If patient is creating appointment, set their ID
    if (session.user.role === "patient") {
      appointmentData.patientId = session.user.id
    }

    const appointment = await createAppointment(appointmentData)
    return NextResponse.json({ message: "Appointment created successfully", appointment })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
