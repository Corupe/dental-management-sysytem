import { type NextRequest, NextResponse } from "next/server"
import { updateInvoice } from "@/lib/database-operations"
import { getSession } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const invoiceData = await request.json()
    await updateInvoice(params.id, invoiceData)

    return NextResponse.json({ message: "Invoice updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
