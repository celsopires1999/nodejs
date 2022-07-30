const http = require("http");
const handle= require("./handle");

const server = http.createServer(handle);

server.listen(3000, () => {
    console.log("server is listening at port 3000");
});
