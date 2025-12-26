'use client';
import React, { useState } from "react";
import { 
  Row, Col, Card, CardBody, Input, Button, Label, FormGroup 
} from "reactstrap";
import SidebarUser from "@/app/layouts/sidebars/vertical/SidebarUser";

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserSettings() {
  const goldColor = "#eebb5d";

  // --- States ---
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'password'
  const [profileImg, setProfileImg] = useState("/images/users/user1.jpg"); // Default Image

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: "John",
    email: "user@gmail.com",
    dob: "2000-06-20",
    phone: "+880 1768 692261",
    presentAddress: "Khulna, Bangladesh",
    permanentAddress: "Dhaka, Bangladesh",
    postalCode: "9000",
    country: "Argentina"
  });

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
      // --- INFO TOAST FOR IMAGE ---
      toast.info("Profile picture updated!", {
        theme: "colored",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true
      });
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HANDLE PROFILE SAVE ---
  const handleSaveProfile = () => {
    // Validation Check (Example)
    if (!formData.fullName || !formData.email) {
        toast.error("Name and Email are required!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    // Success Toast
    toast.success("Profile details saved successfully!", {
        theme: "colored",
        position: "top-right"
    });
  };

  // --- HANDLE PASSWORD UPDATE ---
  const handleUpdatePassword = () => {
    // Success Toast
    toast.success("Password updated successfully!", {
        theme: "colored",
        position: "top-right"
    });
  };

  return (
    <div className="bg-light min-vh-100 p-4 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Row>
        <Col lg="3" md="4" className="mb-4">
             <SidebarUser />
        </Col>

        <Col lg="9" md="8">
            <Card className="border-0 shadow-sm rounded-4">
                <CardBody className="p-4">
                    
                    <h4 className="fw-bold mb-4">Profile</h4>

                    {/* --- TABS --- */}
                    <div className="d-flex gap-3 mb-5">
                        <Button 
                            className="border-0 px-4 py-2 fw-bold"
                            style={{ 
                                backgroundColor: activeTab === 'profile' ? '#eebb5d' : '#eee', // Darker Gold for active
                                color: activeTab === 'profile' ? '#fff' : '#555'
                            }}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </Button>
                        <Button 
                            className="border-0 px-4 py-2 fw-bold"
                            style={{ 
                                backgroundColor: activeTab === 'password' ? '#eebb5d' : '#eee', 
                                color: activeTab === 'password' ? '#fff' : '#555'
                            }}
                            onClick={() => setActiveTab('password')}
                        >
                            Password
                        </Button>
                    </div>

                    {/* --- CONTENT AREA --- */}
                    {activeTab === 'profile' ? (
                        <Row>
                            {/* Left Side: Image Upload */}
                            <Col md="3" className="mb-4 d-flex justify-content-center justify-content-md-start">
                                <div className="position-relative" style={{width: '120px', height: '120px'}}>
                                    <img 
                                        src={profileImg} 
                                        alt="Profile" 
                                        className="rounded-circle w-100 h-100" 
                                        style={{objectFit: 'cover', border: '1px solid #ddd'}}
                                    />
                                    {/* Edit Icon */}
                                    <div className="position-absolute bottom-0 end-0">
                                        <input type="file" id="edit-profile-pic" hidden onChange={handleImageChange} />
                                        <label 
                                            htmlFor="edit-profile-pic"
                                            className="d-flex align-items-center justify-content-center rounded-circle text-white shadow-sm"
                                            style={{
                                                width: '35px', height: '35px', 
                                                backgroundColor: '#eebb5d', 
                                                cursor: 'pointer',
                                                border: '2px solid #fff'
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill small"></i>
                                        </label>
                                    </div>
                                </div>
                            </Col>

                            {/* Right Side: Form Fields */}
                            <Col md="9">
                                <Row>
                                    {/* Full Name */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Full Name</Label>
                                            <Input 
                                                type="text" 
                                                name="fullName"
                                                value={formData.fullName} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2"
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Email Address */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Email Address</Label>
                                            <Input 
                                                type="email" 
                                                name="email"
                                                value={formData.email} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2"
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Date of Birth */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Date of Birth</Label>
                                            <Input 
                                                type="date" 
                                                name="dob"
                                                value={formData.dob} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2 text-muted"
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Phone Number */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Phone Number</Label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-light-subtle">
                                                    🇧🇩 {/* Flag Emoji or Icon */}
                                                </span>
                                                <Input 
                                                    type="text" 
                                                    name="phone"
                                                    value={formData.phone} 
                                                    onChange={handleChange}
                                                    className="bg-light border-light-subtle py-2"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>

                                    {/* Present Address */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Present Address</Label>
                                            <Input 
                                                type="text" 
                                                name="presentAddress"
                                                value={formData.presentAddress} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2"
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Permanent Address */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Permanent Address</Label>
                                            <Input 
                                                type="text" 
                                                name="permanentAddress"
                                                value={formData.permanentAddress} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2"
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Postal Code */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Postal Code</Label>
                                            <Input 
                                                type="text" 
                                                name="postalCode"
                                                value={formData.postalCode} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2"
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Country */}
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="small fw-bold text-dark">Country</Label>
                                            <Input 
                                                type="select" 
                                                name="country"
                                                value={formData.country} 
                                                onChange={handleChange}
                                                className="bg-light border-light-subtle py-2 text-muted"
                                            >
                                                <option>Argentina</option>
                                                <option>Bangladesh</option>
                                                <option>India</option>
                                                <option>USA</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>

                                    {/* Save Button */}
                                    <Col md="12" className="mt-3 text-end">
                                        <Button 
                                            className="border-0 px-4 py-2 fw-bold"
                                            style={{ backgroundColor: goldColor }}
                                            onClick={handleSaveProfile}
                                        >
                                            Save Changes
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        // --- PASSWORD TAB CONTENT ---
                        <div className="py-4">
                            <Row>
                                <Col md="12" className="mb-3">
                                    <FormGroup>
                                        <Label className="small fw-bold text-dark">Current Password</Label>
                                        <Input type="password" placeholder="Enter current password" className="bg-light border-light-subtle py-2" />
                                    </FormGroup>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <FormGroup>
                                        <Label className="small fw-bold text-dark">New Password</Label>
                                        <Input type="password" placeholder="Enter new password" className="bg-light border-light-subtle py-2" />
                                    </FormGroup>
                                </Col>
                                <Col md="6" className="mb-3">
                                    <FormGroup>
                                        <Label className="small fw-bold text-dark">Confirm Password</Label>
                                        <Input type="password" placeholder="Confirm new password" className="bg-light border-light-subtle py-2" />
                                    </FormGroup>
                                </Col>
                                <Col md="12" className="mt-3">
                                    <Button 
                                        className="border-0 px-4 py-2 fw-bold" 
                                        style={{ backgroundColor: goldColor }}
                                        onClick={handleUpdatePassword}
                                    >
                                        Update Password
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}

                </CardBody>
            </Card>
        </Col>
      </Row>
    </div>
  );
}