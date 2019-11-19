const path = require('path');

// PORT
const port = process.env.PORT || 8090;
// USE MySQL OR MongoDB
const USE_MONGO = true;
// Resolve paths
const VIDEOS_DIR = '/videos/';
const VIDEOS_DIR_PATH = path.resolve('public/' + VIDEOS_DIR);
const IMAGES_DIR = '/images/';
const IMAGES_DIR_PATH = path.resolve('public/' + IMAGES_DIR);
// URls
// const serverIP = '10.42.0.1';//getIp('wlp1s0');
const serverIP = 'localhost';//getIp('wlp1s0');
const IMAGES_URL = 'http://' + serverIP + ':' + port + IMAGES_DIR;
const VIDEOS_URL = 'http://' + serverIP + ':' + port + VIDEOS_DIR;

const mongo = {
    collections: {shows: 'shows'},
    dbname: 'mychoice',
    url: 'mongodb://localhost:27017',
    mongoOptions: {useNewUrlParser: true},
    dbfile: path.resolve('src/config/mongodb.json')
};


module.exports = {
    port,
    VIDEOS_DIR,
    VIDEOS_DIR_PATH,
    IMAGES_DIR,
    IMAGES_DIR_PATH,
    serverIP,
    IMAGES_URL,
    VIDEOS_URL,
    USE_MONGO,
    mongo
};
