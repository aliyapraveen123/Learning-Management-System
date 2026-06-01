const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")

const connectDB = require("./config/db")

// load env
dotenv.config()

// global crash handlers so deployment logs capture the reason
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err && err.stack ? err.stack : err)
    process.exit(1)
})

const app = express()

// show presence (not values) of important env vars to help remote debugging
const hasMongo = Boolean(process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL)
const hasJwt = Boolean(process.env.JWT_SECRET)
console.log(`env check - MONGO_URI set? ${hasMongo} | JWT_SECRET set? ${hasJwt}`)

connectDB()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/auth", require("./routes/authRoutes"))

app.use("/api/course", require("./routes/courseRoutes"))

app.use("/api/enrollment", require("./routes/enrollmentRoutes"))

app.get("/", (req, res) => {
    res.send("LMS Backend Running")
})

const PORT = process.env.PORT || 2000

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})