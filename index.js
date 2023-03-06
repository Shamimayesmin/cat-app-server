const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const categories = require("./category.json");
const catItem = require("./cat.json");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ui8slz3.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run(){
//     try{
//        const addCategory = client.db("catApp").collection("category")
//        const addCatItem = client.db("catApp").collection("cats")

//     // get all categories
//        app.get("/category", async(req,res)=>{
//         const query = {};
//         const cursor = addCategory.find(query);
//         const categoryItem = await cursor.toArray();
//         res.send(categoryItem)
//         console.log(categoryItem);
//        })
//        app.get('/category/:id', async(req,res)=>{
//         const id = req.params.id;
//         const query = {_id : new ObjectId(id)}
//         if(id === query){
//             res.send(addCategory)
//         }else{
//             const result = await addCategory.find(n=>n.cat_id === id);
//             res.send(result)
//         }
//         // const result = await addCategory.findOne(query);
//         // res.send(result)
//        })

//        app.get("/cats", async(req,res)=>{
//         const query = {};
//         const cursor = addCatItem.find(query);
//         const catItem = await cursor.toArray();
//         res.send(catItem)
//         console.log(catItem);
//        })

//     app.get('/cats/:id', async(req,res)=> {
//         const id = req.params.id
//         const query = { _id: new ObjectId(id) };
//         console.log(id)
//         // const selectedCat = await addCatItem.find(n => n._id === id)
//          const selectedCat = await addCatItem.findOne(query,(err,doc)=>{
//             if(err){
//                 res.status(500).send(err)
//             }else {
//                 res.send(doc)
//             }
//          })
//         res.send(selectedCat)
//     })
//     app.get("/addTask/:id", async (req, res) => {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await addCollection.findOne(query);
//         res.send(result);
//     });
//     }
//     finally{

//     }
// }
// run().catch((err)=>console.log(err))

app.get("/", (req, res) => {
	res.send("cat api is running");
});

app.get("/category", (req, res) => {
	res.send(categories);
});

app.get("/category/:id", (req, res) => {
	const id = req.params.id;
	const category_cat = catItem.filter((n) => n.cat_id === id);
	res.send(category_cat);
});

app.get("/cats", (req, res) => {
	res.send(catItem);
});

app.get("/cats/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	const selectedCourse = catItem.find((n) => n._id === id);
	res.send(selectedCourse);
});

app.listen(port, () => {
	console.log("cat server running on port", port);
});

// export the express Api
module.exports = app;
<div>
    <h3>1 </h3>
    <h3>2 </h3>
    <h3>3 </h3>
    <h3> 4</h3>
    <h3> 5</h3>
    
</div>