const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")


dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",  // Allow any origin if CLIENT_URL isn't set
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json())

connectDB()

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard" , dashboardRoutes)

app.listen(PORT , ()=>{
  console.log(`Server is running on the port ${PORT}`)
})
