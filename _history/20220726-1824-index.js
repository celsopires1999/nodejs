import http from "http";

const handle = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write('<DOCTYPE "html">');
    res.write('<html>');
    res.write('<body>');
    res.write('<head><title>Http module</title></head>');
    res.write('<h1>Hello from http module</h1>');
    res.write('</body>');
    res.write('</html>');

    res.end();
}

const server = http.createServer(handle);

server.listen(3000, () => {
    console.log("server is listening at port 3000");
});
