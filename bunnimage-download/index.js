const fetch = require("node-fetch");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const username = req.headers['username'];
    let download = ""
    let downloadpng = "https://bunnimage.blob.core.windows.net/images/" + username + ".png";
    let downloadjpg = "https://bunnimage.blob.core.windows.net/images/" + username + ".jpeg";
    // adding an extra variable for parameter efficiency

    var success = true;

    // they are calls using fetch module
    let pngresp = await fetch(downloadpng, {
        method: 'GET',
     })
     let pngdata = await pngresp;
     
     let jpgresp = await fetch(downloadjpg, {
        method: 'GET',
     })
     let jpgdata = await jpgresp;

     // checking if they are from correct url or if both don't work

     //checking the statusText 
     if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." ) {
        success = false;
        context.log("Does not exist: " + pngdata)
        context.log("Does not exist: " + jpgdata)
     } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
        context.log("Does exist: " + pngdata)
     } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
        context.log("Does exist: " + jpgdata)
     }

     // if neither exists then success is going to be false
     context.res = {
        body: {
                 "downloadUri" : download,
                 "success": success,
        }
  };
  context.log(download);
  context.done();
}