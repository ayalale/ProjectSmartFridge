const products = require('../models/product');

exports.addProduct = async (req, res) => {
    try {
        if (req.user.role !== 'parent') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const newProduct = await products.create(req.body);
        res.send(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await products.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const product = await products.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Failed to get product:', error);
        res.status(500).json({ message: 'Failed to get product' });
    }
};

exports.updateProductById = async (req, res) => {
    const { productId } = req.params;
    const { name, price, description, inStock } = req.body;

    try {
        const updatedProduct = await products.findByIdAndUpdate(
            productId,
            { name, price, description, inStock },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};
