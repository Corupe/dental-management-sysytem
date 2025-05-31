"use client"

import { useState, useEffect } from "react"

export function useUsers(role?: string) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = role ? `?role=${role}` : ""
      const response = await fetch(`/api/users${params}`)

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        setError("Failed to fetch users")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: any) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        await fetchUsers()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create user")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const updateUser = async (id: string, userData: any) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        await fetchUsers()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update user")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchUsers()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete user")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [role])

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  }
}
