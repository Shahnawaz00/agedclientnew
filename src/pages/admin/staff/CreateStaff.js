import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/StaffManagementSidebar';

export default function CreateStaff() {
  const [formData, setFormData] = useState({
    name: '',
    lname: '', // Add last name
    email: '',
    password: '',
    contact_information: '',
    phoneNo: '', // Add phone number
    mailing_address: '', // Add mailing address
    billing_address: '', // Add billing address
    emergency_contact: '', // Add emergency contact
    date_of_birth: '', // Add date of birth
    gender: '', // Add gender
    qualifications: '',
    role: '',
    availability: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/staff', formData);
      alert('Staff created successfully!');
      setFormData({
        name: '',
        lname: '',
        email: '',
        password: '',
        contact_information: '',
        phoneNo: '',
        mailing_address: '',
        billing_address: '',
        emergency_contact: '',
        date_of_birth: '',
        gender: '',
        qualifications: '',
        role: '',
        availability: ''
      });
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Failed to create staff. Please try again.');
    }
  };

  return (
    <div className='createUser' >
      <AdminNavbar />
      <div className='adminhub-content' >
        <AdminSidebar />
        <div className="create-user-container">
          <h2>Create Staff</h2>
          <form className="create-user-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {/* <input type="text" name="contact_information" placeholder="Contact Information" value={formData.contact_information} onChange={handleChange} required /> */}
            <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
            <input type="text" name="mailing_address" placeholder="Mailing Address" value={formData.mailing_address} onChange={handleChange} />
            {/* <input type="text" name="billing_address" placeholder="Billing Address" value={formData.billing_address} onChange={handleChange} /> */}
            {/* <input type="text" name="emergency_contact" placeholder="Emergency Contact" value={formData.emergency_contact} onChange={handleChange} /> */}
            <label htmlFor="date_of_birth">Date of Birth:</label>
            <input type="date" name="date_of_birth" placeholder="Date of Birth" value={formData.date_of_birth} onChange={handleChange} />
            <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
            <input type="text" name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} required />
            {/* <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required /> */}
            <input type="text" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} required />
            <button type="submit">Create Staff</button>
          </form>
        </div>
      </div>
    </div>
  );
}
