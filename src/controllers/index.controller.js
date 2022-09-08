const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password:'postgres',
    database: 'testapi',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id =req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

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
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const {name, email} = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    console.log(response);
    res.json('User updated succesfuly');
};

const deleteUser = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users  WHERE id = $1', [id]);
    console.log(response);
    res.json(`User ${id} has been deleted succesfully`);
};

const loginUser = async(req, res) => {
    let userName = req.body.username;
    let password = req.body.password;

    res.send(`Username: ${username} Password:${password}`);
};


module.exports = {
    getUsers,
    postUser,
    getUserById,
    deleteUser,
    updateUser,
    loginUser
}