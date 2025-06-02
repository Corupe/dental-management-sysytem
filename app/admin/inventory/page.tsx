"use client";

import type React from "react";

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
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { AdminLayout } from "../../../components/layouts/admin-layout";
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { useInventory } from "../../../hooks/use-inventory";
import { Alert, AlertDescription } from "../../../components/ui/alert";

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    supplier: "",
    cost: 0,
    expiryDate: "",
  });

  const { items, loading, error, createItem, updateItem, deleteItem } =
    useInventory();

  const filteredItems = items.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      const success = await updateItem(editingItem._id, formData);
      if (success) {
        setEditingItem(null);
        resetForm();
      }
    } else {
      const success = await createItem(formData);
      if (success) {
        setIsAddItemOpen(false);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: "",
      supplier: "",
      cost: 0,
      expiryDate: "",
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      category: item.category || "",
      currentStock: item.currentStock || 0,
      minStock: item.minStock || 0,
      maxStock: item.maxStock || 0,
      unit: item.unit || "",
      supplier: item.supplier || "",
      cost: item.cost || 0,
      expiryDate: item.expiryDate || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
    }
  };

  const getStockStatus = (current: number, min: number) => {
    if (current <= min)
      return { status: "low", color: "bg-red-100 text-red-800" };
    if (current <= min * 1.5)
      return { status: "medium", color: "bg-yellow-100 text-yellow-800" };
    return { status: "good", color: "bg-green-100 text-green-800" };
  };

  const lowStockItems = items.filter(
    (item: any) => item.currentStock <= item.minStock
  );
  const totalValue = items.reduce(
    (sum: number, item: any) => sum + item.currentStock * item.cost,
    0
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-gray-600">Track dental supplies and equipment</p>
          </div>

          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Inventory Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentStock: Number.parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minStock: Number.parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={formData.maxStock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxStock: Number.parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) =>
                        setFormData({ ...formData, unit: e.target.value })
                      }
                      placeholder="e.g., boxes, units"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost per Unit</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cost: Number.parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={formData.supplier}
                      onChange={(e) =>
                        setFormData({ ...formData, supplier: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddItemOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.length}</div>
              <p className="text-xs text-muted-foreground">
                Active inventory items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockItems.length}</div>
              <p className="text-xs text-muted-foreground">
                Items need reordering
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Current inventory value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <TrendingDown className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {[...new Set(items.map((item: any) => item.category))].length}
              </div>
              <p className="text-xs text-muted-foreground">
                Product categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alerts
              </CardTitle>
              <CardDescription>
                Items that need immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Current: {item.currentStock} {item.unit} | Min:{" "}
                        {item.minStock} {item.unit}
                      </p>
                    </div>
                    <Button size="sm">Reorder</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              Complete list of dental supplies and equipment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item: any) => {
                  const stockStatus = getStockStatus(
                    item.currentStock,
                    item.minStock
                  );
                  return (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.currentStock} {item.unit}
                      </TableCell>
                      <TableCell>
                        <Badge className={stockStatus.color}>
                          {stockStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>${item.cost?.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Item Dialog */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Inventory Item</DialogTitle>
              <DialogDescription>Update item information</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editName">Item Name</Label>
                  <Input
                    id="editName"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editCategory">Category</Label>
                  <Input
                    id="editCategory"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="editCurrentStock">Current Stock</Label>
                  <Input
                    id="editCurrentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentStock: Number.parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editMinStock">Min Stock</Label>
                  <Input
                    id="editMinStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minStock: Number.parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editMaxStock">Max Stock</Label>
                  <Input
                    id="editMaxStock"
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxStock: Number.parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editUnit">Unit</Label>
                  <Input
                    id="editUnit"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editCost">Cost per Unit</Label>
                  <Input
                    id="editCost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cost: Number.parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editSupplier">Supplier</Label>
                  <Input
                    id="editSupplier"
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editExpiryDate">Expiry Date</Label>
                  <Input
                    id="editExpiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Item</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
