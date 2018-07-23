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
        console.log(result)
    })
}

element('add').addEventListener('click', addToCart)