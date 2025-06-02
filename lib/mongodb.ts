import { MongoClient, ServerApiVersion, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}
let uri = process.env.MONGODB_URI;

console.log("Connecting to MongoDB:", uri.replace(/:[^:]*@/, ":****@"));

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

let cachedConnection: MongoConnection | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log("Successfully connected to MongoDB");

    const db = client.db("dental_clinic");

    await db.command({ ping: 1 });
    console.log("Database ping successful");

    cachedConnection = { client, db };

    return cachedConnection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    cachedConnection = null;
    throw error;
  }
}

export async function getDatabase(): Promise<Db> {
  try {
    const { db } = await connectToDatabase();
    return db;
  } catch (error) {
    console.error("Failed to get database:", error);
    throw error;
  }
}

const cleanup = async () => {
  if (cachedConnection) {
    try {
      await cachedConnection.client.close();
      console.log("MongoDB connection closed");
      cachedConnection = null;
    } catch (err) {
      console.error("Error closing MongoDB connection:", err);
    }
  }
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGQUIT", cleanup);

export default connectToDatabase;
