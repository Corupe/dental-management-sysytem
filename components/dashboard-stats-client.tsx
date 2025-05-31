"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, AlertTriangle } from "lucide-react"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardStatsClient() {
  const { stats, loading, error } = useDashboardStats()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-500 text-sm">Error loading stats</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statsConfig = [
    {
      title: "Total Patients",
      value: stats.totalPatients || 0,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments || 0,
      change: "+5%",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats.monthlyRevenue || 0).toFixed(2)}`,
      change: "+18%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStockAlerts || 0,
      change: "0%",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
