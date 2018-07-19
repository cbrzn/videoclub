element = id => { 
    return document.getElementById(id)
}

const loadImages = () => {
    fetch('/movies/all')
    .then(response => response.json())
    .then(result => {
        var poster = []
        const container = element('grid')
        for (var i in result.movies) {
            var column = document.createElement('div')
            poster[i] = new Image();
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

function showMovie() {
    window.location.href = `/product-detail.html?id=${this.id}`
}

addEventListener('load', loadImages)