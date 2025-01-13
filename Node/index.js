const http = require("http");
const port = 3000;
const host = "localhost";

// request -> data masuk dari user
// response -> data keluar dari sistem
const server = http.createServer(function (request, response) {
  response.end("Hello World");
});

server.listen(port, host, () => {
  console.log(`run di ${host} dan ${port}`);
});
