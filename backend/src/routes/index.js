const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello World');
});
router.get('/:img', function(req, res){
    res.sendFile( `uploads/${img}` );
}); 

module.exports = router;