function registerData(event) {
    event.preventDefault();

    const formData = {
        name:               document.getElementById('name').value.trim(),
        email:              document.getElementById('email').value.trim(),
        telefon:            document.getElementById('telefon').value.trim(),
        username:           document.getElementById('username').value.trim(),
        password:           document.getElementById('password').value.trim(),
        confirmPassword:    document.getElementById('register-confirm-password').value.trim(),
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

    // validate password
    if (!data.password || data.password.length < 15) {
        document.getElementById('password-error').textContent = 'Das Passwort muss mindestens 15 Zeichen lang sein.';
        isValid = false;
    }

    // validate password confirmation
    if (data.confirmPassword !== data.password) {
        document.getElementById('register-confirm-password-error').textContent = 'Die Passwörter stimmen nicht überein.';
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