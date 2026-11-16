const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")

router.get("/", controller.listBooks)
router.post("/", controller.addBook)
router.delete("/:id", controller.deleteBook)

module.exports = router