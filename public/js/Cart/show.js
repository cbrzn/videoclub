element = id => document.getElementById(id)

const showCart = () => {
    fetch('/cart/show', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        const tbody = element('table')
        let total = 0
        for (var i in result.cart) {
            const { name, genre, price } = result.cart[i]
            const tr = document.createElement('tr')
            const movie = document.createElement('th')
            const genr = document.createElement('td')
            const pric = document.createElement('td')
            
            movie.innerHTML = name
            movie.setAttribute('scope', 'row')
            genr.innerHTML = genre
            pric.innerHTML = price

            total += +price

            tr.appendChild(movie)
            tr.appendChild(genr)
            tr.appendChild(pric)

            tbody.appendChild(tr)
        }
        element('total').value = total
    })
}

addEventListener('load', showCart)