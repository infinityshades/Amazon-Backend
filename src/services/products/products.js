const express = require ("express");
const router = express.Router();
const uuidv1 = require('uuid/v1');

const fs = require ("fs")
const path = require("path")
const productsFilePath = path.join(__dirname,"products.json")

const readFile = () => {
    const buffer = fs.readFileSync(productsFilePath);
    const content = buffer.toString();
    return JSON.parse(content)
}

console.log(readFile())

router.get("/",(req,res)=>{
    let products = readFile()
    res.send(products);
})


// router.post("/", (req,res)=>{
//     let listOfProducts = readFile();
//     // let newProduct = {
//     //     ...req.body,
//     //     _id:uuidv1(),
//     //     createdAt: new Date()
//     // }
//     // req.body._id = uuidv1();
//     req.body.createdAt = new Date ();
//     listOfProducts.push(req.body);
//     fs.writeFileSync(productsFilePath, JSON.stringify(listOfProducts))
//     res.send(req.body)
// })
module.exports = router;