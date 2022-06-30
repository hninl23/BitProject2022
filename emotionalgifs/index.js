
const multipart = require('parse-multipart');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    
    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);
  
    // TODO: assign the body variable the correct value
    const body = req.body

    // parse the body
    const parts = multipart.Parse(body, boundary);

    //take buffer and take the first list item and convert to base 64
    let convertedResult = Buffer.from(parts[0].data).toString('base64');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: convertedResult
    };
}