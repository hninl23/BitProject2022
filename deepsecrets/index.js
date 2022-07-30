const querystring = require('qs');

//taking the request body and separating the query parameter (to get the values in a json object format)
// easier to parse

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = qs.parse(req.body);
    context.log(queryObject);

    context.res = {
        body: queryObject.Body
    };
}