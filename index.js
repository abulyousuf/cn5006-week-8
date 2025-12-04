// Import Dependencies
const mongoose = require("mongoose");

// Connection URL
const MONGO_URI = "mongodb://localhost:27017/cn5006-week-8";

// Connect to MongoDB
mongoose.connect(MONGO_URI);

// Create Connection Object
const db = mongoose.connection;

// Event Listener: Connection Error
db.on("error", function (err) {
  console.log("Error occured during connection" + err);
});

// Event Listener: Connection Successful
db.once("connected", function () {
  console.log(`Connected to ${MONGO_URI}`);
});

// Define the schema
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  Gender: String,
  Salary: Number,
});

// Create the Model
// Arguments: model name, schema, collection name
const person_doc = mongoose.model(
  "modelname",
  PersonSchema,
  "personCollection"
);

// Create a single document
const doc1 = new person_doc({
  name: "Anna",
  age: 22,
  Gender: "Female",
  Salary: 3456,
});

// Save the document in the collection
doc1
  .save()
  .then((doc1) => {
    console.log("New Article Has been Added Into Your DataBase.", doc1);
  })
  .catch((err) => {
    console.error(err);
  });
