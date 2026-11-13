import { apiRequest } from "./api.js"

const grid = document.getElementById("books");
const searchBtn = document.getElementById("search-btn")
const summary = document.getElementById("summary")
const saveBtn = document.getElementById("save-btn")
const form = document.getElementById("book-form");



// ---------------------------------- LOAD ALL BOOKS -----------------------------
async function loadBooks() {
    const books = await apiRequest("GET", "/books")

    console.log(books)
    displayBooks(books)
}

loadBooks()

// --------------------------- CREATE CARD FUNCTIONS -----------------------------------------
function el(tag, className, text) {
    const element = document.createElement(tag)
    element.className = className
    if (text !== undefined) {
        element.textContent = text
    }

    return element
}

function rating(num) {
    if (num === null) return "Yet to rate"
    return `${"★".repeat(num)}${"☆".repeat(5 - num)}`
}

function createCard(books) {
    // header
    const card = el("article", "card")
    const titleElement = el("h2", "", books.title)
    const authorElement = el("p", "author", books.author)
    const metaElement = el("p", "meta", `${books.genre} . ${books.pages}`)
    const ratingElement = el("p", "rating", rating(books.rating))

    //footer
    const footer = el("div", "card-footer")

    // select footer
    const select = document.createElement("select")
    const valuesToRead = ["to-read", "reading", "finished"]
    valuesToRead.forEach((value) => {
        const option = el("option", "", value)
        option.value = value
        select.appendChild(option)
    })

    // edit/delete
    const footerDiv = document.createElement("div")
    
    const editBtn = el("button", "text-button", "Edit")
    const deleteBtn = el("button", "text-button danger", "Delete")

    footerDiv.appendChild(editBtn)
    footerDiv.appendChild(deleteBtn)
 
    card.appendChild(titleElement)
    card.appendChild(authorElement)
    card.appendChild(metaElement)
    card.appendChild(ratingElement)

    footer.appendChild(select)
    footer.appendChild(footerDiv)
    card.appendChild(footer)

    return card
}

// ----------------------------- GET BOOKS -----------------------------------------------
// build search query
function searchQuery(query) {
    const searchQuery = new URLSearchParams()
    searchQuery.set("search", query)
    return searchQuery.toString()
}

// display books
function displayBooks(books) {
    grid.replaceChildren()
    books.forEach((book) => grid.appendChild(createCard(book)))
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const input = document.getElementById("search").value.trim()

    try {
        let books;
        const path = input ? `/books?${searchQuery(input)}` : "/books"
        books = await apiRequest("GET", path)
        summary.textContent = ""

        displayBooks(books)
    } catch (err) {
        // err.message
        summary.textContent = err.message   
    }
})


// ---------------------------- ADD A BOOK ----------------------------------------------
saveBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const titleElement = form.element.value.trim()
    const authorElement = form.element.value.trim()
    const genreElement = form.element.value
    const pagesElement = Number(form.element.value)
    const statusElement = form.element.value
    const ratingElement = form.element.value = "" ? null : Number(form.element.value)

    const body = { id: 0, title: titleElement, author: authorElement, genre: genreElement, pages: pagesElement, status: statusElement, rating: 5}

    const book = await apiRequest("POST", "/books", body)

    loadBooks()

})