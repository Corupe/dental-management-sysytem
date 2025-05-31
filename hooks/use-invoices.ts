"use client"

import { useState, useEffect } from "react"

export function useInvoices(filters?: any) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams(filters || {})
      const response = await fetch(`/api/invoices?${params}`)

      if (response.ok) {
        const data = await response.json()
        setInvoices(data)
      } else {
        setError("Failed to fetch invoices")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createInvoice = async (invoiceData: any) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      })

      if (response.ok) {
        await fetchInvoices()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create invoice")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const updateInvoice = async (id: string, invoiceData: any) => {
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      })

      if (response.ok) {
        await fetchInvoices()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update invoice")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  return {
    invoices,
    loading,
    error,
    createInvoice,
    updateInvoice,
    refetch: fetchInvoices,
  }
}
