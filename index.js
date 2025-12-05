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

// Define an array of multiple documents
const manypersons = [
  { name: "Simon", age: 42, Gender: "Male", Salary: 3456 },
  { name: "Neesha", age: 23, Gender: "Female", Salary: 1000 },
  { name: "Mary", age: 27, Gender: "Female", Salary: 5402 },
  { name: "Mike", age: 40, Gender: "Male", Salary: 4519 },
];

// Insert multiple documents
person_doc
  .insertMany(manypersons)
  .then(function () {
    console.log("Data inserted"); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });

// Find all the documents in the collection
person_doc
  .find({}) // Find all users
  .sort({ Salary: 1 }) // Sort by Salary in Ascending order
  .select("name Salary age") // Select only 'name', 'Salary', and 'age' fields
  .limit(10) // Limit to 10 results
  .exec() // Execute the query
  .then((docs) => {
    console.log("Showing multiple documents:");
    docs.forEach(function (Doc) {
      console.log(Doc.age, Doc.name);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Define Filter Variable
const givenage = 15;

// Find with Criteria
person_doc
  .find({
    Gender: "Female",
    age: { $gte: givenage },
  })
  // Sort by Salary in ascending order (1)
  .sort({ Salary: 1 })
  // Return only name, Salary, and age
  .select("name Salary age")
  // Limit Results
  .limit(10)
  // Execute Query
  .exec()
  .then((docs) => {
    console.log(`Showing Matching Documents (Females, Age >= ${givenage}):`);
    docs.forEach(function (Doc) {
      console.log(`Age: ${Doc.age}, Name: ${Doc.name}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
