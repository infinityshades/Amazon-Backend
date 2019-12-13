const express= require("express");
const router = express.Router()
const fs = require("fs")
const path = require ("path")
const uuidv1 = require('uuid/v1');
const reviewFilePath = path.join(__dirname,"reviews.json")

const readFile = () =>{
    const buffer = fs.readFileSync(reviewFilePath)
    const content = buffer.toString()
    return JSON.parse(content)
}

router.get("/",(req,res)=>{
    res.send(readFile())
})

router.get("/:id",(req,res)=>{
    let reviews = readFile();

    let productReview = reviews.find(review => review._id == req.params.id)
    if(productReview){
        res.send(productReview)
    }else{
        res.status("404").send("No reviews available")
    }
})

router.get("products/:id",(req,res)=>{
    let reviews = readFile()
    let productReview = reviews.filter(review=> review.elementId == req.params.id)

    if (productReview){
        res.send(productReview)
    }else{
        res.send("This product has 0 review")
    }
})


router.post("/",(req,res)=>{
    let reviews = readFile();
    let newReview = {
        ...req.body,
        createdAt: new Date(),
        _id: new Date().valueOf(),
        elementId: uuidv1()
    }
    reviews.push(newReview);
    fs.writeFileSync(reviewFilePath, JSON.stringify(reviews))
    res.send(newReview)
})

router.put("/:id",(req,res)=>{
    let reviews = readFile()
    let reviewToEdit = reviews.find(review => review._id == req.params.id)
    if (reviewToEdit){
        let positionToEditReview = reviews.indexOf(reviewToEdit)
        let editedReview = Object.assign(reviewToEdit,req.body)
        reviews[positionToEditReview] = editedReview
        fs.writeFileSync(reviewFilePath, JSON.stringify(reviews))
        res.send("editedReview")
    }else{
        res.status("404").send("Review Not Found")
    }
})

router.delete("/:id",(req,res)=>{
    let reviews = readFile();
    let reviewsToRemain = reviews.filter(review=> review._id != req.params.id)
    if(reviewsToRemain < reviews){
    fs.writeFileSync(reviewFilePath,JSON.stringify(reviewsToRemain))
    }else{
        res.status("404").send("review not found")
    }
})

// router.post("/",(req,res)=>{
//     let reviews = readFile();
//     let newReview = {
//         ...review,
        
//     }
// })
module.exports = router;