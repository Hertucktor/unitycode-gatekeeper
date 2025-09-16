function loginData(event) {
    event.preventDefault();

    const formData = {
        username:    document.getElementById('username').value.trim(),
        password:    document.getElementById('password').value.trim(),
    };

    // validate
    if (!validateForm(formData)) {
        return false;
    }

    // send data to endpoint
    fetch('http://127.0.0.1:8080/login', {
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
        alert('Login erfolgreich!');
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
    if (!data.username) {
        document.getElementById('name-error').textContent = 'Nutzername ist erforderlich';
        isValid = false;
    }

    // validate password
    if (!data.password) {
        document.getElementById('name-error').textContent = 'Passwort ist erforderlich';
        isValid = false;
    }
    
    return isValid
}