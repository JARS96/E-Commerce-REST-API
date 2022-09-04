const {Router} = require('express');
const router = Router();
const {getUsers, postUser} = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/users', postUser);

module.exports = router;