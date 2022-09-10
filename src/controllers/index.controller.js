const {Pool} = require('pg');
const bcrypt =require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');


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

//using this controller to register a new user
const postUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.json({
            message: 'Please enter all fields'
        })
    }

    //Form validation

    let hashedPassword = await bcrypt.hash(password, 10);

    const response = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    console.log(response);
    req.flash('success_msg', 'You are now registered');
    res.json({
        message: 'User has been created succesfuly',
        body:{
            user:{name,email,password, hashedPassword}
        }
    })
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, password, id]);
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
    validateForm(req, res);
};

const signupUser = (req, res) => {
    validateForm(req, res);
}


module.exports = {
    getUsers,
    postUser,
    getUserById,
    deleteUser,
    updateUser,
    loginUser,
    signupUser
}