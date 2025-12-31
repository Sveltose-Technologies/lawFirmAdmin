"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import authService from "../../../services/authService"; // पाथ सही रखें
import { toast } from "react-toastify";

export default function AdminProfile() {
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    websiteLogo: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.id) {
      setAdminId(user.id);
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNo: user.phoneNo || "",
        address: user.address || "",
        city: user.city || "",
        profileImage: user.profileImage || "",
        websiteLogo: user.websiteLogo || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      // ✅ सुधार: यहाँ authService का उपयोग करें
      const res = await authService.updateProfile(adminId, formData);
      
      if (res.success) {
        // लोकल स्टोरेज अपडेट करें
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...currentUser, ...formData }));
        
        toast.success("Profile Updated Successfully!");
      }
    } catch (err) {
      // api.js इंटरसेप्टर एरर हैंडल कर लेगा
    } finally {
      setLoading(false);
    }
  };

  const goldColor = "#eebb5d";

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-4">
          <h4 className="fw-bold mb-4" style={{ color: goldColor }}>Edit Profile</h4>
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">First Name</Label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Last Name</Label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Email Address</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Phone Number</Label>
                  <Input name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label className="fw-bold small">Address</Label>
              <Input type="textarea" name="address" value={formData.address} onChange={handleChange} />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">City</Label>
                  <Input name="city" value={formData.city} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Profile Image URL</Label>
                  <Input name="profileImage" value={formData.profileImage} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">New Password</Label>
                  <Input type="password" name="password" onChange={handleChange} placeholder="Leave blank to keep same" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Confirm Password</Label>
                  <Input type="password" name="confirmPassword" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label className="fw-bold small">Website Logo URL</Label>
              <Input name="websiteLogo" value={formData.websiteLogo} onChange={handleChange} />
            </FormGroup>

            <div className="text-end mt-4">
              <Button className="px-5 border-0 shadow-sm" style={{ backgroundColor: goldColor, color: "#fff" }} disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Save Changes"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}