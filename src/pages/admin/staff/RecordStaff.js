import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';

export default function RecordStaff() {
    const [staff, setStaff] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact_information: '',
        qualifications: '',
        role: '',
        availability: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/staff/${id}`);
                setStaff(response.data);
                setFormData({
                    name: response.data.name,
                    contact_information: response.data.contact_information,
                    qualifications: response.data.qualifications,
                    role: response.data.role,
                    availability: response.data.availability
                });
            } catch (error) {
                console.error('Error fetching staff details:', error);
            }
        };
        fetchStaff();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Using PATCH request for partial updates
            await axios.patch(`http://localhost:5000/api/staff/${id}`, formData);
            alert('Staff updated successfully!');
            setEditing(false);
            navigate('/admin/staff-list');
        } catch (error) {
            console.error('Error updating staff:', error);
            alert('Failed to update staff.');
        }
    };
    

    const deleteStaff = async () => {
        if (window.confirm("Are you sure you want to delete this staff record?")) {
            try {
                await axios.delete(`http://localhost:5000/api/staff/${id}`);
                alert('Staff deleted successfully!');
                navigate('/admin/staff-list');
            } catch (error) {
                console.error('Error deleting staff:', error);
                alert('Failed to delete staff. Please try again.');
            }
        }
    };

    if (!staff) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Staff Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/staff-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Contact Information</th>
                                        <th>Qualifications</th>
                                        <th>Role</th>
                                        <th>Availability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{staff.name}</td>
                                        <td>{staff.contact_information}</td>
                                        <td>{staff.qualifications}</td>
                                        <td>{staff.role}</td>
                                        <td>{staff.availability}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div' >
                                <button onClick={() => setEditing(true)}>Edit Staff</button>
                                <button onClick={deleteStaff}>Delete Staff</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            <label>Contact Information:</label>
                            <input type="text" name="contact_information" value={formData.contact_information} onChange={handleInputChange} />
                            <label>Qualifications:</label>
                            <input type="text" name="qualifications" value={formData.qualifications} onChange={handleInputChange} />
                            <label>Role:</label>
                            <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
                            <label>Availability:</label>
                            <input type="text" name="availability" value={formData.availability} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
