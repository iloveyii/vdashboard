
const con = require('./config/db');
const file = require('./file');

const video = {
    post: async (req, res) => {
        console.log('POST /api/v1/videos');

        if (!req.files || Object.keys(req.files).length == 0) {
            return res.status(400).json({result: 'No images were attached'});
        }

        const userInput = req.body;
        const {title, description, genre} = userInput;
        const result = await file.save(req);
        let sql = '';

        if (result.image_path && result.video_path) {
            sql = `
           INSERT INTO video (title, description, genre, image_path, video_path)
           VALUES ('${title}', '${description}', '${genre}', '${result.image_path}', '${result.video_path}');
        `;
        } else if (result.image_path) {
            sql = `
           INSERT INTO video (title, description, genre, image_path)
           VALUES ('${title}', '${description}', '${genre}', '${result.image_path}');
        `;
        } else if (result.video_path) {
            sql = `
           INSERT INTO video (title, description, genre, video_path)
           VALUES ('${title}', '${description}', '${genre}', '${result.video_path}');
        `;
        }

        console.log('Running sql : ', sql);
        con.query(sql, (err, dbResult) => {
            if (err) throw  err;
            console.log('dbResult:', dbResult);
            const dbAndFile = Object.assign({}, result, dbResult);
            res.json(dbAndFile);
        });
    },

    get: (req, res) => {
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
    },

    delete: ('/api/v1/videos/:id', (req, res) => {
        const videoId = req.params.id;

        if (videoId == 'undefined') return res.json({result: 'id is not defined'});

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
    }),

    put: (req, res) => {
        console.log('PUT /api/v1/videos', req.body, req.params.id);
        const userId = req.params.id;
        const userInput = req.body;
        const {title, description, genre} = userInput;
        sql = `
          UPDATE video SET title='${title}', description='${description}', genre='${genre}'
        `;
        const result = file.save(req);

        if (result.image_path) {
            sql += `
            ,
           image_path='${result.image_path}'
        `;
        }

        if (result.video_path) {
            sql += `
            ,
           video_path='${result.video_path}'
        `;
        }

        sql += `
          WHERE id=${userId}
        `;

        console.log(' after file : ', sql);

        con.query(sql, (err, dbResult) => {
            if (err) throw  err;
            console.log('dbResult:', dbResult);
            const dbAndFile = Object.assign({}, result, dbResult);
            res.json(dbAndFile);
        });
    }
}

module.exports = video;
