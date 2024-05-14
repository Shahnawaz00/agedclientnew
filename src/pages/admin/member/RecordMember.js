import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';

export default function RecordMember() {
    const [member, setMember] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        gender: '',
        emergency_contact: '',
        next_of_kin: '',
        mailing_address: '',
        allergies_or_diet: '',
        current_medications: '',
        general_practitioner: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/members/${id}`);
                setMember(response.data);
                setFormData({
                    name: response.data.name,
                    date_of_birth: response.data.date_of_birth,
                    gender: response.data.gender,
                    emergency_contact: response.data.emergency_contact,
                    next_of_kin: response.data.next_of_kin,
                    mailing_address: response.data.mailing_address,
                    allergies_or_diet: response.data.allergies_or_diet,
                    current_medications: response.data.current_medications,
                    general_practitioner: response.data.general_practitioner
                });
            } catch (error) {
                console.error('Error fetching member details:', error);
            }
        };
        fetchMember();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/members/${id}`, formData);
            alert('Member updated successfully!');
            setEditing(false);
            navigate('/admin/patient-list');
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Failed to update member.');
        }
    };
    // Function to convert SQL datetime format to a readable date
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

    const deleteMember = async () => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                await axios.delete(`http://localhost:5000/api/members/${id}`);
                alert('Member deleted successfully!');
                navigate('/admin/patient-list');
            } catch (error) {
                console.error('Error deleting member:', error);
                alert('Failed to delete member. Please try again.');
            }
        }
    };

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Member Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/patient-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Emergency Contact</th>
                                        <th>Next of Kin</th>
                                        <th>Mailing Address</th>
                                        <th>Allergies</th>
                                        <th>Current Medications</th>
                                        <th>General Practitioner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{member.name}</td>
                                        <td>{formatDate(member.date_of_birth)}</td>
                                        <td>{member.gender}</td>
                                        <td>{member.emergency_contact}</td>
                                        <td>{member.next_of_kin}</td>
                                        <td>{member.mailing_address}</td>
                                        <td>{member.allergies_or_diet}</td>
                                        <td>{member.current_medications}</td>
                                        <td>{member.general_practitioner}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div'>
                                <button onClick={() => setEditing(true)}>Edit Member</button>
                                <button onClick={deleteMember}>Delete Member</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            <label>Date of Birth:</label>
                            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
                            <label>Gender:</label>
                            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
                            <label>Emergency Contact:</label>
                            <input type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleInputChange} />
                            <label>Next of Kin:</label>
                            <input type="text" name="next_of_kin" value={formData.next_of_kin} onChange={handleInputChange} />
                            <label>Mailing Address:</label>
                            <input type="text" name="mailing_address" value={formData.mailing_address} onChange={handleInputChange} />
                            <label>Allergies/Diet:</label>
                            <input type="text" name="allergies_or_diet" value={formData.allergies_or_diet} onChange={handleInputChange} />
                            <label>Current Medications:</label>
                            <input type="text" name="current_medications" value={formData.current_medications} onChange={handleInputChange} />
                            <label>General Practitioner:</label>
                            <input type="text" name="general_practitioner" value={formData.general_practitioner} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
