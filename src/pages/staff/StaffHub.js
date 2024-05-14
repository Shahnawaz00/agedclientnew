import React from 'react';
import StaffNavbar from '../../components/staff/StaffNavbar';

function StaffHub() {
    return (
      <div className="StaffHub">
        <StaffNavbar />
        <div className='staffhub-content' >
            <h1 className='staffhub-heading' >Staff Hub</h1>
        </div>
      </div>
    );
  }
  
  export default StaffHub;