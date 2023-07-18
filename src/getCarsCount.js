const { MongoClient } = require("mongodb");

const uri =
  "mongodb://hrTest:hTy785JbnQ5@mongo0.maximum.expert:27423/?authSource=hrTest&replicaSet=ReplicaSet&readPreference=primary";

const pipeline = [
  { $group: { _id: "$mark", count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
];

const client = new MongoClient(uri);

async function getDB(res, mark) {
  try {
    await client.connect();
    const db = client.db("hrTest");
    const stock = db.collection("stock");

    const marksModelCount = [];
    const autoCount = stock.aggregate(pipeline);
    for await (const doc of autoCount) {
      marksModelCount.push(doc);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        data: marksModelCount,
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

module.exports = getDB;
