element = id => document.getElementById(id)

updatePassword = () => {
    const password = element('password').value
    const confirmation = element('confirm_password').value
    const token = document.location.href.split('token=')[1];
    
    if (password == confirmation) {
            fetch(`./password/reset/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ password })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert('Contrasena cambiada con exito!')
            })
    } else {
        alert('Las contrasenas deben ser iguales')
    }
}

element('new_password').addEventListener('click', updatePassword)