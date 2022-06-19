const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    async function getCatPic(){
    const resp = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {
        method: 'GET'
    });
    
    const data = await resp.arrayBuffer()
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob

    var base64data = Buffer.from(data).toString('base64')
//put what you want to turn into base64 inside "originaldata"
//"originaldata" will be encoded in base64.
    return base64data
}

    function getName(){
        var names = ["Shreya, Emily, Fifi, Beau, Evelyn, Julia, Daniel, Fardeen"];
        var random_value = Math.floor(names.length * Math.random())
        var resultname = names[random_value]
        return resultname
    }

    var firstcat = await getCatPic();
    var secondcat = await getCatPic();
    var name1 = getName();
    var name2 = getName();

    context.res = {
        body: {
            cat1: firstcat,
            cat2: secondcat,
            names: [name1, name2]
        }
    }
    };

