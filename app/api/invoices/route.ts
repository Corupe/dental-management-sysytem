import { type NextRequest, NextResponse } from "next/server"
import { createInvoice, getInvoices } from "@/lib/database-operations"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")
    const status = searchParams.get("status")

    const filter: any = {}

    if (session.user.role === "patient") {
      filter.patientId = session.user.id
    } else if (patientId) {
      filter.patientId = patientId
    }

    if (status) {
      filter.status = status
    }

    const invoices = await getInvoices(filter)
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || !["admin", "receptionist"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const invoiceData = await request.json()
    const invoice = await createInvoice(invoiceData)

    return NextResponse.json({ message: "Invoice created successfully", invoice })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
