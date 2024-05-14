import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';
import { Link } from 'react-router-dom';

export default function StaffList() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/staff/${id}`);
      alert('Staff deleted successfully!');
      fetchStaffList();  // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert('Failed to delete staff. Please try again.');
    }
  };

  // Function to convert SQL datetime format to a readable date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};


  return (
    <div>
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="list-table-div">
          <h2>Staff List</h2>
          <table className="list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {/* <th>Contact Information</th> */}
                <th>Phone Number</th>
                <th>Mailing Address</th>
                {/* <th>Billing Address</th> */}
                {/* <th>Emergency Contact</th> */}
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Qualifications</th>
                {/* <th>Role</th> */}
                <th>Availability</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <tr key={staff.staff_id}>
                  <td>{staff.staff_id}</td>
                  <td>{staff.name}</td>
                  <td>{staff.lname}</td>
                  <td>{staff.email}</td>
                  {/* <td>{staff.contact_information}</td> */}
                  <td>{staff.phoneNo}</td>
                  <td>{staff.mailing_address}</td>
                  {/* <td>{staff.billing_address}</td> */}
                  {/* <td>{staff.emergency_contact}</td> */}
                  <td>{formatDate(staff.date_of_birth)}</td>
                  <td>{staff.gender}</td>
                  <td>{staff.qualifications}</td>
                  {/* <td>{staff.role}</td> */}
                  <td>{staff.availability}</td>
                  <td>
                    <Link className="edit-link" to={`/admin/record-staff/${staff.staff_id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
