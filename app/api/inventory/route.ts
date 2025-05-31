import { type NextRequest, NextResponse } from "next/server";
import {
  createInventoryItem,
  getInventoryItems,
} from "@/lib/database-operations";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await getInventoryItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !["admin", "receptionist"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const itemData = await request.json();
    const item = await createInventoryItem(itemData);
    console.log("item", item);

    return NextResponse.json({ message: "Item created successfully", item });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
