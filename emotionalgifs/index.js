
const multipart = require('parse-multipart');
const fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    
    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);
  
    // TODO: assign the body variable the correct value
    const body = req.body;

    // parse the body
    const parts = multipart.Parse(body, boundary);

    //take buffer and take the first list item and convert to base 64
    //module.exports function
//analyze the image
    const result = await analyzeImage(parts[0].data);
    context.res = {
	    body: {
		    result
	    }
    };
    console.log(result)
    context.done(); 

}
async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    
    //to construct a url for us
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        headers: {
            'Content-Type': 'application/octet-stream',  //do this in the next section
            'Ocp-Apim-Subscription-Key': SUBSCRIPTIONKEY
        
        }
    })
    let data = await resp.json(); // await is only used in asyn function
    
    return data; 
}

