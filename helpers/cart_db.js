const db = require('./db')

module.exports.new = (person_id, movie_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.none('INSERT INTO cart (person_id, movie_id) VALUES ($1, $2)', [person_id, movie_id]).then(data => {
                res(data)
                obj.done()
            }).catch(error => {
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}

module.exports.show = person_id =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
          obj.any('SELECT movie.name, movie.genre, movie.price FROM movie inner join cart on movie.movie_id = cart.movie_id WHERE person_id = $1 and ordered = false',[person_id]).then(data => { 
                res(data)
                obj.done()
            }).catch(error => {
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}

module.exports.delete_product_from_cart = (user_id, product_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
          obj.any('DELETE FROM cart WHERE user_id = $1 AND product_id = $2',[user_id, product_id]).then(data => { 
                res(data)
                obj.done()
            }).catch(error => {
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}

module.exports.order = (user_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
          obj.any('update cart set ordered = true where person_id = $1',[user_id]).then(data => { 
                res(data)
                obj.done()
            }).catch(error => {
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
