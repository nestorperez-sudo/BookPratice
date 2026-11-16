import { apiRequest } from "./api.js"

const grid = document.getElementById("books")
const searchBtn = document.getElementById("search-btn")
const summary = document.getElementById("summary")
const form = document.getElementById("book-form")
const filters = document.getElementById("filters")
const genreFilter = document.getElementById("genre-filter")


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

    card.dataset.id = books.id

    return card
}

// ------------------------------- SEARCH QUERY --------------------------------------------
function searchQuery(searchType, query) {
    const searchQuery = new URLSearchParams()
    searchQuery.set(`${searchType}`, query)
    return searchQuery.toString()
}

// ----------------------------- GET BOOKS -----------------------------------------------

// display books
function displayBooks(books) {
    grid.replaceChildren()
    books.forEach((book) => grid.appendChild(createCard(book)))
}

filters.addEventListener("click", async (e) => {
    e.preventDefault()

    if (e.target.id === "search") return;

    const input = document.getElementById("search").value.trim()
    const genreFilter = document.getElementById("genre-filter").value
    const sortFilter = document.getElementById("sort").value

    try {
        let books;
        let path = ""
        path += input ? `/books?${searchQuery("search", input)}` : "/books?"
        path += genreFilter ? `&${searchQuery("genre", genreFilter)}` : ""
        path += `&${searchQuery("sort", sortFilter)}`

        console.log(path)


        books = await apiRequest(path)
        summary.textContent = ""

        displayBooks(books)
    } catch (err) {
        // err.message
        summary.textContent = err.message   
    }
})


// ---------------------------- ADD A BOOK ----------------------------------------------
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const titleElement = form.elements.title.value.trim()
    const authorElement = form.elements.author.value.trim()
    const genreElement = form.elements.genre.value
    const pagesElement = Number(form.elements.pages.value)
    const statusElement = form.elements.status.value
    const ratingElement = form.elements.rating.value === "" ? null : Number(form.elements.rating.value)

    const body = { title: titleElement, author: authorElement, genre: genreElement, pages: pagesElement, status: statusElement, rating: ratingElement }

    try {
        await apiRequest("POST", "/books", body)
        document.getElementById("book-dialog").close()
        loadBooks()
    } catch (err) {
        document.getElementById("form-error").textContent = err.message
    }
})


// ------------------------------------------ DELETE A BOOK -------------------------------------------------

grid.addEventListener("click", async (e) => {
    const btn = e.target.closest(".danger")
    console.log(btn)
    const container = e.target.closest('[data-id]')
    const id = container.dataset["id"]

    if (!btn) return;

    try {
        await apiRequest("DELETE", `/books/${id}`)
        loadBooks()
    } catch(err) {
        summary.textContent = err.message 
    }

})


// ------------------------------------------ FILTERS -----------------------------------------------------
// filters.addEventListener("click", async (e) => {
//     e.preventDefault()
//     console.log(e.target.value)
    
//     try {
//         const books = await apiRequest("GET", `/books?${searchQuery("filter", e.target.value)}`)  
//         displayBooks(books)
//     } catch (err) {
//         summary.textContent = err.message
//     }

    
// })