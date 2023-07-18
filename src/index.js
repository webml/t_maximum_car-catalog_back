const http = require("http");
const getDB = require("./getDB");
const getCarsCount = require("./getCarsCount");

const hostName = "127.0.0.1";
const port = 3001;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

  const url = new URL(req.url, `http://${hostName}`);
  let mark;
  if (url.searchParams.has("mark")) {
    mark = url.searchParams.get("mark");

    getDB(res, mark).catch(console.error);
  }

  if (url.searchParams.has("carsCount")) {
    getCarsCount(res).catch(console.error);
  }
});

server.listen(port, hostName, () => {
  console.log(`Server started at http://${hostName}:${port}/`);
});
