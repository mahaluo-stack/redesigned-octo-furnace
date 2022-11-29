const express = require("express");
const router = express.Router();

router.get('/', function (req, res, next) {
    try {
        res.render('home');
    } catch (error) {
        next(error);
    }
});

module.exports = router;