const multipart = require("parse-multipart")

const connectionString = "DefaultEndpointsProtocol=https;AccountName=bunnimage;AccountKey=vwF2Xw3EVuyS8poiI+9UfCPcjn0JxkE2/pHXxK/NyaGTXefMLKURnX8W+YL2IFlnIoDMaGwP6FhA+AStBC6HCw==;EndpointSuffix=core.windows.net"
const { BlobServiceClient } = require("@azure/storage-blob");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body;
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

    let responseMessage = await uploadFile(parsedBody, ext);
    context.res = {
            body: responseMessage
    };
  
}
// async function are happening in the background
async function uploadFile(parsedBody, ext){
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container
    const blobName = 'test.' + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].
        data.length);
        return "File Saved"
}