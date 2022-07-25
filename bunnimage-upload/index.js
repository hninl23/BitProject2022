const multipart = require("parse-multipart")

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body;

    let responseMessage = "" // this is the condition for when the file upload is empty
    try {
    
    
        // let password = // get the header called "codename"
    // // use parse-multipart to parse the body
    // // determine the file-type here!
    // responseMessage = await uploadFile((place your parsedBody here), (place the extension here), (place the "codename" here));
    // // fill the parameters in!
    // } catch(err) {
    //     context.log("Undefined body image");
    //     responseMessage = "Sorry! No image attached."
    // }

        const parsedBody = multipart.Parse(body, boundary);

        let filetype = parsedBody[0].type; //image data but it type is what kind of image file is it 
        let ext; 
        if (filetype == "image/png") {
            ext = "png";
        } else if (filetype == "image/jpeg") {
            ext = "jpeg";
        } else if (filetype == "image/jpg") {
            ext = "jpg"
        } else {
            username = "invalidimage"
            ext = "";
        }
        
        let fileName = req.headers['codename']; //we are getting the headervalue from header name called codename

        responseMessage = await uploadFile(parsedBody, ext);
    }catch (err){
        context.log(err)
        context.log("Undefined body image")
        responseMessage = "Sorry! No image attached."
    }
    context.res = {
            body: responseMessage
    };
    console.log(responseMessage)
  
}
// async function are happening in the background
// add an addition parameter to set the header (after ext)
async function uploadFile(parsedBody, ext, fileName){
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";

    console.log('\nCreating container... ')
    console.log('\t', containerName)

    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container
    const blobName = fileName + '.' + ext;    // Create the container
    //Before we named all our files test.smthg but now we are allowing them to change depending on the filename
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].
        data.length);
        return "File Saved"
}