import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/staff/StaffNavbar';

export default function ViewMember() {
    const [member, setMember] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/members/${id}`);
                setMember(response.data);
            } catch (error) {
                console.error('Error fetching member details:', error);
            }
        };
        fetchMember();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
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
                        <button className='back-button' onClick={() => navigate("/staff/staff-appointment-list")}>Back</button>
                    </div>
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
                </div>
            </div>
        </div>
    );
}
