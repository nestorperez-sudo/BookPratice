import { apiRequest } from "./api.js"

// CREATE CARD FUNCTIONS
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

const grid = document.getElementById("books");


// SEARCH
const searchBtn = document.getElementById("search-btn")

// build search query
function searchQuery(query) {
    const searchQuery = new URLSearchParams()
    searchQuery.set("search", query)
    return searchQuery.toString()
}


searchBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const input = document.getElementById("search").value.trim()

    try {
        let books;
        if (input) {
            books = await apiRequest("GET", `/books?${searchQuery(input)}`)
        } else {
            books = await apiRequest("GET", "/books")
        }
        
        console.log(books)

        grid.replaceChildren()
        books.forEach((book) => grid.appendChild(createCard(book)))
    } catch (err) {
        console.error(err.message)
    }
})

