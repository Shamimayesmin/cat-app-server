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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ui8slz3.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		const addCategory = client.db("catApp").collection("category");
		const addCatItem = client.db("catApp").collection("cats");

		// get all categories
		app.get("/category", async (req, res) => {
			const query = {};
			const cursor = addCategory.find(query);
			const categoryItem = await cursor.toArray();
			res.send(categoryItem);
			console.log(categoryItem);
		});
        

        // get single category by id
		app.get("/category/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await addCategory.findOne(query);
			res.send(result);
		});
        // post new  cat
        app.post("/cats", async (req, res) => {
			const info = req.body;
			const result = await addCatItem.insertOne(info);
            console.log(result);
			res.send(result);
		});
        // get all cats
		app.get("/cats", async (req, res) => {
			const query = {};
			const cursor = addCatItem.find(query);
			const categoryItem = await cursor.toArray();
			res.send(categoryItem);
			console.log(categoryItem);
		});

        // update a category
		app.put("/edit/:id", async (req, res) => {
			const id = req.params.id;
			console.log(id);
			console.log(req.body);
			const editName = req.body.updatedName;
			const editImage = req.body.updatedImage;
			const editCounter = req.body.updatedCounter;

			const query = { _id: new ObjectId(id) };
			const option = { upsert: true };
			const updatedDoc = {
				$set: {
					categoryName: editName,
					img: editImage,
					counter: editCounter,
				},
			};
			const result = await addCategory.updateOne(query, updatedDoc, option);
			res.send(result);
			console.log(result);
		});

		
	} finally {
	}
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send("cat api is running");
});


app.listen(port, () => {
	console.log("cat server running on port", port);
});

// export the express Api
module.exports = app;
