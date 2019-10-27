
const con = require('./config/db');

const user = {
    get: (req, res) => {
        console.log('Saeed fetched this')
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
    },

    post: (req, res, next) => {
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
    },

    put: (req, res) => {
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
    },

    delete: (req, res) => {
        const userId = req.params.id;

        if (userId == 'undefined') return res.json({result: 'id is not defined'});

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
    }
};


module.exports = user;
