import { type NextRequest, NextResponse } from "next/server"
import { updateInventoryItem, deleteInventoryItem } from "@/lib/database-operations"
import { getSession } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || !["admin", "receptionist"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const itemData = await request.json()
    await updateInventoryItem(params.id, itemData)

    return NextResponse.json({ message: "Item updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || !["admin", "receptionist"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteInventoryItem(params.id)
    return NextResponse.json({ message: "Item deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
