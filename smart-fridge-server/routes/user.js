const express = require('express');
const router = express.Router();
const { addUser, deleteUserById, getAllUsers, getUserById, loginUser, updateUserById, getUserRole } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/register', addUser);
router.post('/login', loginUser);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUserById);
router.get('/role/:userId', getUserRole);

module.exports = router;
