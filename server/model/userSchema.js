const connectToDatabase = require('../db/connect');

async function findUserByGoogleId(googleId) {
    const { collection } = await connectToDatabase();
    return collection.findOne({ googleId });
}

async function createUser(userData) {
    const { collection } = await connectToDatabase();
    return collection.insertOne(userData);
}

module.exports = { findUserByGoogleId, createUser };
