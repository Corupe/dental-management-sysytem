import { connectToDatabase } from "../lib/mongodb";

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    const { db } = await connectToDatabase();

    // Test basic operations
    const collections = await db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Test a simple query
    const usersCount = await db.collection("users").countDocuments();
    console.log("Number of users:", usersCount);

    console.log("Connection test successful!");
    process.exit(0);
  } catch (error) {
    console.error("Connection test failed:", error);
    process.exit(1);
  }
}

testConnection();
