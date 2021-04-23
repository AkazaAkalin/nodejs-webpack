const express = require('express')
const router = express.Router()

router.get('/list', (req, resp) => {
    resp.send('listTimeLine')
})
module.exports = {
    router
}