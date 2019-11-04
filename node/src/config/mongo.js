const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const dbname = 'mychoice';
const url = 'mongodb://localhost:27017';
const mongoOptions = {useNewUrlParser: true};

const state = {
    db: null
};

const connect = (cb) => {
    if (state.db) {
        cb();
    } else {
        mongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) {
                cb(err)
            } else {
                console.log('Mongodb connected to ' + state.db);
                state.db = client.db(dbname);
                cb();
            }
        });
    }
};

const getPrimaryKey = (_id) => {
    return objectId(_id);
};

const getDb = () => {
    console.log('Inside getDB')
    return state.db;
};

module.exports =
    {
        getDb,
        connect,
        getPrimaryKey
    };
