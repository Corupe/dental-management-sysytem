"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Users, Activity } from "lucide-react"

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("revenue")

  const reportTypes = [
    { value: "revenue", label: "Revenue Report" },
    { value: "appointments", label: "Appointments Report" },
    { value: "patients", label: "Patient Analytics" },
    { value: "staff", label: "Staff Performance" },
    { value: "inventory", label: "Inventory Report" },
  ]

  const periods = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
  ]

  const revenueData = [
    { month: "Jan", revenue: 12500, appointments: 85 },
    { month: "Feb", revenue: 15200, appointments: 92 },
    { month: "Mar", revenue: 18700, appointments: 108 },
    { month: "Apr", revenue: 16800, appointments: 95 },
    { month: "May", revenue: 21300, appointments: 125 },
    { month: "Jun", revenue: 19500, appointments: 115 },
  ]

  const topServices = [
    { service: "Routine Checkup", count: 245, revenue: 18375 },
    { service: "Teeth Cleaning", count: 189, revenue: 14175 },
    { service: "Dental Filling", count: 156, revenue: 23400 },
    { service: "Root Canal", count: 78, revenue: 39000 },
    { service: "Crown Placement", count: 45, revenue: 33750 },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive clinic performance insights</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$104,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">620</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Patients</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Revenue/Patient</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$168</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Trend
              </CardTitle>
              <CardDescription>Monthly revenue and appointment volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-sm font-medium">{data.month}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(data.revenue / 25000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${data.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{data.appointments} appointments</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Top Services
              </CardTitle>
              <CardDescription>Most popular treatments by volume and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{service.service}</div>
                      <div className="text-sm text-gray-500">{service.count} procedures</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${service.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">${Math.round(service.revenue / service.count)} avg</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Types */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate detailed reports for different aspects of your clinic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((report) => (
                <Button
                  key={report.value}
                  variant={selectedReport === report.value ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2"
                  onClick={() => setSelectedReport(report.value)}
                >
                  <BarChart3 className="h-6 w-6" />
                  {report.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
