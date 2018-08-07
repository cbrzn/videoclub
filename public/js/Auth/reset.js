element = id => document.getElementById(id)

checkStatus = () => {
    const status = document.location.href.split('status=')[1]
    switch(status) {
        case '403':
            alert('No has enviado correo de reinicio de contrasena')
        break
        case '404':
            alert('Su tiempo de requisito expiro, pida un nuevo correo')
        break
    }
}

sendEmail = () => {
    const email = element('email').value
    fetch('./password/forgot', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(result => {
        switch(result.status) {
            case 200:
                alert('Correo enviado! Revisa tu bandeja de entrada para reiniciar contrasena')
            break
            case 404:
                alert('Correo no existe')
            break
            case 500:
                alert('Error al enviar el correo, por favor trate de nuevo')
            break
        }
    })
}

addEventListener('load', checkStatus)
element('reset').addEventListener('click', sendEmail)
