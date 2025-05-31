"use client"

import { useState, useEffect } from "react"

export function useAppointments(filters?: any) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams(filters || {})
      const response = await fetch(`/api/appointments?${params}`)

      if (response.ok) {
        const data = await response.json()
        setAppointments(data)
      } else {
        setError("Failed to fetch appointments")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData: any) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        await fetchAppointments()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create appointment")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const updateAppointment = async (id: string, appointmentData: any) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        await fetchAppointments()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update appointment")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchAppointments()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete appointment")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    refetch: fetchAppointments,
  }
}
