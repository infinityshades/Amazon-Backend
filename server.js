const express = require("express");
const server = express();
const productsServices = require("./src/services/products/products")
PORT = 3100;

server.use(express.json());
server.use("/products", productsServices);

server.listen(PORT,()=>{
    console.log(`Mate your server is ${PORT}`);
})