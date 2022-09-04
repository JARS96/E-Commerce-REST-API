const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password:'password',
    database: 'testapi',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}

const postUser = async (req, res) => {
    const {name, email} = req.body;

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    console.log(response);
    res.json({
        message: 'User has been created succesfuly',
        body:{
            user:{name,email}
        }
    })
}

module.exports = {
    getUsers,
    postUser
}