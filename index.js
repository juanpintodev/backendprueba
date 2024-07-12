const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(3010, () => {
  console.log("El servidor esta corriendo");
});
