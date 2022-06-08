var express = require('express');
var router = express.Router();
var { register , login , general , restricted } = require('../controllers/auth')
const { check } = require('../auth-middleware/checkIfToken')

// everyone can access
router.get('/general', general)
// only those with valid token can access
router.get('/restricted', check , restricted)
// registration route
router.post('/register', register)
// login route for registered users
router.post('/login', login)

module.exports = router;
