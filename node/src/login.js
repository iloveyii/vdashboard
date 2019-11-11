const md5 = require('md5');
const con = require('./config/mysql');

const login = {
    get: (req, res) => {
        const userInput = req.headers;
        // const username = userInput.username ? userInput.username : 'root';
        // const password = userInput.password ? md5(userInput.password) : 'root';
        console.log('header', req.headers);

        if (!req.headers.authorization) {
            const auth = {
                authenticated: false,
            };
            res.json(auth);
            return false;
        }

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
    },
    isAdmin: (req) => {
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
};

module.exports = login;

