// Mock database - In production, replace with actual database queries

export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  role: "admin" | "dentist" | "receptionist" | "patient"
  dateOfBirth?: string
  address?: string
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: string
  dentistId: string
  date: string
  time: string
  type: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  notes?: string
  duration: number
  createdAt: string
  updatedAt: string
}

export interface Treatment {
  id: string
  patientId: string
  dentistId: string
  appointmentId: string
  type: string
  description: string
  notes?: string
  cost: number
  date: string
  status: "planned" | "in-progress" | "completed"
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  patientId: string
  appointmentId?: string
  amount: number
  description: string
  status: "pending" | "paid" | "overdue" | "cancelled"
  dueDate: string
  paidDate?: string
  createdAt: string
  updatedAt: string
}

// Mock data
const users: User[] = [
  {
    id: "1",
    email: "admin@clinic.com",
    password: "admin123", // In production, this would be hashed
    firstName: "Admin",
    lastName: "User",
    phone: "+1234567890",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "dentist@clinic.com",
    password: "dentist123",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    phone: "+1234567891",
    role: "dentist",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    email: "reception@clinic.com",
    password: "reception123",
    firstName: "Mike",
    lastName: "Wilson",
    phone: "+1234567892",
    role: "receptionist",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    email: "patient@clinic.com",
    password: "patient123",
    firstName: "John",
    lastName: "Smith",
    phone: "+1234567893",
    role: "patient",
    dateOfBirth: "1990-01-01",
    address: "123 Main St, City, State 12345",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

// Database functions
export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

export async function getAppointmentsByUserId(userId: string, role: string): Promise<Appointment[]> {
  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: "1",
      patientId: "4",
      dentistId: "2",
      date: "2024-01-20",
      time: "10:00",
      type: "Routine Checkup",
      status: "confirmed",
      duration: 30,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ]

  if (role === "patient") {
    return appointments.filter((apt) => apt.patientId === userId)
  } else if (role === "dentist") {
    return appointments.filter((apt) => apt.dentistId === userId)
  }

  return appointments
}

export async function getInvoicesByPatientId(patientId: string): Promise<Invoice[]> {
  // Mock invoices data
  return [
    {
      id: "INV-001",
      patientId,
      amount: 150,
      description: "Dental Filling",
      status: "pending",
      dueDate: "2024-02-01",
      createdAt: "2024-01-05T00:00:00Z",
      updatedAt: "2024-01-05T00:00:00Z",
    },
  ]
}
