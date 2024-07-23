import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        inStock: true
    });
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchUserRole();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await axios.get('http://localhost:3000/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error.response?.data || error.message);
        }
    };

    const fetchUserRole = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            console.log('Token:', token);
            const decoded = jwtDecode(token);
            const userId = decoded.id; // ודא שהשדה הוא 'id' ולא '_id'
            const response = await axios.get(`http://localhost:3000/users/role/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('User role from server:', response.data.role); 
            setUserRole(response.data.role);
        } catch (error) {
            console.error('Error fetching user role:', error.response?.data || error.message);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/products/${productId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        console.log("userRole:",userRole);
        e.preventDefault();
        if (userRole !== 'parent') {
            alert('Only parents can add products');
            return;
        }
        try {

            const response = await axios.post('http://localhost:3000/products', newProduct, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('Product added:', response.data);
            setProducts([...products, response.data]);
            setNewProduct({
                name: '',
                price: '',
                description: '',
                inStock: true
            });
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id} onClick={() => handleDelete(product._id)}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    <label>
                        In Stock:
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={newProduct.inStock}
                            onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                        />
                    </label>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default Products;
