import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/database-operations"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    if (!userData.email || !userData.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(userData.email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create new user (password will be hashed in createUser function)
    const newUser = await createUser({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: userData.role || "patient",
      dateOfBirth: userData.dateOfBirth,
      address: userData.address,
    })

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
