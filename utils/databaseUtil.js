const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

require('dotenv').config();
const mongoUrl = process.env.DB_PATH;

let _dB;
const mongoConnect = (callback) =>{
    MongoClient.connect(mongoUrl, {
        tls: true
    })
        .then(client => {
            console.log("Connected to MongoDB");
            callback();
            _dB = client.db('airbnb')
        })
        .catch(err => {
            console.error("Failed to connect to MongoDB", err);
        });
}

const getDB = ()=>{
    if (!_dB) {
        throw new Error("Mongo not connected!");
    }
    return _dB;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;