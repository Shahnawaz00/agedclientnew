import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/InventoryManagementSidebar';
import { Link } from 'react-router-dom';

export default function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medication');
      setMedications(response.data); // Store medications in state
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };
  const getMedicationName = (medicationId) => {
    const medication = medications.find(med => med.medication_id === medicationId);
    return medication ? medication.medication_name : 'Unknown';
  };

 

  // Function to convert SQL datetime format to a readable date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <AdminNavbar />
      <div className='adminhub-content' >
        <AdminSidebar />
        <div className="list-table-div">
          <h2>Inventory List</h2>
          <table className="list-table">
            <thead>
              <tr>
                <th>Inventory ID</th>
                <th>Category</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Last Restocked</th>
                {/* <th>Delete</th> */}
              </tr>
            </thead>
            {inventory.length === 0 ? (
                <div className='loading' ></div>
            ) : (
            <tbody>
              {inventory.map(item => (
                <tr key={item.inventory_id}>
                  <td>{item.inventory_id}</td>
                  <td>{item.category}</td>
                  <td>{item.medication_id ? getMedicationName(item.medication_id): item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatDate(item.last_restocked)}</td>
                  {/* <td>
                    <button onClick={() => deleteInventory(item.inventory_id)}>Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
