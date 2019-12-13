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

router.get("/",(req,res)=>{
    let products = readFile();
    if(Object.keys(req.query).length !=0){
        let filteredProduct = products.filter(product => product.hasOwnProperty("category") && product.category.toLowerCase() == req.query.category.toLowerCase())
        res.send(filteredProduct)
    }else{
    res.send(products);
    }
})

router.get("/:id", (req,res)=>{
    let products = readFile();
    let product = products.find(product => product.hasOwnProperty("_id") && product._id == req.params.id );
    if (product) {
        res.send(product)
    }else{
        res.status("404").send("product not found");
    }
})

router.post("/", (req,res)=>{
    let listOfProducts = readFile();
    let newProduct = {
        ...req.body,
        _id:uuidv1(),
        createdAt: new Date()
    }
    listOfProducts.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(listOfProducts))
    res.send(newProduct)
})

router.put("/:id",(req,res)=>{
    let listOfProducts = readFile();
    let editProduct = listOfProducts.find(product=> product._id == req.params.id)
    if(editProduct) {
    let positionOfProductToEdit = listOfProducts.indexOf(editProduct)
    let editedProduct = Object.assign(editProduct, req.body)
    listOfProducts[positionOfProductToEdit] = editedProduct
    fs.writeFileSync(productsFilePath, JSON.stringify(listOfProducts));
    res.send(editedProduct);
    }else{
        res.status("404").send("product not found");
    }
})

router.delete("/:id",(req,res)=>{
    let products = readFile();
    let productsRemained = products.filter(product=> product._id != req.params.id)
    if (productsRemained){
        fs.writeFileSync(productsFilePath,JSON.stringify(productsRemained));
        res.send("Deleted")
    }else{
        res.status("404").send("product not found");
    }
})


module.exports = router;