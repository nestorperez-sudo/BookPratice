function validateQuery(query) {
    const { search, genre, sort } = query;
    const errors = [];
    const filters = {};
    const limit = 30;

    if (search !== undefined) {
        if (typeof search !== "string") {
            errors.push({ field: "search", message: "Send search only once." });
        } else {
            const term = search.trim();
            if (term.length > limit) {
                errors.push({ field: "search", message: `Must be at most ${limit} characters.` });
            } else if (term !== "") {
                filters.search = term;     // only stored when there is something to search
            }
        }
    }

    return { valid: errors.length === 0, errors, filters };
}


function validateForm(book) {
    let errors = []

    if (book.title !== "string" || book.title.trim() === "") errors.push("Needs a title") 

    console.log(errors)
    return { valid: errors.length === 0, errors }
}

module.exports = { validateQuery, validateForm }