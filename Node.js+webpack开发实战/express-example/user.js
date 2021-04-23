const express = require('express')
const router = express.Router()

router.get('/login',(req, resp)=> {
    resp.send('login')
})
router.get('/register', (req, resp) => {
    resp.send('register')
})
module.exports = router