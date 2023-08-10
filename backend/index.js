// importing requried packages
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// Environment Variables
require("dotenv").config();

// creating app
const app = express();

// setting up middlewares
app.use(cors())
app.use(bodyParser.json())

// connecting database
mongoose.connect(process.env.mongodbURI)
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log("Database Connection Failed :" + err.message))

app.get("/", (req, res) =>{
    res.send("Working");
})
// configuring routes
const authRoutes = require("./routes/auth")
const  plansRoutes = require("./routes/plans")

app.use("/auth",authRoutes)
app.use("/plans",plansRoutes)


// starting server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("App is Running "))


