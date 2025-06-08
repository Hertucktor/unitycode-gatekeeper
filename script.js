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
        showAlert("Bitte zuerst die persönlichen Daten mit den Testdaten korrekt ausfüllen!");
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

// Validierung von Schritt 1
function validateStep1() {
    const name = document.getElementById('name').value.trim();
    const telefon = document.getElementById('telefon').value.trim();
    let isValid = true;
    
    // Zurücksetzen der Fehlermeldungen
    document.getElementById('name-error').textContent = '';
    document.getElementById('telefon-error').textContent = '';
    
    // Name validieren
    if(name !== "Max Mustermann") {
        document.getElementById('name-error').textContent = 'Bitte geben Sie "Max Mustermann" ein';
        isValid = false;
    }
    
    // Telefonnummer validieren
    if(telefon !== "+49 123 456789") {
        document.getElementById('telefon-error').textContent = 'Bitte geben Sie "+49 123 456789" ein';
        isValid = false;
    }
    
    if(isValid) {
        step1Validated = true;
        // Aktiviere den zweiten Tab
        document.getElementById('step2-tab').classList.remove('disabled');
        openTab('step2');
    }
}

// Validierung und "Registrierung"
function validateAndRegister() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if(username === '') {
        showAlert('Bitte geben Sie einen Benutzernamen ein!');
        return;
    }
    
    if(password !== confirmPassword) {
        showAlert('Die Passwörter stimmen nicht überein!');
        return;
    }
    
    if(password.length < 8) {
        showAlert('Das Passwort muss mindestens 8 Zeichen lang sein!');
        return;
    }
    
    // Speichere die Zugangsdaten für die spätere Anmeldung
    storedUsername = username;
    storedPassword = password;
    step2Validated = true;
    
    // Aktiviere den Login-Tab
    document.getElementById('login-tab').classList.remove('disabled');
    
    // Fülle die Anmeldedaten automatisch aus (nur zur Demo)
    document.getElementById('login-username').value = username;
    
    // Zeige Registrierungs-Erfolgs-Popup
    showRegistrationPopup();
}

// Zeige Registrierungs-Erfolgs-Popup
function showRegistrationPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('registrationPopup').style.display = 'block';
}

// Schließe Registrierungs-Erfolgs-Popup
function closeRegistrationPopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('registrationPopup').style.display = 'none';
    openTab('login');
}

// Validierung der Anmeldedaten
function validateLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    if(username === '' || password === '') {
        showAlert('Bitte geben Sie Benutzernamen und Passwort ein!');
        return;
    }
    
    if(username === storedUsername && password === storedPassword) {
        showWelcomePopup();
    } else {
        showAlert('Falscher Benutzername oder Passwort!');
    }
}

// Zeige Willkommens-Popup
function showWelcomePopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('welcomePopup').style.display = 'block';
}

// Schließe Willkommens-Popup
function closeWelcomePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('welcomePopup').style.display = 'none';
}