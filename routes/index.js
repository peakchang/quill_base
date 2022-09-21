const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.send('435345345345345')
});


router.get('/write', (req, res, next) => {
    res.render('editor_main')
})

router.post('/update', (req, res) => {
    console.log(req.body);
    res.send('wait!!!!!!!!!!!!!!!!!!!')

});


router.post('/testax', async (req, res) => {
    console.log(req.body);
    let tempBase64 = req.body.base64Data;
    let decode = await Buffer.from(tempBase64, 'base64');
    let makeDecodeFile = await fs.writeFileSync('./decode.jpg', decode);
    

    let gotoData = {goname: '나야나야나', chkname: 'ajax보다 더 쉽네??'}
    res.send(gotoData)
});


module.exports = router;
