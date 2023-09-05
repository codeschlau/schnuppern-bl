
var editingUsername = false;

function editUsername() {
    if (!editingUsername) {
        var usernameElement = document.getElementById('username');
        var currentUsername = usernameElement.textContent;
        var usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.value = currentUsername;

        usernameInput.addEventListener('blur', function () {
            // Speichere den neuen Benutzernamen und beende den Bearbeitungsmodus
            var newUsername = usernameInput.value;
            usernameElement.textContent = newUsername;
            editingUsername = false;
        });

        usernameElement.textContent = '';
        usernameElement.appendChild(usernameInput);
        usernameInput.focus();
        editingUsername = true;
    }
}

// JavaScript-Code für das Quiz
var completedQuestions = [];

function submitAntwort(richtigeAntwort, postenId, frageNummer) {
    if (completedQuestions.includes(`${postenId}-${frageNummer}`)) {
        return; // Diese Frage wurde bereits abgeschlossen
    }

    var ausgewählteAntwort = document.querySelector(`#${postenId} input[name="antwort${frageNummer}"]:checked`);
    if (ausgewählteAntwort) {
        var benutzerAntwort = ausgewählteAntwort.value;
        var ergebnisId = `ergebnis-${postenId}-${frageNummer}`;
        if (benutzerAntwort === richtigeAntwort) {
            document.getElementById('punkte').textContent = parseInt(document.getElementById('punkte').textContent) + 1;
            document.getElementById(ergebnisId).textContent = 'Richtig!';
            document.getElementById(ergebnisId).style.color = 'green';
        } else {
            document.getElementById(ergebnisId).textContent = 'Falsch!';
            document.getElementById(ergebnisId).style.color = 'red';
        }

        // Markiere die Frage als abgeschlossen
        completedQuestions.push(`${postenId}-${frageNummer}`);
    }
}

// Funktion zum Anzeigen des ausgewählten Postens
function showPosten(postenId) {
    var posten = ['posten1', 'posten2', 'posten3', 'feedback']; // Fügen Sie hier weitere Posten-IDs hinzu
    posten.forEach(function (posten) {
        var element = document.getElementById(posten);
        element.style.display = 'none';
    });

    document.getElementById(postenId).style.display = 'block';
}

// Starte mit dem ersten Posten
showPosten('posten1');