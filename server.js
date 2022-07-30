const http = require("http");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url === "/produtos") {
      res.end(
        JSON.stringify({
          msg: "rota de produtos"
        })
      )
    }

    if (req.url === "/usuarios") {
      res.end(
        JSON.stringify({
          msg: "rota de usuarios"
        })
      )
    }

 

  });
  
  server.listen(4001, ()=> console.log("server running at 4001"));

  // res.end(JSON.stringify({
  //   data: 'Hello World!'
  // }));