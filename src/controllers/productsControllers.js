const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password:'postgres',
    database: 'testapi',
    port: '5432'
});

const getProducts = async (req, res) => {
    const response = await pool.query('SELECT * FROM products');
    res.status(200).json(response.rows);
};

const getProductById = async (req, res) => {

    const id =req.params.id;
    const response = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if(response.rows.length === 0){
        return res.status(404).json({
            message: 'This product is not available'
        })
    }

    res.json(response.rows);
};

const postProduct = async (req, res) => {
    const {name, description, price} = req.body;

    const response = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3)', [name, description, price]);
    console.log(response);
    res.json({
        message: 'Product has been created succesfuly',
        body:{
            product:{name,description, price}
        }
    })
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const {name, description, price} = req.body;
    const response = await pool.query('UPDATE products SET name = $1, description = $2, price=$3 WHERE id = $4', [name, description, price, id]);
    
    if(response.rows.length === 0){
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    console.log(response);
    res.json('Product updated succesfuly');
};

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if(response.rowCount === 0){
        return res.status(404).json({
            message: 'Product not found'
        })
    };

    return res.sendStatus(204)
};


module.exports = {
   getProducts,
   getProductById,
   postProduct,
   updateProduct,
   deleteProduct
}