import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Inventory.css';

const Inventory = ({ url = "http://localhost:4000" }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      setFoodItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching food items:', error);
      toast.error('Failed to load food items');
      setLoading(false);
    }
  };

  const updateStock = async (id, stock) => {
    try {
      await axios.post(`${url}/api/food/update-stock`, { id, stock });
      toast.success('Stock updated successfully');
      fetchFoodItems(); // Refresh the list
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
    }
  };

  const handleStockChange = (id, newStock) => {
    // Create a copy of foodItems
    const updatedItems = foodItems.map(item => {
      if (item._id === id) {
        return { ...item, stock: newStock };
      }
      return item;
    });
    setFoodItems(updatedItems);
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Current Stock</th>
              <th>Update Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map(item => (
              <tr key={item._id}>
                <td>
                  <img 
                    src={`${url}/images/${item.image}`} 
                    alt={item.name} 
                    className="inventory-food-image" 
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.stock || 0}</td>
                <td>
                  <input 
                    type="number" 
                    min="0"
                    value={item.stock || 0}
                    onChange={(e) => handleStockChange(item._id, parseInt(e.target.value))}
                    className="stock-input"
                  />
                </td>
                <td>
                  <button 
                    onClick={() => updateStock(item._id, item.stock)}
                    className="update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory; 