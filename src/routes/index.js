const {Router} = require('express');
const router = Router();
const {getUsers, postUser, getUserById, deleteUser, updateUser, loginUser, signupUser} = require('../controllers/index.controller');
const {getProducts, getProductById, postProduct, updateProduct, deleteProduct} = require('../controllers/productsControllers');

//user routes
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', postUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

//login route
    //Recibir credenciales e iniciar sesion
router.post('/login', loginUser);
    //Muestra formulario de login
router.get('/login', loginUser);

//signup router
router.post('/signup', signupUser);

//products routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', postProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

module.exports = router;