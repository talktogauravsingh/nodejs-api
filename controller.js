const mysqlConnection = require('./db-connection');
const jwt = require('jsonwebtoken');

mysqlConnection.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");
});


module.exports = {
    create: async function (req, res) {
        try {
            // Build Sql Insert Query
            const sql = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.psw}')`;

            mysqlConnection.query(sql, function (err, response) {
                if (err) {
                    throw err;
                }
                if (response.insertId) {
                    res.send({
                        status: true,
                        message: "User registered successfully",
                    })
                }
            });

        } catch (error) {
            console.log(error)
            res.send({
                status: false,
                message: "Internal Server Error",
            })
        }

    },
    login: async function (req, res) {
        try {

            const sql = `SELECT * FROM users WHERE email='${req.body.email}' and password = '${req.body.psw}'`;

            mysqlConnection.query(sql, function (err, response) {
                if (err) {
                    throw err;
                }

                console.log('response', response);

                if (response.length) {
                    const user = response[0];
                    console.log(user.id);
                    const token = jwt.sign({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }, 'gaurav');
                    console.log('token', token);

                    res.send({
                        status: true,
                        message: "User successfully logged in!",
                        token: token
                    })
                } else {
                    res.send({
                        status: true,
                        message: "User does not exist",
                    })
                }
            });

        } catch (error) {
            console.log(error)
            res.send({
                status: false,
                message: "Internal Server Error",
            })
        }
    },
    verifyUser: async function (req, res) {
        try {
            const userToken = req.body.token;
            const verify = jwt.verify(userToken, 'gaurav');
            const sql = `SELECT * FROM users WHERE email='${verify.email}' and id = '${verify.id}'`;
            mysqlConnection.query(sql, function (err, response) {
                if (err) {
                    throw err;
                }
                console.log(response);
                if(response.length){
                    res.send({
                        status: true,
                        message: "Verified User!",
                    })
                }else{
                    throw "User does not exist in database";
                }
               
            });
            
        } catch (error) {
            console.log(error)
            res.send({
                status: false,
                message: "Invalid token",
            })
        }
    }
}