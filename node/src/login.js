const md5 = require('md5');
const con = require('./config/db');

const login = {
    get: (req, res) => {
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
    }
};

module.exports = login;
