const express = require("express");
const server = express();
const productsServices = require("./src/services/products/products")
const reviewServices = require("./src/services/reviews/reviews")
PORT = 3100;

server.use(express.json());
server.use("/review", reviewServices);
server.use("/products", productsServices);

server.listen(PORT,()=>{
    console.log(`Mate your server is ${PORT}`);
})