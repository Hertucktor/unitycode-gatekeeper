// Globale Variablen zur Speicherung der Zugangsdaten
let storedUsername = '';
let storedPassword = '';
let step1Validated = false;
let step2Validated = false;

// Wechsel zwischen Tabs
function openTab(tabId) {
    // Verstecke alle Formulare
    const forms = document.getElementsByClassName('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.remove('active');
    }
    
    // Deaktiviere alle Tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Zeige das gewählte Formular und aktiviere den Tab
    document.getElementById(tabId).classList.add('active');
    
    // Aktiviere den entsprechenden Tab-Button
    if(tabId === 'step1') {
        tabs[0].classList.add('active');
    } else if(tabId === 'step2') {
        tabs[1].classList.add('active');
    } else {
        tabs[2].classList.add('active');
    }
}

// Überprüft Schritt 1 bevor Schritt 2 geöffnet wird
function checkStep1BeforeOpen(tabId) {
    if(!step1Validated) {
        showAlert("Bitte zuerst die persönlichen Daten korrekt ausfüllen!");
        return;
    }
    openTab(tabId);
}

// Überprüft Schritt 2 bevor Login geöffnet wird
function checkStep2BeforeOpen(tabId) {
    if(!step2Validated) {
        showAlert("Bitte zuerst die Registrierung mit Zugangsdaten abschließen!");
        return;
    }
    openTab(tabId);
}

// Zeige eine Alert-Nachricht (für Fehlermeldungen)
function showAlert(message) {
    alert(message); // Bleibt als einfacher Alert für Fehlermeldungen
}

// wait for DOM to be loaded completely
//document.addEventListener('DOMContentLoaded', function() {
//    // Event Listener for form submit
//    document.getElementById('personalDataForm').addEventListener('submit', function(event) {
//            event.preventDefault();
//            registerData();
//    });
//});

function registerData(event) {
    event.preventDefault();

    const formData = {
        name:       document.getElementById('name').value.trim(),
        email:       document.getElementById('email').value.trim(),
        telefon:    document.getElementById('telefon').value.trim(),
        username:    document.getElementById('username').value.trim(),
        password:    document.getElementById('password').value.trim(),
    };

    // validate
    if (!validateForm(formData)) {
        return false;
    }

    // send data to endpoint
    fetch('http://127.0.0.1:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Erfolg:', data);
        //navigate to next site or show next step
        alert('Registrierung erfolgreich!');
        // reset form
        document.getElementById('personalDataForm').reset();
    })
    .catch((error) => {
        console.error('Fehler:', error);
        alert('Ein Fehler ist aufgetreten: ' + error.message);
    });
}

function validateForm(data) {
    let isValid = true;

    // reset error msgs
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // validate name
    if (!data.name) {
        document.getElementById('name-error').textContent = 'Name ist erforderlich';
        isValid = false;
    }
    
    // validate email
    if (!data.email) {
        document.getElementById('email-error').textContent = 'E-Mail ist erforderlich';
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        document.getElementById('email-error').textContent = 'Ungültige E-Mail-Adresse';
        isValid = false;
    }
    
    // validate telefon
    if (data.telefon && !isValidPhone(data.telefon)) {
        document.getElementById('telefon-error').textContent = 'Ungültige Telefonnummer';
        isValid = false;
    }
    
    return isValid
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//TODO: should be extended via JS-Plugin intl-tel-input or someting equal
const phoneRegex = /^[+\d][\d\s\-()]{5,}$/;

function isValidEmail(email) {
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    return phoneRegex.test(phone);
}