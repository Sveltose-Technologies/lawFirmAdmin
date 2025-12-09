'use client';
import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, Label } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProfile() {
  const GOLD = "#eebb5d";
  
  const [formData, setFormData] = useState({
      fname: "Deepak",
      lname: "Kumar",
      email: "attorney@lawstick.com",
      phone: "+91 9876543210",
      address: "123, High Court Road, New Delhi"
  });

  const handleSave = () => {
      toast.success("Profile Updated Successfully!", { theme: "colored" });
  };

  const handleDelete = () => {
      if(confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          toast.error("Account Deletion Initiated...", { theme: "colored" });
      }
  };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <h3 className="mb-4 fw-bold" style={{ color: GOLD }}>Edit Profile</h3>

      <Row>
        {/* --- PROFILE IMAGE --- */}
        <Col xs="12" md="4" className="mb-4">
            <Card className="border-0 shadow-sm text-center p-4 w-100 h-100">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" 
                     style={{width: 120, height: 120, borderRadius: '50%', border: `3px solid ${GOLD}`, background: '#f8f9fa'}}>
                    <i className="bi bi-person-fill display-1 text-secondary"></i>
                </div>
                <h5 className="fw-bold">{formData.fname} {formData.lname}</h5>
                <p className="text-muted">Senior Attorney</p>
                <Button size="sm" style={{backgroundColor: '#fff', color: GOLD, borderColor: GOLD}} className="mt-2">
                    Change Photo
                </Button>
            </Card>
        </Col>

        {/* --- EDIT FORM --- */}
        <Col xs="12" md="8" className="mb-4">
            <Card className="border-0 shadow-sm w-100 h-100">
                <CardBody>
                    <h5 className="fw-bold mb-4 border-bottom pb-2">Personal Information</h5>
                    <Row>
                        <Col md="6" className="mb-3">
                            <Label className="fw-bold small">First Name</Label>
                            <Input value={formData.fname} onChange={(e)=>setFormData({...formData, fname: e.target.value})} />
                        </Col>
                        <Col md="6" className="mb-3">
                            <Label className="fw-bold small">Last Name</Label>
                            <Input value={formData.lname} onChange={(e)=>setFormData({...formData, lname: e.target.value})} />
                        </Col>
                        <Col md="6" className="mb-3">
                            <Label className="fw-bold small">Email Address</Label>
                            <Input type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                        </Col>
                        <Col md="6" className="mb-3">
                            <Label className="fw-bold small">Phone Number</Label>
                            <Input type="tel" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
                        </Col>
                        <Col md="12" className="mb-3">
                            <Label className="fw-bold small">Office Address</Label>
                            <Input type="textarea" rows="2" value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} />
                        </Col>
                        
                        <Col md="12" className="mt-3 d-flex justify-content-between align-items-center">
                            <Button color="danger" outline size="sm" onClick={handleDelete}>
                                <i className="bi bi-trash me-1"></i> Delete Account
                            </Button>
                            
                            <Button style={{backgroundColor: GOLD, border: 'none'}} className="px-4" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
      </Row>
    </div>
  );
}