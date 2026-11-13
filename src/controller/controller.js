const store = require("../data/data.js")
const validator = require("../validators/validator.js") 

function listBooks(req, res) {
    const { valid, errors, filters } = validator(req.query)

    if (!valid) return res.status(400).json(errors)

    let books = store.books
    if (filters.search) {
        const filter = filters.search.toLowerCase()
        books = books.filter((book) => book.title.toLowerCase().includes(filter) || book.author.toLowerCase().includes(filter))
        if (books.length !== 0) {
            res.status(200).json(books)
        } else {
            res.status(404).json({ error: "You aint read that 😭😭😭" })
        }
    } else {
        res.status(200).json(books)
    }


}

module.exports = { listBooks }