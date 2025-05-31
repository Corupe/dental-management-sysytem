"use client"

import { useState, useEffect } from "react"

export function useInventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/inventory")

      if (response.ok) {
        const data = await response.json()
        setItems(data)
      } else {
        setError("Failed to fetch inventory")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (itemData: any) => {
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        await fetchItems()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create item")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const updateItem = async (id: string, itemData: any) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        await fetchItems()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update item")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchItems()
        return true
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete item")
        return false
      }
    } catch (err) {
      setError("An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  }
}
