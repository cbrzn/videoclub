element = id => document.getElementById(id)

const loadImages = () => {
    fetch('/movies/all')
    .then(response => response.json())
    .then(result => {
        var poster = []
        const container = element('grid')
        container.innerHTML = ''
        for (var i in result.movies) {
            var column = document.createElement('div')
            poster[i] = new Image()
            poster[i].setAttribute('id', result.movies[i].movie_id)
            poster[i].setAttribute('src', result.movies[i].image)
            poster[i].setAttribute('class', 'card-img')
            column.setAttribute('class', 'col-md-3')
            column.appendChild(poster[i])
            container.appendChild(column)
            poster[i].addEventListener('click', showMovie)
        }
    })
}

const loadGenres = () => {
    fetch('/movies/genres/all')
    .then(response => response.json())
    .then(result => {
        const genres = element('genreCollectionForm')
        for (var i in result.genres) {
            const option = document.createElement('option')
            option.value = result.genres[i].genre
            option.innerHTML = result.genres[i].genre
            genres.appendChild(option)
        }
    })
}

const searchByGenre = () => {
    const genre = element('genreCollectionForm').value
    if (genre != 'all') {
        fetch(`/movies/by_genre/${genre}`)
        .then(response => response.json())
        .then(result => {
            const poster = []
            const container = element('grid')
            container.innerHTML = ''
            for (var i in result.movies) {
                var column = document.createElement('div')
                poster[i] = new Image()
                poster[i].setAttribute('id', result.movies[i].movie_id)
                poster[i].setAttribute('src', result.movies[i].image)
                poster[i].setAttribute('class', 'card-img')
                column.setAttribute('class', 'col-md-3')
                column.appendChild(poster[i])
                container.appendChild(column)
                poster[i].addEventListener('click', showMovie)
            }
        })
    } else {
        loadImages()
    }
}

function showMovie() {
    window.location.href = `/product-detail.html?id=${this.id}`
}

element('search').addEventListener('click', searchByGenre)
addEventListener('load', loadGenres)
addEventListener('load', loadImages)