const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.post('/users',userControllers.createUsers);
router.get('/users', userControllers.getUsers);
router.put('/users/:id', userControllers.updateUsers);
router.delete('/users/:id', userControllers.deleteUsers);


module.exports = router;