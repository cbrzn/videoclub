const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.by_email = (email)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.one('SELECT * FROM person where email = $1',[email]).then((data)=>{
                res(data);
                obj.done();
            }).catch(error =>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch(error =>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.compare_password = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
        let hashedPass = bcrypt.hashSync(hash, 10);
        bcrypt.compare(candidatePassword, hashedPass, (err, isMatch) => {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.new = (name, email, password, location)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
            obj.none('INSERT INTO person (name, email, password, location) VALUES ($1, $2, $3, $4)',[name, email, password, location]).then(data =>{
                res(data);
                obj.done();
            }).catch(error => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch(error => {
            console.log(error);
            rej(error);
        });
    });
}
