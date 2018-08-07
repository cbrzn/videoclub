element = id => document.getElementById(id)

const upload = () => {
    let body = new FormData()
    const name = element("name").value
    const file = element("file").files[0]
    const genre = element("genre").value
    const description = element("description").value
    const price = element("price").value 
    body.append('name', name)
    body.append('price', price)
    body.append('genre', genre)
    body.append('description', description)
    body.append('file', file, file.name)
    fetch('/movies/new', {
        method: 'POST',
        body
    })
    .then(response => response.json())
    .then(result => {
        if (result.status == 200) {
            alert('Haz agregado un producto')
        }
    })
}

element('create').addEventListener('click', upload)