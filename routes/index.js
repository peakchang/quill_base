const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

try {
    fs.readdirSync('uploads');
    fs.readdirSync('uploads/editor');
    let nowDateTime = moment(Date.now()).format('YYMMDD');
    fs.readdirSync(`uploads/editor/${nowDateTime}`);
} catch (error) {
    fs.mkdirSync('uploads');
    fs.mkdirSync('uploads/editor');
    let nowDateTime = moment(Date.now()).format('YYMMDD');
    fs.mkdirSync(`uploads/editor/${nowDateTime}`);
}



randomChracter = async (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let i = 0;
    while (i < length) {
        i++;
        text = await text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


router.post('/update', async (req, res) => {
    const tempContent = req.body.quill_val;

    // console.log(tempContent);
    // 받은 내용에서 이미지 태그 부분을 <quill-temp-image> 로 변경 & 이미지 base64 내용을 배열로 넘김
    // const regEcAll = /\<img\ssrc\=\"[\w\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]([^\<])*/g;
    // if (regEcAll.test(tempContent)) {
    //     var getImageTags = tempContent.match(regEcAll);
    //     var resultContent = tempContent.replace(regEcAll, '<quill-temp-image>');
    //     // 이미지 업로드 & 기존 태그에 이미지 내용 넣기
    //     let imgArr = [];
    //     let dateFolder = moment(Date.now()).format('YYMMDD');
    //     for await (const ImageTag of getImageTags) {
    //         let ImageTagTemp = ImageTag.split(',');
    //         let ImageTagTemp2 = ImageTagTemp[1].replace(/\"\>/, "");

    //         let nowDateTime = moment(Date.now()).format('YYMMDDHHmmss');
    //         const updateImgName = await randomChracter(8) + nowDateTime
    //         let decode = await Buffer.from(ImageTagTemp2, 'base64');
    //         await fs.writeFileSync(`uploads/editor/${dateFolder}/${updateImgName}.jpg`, decode);
    //         imgArr.push(`img/editor/${dateFolder}/${updateImgName}.jpg`)
    //     }

    //     for (const img of imgArr) {
    //         let imgSrc = `<img src="/${img}">`;
    //         const regImg = /\<\q\u[\w\-\>]*/
    //         var resultContent = resultContent.replace(regImg, imgSrc);
    //     }
    // }

    // console.log(resultContent);


    

    // var regEx = /data\:[\w\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]([^\"])*/g;
    // var getImages = tempContent.match(regEx);
    // console.log(getImages);



    res.send('wait!!!!!!!!!!!!!!!!!!!')
});


const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/testax', upload.single('img'), async (req, res) => {
    // console.log(req.body);
    let tempBase64 = req.body;
    let dateFolder = moment(Date.now()).format('YYMMDD');
    let nowDateTime = moment(Date.now()).format('YYMMDDHHmmss');
    const updateImgName = await randomChracter(8) + nowDateTime
    let decode = await Buffer.from(tempBase64.img, 'base64');
    await fs.writeFileSync(`uploads/${dateFolder}/${updateImgName}.jpg`, decode);
    res.send(`/img/${dateFolder}/${updateImgName}.jpg`)
});


router.get('/', async (req, res, next) => {
    res.send('435345345345345')
});


router.get('/write', async (req, res, next) => {

    var nowDateTime = moment(Date.now()).format('YYMMDD');
    var testVal = await randomChracter(8);
    console.log(testVal);
    console.log(typeof (nowDateTime));
    res.render('editor_main')
})



router.post('/test', (req, res) => {
    console.log(req.body);
    res.send('wait!!!!!!!!!!!!!!!!!!!')
});




module.exports = router;
