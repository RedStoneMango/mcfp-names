const tableBody = document.querySelector("#namespaceTable tbody");
const tableFilterInput = document.getElementById("optionsFilterInput"); // das Feld über der Tabelle
const filterMode = document.getElementById("filterMode");

const customSelect = document.getElementById("namespaceSelect");
const selectDisplay = customSelect.querySelector(".select-display");
const optionsContainer = customSelect.querySelector(".options-container");
const optionsFilterInput = optionsContainer.querySelector("input"); // Dropdown-Filterfeld
const optionsList = optionsContainer.querySelector(".options-list");

const infoToggleButton = document.getElementById("infoToggleButton");
const infoText = document.getElementById("infoText");

const namespaces = await fetch('./namespaces.json').then(r => r.json());
const existingNamespaces = namespaces.map(entry => entry.tag.toLowerCase());
const suggestModal = document.getElementById("suggestModal");
const namespaceSuggestButton = document.getElementById("namespaceSuggestButton");
const closeSuggestModal = document.getElementById("closeSuggestModal");
const namespaceInput = document.getElementById("namespaceInput");
const suggestionResults = document.getElementById("suggestionResults");

let highlightedIndex = -2;
let filteredOptions = [];

// Modal öffnen
namespaceSuggestButton.addEventListener("click", () => {
    suggestModal.style.display = "flex";
    namespaceInput.value = "";
    suggestionResults.innerHTML = "";
    namespaceInput.focus();
});

// Schließen durch Klick auf "✖"-Button
closeSuggestModal.addEventListener("click", () => {
    suggestModal.style.display = "none";
    document.body.style.overflow = "";
});

// Schließen durch Escape-Taste
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && suggestModal.style.display === "flex") {
      suggestModal.style.display = "none";
      document.body.style.overflow = "";
    }
});


// Vorschlags-Logik
function generateNamespaceSuggestions(inputValue) {
    const rawInput = inputValue.trim();
    if (!rawInput) {
      suggestionResults.innerHTML = "";
      return;
    }

    const words = rawInput.toLowerCase().split(/\s+/).filter(Boolean);
    const options = new Set();

    if (words.length === 0) return;

    // Standard: snake_case
    options.add(words.join("_"));

    // Standard: zusammenhängend
    options.add(words.join(""));

    // Initialen
    options.add(words.map(w => w[0]).join(""));

    // Einzelne Wörter
    words.forEach(w => options.add(w));

    // Vokal-Abkürzungen
    const isVowel = c => "aeiouäöü".includes(c);

    const getUntilVowel = (word) => {
    let count = 0;
    let result = "";
    for (let i = 0; i < word.length; i++) {
        const c = word[i];
        result += c;
        if (isVowel(c)) {
        count++;
        if ((isVowel(word[0]) && count === 2) || (!isVowel(word[0]) && count === 1)) {
            break;
        }
        }
    }
    return result;
    };

    const abbrevWords = words.map(getUntilVowel);
    if (abbrevWords.length > 0) {
    options.add(abbrevWords.join("_"));
    options.add(abbrevWords.join(""));
    }

    // Filter auf bereits existierende
    const uniqueOptions = Array.from(options);
    const freeOptions = uniqueOptions.filter(opt => !existingNamespaces.includes(opt));

    // Anzeige
    suggestionResults.innerHTML = "";

    if (freeOptions.length === 0) {
    suggestionResults.innerHTML = `<p style="color: red;">⚠️ Keine ungenutzten Namespace-Vorschläge gefunden.</p>`;
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
    copyBtn.style.background = "#333";
    copyBtn.style.color = "#e0e0e0";
    copyBtn.style.border = "1px solid #444";
    copyBtn.style.borderRadius = "4px";
    copyBtn.style.padding = "0.2em 0.5em";
    copyBtn.style.cursor = "pointer";
    copyBtn.style.marginLeft = "1em";
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(opt);
        copyBtn.textContent = "✅ Kopiert!";
        setTimeout(() => {
        copyBtn.textContent = "📋 Kopieren";
        }, 1500);
    });

    li.appendChild(span);
    li.appendChild(copyBtn);
    list.appendChild(li);
    });

    suggestionResults.appendChild(list);
}

// Live-Vorschläge bei Eingabe
namespaceInput.addEventListener("input", () => {
    generateNamespaceSuggestions(namespaceInput.value);
});

closeSuggestModal.addEventListener("click", () => {
    suggestModal.style.display = "none";
});

infoToggleButton.addEventListener("click", () => {
    const expanded = infoToggleButton.getAttribute("aria-expanded") === "true";
    if (expanded) {
    // schließen
    infoText.style.maxHeight = "0";
    infoText.style.padding = "0 1em";
    infoText.style.border = "none";
    infoText.setAttribute("aria-hidden", "true");
    infoToggleButton.setAttribute("aria-expanded", "false");
    } else {
    // öffnen
    infoText.style.maxHeight = infoText.scrollHeight + "px";
    infoText.style.padding = "1em";
    infoText.style.border = "1px solid #444";
    infoText.setAttribute("aria-hidden", "false");
    infoToggleButton.setAttribute("aria-expanded", "true");
    }
});

function renderOptions(filter = "", highlightIndex = -1) {
    optionsList.innerHTML = "";
    filteredOptions = namespaces
    .map((entry) => entry.tag)
    .filter((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
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
        // Fokus nur in updateHighlight setzen
    }

    div.addEventListener("click", () => {
        optionsContainer.classList.remove("open");
        optionsFilterInput.value = "";
        highlightedIndex = -2;
        renderOptions();

        // Scroll und Highlight der Zeile
        const targetRow = document.querySelector(`tr[namespaces-tag="${tag}"]`);
        if (targetRow) {
            targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
            targetRow.classList.add("highlight");
            setTimeout(() => targetRow.classList.remove("highlight"), 2000);
        }
        else {
            alert(`Die Namespace "${tag}" wurde nicht in der Tabelle gefunden.`);
        }
    });

    optionsList.appendChild(div);
    });
}

function updateHighlight(index) {
    const options = optionsList.querySelectorAll(".option");
    if (options.length === 0) return;

    // Index begrenzen
    if (index < 0) index = options.length - 1;
    if (index >= options.length) index = 0;

    options.forEach((opt) => opt.classList.remove("highlight"));
    options[index].classList.add("highlight");
    options[index].focus();

    // Scroll die markierte Option ins sichtbare Bereich des Containers
    const optionRect = options[index].getBoundingClientRect();
    const containerRect = optionsContainer.getBoundingClientRect();
    if (optionRect.top < containerRect.top) {
    options[index].scrollIntoView({ block: "nearest" });
    } else if (optionRect.bottom > containerRect.bottom) {
    options[index].scrollIntoView({ block: "nearest" });
    }

    highlightedIndex = index;
}

// Event Listener für Filter im Dropdown
optionsFilterInput.addEventListener("input", () => {
    highlightedIndex = -2;
    renderOptions(optionsFilterInput.value, highlightedIndex);
});

// Pfeiltasten & Enter im Dropdown-Filterfeld
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
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
        options[highlightedIndex].click();
        }
        break;
    case "Escape":
        optionsContainer.classList.remove("open");
        selectDisplay.focus();
        break;
    }
});

// Klick auf Anzeige öffnet/schließt Dropdown
selectDisplay.addEventListener("click", () => {
    const isOpen = optionsContainer.classList.toggle("open");
    customSelect.setAttribute("aria-expanded", isOpen);
    selectDisplay.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
    optionsFilterInput.focus();
    renderOptions();
    }
});

// Öffnen Dropdown auch über Tastatur (Enter / Space)
customSelect.addEventListener("keydown", (e) => {
    const options = optionsList.querySelectorAll(".option");
    if (options.length === 0) return;

    // Liste der erlaubten Tasten, die nicht den Filterfokus triggern
    const allowedKeys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];

    if (!optionsContainer.classList.contains("open")) {
    // Dropdown ist zu, öffne bei Pfeiltasten, Enter, Space wie gehabt
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

    // Dropdown ist offen
    if (!allowedKeys.includes(e.key)) {
    // Fokussiere das Filter-Input für alle anderen Tasten
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
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
        options[highlightedIndex].click();
        }
        break;
    case "Escape":
        optionsContainer.classList.remove("open");
        customSelect.setAttribute("aria-expanded", "false");
        selectDisplay.setAttribute("aria-expanded", "false");
        selectDisplay.focus();
        break;
    }
});


// Dropdown schließt sich, wenn man außerhalb klickt
document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
    optionsContainer.classList.remove("open");
    customSelect.setAttribute("aria-expanded", false);
    selectDisplay.setAttribute("aria-expanded", false);
    }
});

// Tabelle rendern mit optionalem Filtermodus und Suchtext
function renderTable(searchText = "", mode = "all") {
    tableBody.innerHTML = "";

    const filteredData = namespaces.filter(({ tag, nutzung, anmerkung, tagroot, scoreroot, teamroot }) => {
        // Filtermodus
        if (mode === "tagroot" && !tagroot) return false;
        if (mode === "scoreroot" && !scoreroot) return false;
        if (mode === "teamroot" && !teamroot) return false;
    
        // Suchfilter
        const search = searchText.toLowerCase();
        if (
            !tag.toLowerCase().includes(search) &&
            !nutzung.toLowerCase().includes(search) &&
            !anmerkung.toLowerCase().includes(search)
        ) {
            return false;
        }
        return true;
    });

    filteredData.forEach(({ tag, nutzung, anmerkung, tagroot, scoreroot, teamroot }) => {
        const tr = document.createElement("tr");
        tr.setAttribute("namespaces-tag", tag);
    
        const tdTag = document.createElement("td");
        tdTag.innerHTML = tag;
        tdTag.setAttribute("namespaces-label", "Tag");
        tdTag.scope = "row";
    
        const tdNutzung = document.createElement("td");
        tdNutzung.innerHTML = nutzung;
        tdNutzung.setAttribute("namespaces-label", "Nutzung");
    
        const tdAnmerkung = document.createElement("td");
        tdAnmerkung.innerHTML = anmerkung;
        tdAnmerkung.setAttribute("namespaces-label", "Anmerkung");
    
        const tdTagroot = document.createElement("td");
        tdTagroot.classList.add("symbol-cell");
        tdTagroot.textContent = tagroot ? "✅" : "❌";
    
        const tdScoreroot = document.createElement("td");
        tdScoreroot.classList.add("symbol-cell");
        tdScoreroot.textContent = scoreroot ? "✅" : "❌";
    
        const tdTeamroot = document.createElement("td");
        tdTeamroot.classList.add("symbol-cell");
        tdTeamroot.textContent = teamroot ? "✅" : "❌";
    
        tr.append(tdTag, tdNutzung, tdAnmerkung, tdTagroot, tdScoreroot, tdTeamroot);
    
        tableBody.appendChild(tr);
    });
}

// Filterinput und Select synchronisieren Tabelle neu rendern
tableFilterInput.addEventListener("input", () => {
    renderTable(tableFilterInput.value, filterMode.value);
});

filterMode.addEventListener("change", () => {
    renderTable(tableFilterInput.value, filterMode.value);
});

// Initiales Rendern
renderTable();
tableBody.parentElement.style.display = "";