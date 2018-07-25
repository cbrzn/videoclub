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

module.exports.all = ()=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.any('select * from bill', []).then(data => {
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

module.exports.show = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.one('select person.name, bill.bill_id, bill.total, bill.date, bill.payment_form, bill.status from bill inner join person on person.person_id = bill.person_id where bill_id = $1', [id]).then(data => {
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

module.exports.update = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.none('update bill set status = true where bill_id = $1', [id]).then(data => {
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

module.exports.by_user = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.any('select * from bill where person_id = $1', [id]).then(data => {
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