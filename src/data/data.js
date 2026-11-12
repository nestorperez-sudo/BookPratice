const books = [
    { id: 1,  title: "Dune",                          author: "Frank Herbert",         genre: "sci-fi",      pages: 612, status: "finished", rating: 5 },
    { id: 2,  title: "Sapiens",                       author: "Yuval Noah Harari",     genre: "history",     pages: 498, status: "reading",  rating: null },
    { id: 3,  title: "Clean Code",                    author: "Robert C. Martin",      genre: "tech",        pages: 464, status: "to-read",  rating: null },
    { id: 4,  title: "The Hobbit",                    author: "J.R.R. Tolkien",        genre: "fantasy",     pages: 310, status: "finished", rating: 5 },
    { id: 5,  title: "1984",                          author: "George Orwell",         genre: "fiction",     pages: 328, status: "finished", rating: 4 },
    { id: 6,  title: "A Brief History of Time",       author: "Stephen Hawking",       genre: "non-fiction", pages: 256, status: "finished", rating: 4 },
    { id: 7,  title: "The Pragmatic Programmer",      author: "Andrew Hunt",           genre: "tech",        pages: 352, status: "reading",  rating: null },
    { id: 8,  title: "Neuromancer",                   author: "William Gibson",        genre: "sci-fi",      pages: 271, status: "to-read",  rating: null },
    { id: 9,  title: "The Name of the Wind",          author: "Patrick Rothfuss",      genre: "fantasy",     pages: 662, status: "to-read",  rating: null },
    { id: 10, title: "Guns, Germs, and Steel",        author: "Jared Diamond",         genre: "history",     pages: 528, status: "finished", rating: 3 },
    { id: 11, title: "Thinking, Fast and Slow",       author: "Daniel Kahneman",       genre: "non-fiction", pages: 499, status: "reading",  rating: null },
    { id: 12, title: "The Alchemist",                 author: "Paulo Coelho",          genre: "fiction",     pages: 208, status: "finished", rating: 3 },
    { id: 13, title: "Atomic Habits",                 author: "James Clear",           genre: "other",       pages: 320, status: "to-read",  rating: null },
    { id: 14, title: "Lil princess",                  author: "Néstor Pérez",          genre: "aura",        pages: 260, status: "to-read",  rating: 5 }
];

let nextId = 15; // the server assigns ids; the next new book gets 14

module.exports = { books }