"use client"

import { useState, useEffect } from "react"

export function useDashboardStats() {
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/dashboard/stats")

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        setError("Failed to fetch dashboard stats")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
