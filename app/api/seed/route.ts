import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { createUser } from "@/lib/database-operations"

export async function POST(request: NextRequest) {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Seeding not allowed in production" }, { status: 403 })
    }

    const db = await getDatabase()

    // Check if users already exist
    const existingUsers = await db.collection("users").countDocuments()
    if (existingUsers > 0) {
      return NextResponse.json({ message: "Database already seeded" })
    }

    // Create default users
    const defaultUsers = [
      {
        email: "admin@clinic.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        phone: "+1234567890",
        role: "admin",
      },
      {
        email: "dentist@clinic.com",
        password: "dentist123",
        firstName: "Dr. Sarah",
        lastName: "Johnson",
        phone: "+1234567891",
        role: "dentist",
      },
      {
        email: "reception@clinic.com",
        password: "reception123",
        firstName: "Mike",
        lastName: "Wilson",
        phone: "+1234567892",
        role: "receptionist",
      },
      {
        email: "patient@clinic.com",
        password: "patient123",
        firstName: "John",
        lastName: "Smith",
        phone: "+1234567893",
        role: "patient",
        dateOfBirth: "1990-01-01",
        address: "123 Main St, City, State 12345",
      },
    ]

    for (const userData of defaultUsers) {
      await createUser(userData)
    }

    // Seed some inventory items
    const inventoryItems = [
      {
        name: "Dental Floss",
        category: "Hygiene",
        currentStock: 15,
        minStock: 20,
        maxStock: 100,
        unit: "boxes",
        supplier: "DentalCorp",
        cost: 12.5,
        expiryDate: "2025-06-15",
      },
      {
        name: "Disposable Gloves",
        category: "Safety",
        currentStock: 250,
        minStock: 100,
        maxStock: 500,
        unit: "boxes",
        supplier: "MedSupply",
        cost: 25.0,
        expiryDate: "2026-12-31",
      },
    ]

    await db.collection("inventory").insertMany(
      inventoryItems.map((item) => ({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    )

    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Seeding error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
