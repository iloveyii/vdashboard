const db = require('../config/mongo');
const md5 = require('md5');

const constants = require('../config/constants');

db.connect(err => {
    if (err) {
        console.log('Cannot connect to database');
        process.exit(1);
    } else {
        console.log('Connected to db');
    }
});

const user = {
    get : (req, res) => {

        console.log('GET /api/v1/users ', req.params, req.body);

        if (!req.headers.authorization) {
            const auth = {
                authenticated: false,
            };
            console.log('Login :' , auth);
            res.json(auth);
            return false;
        }

        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        let [username, password] = credentials.split(':');
        console.log('credentials', credentials);
        password = md5(password);

        db.getDb().collection(constants.mongo.collections.users).find({username: username, password:password}).toArray((err, users) => {
            if (err) {
                console.log(err);
            } else {
                const auth = {
                    authenticated: false,
                    username: username
                };
                if (users.length > 0) {
                    auth.authenticated = true;
                }
                const data = {
                    actions: { type: 'login', ok : 1},
                    form: auth
                };

                //console.log('Headers: ', req.headers);
                console.log('Login: ', data);
                res.json(data);
            }
        });
    },
    post: (req, res) => {
        console.log('POST /api/v1/users', req.body);
        const {email, username, password} = req.body;
        const user = {
            email,
            username,
            password: md5(password)
        };
        if(!email) {
            res.json({email: 'Email is required'});
            console.log(user);
            process.exit(0);
        }

        db.getDb().collection(constants.mongo.collections.users).insertOne(user, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const data = {
                    actions: {type: 'create', ok: result.result.ok},
                    form: {_id: result.insertedId, ...user},
                };
                res.json(data);
            }
        });
    }
};

module.exports = user;
