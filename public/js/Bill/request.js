element = id => document.getElementById(id)

const requestOrder = () => {
    fetch('/cart/order', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include',
    })
    .then(response => response.json())
    .then(result => {
        if (result.status == 200) {
            alert('Orden pedida y pendiente para ser retirada')
        }
    })
}

element('order').addEventListener('click', requestOrder)