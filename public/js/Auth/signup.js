element = id => { 
    return document.getElementById(id)
}

const signUp = () => {
    const name = element('name').value
    const email = element('email').value
    const password = element('password').value
    const location = element('location').value

    body = {
        name, email, password, location
    }

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? alert('You are registered') : alert('There was an error')
    })
}

element('register').addEventListener('click', signUp)