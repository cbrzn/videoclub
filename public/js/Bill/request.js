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
        console.log(result)
    })
}

element('order').addEventListener('click', requestOrder)