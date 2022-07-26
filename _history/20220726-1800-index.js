import http from "http";

const handle = (req, res) => {
    res.end("Hello from http module");
}

const server = http.createServer(handle);

server.listen(3000, () => {
    console.log("server is listening at port 3000");
});
