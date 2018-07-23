element = id => document.getElementById(id)


const show = () => {
    const actual_url = window.location.href
    const url = new URL(actual_url)
    const id = url.searchParams.get('id')

    fetch(`/movies/${id}`)
    .then(response => response.json())
    .then(result => {
        const { name, price, description, genre, image } = result.movie
        const poster = element("poster")
        const img = document.createElement('img')
        img.setAttribute('src', image)
        poster.appendChild(img)
        element('name').setAttribute('value', name)
        element('price').setAttribute('value', price)
        element('description').setAttribute('value', description)
        element('genre').setAttribute('value', genre)
    })
}

addEventListener('load', show)