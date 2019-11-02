const path = require('path');

// PORT
const port = process.env.PORT || 8090;
// Resolve paths
const VID_DIR = path.resolve('public/videos');
const IMAGES_DIR = path.resolve('public/images');
// URls
const serverIP = 'ec2-3-133-249-232.us-east-2.compute.amazonaws.com';//getIp('wlp1s0');
const IMAGES_URL = 'http://' + serverIP + ':' + port + '/images/';
const VIDEOS_URL = 'http://' + serverIP + ':' + port + '/videos/';

module.exports = {
    port,
    VID_DIR,
    IMAGES_DIR,
    serverIP,
    IMAGES_URL,
    VIDEOS_URL
};
