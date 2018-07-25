element = id => document.getElementById(id)

const header = () => {
    fetch('/value', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        switch(result.status) {
            case 200:
                element('hhome').style.display = "block"
                element('hcart').style.display = "block"
                element('haccount').style.display = "block"
                element('logout').style.display = "block"
                element('logout').addEventListener('click', logOut)
            /* if (result.session.user.admin) {
                    element('horder').style.display = "block"
                    element('hupload').style.display = "block"
                } */
            break
            case 400:
                element('hlogin').style.display = "block"
                element('hsignup').style.display = "block"
                element('hhome').style.display = "block"
            break
        }
    })
}

const logOut = () => {
    fetch('/logout', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status == 200) {
            alert('Has cerrado sesion')
            window.location.href = '/'
        }
    })
}

addEventListener('load', header)