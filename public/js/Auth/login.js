element = id => { 
    return document.getElementById(id)
}

const login = () => {
    const email = element('email').value
    const password = element('password').value

    body = {
        email, password
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

element('login').addEventListener('click', login)