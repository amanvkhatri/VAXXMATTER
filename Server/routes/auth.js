const express = require('express');
const authcontroller = require('../controllers/auth');

const router = express.Router();

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
router.post('/getdata', authcontroller.getdata);
router.post('/bookslot', authcontroller.bookslot);
router.post('/bookeddata', authcontroller.bookeddata);
router.post('/emailforotp', authcontroller.emailforotp);

router.post('/verify', authcontroller.verify);
router.post('/otp', authcontroller.otp);

module.exports = router;