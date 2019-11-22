const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const rimraf = require("rimraf");
const mongoClient = require('mongodb').MongoClient;
const constants = require('./constants');
const path = require('path');


const mongo = constants.mongo;
let db = null;

function connectMongo() {
    return new Promise(function (resolve, reject) {
        console.log(mongo);

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

        // return resolve(true);
        db.dropCollection(mongo.collections.shows, function (err, delOK) {
            if (err) {
                console.log(err); process.exit();
                reject(err);
                throw err;
            }
            if (delOK) {
                console.log("Collection deleted : " + mongo.collections.shows);
                db.createCollection(mongo.collections.shows, function (err, res) {
                    if (err) throw err;
                    console.log("Collection created : " + mongo.collections.shows);
                    resolve(delOK);
                });
            }

        });
    })
}

function readDataFile() {

    return new Promise(function (resolve, reject) {
        fs.readFile(mongo.dbfile, {encoding: 'UTF-8'}, (err, data) => {
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

function removeDirs() {
    return new Promise(function (resolve, reject) {

        rimraf(constants.IMAGES_DIR_PATH + '/*', function () {
            console.log("Removed " + constants.IMAGES_DIR_PATH + '*');
            if (!fs.existsSync(constants.IMAGES_DIR_PATH)) {
                fs.mkdirSync(constants.IMAGES_DIR_PATH);
            }
        });

        rimraf(constants.VIDEOS_DIR_PATH + '/*', function () {
            console.log("Removed " + constants.VIDEOS_DIR_PATH + '*');

            if (!fs.existsSync(constants.VIDEOS_DIR_PATH)) {
                fs.mkdirSync(constants.VIDEOS_DIR_PATH);
            }
            resolve();
        });
    });
}


connectMongo()
    .then(() => deleteCollection()
        .then(() => readDataFile()
            .then(list => insertIntoMongo(list)
                .then(() => removeDirs()
                        .then(()=> console.log('All done !!!')
                    )))));



// console.log(mongo.dbfile);
