import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, TrendingUp, Clock, UserPlus, AlertTriangle } from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { DashboardStatsClient } from "@/components/dashboard-stats-client"

export default function AdminDashboard() {
  const recentActivities = [
    { action: "New patient registered", user: "John Doe", time: "2 minutes ago" },
    { action: "Appointment completed", user: "Dr. Smith", time: "15 minutes ago" },
    { action: "Payment received", user: "Jane Wilson", time: "1 hour ago" },
    { action: "Inventory updated", user: "Admin", time: "2 hours ago" },
  ]

  const alerts = [
    { message: "Low inventory: Dental floss", severity: "warning" },
    { message: "Appointment reminder system offline", severity: "error" },
    { message: "Monthly backup completed", severity: "success" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your clinic today.</p>
        </div>

        {/* Dynamic Stats */}
        <DashboardStatsClient />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Alerts
              </CardTitle>
              <CardDescription>Important notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{alert.message}</span>
                    <Badge
                      variant={
                        alert.severity === "error"
                          ? "destructive"
                          : alert.severity === "warning"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <UserPlus className="h-6 w-6" />
                Add New Staff
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                View Reports
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Activity className="h-6 w-6" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
