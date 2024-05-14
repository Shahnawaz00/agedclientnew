import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/InventoryManagementSidebar';

export default function RecordInventory() {
    const [inventoryItem, setInventoryItem] = useState(null);
    const [medications, setMedications] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        medication_id: '',
        quantity: '',
        last_restocked: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventoryItem();
        fetchMedications();
    }, [id]); // dependency on id ensures re-fetching if id changes

    const fetchInventoryItem = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/inventory/${id}`);
            setInventoryItem(response.data);
            setFormData({
                medication_id: response.data.medication_id,
                quantity: response.data.quantity,
                last_restocked: new Date(response.data.last_restocked).toISOString().substring(0, 10),
            });
        } catch (error) {
            console.error('Error fetching inventory item:', error);
        }
    };

    const fetchMedications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/medication');
            setMedications(response.data);
        } catch (error) {
            console.error('Error fetching medications:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/inventory/${id}`, formData);
            alert('Inventory item updated successfully!');
            setEditing(false);
            navigate('/admin/inventory-list');
        } catch (error) {
            console.error('Error updating inventory item:', error);
            alert('Failed to update inventory item.');
        }
    };

    const deleteInventoryItem = async () => {
        if (window.confirm("Are you sure you want to delete this inventory item?")) {
            try {
                await axios.delete(`http://localhost:5000/api/inventory/${id}`);
                alert('Inventory item deleted successfully!');
                navigate('/admin/inventory-list');
            } catch (error) {
                console.error('Error deleting inventory item:', error);
                alert('Failed to delete inventory item. Please try again.');
            }
        }
    };

    if (!inventoryItem) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <AdminSidebar />
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Inventory Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/inventory-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Medication Name</th>
                                        <th>Quantity</th>
                                        <th>Last Restocked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{inventoryItem.medication_id}</td>
                                        <td>{inventoryItem.quantity}</td>
                                        <td>{new Date(inventoryItem.last_restocked).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div'>
                                <button onClick={() => setEditing(true)}>Edit Inventory</button>
                                <button onClick={deleteInventoryItem}>Delete Inventory</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Medication ID:</label>
                            <select name="medication_id" value={formData.medication_id} onChange={handleInputChange}>
                                {medications.map(medication => (
                                    <option key={medication.medication_id} value={medication.medication_id}>
                                        {medication.medication_name}
                                    </option>
                                ))}
                            </select>
                            <label>Quantity:</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                            <label>Last Restocked:</label>
                            <input type="date" name="last_restocked" value={formData.last_restocked} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

