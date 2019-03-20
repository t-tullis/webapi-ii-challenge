const express =  require('express');

const db = require('./data/db.js')

const router = express.Router();


//Retrieve all posts
router.get('/', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts)
    }).catch(error => {
        res.status(500).json({  error: "The posts information could not be retrieved." })
    })
})

//Create a new post
router.post('/', (req, res) => {
    const { title, contents } = req.body
    if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert({title, contents}).then(post => {
        res.status(201).json(post)
    }).catch(error => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

//Get post by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(post => {
        if(post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json({post})
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

//Delete a post
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(post => {
        if(post === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(204).end();
    }).catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

//Update a post
router.put('/:id', (req, res) => {
    const { id }= req.params;
    const { title, contents } = req.body;
    db.update(id, { title, contents }).then(post => {
        if(post === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        if(!title || !contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;