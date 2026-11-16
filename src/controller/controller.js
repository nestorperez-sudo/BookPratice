const store = require("../data/data.js")
const { validateForm, validateQuery} = require("../validators/validator.js") 

function listBooks(req, res) {
    const { valid, errors, filters } = validateQuery(req.query) // matches the name of {} to the properite sof validators and assigns to each a variabel (by thte sname name)

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

function addBook(req, res) {
    const { valid, errors } = validateForm(req.body)

    if (!valid) return res.status(400).json({ error: errors.join(", ") })

    const book = req.body
    book.id = Math.max(0, ...store.books.map((i) => i.id)) + 1
    store.books.push(book)
    res.status(201).json(book)
}

function deleteBook(req, res) {
    const requestId = Number(req.params.id)
    const book = store.books.find((book) => book.id === requestId)

    let bookIndex;

    if (typeof book !== undefined) {
        bookIndex = store.books.indexOf(book)

        store.books.splice(bookIndex, 1)

        res.status(200).json(book)
    } else {
        res.status(401).json("No such book by that id")
    }
}

function filterBooks(req, res) {
    
}

module.exports = { listBooks, addBook, deleteBook }