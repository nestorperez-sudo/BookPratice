const express = require("express")
const routes = require("./src/routes/routes")
const path = require("path")
const logger = require("./src/logger/logger")

const app = express()

// static path 
app.use(express.static(path.join(__dirname, "public")))

// be able to read jason data
app.use(express.json())

// middleware
app.use(logger)

// routes
app.use("/api/books", routes)

module.exports = app