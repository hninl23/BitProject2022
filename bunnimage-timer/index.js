const { BlobServiceClient } = require("@azure/storage-blob");
//const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"];
const connectionstring = "DefaultEndpointsProtocol=https;AccountName=bunnimage;AccountKey=vwF2Xw3EVuyS8poiI+9UfCPcjn0JxkE2/pHXxK/NyaGTXefMLKURnX8W+YL2IFlnIoDMaGwP6FhA+AStBC6HCw==;EndpointSuffix=core.windows.net";
const account = "bunnimage";

module.exports = async function (context, myTimer) {
    
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const blobContainerClient = await blobServiceClient.getContainerClient(deletecontainer);

    //this is a for-loop to loop through the blob-list
    for await (const blob of blobContainerClient.listBlobsFlat()) {
        context.log(`Deleting blob name ${blob.name}`);
        
        await blobContainerClient.deleteBlob(blob.name); //taking the blob name and use container client to delete
        // a line of code here should access the blob's name and use `deleteBlob()` to delete the blob!
    }
    context.log("Deleted all files from the container.");
};

