const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var name1 = req.query.name1;
    var name2 = req.query.name2;
    var name3 = req.query.name3;
    var name4 = req.query.name4;

    context.log("Got the names...");

    var firstcat = await getCatPic(name1);
    var secondcat = await getCatPic(name2);
    var thirdcat = await getCatPic(name3);
    var fourthcat = await getCatPic(name4);

    context.log("Got the images...");

    async function getCatPic(){
    const resp = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {
        method: 'GET'
    });
    
    let data = await resp.arrayBuffer()
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob

    var base64data = Buffer.from(data).toString('base64')
//put what you want to turn into base64 inside "originaldata"
//"originaldata" will be encoded in base64.
    return base64data
}


    context.res = {
        body: {
            cat1: firstcat,
            cat2: secondcat,
            cat3: thirdcat,
            cat4: fourthcat,
            names: [name1, name2,name3,name4]
        }
    }
    };

