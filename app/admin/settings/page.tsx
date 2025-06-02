"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { AdminLayout } from "../../../components/layouts/admin-layout";
import { Settings, Building, Bell, Shield, Database, Mail } from "lucide-react";

export default function AdminSettings() {
  const [clinicSettings, setClinicSettings] = useState({
    name: "DentalCare Clinic",
    address: "123 Medical Center Dr, Healthcare City, HC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@dentalcare.com",
    website: "www.dentalcare.com",
    description: "Providing quality dental care for over 20 years.",
  });

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsReminders: false,
    appointmentConfirmations: true,
    paymentReminders: true,
    lowStockAlerts: true,
    systemUpdates: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 24,
    passwordExpiry: 90,
    loginAttempts: 5,
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-gray-600">
            Configure your clinic's system preferences
          </p>
        </div>

        <Tabs defaultValue="clinic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="clinic" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Clinic
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backup
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clinic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Clinic Information
                </CardTitle>
                <CardDescription>
                  Update your clinic's basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      value={clinicSettings.name}
                      onChange={(e) =>
                        setClinicSettings({
                          ...clinicSettings,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="clinicPhone">Phone Number</Label>
                    <Input
                      id="clinicPhone"
                      value={clinicSettings.phone}
                      onChange={(e) =>
                        setClinicSettings({
                          ...clinicSettings,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="clinicAddress">Address</Label>
                  <Input
                    id="clinicAddress"
                    value={clinicSettings.address}
                    onChange={(e) =>
                      setClinicSettings({
                        ...clinicSettings,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clinicEmail">Email</Label>
                    <Input
                      id="clinicEmail"
                      type="email"
                      value={clinicSettings.email}
                      onChange={(e) =>
                        setClinicSettings({
                          ...clinicSettings,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="clinicWebsite">Website</Label>
                    <Input
                      id="clinicWebsite"
                      value={clinicSettings.website}
                      onChange={(e) =>
                        setClinicSettings({
                          ...clinicSettings,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="clinicDescription">Description</Label>
                  <Textarea
                    id="clinicDescription"
                    value={clinicSettings.description}
                    onChange={(e) =>
                      setClinicSettings({
                        ...clinicSettings,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <Button>Save Clinic Information</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure automated notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailReminders">
                        Email Appointment Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send email reminders 24 hours before appointments
                      </p>
                    </div>
                    <Switch
                      id="emailReminders"
                      checked={notifications.emailReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          emailReminders: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsReminders">
                        SMS Appointment Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send SMS reminders 2 hours before appointments
                      </p>
                    </div>
                    <Switch
                      id="smsReminders"
                      checked={notifications.smsReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          smsReminders: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="appointmentConfirmations">
                        Appointment Confirmations
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send confirmation emails when appointments are booked
                      </p>
                    </div>
                    <Switch
                      id="appointmentConfirmations"
                      checked={notifications.appointmentConfirmations}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          appointmentConfirmations: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paymentReminders">
                        Payment Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send reminders for overdue invoices
                      </p>
                    </div>
                    <Switch
                      id="paymentReminders"
                      checked={notifications.paymentReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          paymentReminders: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                      <p className="text-sm text-gray-500">
                        Alert when inventory items are running low
                      </p>
                    </div>
                    <Switch
                      id="lowStockAlerts"
                      checked={notifications.lowStockAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          lowStockAlerts: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-gray-500">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecurity({ ...security, twoFactorAuth: checked })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionTimeout">
                        Session Timeout (hours)
                      </Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={security.sessionTimeout}
                        onChange={(e) =>
                          setSecurity({
                            ...security,
                            sessionTimeout: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordExpiry">
                        Password Expiry (days)
                      </Label>
                      <Input
                        id="passwordExpiry"
                        type="number"
                        value={security.passwordExpiry}
                        onChange={(e) =>
                          setSecurity({
                            ...security,
                            passwordExpiry: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={security.loginAttempts}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          loginAttempts: Number.parseInt(e.target.value),
                        })
                      }
                      className="w-32"
                    />
                  </div>
                </div>
                <Button>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup & Recovery
                </CardTitle>
                <CardDescription>
                  Manage data backups and system recovery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Automatic Backups</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Daily Backups</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly Full Backup</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cloud Storage</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Manual Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Create Backup Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download Latest Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        Restore from Backup
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Recent Backups</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Full Backup - 2024-01-15 02:00 AM</span>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Daily Backup - 2024-01-14 02:00 AM</span>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Third-party Integrations
                </CardTitle>
                <CardDescription>
                  Connect with external services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Service</h3>
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input id="smtpHost" placeholder="smtp.gmail.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="smtpPort">Port</Label>
                        <Input id="smtpPort" placeholder="587" />
                      </div>
                      <div>
                        <Label htmlFor="smtpSecurity">Security</Label>
                        <Input id="smtpSecurity" placeholder="TLS" />
                      </div>
                    </div>
                    <Button variant="outline">Test Connection</Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">SMS Service</h3>
                    <div className="space-y-2">
                      <Label htmlFor="smsProvider">Provider</Label>
                      <Input id="smsProvider" placeholder="Twilio" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smsApiKey">API Key</Label>
                      <Input
                        id="smsApiKey"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button variant="outline">Test SMS</Button>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Available Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                    >
                      <Mail className="h-6 w-6" />
                      Payment Gateway
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                    >
                      <Settings className="h-6 w-6" />
                      Insurance API
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                    >
                      <Database className="h-6 w-6" />
                      Lab Integration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
