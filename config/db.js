const mongoose = require("mongoose")

const connectDB = async () => {
    // support a few common env var names so deployments are less brittle
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL

    if (!uri) {
        console.error("MongoDB connection string not found. Please set MONGO_URI (or MONGODB_URI / DATABASE_URL) in your environment.")
        // exit with non-zero so platforms know the start failed
        process.exit(1)
    }

    try {
        await mongoose.connect(uri)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        // log full error so remote deploy logs show the stack and message
        console.error("Failed to connect to MongoDB:", error)
        process.exit(1)
    }
}

module.exports = connectDB