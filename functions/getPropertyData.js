const { createClient } = require("@astrajs/collections");

exports.handler = async function(event,context) {
  
  const filter = event.queryStringParameters.filter;
  const value = event.queryStringParameters.selection;
  const quertbuild =  '{' + '"'+filter+'"' + ': { "$gt" :'+value+'}}'
  const query = JSON.parse(quertbuild)

  // create an {astra_db} client
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  // collections are created automatically
  const propertyCollection = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection("property");

  try{
    // const result = await accountCollection.find()
    const result = await propertyCollection.find(query);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch(e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }

  
}