const dialog = document.getElementById("book-dialog");
const form = document.getElementById("book-form");

// Open the dialog
document.getElementById("add-button").addEventListener("click", () => {
    form.reset();
    dialog.showModal();
});

// Close it: Cancel buttons and clicking the dark backdrop
dialog.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
});
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
});

// Status tabs: highlight the clicked one
document.querySelectorAll("[data-status]").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll("[data-status]").forEach((other) => {
            other.setAttribute("aria-pressed", String(other === tab));
        });
    });
});

// Stop forms from reloading the page (replace these with your real logic later)
form.addEventListener("submit", (event) => event.preventDefault());
document.getElementById("filters").addEventListener("submit", (event) => event.preventDefault());