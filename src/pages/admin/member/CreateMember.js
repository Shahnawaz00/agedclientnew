import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/MemberManagementSidebar';

export default function CreateMember() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    date_of_birth: '',
    medicare_number: '',
    medicare_irn: '',
    medicare_expiry_date: '',
    gender: '',
    phoneNo: '',
    emergency_phoneNo: '',
    emergency_contact: '',
    next_of_kin: '',
    nok_name: '',
    nok_phoneNo: '',
    nok_email: '',
    nok_relationship: '',
    mailing_address: '',
    billing_address: '',
    allergies_or_diet: '',
    allergies: '',
    medical_conditions: '',
    dietary_restrictions: '',
    current_medications: '',
    general_practitioner: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/members', formData);
      alert('Member created successfully!');
      // Optionally, redirect to another page after successful creation
    } catch (error) {
      console.error('Error creating member:', error);
      alert('Failed to create member. Please try again.');
    }
  };

  return (
    <div className='CreateUser' >
      <AdminNavbar />
      <div className='adminhub-content' >

      <AdminSidebar />
      <div className="create-user-container">
        <h2>Create Member</h2>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {/* <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /> */}
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input type="date" name="date_of_birth" placeholder="Date of Birth" value={formData.date_of_birth} onChange={handleChange} required />
          <input type="text" name="medicare_number" placeholder="Medicare Number" value={formData.medicare_number} onChange={handleChange} />
          <input type="text" name="medicare_irn" placeholder="Medicare IRN" value={formData.medicare_irn} onChange={handleChange} />
          <label htmlFor="medicare_expiry_date">Medicare Expiry Date:</label>
          <input type="date" name="medicare_expiry_date" placeholder="Medicare Expiry Date" value={formData.medicare_expiry_date} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
          <input type="text" name="emergency_phoneNo" placeholder="Emergency Phone Number" value={formData.emergency_phoneNo} onChange={handleChange} />
          {/* <input type="text" name="nok_name" placeholder="Next of Kin Name" value={formData.nok_name} onChange={handleChange} />
          <input type="text" name="nok_phoneNo" placeholder="Next of Kin Phone Number" value={formData.nok_phoneNo} onChange={handleChange} /> */}
          {/* <input type="email" name="nok_email" placeholder="Next of Kin Email" value={formData.nok_email} onChange={handleChange} /> */}
          {/* <input type="text" name="nok_relationship" placeholder="Next of Kin Relationship" value={formData.nok_relationship} onChange={handleChange} /> */}
          <input type="text" name="mailing_address" placeholder="Mailing Address" value={formData.mailing_address} onChange={handleChange} />
          <input type="text" name="billing_address" placeholder="Billing Address" value={formData.billing_address} onChange={handleChange} /> 
          <input type="text" name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
          <input type="text" name="medical_conditions" placeholder="Medical Conditions" value={formData.medical_conditions} onChange={handleChange} />
          <input type="text" name="dietary_restrictions" placeholder="Dietary Restrictions" value={formData.dietary_restrictions} onChange={handleChange} />
          <input type="text" name="current_medications" placeholder="Current Medications" value={formData.current_medications} onChange={handleChange} />
          <input type="text" name="general_practitioner" placeholder="General Practitioner" value={formData.general_practitioner} onChange={handleChange} />
          <button type="submit">Create Member</button>
        </form>
      </div>
      </div>
    </div>
  );
}
