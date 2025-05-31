import { getDatabase } from "./mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

// User operations
export async function createUser(userData: any) {
  const db = await getDatabase();
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("users").insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function getUserByEmail(email: string) {
  const db = await getDatabase();
  return await db.collection("users").findOne({ email });
}

export async function getUserById(id: string) {
  const db = await getDatabase();
  return await db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function updateUser(id: string, userData: any) {
  const db = await getDatabase();

  // If password is being updated, hash it
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }

  const result = await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...userData, updatedAt: new Date() } }
    );
  return result;
}

export async function deleteUser(id: string) {
  const db = await getDatabase();
  return await db.collection("users").deleteOne({ _id: new ObjectId(id) });
}

export async function getAllUsers(role?: string) {
  const db = await getDatabase();
  const filter = role ? { role } : {};
  return await db.collection("users").find(filter).toArray();
}

// Appointment operations
export async function createAppointment(appointmentData: any) {
  const db = await getDatabase();
  const appointment = {
    ...appointmentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("appointments").insertOne(appointment);
  return { ...appointment, _id: result.insertedId };
}

export async function getAppointments(filter: any = {}) {
  const db = await getDatabase();

  // Convert string IDs to ObjectIds for MongoDB queries
  if (filter.patientId) {
    filter.patientId = new ObjectId(filter.patientId);
  }
  if (filter.dentistId) {
    filter.dentistId = new ObjectId(filter.dentistId);
  }

  const appointments = await db
    .collection("appointments")
    .find(filter)
    .toArray();

  // Populate patient and dentist information
  for (const appointment of appointments) {
    if (appointment.patientId) {
      const patient = await db
        .collection("users")
        .findOne({ _id: appointment.patientId });
      if (patient) {
        appointment.patientName = `${patient.firstName} ${patient.lastName}`;
      }
    }
    if (appointment.dentistId) {
      const dentist = await db
        .collection("users")
        .findOne({ _id: appointment.dentistId });
      if (dentist) {
        appointment.dentistName = `${dentist.firstName} ${dentist.lastName}`;
      }
    }
  }

  return appointments;
}

export async function updateAppointment(id: string, appointmentData: any) {
  const db = await getDatabase();
  return await db
    .collection("appointments")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...appointmentData, updatedAt: new Date() } }
    );
}

export async function deleteAppointment(id: string) {
  const db = await getDatabase();
  return await db
    .collection("appointments")
    .deleteOne({ _id: new ObjectId(id) });
}

// Patient operations
export async function getPatientsByDentist(dentistId: string) {
  const db = await getDatabase();
  const appointments = await db
    .collection("appointments")
    .find({ dentistId: new ObjectId(dentistId) })
    .toArray();
  const patientIds = [...new Set(appointments.map((apt) => apt.patientId))];

  return await db
    .collection("users")
    .find({
      _id: { $in: patientIds },
      role: "patient",
    })
    .toArray();
}

// Treatment operations
export async function createTreatment(treatmentData: any) {
  const db = await getDatabase();
  const treatment = {
    ...treatmentData,
    patientId: new ObjectId(treatmentData.patientId),
    dentistId: new ObjectId(treatmentData.dentistId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("treatments").insertOne(treatment);
  return { ...treatment, _id: result.insertedId };
}

export async function getTreatmentsByPatient(patientId: string) {
  const db = await getDatabase();
  return await db
    .collection("treatments")
    .find({ patientId: new ObjectId(patientId) })
    .toArray();
}

// Invoice operations
export async function createInvoice(invoiceData: any) {
  const db = await getDatabase();
  const invoice = {
    ...invoiceData,
    patientId: new ObjectId(invoiceData.patientId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("invoices").insertOne(invoice);
  return { ...invoice, _id: result.insertedId };
}

export async function getInvoices(filter: any = {}) {
  const db = await getDatabase();

  // Convert string IDs to ObjectIds for MongoDB queries
  if (filter.patientId) {
    filter.patientId = new ObjectId(filter.patientId);
  }

  const invoices = await db.collection("invoices").find(filter).toArray();

  // Populate patient information
  for (const invoice of invoices) {
    if (invoice.patientId) {
      const patient = await db
        .collection("users")
        .findOne({ _id: invoice.patientId });
      if (patient) {
        invoice.patientName = `${patient.firstName} ${patient.lastName}`;
        invoice.patientEmail = patient.email;
      }
    }
  }

  return invoices;
}

export async function updateInvoice(id: string, invoiceData: any) {
  const db = await getDatabase();
  return await db
    .collection("invoices")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...invoiceData, updatedAt: new Date() } }
    );
}

// Inventory operations
export async function createInventoryItem(itemData: any) {
  const db = await getDatabase();
  const item = {
    ...itemData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("inventory").insertOne(item);
  return { ...item, _id: result.insertedId };
}

export async function getInventoryItems() {
  const db = await getDatabase();
  return await db.collection("inventory").find({}).toArray();
}

export async function updateInventoryItem(id: string, itemData: any) {
  const db = await getDatabase();
  return await db
    .collection("inventory")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...itemData, updatedAt: new Date() } }
    );
}

export async function deleteInventoryItem(id: string) {
  const db = await getDatabase();
  return await db.collection("inventory").deleteOne({ _id: new ObjectId(id) });
}

// Dashboard statistics
export async function getDashboardStats(userRole: string, userId?: string) {
  const db = await getDatabase();

  const stats: any = {};

  if (userRole === "admin") {
    // Admin dashboard stats
    stats.totalPatients = await db
      .collection("users")
      .countDocuments({ role: "patient" });
    stats.totalStaff = await db
      .collection("users")
      .countDocuments({ role: { $ne: "patient" } });
    stats.todayAppointments = await db
      .collection("appointments")
      .countDocuments({
        date: new Date().toISOString().split("T")[0],
      });

    const paidInvoices = await db
      .collection("invoices")
      .find({ status: "paid" })
      .toArray();
    stats.monthlyRevenue = paidInvoices.reduce(
      (sum, inv) => sum + (inv.amount || 0),
      0
    );

    const lowStockItems = await db
      .collection("inventory")
      .find({
        $expr: { $lte: ["$currentStock", "$minStock"] },
      })
      .toArray();
    stats.lowStockAlerts = lowStockItems.length;
  } else if (userRole === "dentist") {
    // Dentist dashboard stats
    stats.todayAppointments = await db
      .collection("appointments")
      .countDocuments({
        dentistId: new ObjectId(userId),
        date: new Date().toISOString().split("T")[0],
      });

    stats.totalPatients = await db
      .collection("appointments")
      .distinct("patientId", {
        dentistId: new ObjectId(userId),
      })
      .then((ids) => ids.length);

    stats.pendingReports = await db.collection("treatments").countDocuments({
      dentistId: new ObjectId(userId),
      status: "pending",
    });
  } else if (userRole === "receptionist") {
    // Receptionist dashboard stats
    stats.todayAppointments = await db
      .collection("appointments")
      .countDocuments({
        date: new Date().toISOString().split("T")[0],
      });

    stats.pendingInvoices = await db
      .collection("invoices")
      .countDocuments({ status: "pending" });
    stats.overdueInvoices = await db
      .collection("invoices")
      .countDocuments({ status: "overdue" });
  } else if (userRole === "patient") {
    // Patient dashboard stats
    stats.upcomingAppointments = await db
      .collection("appointments")
      .countDocuments({
        patientId: new ObjectId(userId),
        date: { $gte: new Date().toISOString().split("T")[0] },
      });

    const pendingInvoices = await db
      .collection("invoices")
      .find({
        patientId: new ObjectId(userId),
        status: { $in: ["pending", "overdue"] },
      })
      .toArray();
    stats.outstandingBalance = pendingInvoices.reduce(
      (sum, inv) => sum + (inv.amount || 0),
      0
    );
  }

  return stats;
}
