const constants = require('./constants');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const rimraf = require("rimraf");
const mongoClient = require('mongodb').MongoClient;

const mongo = constants.mongo;

function connectMongo() {
    return new Promise(function (resolve, reject) {

        mongoClient.connect(mongo.url, mongo.mongoOptions, (err, client) => {
            if (err) {
                reject(err)
            } else {
                console.log('Mongodb connected to : ' + mongo.dbname);
                db = client.db(mongo.dbname);
                resolve(db);
            }
        });
    })
}

function deleteCollection() {
    return new Promise(function (resolve, reject) {
        db.collection(mongo.collections.shows).drop(function (err, delOK) {
            if (err) {
                reject(err);
                throw err;
            }
            if (delOK) console.log("Collection deleted : " + mongo.collections.shows);
            resolve(delOK);
        });
    })
}

function readDataFile() {

    return new Promise(function (resolve, reject) {
        fs.readFile('db.json', {encoding: 'UTF-8'}, (err, data) => {
            if (err) {
                reject(err);
                throw  err;
            }

            const list = JSON.parse(data).list;
            resolve(list)
        });
    });

}

function insertIntoMongo(list) {
    return new Promise(function (resolve, reject) {
        db.collection(mongo.collections.shows).insertMany(list, (err, result) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                const data = {
                    actions: {type: 'create', ok: result},
                };
                console.log('Inserted into mongo a list of length : ' + list.length);
                resolve(data);
            }
        });
    });
}

connectMongo()
    .then(() => deleteCollection()
        .then(() => readDataFile()
            .then(list => insertIntoMongo(list)
                .then((data) => console.log(data.actions.ok.insertedCount) ))));

