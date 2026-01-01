


// "use client";
// import React, { useState } from "react";
// import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
// import authService from "../../../services/authService";
// import { toast } from "react-toastify";

// export default function AdminProfile() {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNo: "",
//     address: "",
//     city: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null, // file
//     websiteLogo: null,  // file
//   });

//   const currentUser = authService.getCurrentUser();
//   const adminId = currentUser?.id;

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       // file input
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password && formData.password !== formData.confirmPassword) {
//       return toast.error("Passwords do not match!");
//     }

//     setLoading(true);
//     try {
//       const res = await authService.updateProfile(adminId, formData);
//       toast.success("Profile Updated Successfully!");
//       setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goldColor = "#eebb5d";

//   return (
//     <Container className="py-4">
//       <Card className="border-0 shadow-sm rounded-4">
//         <CardBody className="p-4">
//           <h4 className="fw-bold mb-4" style={{ color: goldColor }}>Edit Profile</h4>

//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">First Name</Label>
//                   <Input name="firstName" onChange={handleChange} required />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Last Name</Label>
//                   <Input name="lastName" onChange={handleChange} required />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Email Address</Label>
//                   <Input type="email" name="email" onChange={handleChange} required />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Phone Number</Label>
//                   <Input name="phoneNo" onChange={handleChange} />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <FormGroup>
//               <Label className="fw-bold small">Address</Label>
//               <Input type="textarea" name="address" onChange={handleChange} />
//             </FormGroup>

//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">City</Label>
//                   <Input name="city" onChange={handleChange} />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Profile Image</Label>
//                   <Input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">New Password</Label>
//                   <Input type="password" name="password" onChange={handleChange} placeholder="Leave blank to keep same" />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Confirm Password</Label>
//                   <Input type="password" name="confirmPassword" onChange={handleChange} />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <FormGroup>
//               <Label className="fw-bold small">Website Logo</Label>
//               <Input type="file" name="websiteLogo" accept="image/*" onChange={handleChange} />
//             </FormGroup>

//             <div className="text-end mt-4">
//               <Button
//                 className="px-5 border-0 shadow-sm"
//                 style={{ backgroundColor: goldColor, color: "#fff" }}
//                 disabled={loading}
//               >
//                 {loading ? <Spinner size="sm" /> : "Save Changes"}
//               </Button>
//             </div>
//           </Form>
//         </CardBody>
//       </Card>
//     </Container>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Spinner
// } from "reactstrap";
// import authService from "../../../services/authService";
// import { toast } from "react-toastify";
// import api from "../../../services/api";

// export default function AdminProfile() {
//   const goldColor = "#eebb5d";

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNo: "",
//     address: "",
//     city: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//     websiteLogo: null,
//   });

//   // Load current user info
//   useEffect(() => {
//     const currentUser = authService.getCurrentUser();
//     console.log("Current User:", currentUser);

//     if (!currentUser) {
//       if (typeof window !== "undefined") window.location.href = "/login";
//       return;
//     }

//     setFormData(prev => ({
//       ...prev,
//       email: currentUser.email || "",
//       firstName: currentUser.firstName || "",
//       lastName: currentUser.lastName || "",
//       phoneNo: currentUser.phoneNo || "",
//       address: currentUser.address || "",
//       city: currentUser.city || "",
//     }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0]) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password && formData.password !== formData.confirmPassword) {
//       return toast.error("Passwords do not match!");
//     }

//     setLoading(true);
//     try {
//       const currentUser = authService.getCurrentUser();
//       const userId = currentUser?.id;
//       console.log("Updating User ID:", userId);
//       console.log("Form Data:", formData);

//       const fd = new FormData();
//       for (const key in formData) {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== "") {
//           fd.append(key, formData[key]);
//         }
//       }

//       console.log("FormData entries:");
//       for (let pair of fd.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const res = await api.put(`/user/update/${userId}`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Profile update response:", res.data);
//       toast.success(res.data.message || "Profile Updated Successfully!");

//       if (res.data.user) {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       }

//       setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
//     } catch (err) {
//       console.log("Profile update error:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//         config: err.config,
//       });
//       toast.error(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Card className="border-0 shadow-sm rounded-4">
//         <CardBody className="p-4">
//           <h4 className="fw-bold mb-4" style={{ color: goldColor }}>Edit Profile</h4>

//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">First Name</Label>
//                   <Input
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Last Name</Label>
//                   <Input
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Email</Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Phone</Label>
//                   <Input
//                     name="phoneNo"
//                     value={formData.phoneNo}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <FormGroup>
//               <Label className="fw-bold small">Address</Label>
//               <Input
//                 type="textarea"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </FormGroup>

//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">City</Label>
//                   <Input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Profile Image</Label>
//                   <Input
//                     type="file"
//                     name="profileImage"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">New Password</Label>
//                   <Input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Leave blank to keep same"
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Confirm Password</Label>
//                   <Input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <FormGroup>
//               <Label className="fw-bold small">Website Logo</Label>
//               <Input
//                 type="file"
//                 name="websiteLogo"
//                 accept="image/*"
//                 onChange={handleChange}
//               />
//             </FormGroup>

//             <div className="text-end mt-4">
//               <Button
//                 className="px-5 border-0 shadow-sm"
//                 style={{ backgroundColor: goldColor, color: "#fff" }}
//                 disabled={loading}
//               >
//                 {loading ? <Spinner size="sm" /> : "Save Changes"}
//               </Button>
//             </div>
//           </Form>
//         </CardBody>
//       </Card>
//     </Container>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap";
import { toast } from "react-toastify";
import api from "../../../services/api"; // Axios instance

export default function UserProfile({ isAdmin = false }) {
  const goldColor = "#eebb5d";

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    websiteLogo: null,
  });

  // Load logged-in user info from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setUserId(user.id); // set user ID for API
    setFormData(prev => ({
      ...prev,
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNo: user.phoneNo || "",
      address: user.address || "",
      city: user.city || "",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!userId) return toast.error("User ID is missing!");

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token; // get token from logged-in user
      if (!token) return toast.error("Authentication token missing!");

      const fd = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== "") {
          fd.append(key, formData[key]);
        }
      });

      // Always send fullName to backend
      fd.append("fullName", `${formData.firstName} ${formData.lastName}`);
console.log('data User',);
console.log('fd'.fd);
console.log('formData',formData);

      const res = await api.put(`/admin/update/3`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      });

      console.log("Update response:", res.data);
      toast.success(res.data.message || "Profile updated successfully!");

      // Update localStorage
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Clear password fields after update
      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err) {
      console.error("Profile update error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-4">
          <h4 className="fw-bold mb-4" style={{ color: goldColor }}>
            {isAdmin ? "Admin Profile" : "Edit Profile"}
          </h4>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">First Name</Label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Last Name</Label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Phone</Label>
                  <Input
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label className="fw-bold small">Address</Label>
              <Input
                type="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Profile Image</Label>
                  <Input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">New Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep same"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label className="fw-bold small">Website Logo</Label>
              <Input
                type="file"
                name="websiteLogo"
                accept="image/*"
                onChange={handleChange}
              />
            </FormGroup>

            <div className="text-end mt-4">
              <Button
                className="px-5 border-0 shadow-sm"
                style={{ backgroundColor: goldColor, color: "#fff" }}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Save Changes"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
