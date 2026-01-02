const tableBody = document.querySelector("#namespaceTable tbody");
const tableFilterInput = document.getElementById("optionsFilterInput");
const filterMode = document.getElementById("filterMode");

const customSelect = document.getElementById("namespaceSelect");
const selectDisplay = customSelect.querySelector(".select-display");
const optionsContainer = customSelect.querySelector(".options-container");
const optionsFilterInput = optionsContainer.querySelector("input");
const optionsList = optionsContainer.querySelector(".options-list");

const infoToggleButton = document.getElementById("infoToggleButton");
const infoText = document.getElementById("infoText");

const suggestModal = document.getElementById("suggestModal");
const namespaceSuggestButton = document.getElementById("namespaceSuggestButton");
const closeSuggestModal = document.getElementById("closeSuggestModal");
const namespaceInput = document.getElementById("namespaceInput");
const suggestionResults = document.getElementById("suggestionResults");


// DATA LOADING
const namespaces = await fetch("./namespaces.json").then(r => r.json());
const existingNamespaces = namespaces.map(entry => entry.tag.toLowerCase());

let highlightedIndex = -2;
let filteredOptions = [];


// NAMESPACE SUGGESTION MODAL
namespaceSuggestButton.addEventListener("click", () => {
    suggestModal.style.display = "flex";
    namespaceInput.value = "";
    suggestionResults.innerHTML = "";
    namespaceInput.focus();
});

closeSuggestModal.addEventListener("click", () => {
    suggestModal.style.display = "none";
    document.body.style.overflow = "";
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && suggestModal.style.display === "flex") {
        suggestModal.style.display = "none";
        document.body.style.overflow = "";
    }
});


// NAMESPACE SUGGESTION
function generateNamespaceSuggestions(inputValue) {
    // Calc Options
    const rawInput = inputValue.trim();
    if (!rawInput) {
        suggestionResults.innerHTML = "";
        return;
    }

    const words = rawInput.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return;

    const options = new Set();

    options.add(words.join("_"));
    options.add(words.join(""));
    options.add(words.map(w => w[0]).join(""));
    words.forEach(w => options.add(w));

    const isVowel = c => "aeiouäöü".includes(c);

    const getUntilVowel = (word) => {
        let count = 0;
        let result = "";

        for (let i = 0; i < word.length; i++) {
            const c = word[i];
            result += c;

            if (isVowel(c)) {
                count++;
                if (
                    (isVowel(word[0]) && count === 2) ||
                    (!isVowel(word[0]) && count === 1)
                ) {
                    break;
                }
            }
        }
        return result;
    };

    const abbrevWords = words.map(getUntilVowel);
    options.add(abbrevWords.join("_"));
    options.add(abbrevWords.join(""));


    const freeOptions = Array.from(options).filter(
        opt => !existingNamespaces.includes(opt)
    );

    // Render Options
    suggestionResults.innerHTML = "";

    if (freeOptions.length === 0) {
        suggestionResults.innerHTML =
            `<p style="color:red;">⚠️ Keine ungenutzten Namespace-Vorschläge gefunden.</p>`;
        return;
    }

    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = "0";

    freeOptions.forEach(opt => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "0.3em 0";
        li.style.borderBottom = "1px solid #333";

        const span = document.createElement("span");
        span.textContent = opt;

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "📋 Kopieren";
        copyBtn.style.cssText = `
            background:#333;
            color:#e0e0e0;
            border:1px solid #444;
            border-radius:4px;
            padding:0.2em 0.5em;
            cursor:pointer;
            margin-left:1em;
        `;

        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(opt);
            copyBtn.textContent = "✅ Kopiert!";
            setTimeout(() => copyBtn.textContent = "📋 Kopieren", 1500);
        });

        li.append(span, copyBtn);
        list.appendChild(li);
    });

    suggestionResults.appendChild(list);
}

namespaceInput.addEventListener("input", () => {
    generateNamespaceSuggestions(namespaceInput.value);
});


// INFO TOGGLE
infoToggleButton.addEventListener("click", () => {
    const expanded = infoToggleButton.getAttribute("aria-expanded") === "true";

    if (expanded) {
        infoText.style.maxHeight = "0";
        infoText.style.padding = "0 1em";
        infoText.style.border = "none";
        infoText.setAttribute("aria-hidden", "true");
        infoToggleButton.setAttribute("aria-expanded", "false");
    } else {
        infoText.style.maxHeight = infoText.scrollHeight + "px";
        infoText.style.padding = "1em";
        infoText.style.border = "1px solid #444";
        infoText.setAttribute("aria-hidden", "false");
        infoToggleButton.setAttribute("aria-expanded", "true");
    }
});


// CUSTOM DROPDOWN
// Dropdown Renedering
function renderOptions(filter = "", highlightIndex = -1) {
    optionsList.innerHTML = "";

    filteredOptions = namespaces
        .map(entry => entry.tag)
        .filter(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => a.localeCompare(b));

    if (filteredOptions.length === 0) {
        const noResult = document.createElement("div");
        noResult.classList.add("option");
        noResult.textContent = "Keine Treffer";
        noResult.style.cursor = "default";
        optionsList.appendChild(noResult);
        return;
    }

    filteredOptions.forEach((tag, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.tabIndex = -1;
        div.textContent = tag;

        if (index === highlightIndex) {
            div.classList.add("highlight");
        }

        div.addEventListener("click", () => {
            optionsContainer.classList.remove("open");
            optionsFilterInput.value = "";
            highlightedIndex = -2;
            renderOptions();

            const targetRow = document.querySelector(
                `tr[namespaces-tag="${tag}"]`
            );

            if (targetRow) {
                targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
                targetRow.classList.add("highlight");
                setTimeout(() => targetRow.classList.remove("highlight"), 2000);
            } else {
                alert(`Die Namespace "${tag}" wurde nicht in der Tabelle gefunden.`);
            }
        });

        optionsList.appendChild(div);
    });
}

function updateHighlight(index) {
    const options = optionsList.querySelectorAll(".option");
    if (options.length === 0) return;

    if (index < 0) index = options.length - 1;
    if (index >= options.length) index = 0;

    options.forEach(opt => opt.classList.remove("highlight"));
    options[index].classList.add("highlight");
    options[index].focus();

    const optionRect = options[index].getBoundingClientRect();
    const containerRect = optionsContainer.getBoundingClientRect();

    if (optionRect.top < containerRect.top || optionRect.bottom > containerRect.bottom) {
        options[index].scrollIntoView({ block: "nearest" });
    }

    highlightedIndex = index;
}

// Dropdown Events
optionsFilterInput.addEventListener("input", () => {
    highlightedIndex = -2;
    renderOptions(optionsFilterInput.value, highlightedIndex);
});

optionsFilterInput.addEventListener("keydown", (e) => {
    const options = optionsList.querySelectorAll(".option");
    if (options.length === 0) return;

    switch (e.key) {
        case "ArrowDown":
            e.preventDefault();
            updateHighlight(highlightedIndex + 1);
            break;
        case "ArrowUp":
            e.preventDefault();
            updateHighlight(highlightedIndex - 1);
            break;
        case "Enter":
            e.preventDefault();
            options[highlightedIndex]?.click();
            break;
        case "Escape":
            optionsContainer.classList.remove("open");
            selectDisplay.focus();
            break;
    }
});

selectDisplay.addEventListener("click", () => {
    const isOpen = optionsContainer.classList.toggle("open");
    customSelect.setAttribute("aria-expanded", isOpen);
    selectDisplay.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        optionsFilterInput.focus();
        renderOptions();
    }
});

customSelect.addEventListener("keydown", (e) => {
    const options = optionsList.querySelectorAll(".option");
    const allowedKeys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];

    if (!optionsContainer.classList.contains("open")) {
        if (["ArrowDown", "Enter", " "].includes(e.key)) {
            e.preventDefault();
            optionsContainer.classList.add("open");
            customSelect.setAttribute("aria-expanded", "true");
            selectDisplay.setAttribute("aria-expanded", "true");
            optionsFilterInput.value = "";

            renderOptions();
            highlightedIndex = 0;
            updateHighlight(highlightedIndex);
            optionsFilterInput.focus();
        }
        return;
    }

    if (!allowedKeys.includes(e.key)) {
        optionsFilterInput.focus();
        return;
    }

    switch (e.key) {
        case "ArrowDown":
            e.preventDefault();
            updateHighlight(highlightedIndex + 1);
            break;
        case "ArrowUp":
            e.preventDefault();
            updateHighlight(highlightedIndex - 1);
            break;
        case "Enter":
            e.preventDefault();
            options[highlightedIndex]?.click();
            break;
        case "Escape":
            optionsContainer.classList.remove("open");
            customSelect.setAttribute("aria-expanded", "false");
            selectDisplay.setAttribute("aria-expanded", "false");
            selectDisplay.focus();
            break;
    }
});

document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
        optionsContainer.classList.remove("open");
        customSelect.setAttribute("aria-expanded", false);
        selectDisplay.setAttribute("aria-expanded", false);
    }
});


// TABLE RENDERING
function renderTable(searchText = "", mode = "all") {
    tableBody.innerHTML = "";

    const search = searchText.toLowerCase();

    const filteredData = namespaces.filter(
        ({ tag, nutzung, anmerkung, tagroot, scoreroot, teamroot }) => {
            if (mode === "tagroot" && !tagroot) return false;
            if (mode === "scoreroot" && !scoreroot) return false;
            if (mode === "teamroot" && !teamroot) return false;

            return (
                tag.toLowerCase().includes(search) ||
                nutzung.toLowerCase().includes(search) ||
                anmerkung.toLowerCase().includes(search)
            );
        }
    );

    filteredData.forEach(
        ({ tag, nutzung, anmerkung, tagroot, scoreroot, teamroot }) => {
            const tr = document.createElement("tr");
            tr.setAttribute("namespaces-tag", tag);

            const td = (text, label) => {
                const cell = document.createElement("td");
                cell.innerHTML = text;
                if (label) cell.setAttribute("namespaces-label", label);
                return cell;
            };

            tr.append(
                td(tag, "Tag"),
                td(nutzung, "Nutzung"),
                td(anmerkung, "Anmerkung"),
                td(tagroot ? "✅" : "❌"),
                td(scoreroot ? "✅" : "❌"),
                td(teamroot ? "✅" : "❌")
            );

            tableBody.appendChild(tr);
        }
    );
}

tableFilterInput.addEventListener("input", () => {
    renderTable(tableFilterInput.value, filterMode.value);
});

filterMode.addEventListener("change", () => {
    renderTable(tableFilterInput.value, filterMode.value);
});

// INITIAL RENDERING
renderTable();
