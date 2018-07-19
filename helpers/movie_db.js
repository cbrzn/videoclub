const db = require('./db')

module.exports.new = (name, path, price, description, genre)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO movie (name, image, price, description, genre) VALUES ($1, $2, $3, $4, $5)', [name, path, price, description, genre]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}

module.exports.all = () => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT * FROM movie').then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}

module.exports.show = (id) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.one('SELECT * FROM movie where movie_id = $1',[id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}

module.exports.delete_movie = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('DELETE FROM movie where id = $1',[id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}

module.exports.update_movie = (name, price, id ) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.result('UPDATE movie SET name = $1, price = $2 WHERE id = $3',[name, price, id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}
