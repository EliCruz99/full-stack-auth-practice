// old syntax
// const express = require("express")
// type: module changed in package.json, new syntax
import express from "express"
import morgan from "morgan"
import cors from "cors"
import db from "./db/connection.js"
import routes from "./routes/index.js"


const app = express()
const PORT = process.env.PORT || 4567

//express.json() gives access to req.body/ middleware
app.use(express.json())
app.use(cors())
// change after deply and we know everything is working to "tiny"
app.use(morgan("dev"))

app.use("/api", routes)

app.get("/",(req, res) => {
  res.send("<h1>Hello, World</h1>")
})

db.on("connected", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, console.log(`Connected to PORT ${PORT}`))
})
