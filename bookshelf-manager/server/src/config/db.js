const mongoose = require('mongoose');
const dns = require('dns');

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows/local networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore fallback if custom DNS servers cannot be set
}

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookshelf';
  const atlasFallback =
    'mongodb://miniburi357_db_user:g4FmEMO5gdJOtIUf@ac-qer8exu-shard-00-00.vn16mw8.mongodb.net:27017,ac-qer8exu-shard-00-01.vn16mw8.mongodb.net:27017,ac-qer8exu-shard-00-02.vn16mw8.mongodb.net:27017/bookshelf?ssl=true&replicaSet=atlas-71u8cp-shard-0&authSource=admin&retryWrites=true&w=majority';

  try {
    const conn = await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`[Database] MongoDB connected successfully to ${conn.connection.host}:${conn.connection.port || 'default'}/${conn.connection.name}`);
    return conn;
  } catch (primaryError) {
    if (primaryUri !== atlasFallback) {
      console.warn(`[Database] Primary MongoDB connection failed (${primaryError.message}). Attempting fallback to MongoDB Atlas...`);
      try {
        const conn = await mongoose.connect(atlasFallback, { serverSelectionTimeoutMS: 6000 });
        console.log(`[Database] MongoDB Atlas connected successfully to ${conn.connection.host}:${conn.connection.port || 'default'}/${conn.connection.name}`);
        return conn;
      } catch (fallbackError) {
        console.error(`[Database Error] Atlas fallback failed: ${fallbackError.message}`);
      }
    }
    console.error(`[Database Error] Failed to connect to MongoDB: ${primaryError.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
