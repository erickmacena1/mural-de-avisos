const express = require('express')
const router = express.Router()
const cors = require('cors')
const posts = require('../model/posts')

options = {
    origin: "http://localhost:3000"
}

router.use(cors())

router.get('/all', (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
})

router.post('/new', express.json(), (req, res) => {
    let title = req.body.title
    let description = req.body.description

    posts.newPost(title, description)

    res.send("Post adicionado")
})

router.delete('/delete', express.json(), (req, res) => {
    let id = req.body.id

    posts.deletePost(id)

    res.send(`ID ${id} DELETADO`)
})

module.exports = router