// Import required packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');
const constants = require('./src/config/constants');
const fileUpload = require('express-fileupload');
const Joi = require('joi');

const mySqlVideo = require('./src/mysql/video');
const mongoVideo = require('./src/mongo/video');
const user = require('./src/user');
const login = require('./src/login');


app.use(
    express.static(__dirname + '/public'),
    fileUpload({
        createParentPath: true,
        limits: {fileSize: 50 * 1024 * 1024},
    }),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    cors(),
    (req, res, next) => {
        // req.body.title = 'I changed it here in mw';
        // console.log('Inside middleware request body is : ', req);
        next();
    }
);

app.get('/api/v1/logins', login.get);

app.get('/api/v1/users', user.get);
app.post('/api/v1/users', user.post);
app.delete('/api/v1/users/:id', user.delete);
app.put('/api/v1/users/:id', user.put);


app.get('/api/v1/generate', mongoVideo.generate);
app.get('/api/v1/remove', mongoVideo.remove);

app.get('/api/v1/shows', constants.USE_MONGO ? mongoVideo.get : mySqlVideo.get);
app.post('/api/v1/shows', mongoVideo.post);
app.delete('/api/v1/shows/:id', mongoVideo.delete);
app.put('/api/v1/shows/:id', mongoVideo.update);

app.post('/api/v1/episodes', mongoVideo.postEpisode);
app.put('/api/v1/episodes/:id', mongoVideo.updateEpisode);
app.get('/api/v1/episodes', mongoVideo.getEpisode);
app.delete('/api/v1/episodes/:id', mongoVideo.deleteEpisode);

app.put('/api/v1/popularize/:id', mongoVideo.popularize);





app.listen(constants.port, () => console.log('Server started on port ' + constants.port));


