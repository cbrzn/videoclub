const express = require('express')
const movie = require('./../helpers/movie_db')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/images')
    },
    filename:(req, file, cb) => {
        cb(null, `${file.originalname}`)
        }
    })

const upload = multer({ storage })

router.get('/all', (req,res) => {
    movie.all().then(movies => {
        res.send({
          status: 200,
          movies
        })
    }).catch(err => {
       res.send({ status: 500 })
    })
})

router.get('/:id', (req,res) => {
    movie.show(req.params.id).then(movie => {
        res.send({ 
            status: 200,
            movie 
        })
    }).catch(err => {
        res.send({ status: 500 })
    })
})

router.get('/genres/all', async (req,res) => {
    const genres =  await movie.genres()
    res.send({ genres })
})

router.get('/delete/:id', (req, res) => {
    movie.delete_movie(req.params.id).then(data => {
        res.send({msg:data})
        }).catch((err)=> {
        throw err
    })
})

router.post('/update/:id', (req, res)=> {
    const { name, price } = req.body
    movie.update_movie(name, price, req.params.id).then(data => {
        res.send({msg:data})
    }).catch((err)=> {
        throw err
    })
})

router.get('/by_genre/:genre', async (req, res) => {
    try {
        const movies = await movie.by_genre(req.params.genre)
        res.send({ movies })
    } catch (e) {
        res.send({ 
            status: 500
        })
    }  
})


router.post('/new', upload.single('file'), (req,res) => {
    const { name, price, description, genre } = req.body
    console.log(genre)
    movie.new(name, `./images/${req.file.originalname}`, price, description, genre.split(", ")).then(success => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({
            status: 500
        })
    })
})

module.exports = router
