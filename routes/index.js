const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

try {
    let nowDateTime = moment(Date.now()).format('YYMMDD');
    fs.readdirSync(`uploads/${nowDateTime}`);
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    let nowDateTime = moment(Date.now()).format('YYMMDD');
    fs.mkdirSync(`uploads/${nowDateTime}`);
}

randomChracter = async (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let i = 0;
    while (i < length){
        i++;
        text = await text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}



router.get('/', async (req, res, next) => {
    res.send('435345345345345')
});


router.get('/write', async (req, res, next) => {
    // console.log(__BASEDIR);
    var nowDateTime = moment(Date.now()).format('YYMMDD');
    var testVal = await randomChracter(8);
    console.log(testVal);
    console.log(typeof (nowDateTime));
    res.render('editor_main')
})

router.post('/update', (req, res) => {
    console.log(req.body);
    res.send('wait!!!!!!!!!!!!!!!!!!!')

});


router.post('/testax', async (req, res) => {


    // console.log(req.body);

    let tempBase64 = req.body.base64Data;
    let decode = await Buffer.from(tempBase64, 'base64');
    let makeDecodeFile = await fs.writeFileSync('uploads/decode.jpg', decode);



    let gotoData = { goname: '나야나야나', chkname: 'ajax보다 더 쉽네??' }
    res.send(gotoData)
});


module.exports = router;
