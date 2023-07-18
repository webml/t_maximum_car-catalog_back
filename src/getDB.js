const { MongoClient } = require("mongodb");

const uri =
  "mongodb://hrTest:hTy785JbnQ5@mongo0.maximum.expert:27423/?authSource=hrTest&replicaSet=ReplicaSet&readPreference=primary";

const client = new MongoClient(uri);

async function getDB(res, mark) {
  try {
    await client.connect();
    const db = client.db("hrTest");
    const stock = db.collection("stock");

    const results = await stock.find({ mark: mark }).toArray();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        data: results,
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

module.exports = getDB;
