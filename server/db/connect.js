const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.URI; // Your MongoDB URI

let database; // Store the database object
let collection; // Store the collection object

async function connectToDatabase() {
    if (!database) {
        const client = new MongoClient(uri, { tlsAllowInvalidCertificates: true });
        await client.connect();
        database = client.db("Hackathon"); // Replace with your actual database name
        collection = database.collection("Authentication"); // Replace with your actual collection name
        console.log("Connected to Database");
    }
    return { database, collection };
}

module.exports = connectToDatabase;



