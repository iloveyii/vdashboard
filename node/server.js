// Import required packages
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');
const constants = require('./constants');
const uuidv1 = require('uuid/v1');
const fileUpload = require('express-fileupload');
const Joi = require('joi');

function saveMedia(image, imageFileName, video, videoFileName) {
    let message = '';
    console.log('Inside saveMedia ', image, video);

    // Mv file to some dir
    image && image.mv(imageFileName, err => {
        if (err) {
            return 500
        }

        console.log('File saved to directory ' + imageFileName);
        message = 'Image File upload success, ';
    });

    // Mv file to some dir
    video && video.mv(videoFileName, err => {
        if (err) {
            return 500
        }

        console.log('File saved to directory ' + videoFileName);
        message += 'Video File upload success.';
    });

    const result = {status: 'ok', message};

    return result;
}

app.use(
    express.static(__dirname + '/public'),
    fileUpload({
        createParentPath: true,
        limits: {fileSize: 550 * 1024 * 1024},
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

// Database credentials
const dbHost = 'localhost';
const dbName = 'dashboard';
const dbUser = 'root';
const dbPass = 'root';

// Connect to MySQL
const con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPass
});


con.connect(err => {
    if (err) throw err;
    console.log('MySQL connected !');

    // Select Database
    con.changeUser({database: dbName}, function (err) {
        if (err) throw err;
        console.log('Database changed to ' + dbName);
    });
});

function isAdmin(req) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    let [username, password] = credentials.split(':');
    console.log('credentials', credentials);
    password = md5(password);

    sql = `
          SELECT * 
          FROM login 
          WHERE username='${username}' 
          AND password='${password}'
          AND admin=1
          ;
        `;

    async function doQuery() {
        await
            con.query(sql, (err, result) => {
                if (err) throw  err;
                console.log(result);
                return result.length > 0;
            });
    }

    return doQuery();
}

app.get('/api/v1/login', (req, res) => {
    const userInput = req.headers;
    // const username = userInput.username ? userInput.username : 'root';
    // const password = userInput.password ? md5(userInput.password) : 'root';
    console.log('header', req.headers);

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    let [username, password] = credentials.split(':');
    console.log('credentials', credentials);
    password = md5(password);

    sql = `
          SELECT * 
          FROM login 
          WHERE username='${username}' 
          AND password='${password}'
          ;
        `;

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log(result);
        const auth = {
            authenticated: false,
            username: username
        };
        if (result.length > 0) {
            auth.authenticated = true;
        }

        res.json(auth);
    });

    console.log(sql);
    console.log('Headers: ', req.headers);
});

app.get('/api/v1/users', (req, res) => {
    sql = `
          SELECT * 
          FROM login 
          ;
        `;
    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('result', result);
        res.json(result);
    });
    console.log(sql);
});

app.post('/api/v1/users', (req, res, next) => {
    const userInput = req.body.user;
    const email = userInput.email;
    const username = userInput.username;
    const password = md5(userInput.password);
    const doerIsAdmin = 1; //isAdmin(req); @TODO
    let admin = 0;
    if (userInput.admin && doerIsAdmin) {
        admin = userInput.admin;
    }

    sql = `
          INSERT INTO login (email, username, password, admin)
          VALUES ('${email}', '${username}', '${password}', ${admin});
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        const response = {
            status: result.affectedRows
        }
        res.json(response);
    });

    console.log('Headers: ', req.headers);
});

app.put('/api/v1/users/:id', (req, res) => {
    console.log('PUT /api/v1/posts', req.body, req.params.id);
    const userId = req.params.id;
    const userInput = req.body;
    const {email, username, password} = userInput;
    const doerIsAdmin = 1; //isAdmin(req); @TODO
    let admin = 0;
    if (userInput.admin && doerIsAdmin) {
        admin = userInput.admin;
    }
    sql = `
          UPDATE login SET email='${email}', username='${username}', password='${password}', admin=${admin}
          WHERE id=${userId}
        `;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});

app.delete('/api/v1/users/:id', (req, res) => {
    const userId = req.params.id;

    if(userId=='undefined') return res.json({result: 'id is not defined'});

    sql = `
          DELETE from login 
          WHERE id=${userId}
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});

app.post('/api/v1/videos', (req, res) => {
    console.log('POST /api/v1/videos');

    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({result: 'No images were attached'});
    }

    // Use same image field name as in html form
    const imageFile = req.files.image_path;
    const videoFile = req.files.video_path;
    const fileNameNumber = uuidv1();
    const video = req.body;

    const imageFileName = constants.IMAGES_DIR + '/' + fileNameNumber + '_' + imageFile.name;
    const videoFileName = constants.VID_DIR + '/' + fileNameNumber + '_' + videoFile.name;

    video.image = imageFileName;
    video.video = videoFileName;

    let result = saveMedia(imageFile, imageFileName, videoFile, videoFileName);

    console.log(result);
    // return res.json(result);

    if(result.status != 'ok') return res.json(result);

    const title = req.body.title;
    const description = req.body.description;
    const genre = req.body.genre;
    const image_path = 'images/'+fileNameNumber + '_' + imageFile.name;
    const video_path = 'videos/' + fileNameNumber + '_' + videoFile.name;

    sql = `
          INSERT INTO video (title, description, genre, image_path, video_path)
          VALUES ('${title}', '${description}', '${genre}', '${image_path}', '${video_path}');
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        const response = {
            status: result.affectedRows,
        };

        result.image_path = constants.IMAGES_URL  + fileNameNumber + '_' + imageFile.name;
        result.video_path = constants.VIDEOS_URL + fileNameNumber + '_' + videoFile.name;
        res.json(result);
    });

});

app.get('/api/v1/videos', (req, res) => {
    sql = `
          SELECT * 
          FROM video
          ORDER BY id DESC 
          ;
        `;
    con.query(sql, (err, result) => {
        if (err) throw  err;
        res.json(result);
    });
    console.log(sql);
});


app.delete('/api/v1/videos/:id', (req, res) => {
    const videoId = req.params.id;

    if(videoId=='undefined') return res.json({result: 'id is not defined'});

    sql = `
          DELETE from video 
          WHERE id=${videoId}
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});

app.put('/api/v1/videos/:id', (req, res) => {
    console.log('PUT /api/v1/videos', req.body, req.params.id);
    const userId = req.params.id;
    const userInput = req.body;
    const {title, description, genre} = userInput;

    sql = `
          UPDATE video SET title='${title}', description='${description}', genre='${genre}'
          WHERE id=${userId}
        `;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});

app.listen(constants.port, () => console.log('Server started on port ' + constants.port));


