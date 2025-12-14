const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const { protect, adminOrOrganizer } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, adminOrOrganizer, createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, adminOrOrganizer, updateProduct)
    .delete(protect, adminOrOrganizer, deleteProduct);

module.exports = router;
