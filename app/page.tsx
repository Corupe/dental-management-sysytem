import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function HomePage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Redirect based on user role
  switch (session.user.role) {
    case "admin":
      redirect("/admin/dashboard")
    case "dentist":
      redirect("/dentist/dashboard")
    case "receptionist":
      redirect("/receptionist/dashboard")
    case "patient":
      redirect("/patient/dashboard")
    default:
      redirect("/auth/login")
  }
}
