const express = require('express')

const postsRouter = require('./router.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send('API II challenge')
})

module.exports = server;