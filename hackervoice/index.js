module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

   var password = req.query.password;
   context.log(password)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: password
    };
}