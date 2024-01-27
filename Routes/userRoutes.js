const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User routes
router.post('/users', userController.createUser);
router.post("/auth/user", userController.logUser)
router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.currentUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
 