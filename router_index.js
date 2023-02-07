const express = require('express');
const router = express.Router();

router.use('/routes', require('./routes'), (req,res) => {
    res.send("routes.js file initialized...");
});

module.exports = router;