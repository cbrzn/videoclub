const db = require('./db')

module.exports.new = (person_id, total, date)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.none('INSERT INTO bill (person_id, total, date) VALUES ($1, $2, $3)', [person_id, total, date]).then(data => {
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
