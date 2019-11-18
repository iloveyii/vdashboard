const constants = require('./constants');
const db = require('./mongo');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const rimraf = require("rimraf");


const collections = constants.collections;

db.connect(err => {
    if (err) {
        console.log('Cannot connect to database');
        process.exit(1);
    } else {
        console.log('Connected to db');

        db.getDb().collection(collections.shows).drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            readDataFile().then(list => insertIntoMongo(list).then(data => console.log(data)));
        });

    }
});

function readDataFile() {

    return new Promise(function (resolve, reject) {
        fs.readFile('db.json', {encoding: 'UTF-8'}, (err, data) => {
            if (err) {
                reject(err);
                throw  err;
            }

            const list = JSON.parse(data).list;
            console.log(typeof list );
            resolve(list)
        });
    });

}

function insertIntoMongo(list) {
    return new Promise(function(resolve, reject) {
        db.getDb().collection(collections.shows).insertMany(list, (err, result) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                const data = {
                    actions: {type: 'create', ok: result},
                };
                console.log(data);

                resolve(data);
            }
        });
    });
}
