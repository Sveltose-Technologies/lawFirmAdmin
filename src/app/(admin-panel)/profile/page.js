


"use client";
import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import authService from "@/services/authService";
export default function UserProfile({ isAdmin = false }) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", phoneNo: "", city: "",
    password: "", confirmPassword: "", profileImage: null, websiteLogo: null,
  });

  // Load Admin Profile - Using authService
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await authService.getAdminProfile();
        if (res.success) {
          const admin = Array.isArray(res.data) ? res.data[0] : res.data;
          if (admin) {
            setUserId(admin.id);
            setFormData({
              email: admin.email || "",
              firstName: admin.firstName || "",
              lastName: admin.lastName || "",
              phoneNo: admin.phoneNo || "",
              city: admin.city || "",
              password: "", confirmPassword: "",
              profileImage: null, websiteLogo: null,
            });
          }
        }
      } catch (err) {
        toast.error("Profile load fail");
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords match nahi kar rahe");
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          fd.append(key, formData[key]);
        }
      });

      const res = await authService.updateAdminProfile(userId, fd);
      if (res.success) {
        toast.success("Profile updated!");
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const preview = (file) => file instanceof File ? URL.createObjectURL(file) : null;

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-4 p-md-5">
          <h4 className="fw-bold mb-4" style={{ color: "var(--gold-color)" }}>
            {isAdmin ? "Admin Profile Settings" : "Edit Profile"}
          </h4>

          <Form onSubmit={handleSubmit}>
            <Row className="gy-2"> {/* Responsive Grid Starts */}
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                </FormGroup>
              </Col>

              <Col xs={12}>
                <FormGroup>
                  <Label>City</Label>
                  <Input name="city" value={formData.city} onChange={handleChange} />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Profile Picture</Label>
                  <Input type="file" name="profileImage" onChange={handleChange} />
                  {preview(formData.profileImage) && <img src={preview(formData.profileImage)} className="mt-2 rounded" style={{width:80}} />}
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Website Logo</Label>
                  <Input type="file" name="websiteLogo" onChange={handleChange} />
                  {preview(formData.websiteLogo) && <img src={preview(formData.websiteLogo)} className="mt-2 rounded" style={{width:80}} />}
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>New Password</Label>
                  <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>

           <div className="mt-4 text-start"> 
  <Button 
    type="submit" 
    disabled={loading} 
    className="btn-gold"
  >
    {loading ? "Saving..." : "Save Changes"}
  </Button>
</div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}