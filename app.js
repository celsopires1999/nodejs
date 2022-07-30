const express = require("express");
const { randomUUID } = require("crypto");
const fs = require('fs'); 

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data);
    }
})
/*
*** POST => inserir um objeto
*** GET => buscar um ou mais objetos
*** PUT => alterar todos os atributos de um objeto
*** PATCH => alterar alguns atributos de um objeto
*** DELETE => remover um objeto

*** Body => sempre que eu quiser enviar atributos para a minha aplicação
*** Params => /products/123456789012345678901234567890
*** Query => /products?id=123456789012345678901234567890&value=123
***
*/

app.post("/products", (req, res) => { 
    const { name, price } = req.body;

    const product = {
        id: randomUUID(),
        name,
        price
    }

    products.push(product);
    productFile();

    return res.json(product);
}) 

app.get("/products", (req, res) => {
    return res.json(products);
})

app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({message: "produto não encontrado"})
    }

    return res.json(product);
})

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = {
        id,
        name,
        price
    }

    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({message: "produto não encontrado"})
    }

    products[index] = product;
    productFile()

    return res.json({message: "produto alterado com sucesso"})

})


app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({message: "produto não encontrado"})
    }

    products.splice(index, 1);
    productFile();

    return res.json({message: "produto excluído"});

})

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("produtos salvos");
        }
    })
}

app.listen(4002, () => console.log("server is listening at port 4002"));