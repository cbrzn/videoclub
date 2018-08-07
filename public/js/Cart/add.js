element = id => document.getElementById(id)

const addToCart = () => {    
    const actual_url = window.location.href
    const url = new URL(actual_url)
    const id = url.searchParams.get('id')

    fetch('/cart/new', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify( { id } )
    })
    .then(response => response.json())
    .then(result => {
        if (result.status == 200) {
            alert('Has anadido una pelicula al carro de compras')
            window.location.href = '/index.html'
        } else {
            alert('There was a mistake')
        }
    })
}

element('add').addEventListener('click', addToCart)