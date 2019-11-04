const constants = require('../config/constants');
const db = require('../config/mongo');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const rimraf = require("rimraf");

const collections = {shows: 'shows'};

db.connect(err => {
    if (err) {
        console.log('Cannot connect to database');
        process.exit(1);
    } else {
        console.log('Connected to db');
    }
});


const shows = {
    get: (req, res) => {
        console.log('GET /api/v1/shows ', req.params, req.body);
        db.getDb().collection(collections.shows).find({}).toArray((err, shows) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200);
                const s = shows.map(show => show.video = 'http://' + constants.serverIP + show.video)
                res.json(shows);
                console.log(s);
            }
        });
    },
    remove: (req, res) => {
        rimraf(constants.IMAGES_DIR_PATH + '/*', function () {
            console.log("Removed " + constants.IMAGES_DIR_PATH + '*');
        });

        if (!fs.existsSync(constants.IMAGES_DIR_PATH)) {
            fs.mkdirSync(constants.IMAGES_DIR_PATH);
        }

        db.getDb().collection(collections.shows).remove({}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Added show to mongodb:', req.body);
                result.message += ' , Removed from mongodb.';
                res.json({result});
            }
        });
    },
    generate: (req, res) => {
        const files = shows._scanDir(constants.VIDEOS_DIR_PATH);
        shows._generateThumbs(files, false);

        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4
            },
            wordsPerSentence: {
                max: 8,
                min: 4
            }
        });

        let data = [];

        files.forEach((file, c) => {

            let i = c + 1;
            let index = i < 10 ? '0' + i : i;

            let song = {};
            song.id = Number(index);
            song.title = lorem.generateWords(3);
            song.captionText = lorem.generateSentences(3);
            song.image = constants.IMAGES_DIR + index + '.png';
            song.video = constants.VIDEOS_DIR + file;

            db.getDb().collection(collections.shows).insertOne(song, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Added show to mongodb:', req.body);
                    result.message += ' , Show saved to mongodb.';
                    // res.json({result: action.result, document: action.ops[0], error: null});
                }
            });

            data.push(song);
        });

        // console.log(data);
        return res.json(data);
    },
    _scanDir: (dir) => {
        const files = fs.readdirSync(dir);
        return files;
    },
    _generateThumbs: (files, regenerate = false) => {
        // Get images count
        const images = shows._scanDir(constants.IMAGES_DIR_PATH);
        const equalImagesAndVids = images.length === files.length;

        if (equalImagesAndVids && !regenerate) {
            console.log('Thumbnails already generated and number of images equal number of videos.');
            return false;
        }
        console.log('Generating thumbnails');

        files.forEach((file, c) => {
            let i = c + 1;
            let index = i < 10 ? '0' + i : i;

            let videoPath = constants.VIDEOS_DIR_PATH + '/' + file;
            let imagesPath = constants.IMAGES_DIR_PATH;
            const proc = new ffmpeg(videoPath)
                .takeScreenshots({
                    count: 1,
                    timemarks: ['6'], // number of seconds
                    filename: index + '.png',
                }, imagesPath, function (err, filenames) {
                    console.log('screenshots were not saved ' + err, filenames)
                });
        });
    }
};

module.exports = shows;

