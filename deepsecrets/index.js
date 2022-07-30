const CosmosClient = require("@azure/cosmos").CosmosClient;
const { ItemResponse } = require("@azure/cosmos");
const { random } = require("cypress/types/lodash");
const qs = require('qs');

//taking the request body and separating the query parameter (to get the values in a json object format)
// easier to parse
const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {kind: "Hash", paths: ["/secrets"]}
  };
  // config obj stores all values needed to configurev the connections to your cosmos
// the async function is contacting the client and getting the information from them(calling create func)
async function createDocument(newItem) {
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);
    
    
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
        query: "SELECT * from c"
    };
    //giving everything from data place and the star is the placeholder(container)
    //cosmos db allows u to globally distribute the data
    // read all items in the Items container
    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
//we put this at the end to make sure that we query before we add a new item
//otherwise, the newest item will always be the new item that you added
    const { resource: createdItem } = await container.items.create(newItem);

   return items;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = qs.parse(req.body);
    context.log(queryObject);
    let message = queryObject.Body; // this is the user's input
    let document =  {"message" : message} //whatever is stored
    let items = await createDocument(document)
    let random_value = Math.floor(items.length * Math.random()); //picking a random number and inputting in the message slot and multiplying by item.range
    
    //format a text output
    const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[random_value].message)}`
    context.res = {
        body: responseMessage
    };
}