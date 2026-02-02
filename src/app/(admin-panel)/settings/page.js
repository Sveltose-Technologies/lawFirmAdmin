// 'use client';
// import React, { useState } from "react";
// import {
//   Card,
//   CardBody,
//   Input,
//   Row,
//   Col,
//   Button,
//   FormGroup,
//   Label
// } from "reactstrap";

// // --- 1. TOAST IMPORTS ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Settings = () => {
//   // State to manage form inputs
//   const [formData, setFormData] = useState({
//     title: "Lawstick",
//     description: "Expert legal services for all your needs",
//     email: "info@lawstick.com",
//     phone: "+91 97643 26598",
//     address: "85 Accra street, Ghana",
//     copyright: "©2025 Appstick, All rights reserved.",
//     facebook: "https://www.facebook.com/",
//     twitter: "https://twitter.com",
//     instagram: "https://www.instagram.com/",
//     whatsapp: "https://api.whatsapp.com/send?phone...",
//     youtube: "https://www.youtube.com/"
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Submit
//   const handleSubmit = () => {
//     // --- GREEN TOAST SUBMIT ---
//     toast.success("Settings saved successfully!", {
//         theme: "colored",
//         position: "top-right"
//     });
//     console.log(formData);
//   };

//   // Handle Image Click (Simulation)
//   const handleImageClick = (label) => {
//     toast.info(`Upload dialog for ${label} would open here`, {
//         position: "bottom-right",
//         autoClose: 2000,
//         hideProgressBar: true
//     });
//   };

//   // Mock Image Upload Component
//   const ImageUploadBox = ({ label, icon }) => (
//     <div className="mb-3">
//       <Label className="small fw-bold text-muted">{label}</Label>
//       <div 
//         className="border rounded d-flex align-items-center justify-content-center bg-white"
//         style={{ height: '80px', width: '80px', cursor: 'pointer', borderColor: '#eebb5d' }}
//         onClick={() => handleImageClick(label)}
//       >
//         {/* Placeholder Icon/Image */}
//         <i className={`bi ${icon} fs-2 text-muted`}></i>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-3 bg-light min-vh-100 font-sans">
      
//       {/* --- 2. TOAST CONTAINER --- */}
//       <ToastContainer />

//       {/* --- Header --- */}
//       <Card className="mb-4 border-0 shadow-sm">
//         <CardBody className="p-3 d-flex align-items-center">
//           <div className="me-2">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16" style={{ color: '#eebb5d' }}>
//               <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
//             </svg>
//           </div>
//           <h5 className="mb-0 fw-bold" style={{ color: '#eebb5d' }}>Settings</h5>
//         </CardBody>
//       </Card>

//       {/* --- Form Card --- */}
//       <Card className="border-0 shadow-sm">
//         <CardBody className="p-4">
            
//             {/* Title & Description */}
//             <Row>
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Title</Label>
//                         <Input type="text" name="title" value={formData.title} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Description</Label>
//                         <Input type="text" name="description" value={formData.description} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//             </Row>

//             {/* Email & Phone */}
//             <Row className="mt-2">
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Email</Label>
//                         <Input type="email" name="email" value={formData.email} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Phone Number</Label>
//                         {/* Simulating Flag Input with basic input */}
//                         <div className="input-group">
//                             <span className="input-group-text bg-white"><i className="bi bi-flag"></i></span>
//                             <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
//                         </div>
//                     </FormGroup>
//                 </Col>
//             </Row>

//             {/* Address & Copyright */}
//             <Row className="mt-2">
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Address</Label>
//                         <Input type="text" name="address" value={formData.address} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Copyright</Label>
//                         <Input type="text" name="copyright" value={formData.copyright} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//             </Row>

//             {/* Social Links */}
//             <Row className="mt-2">
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Facebook Link</Label>
//                         <Input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Twitter Link</Label>
//                         <Input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//             </Row>

//             <Row className="mt-2">
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Instagram Link</Label>
//                         <Input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//                 <Col md={6}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Whatsapp Link</Label>
//                         <Input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//             </Row>

//              <Row className="mt-2">
//                 <Col md={12}>
//                     <FormGroup>
//                         <Label className="small fw-bold text-muted">Youtube Link</Label>
//                         <Input type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
//                     </FormGroup>
//                 </Col>
//             </Row>

//             {/* Image Uploads */}
//             <Row className="mt-4">
//                 <Col md={3} sm={6}>
//                     <ImageUploadBox label="Banner Image" icon="bi-image" />
//                 </Col>
//                 <Col md={3} sm={6}>
//                     <ImageUploadBox label="Favicon" icon="bi-shield-shaded" />
//                 </Col>
//                 <Col md={3} sm={6}>
//                     <ImageUploadBox label="Loader Image" icon="bi-arrow-clockwise" />
//                 </Col>
//                 <Col md={3} sm={6}>
//                     <ImageUploadBox label="Logo" icon="bi-award" />
//                 </Col>
//             </Row>

//             {/* Submit Button */}
//             <div className="mt-4">
//                 <Button 
//                     className="border-0 px-4 py-2 fw-medium text-white"
//                     style={{ backgroundColor: '#eebb5d' }}
//                     onClick={handleSubmit}
//                 >
//                     Submit
//                 </Button>
//             </div>

//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default Settings;






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
            {isAdmin ? "Admin Profile Settings" : "Setting"}
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