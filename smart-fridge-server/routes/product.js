const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRole = require('../middlewares/authorizeRole');
const { addProduct, deleteProductById, getAllProducts, getProductsById, updateProductById } = require('../controllers/product');

router.get('/', getAllProducts);
router.get('/:productId', getProductsById);
router.post('/', authenticateJWT, authorizeRole('parent'), addProduct);
router.put('/', authenticateJWT, updateProductById);
router.delete('/:productId', authenticateJWT, deleteProductById);

module.exports = router;
