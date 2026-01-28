// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import dynamic from "next/dynamic";
// import {
//   Container, Row, Col, Card, CardBody, Table, Button, Modal,
//   ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge
// } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import authService from "@/services/authService";
// import PaginationComponent from "../../../context/Pagination";

// // Rich Text Editor Setup
// import "react-quill-new/dist/quill.snow.css";
// const ReactQuill = dynamic(() => import("react-quill-new"), {
//   ssr: false,
//   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>,
// });

// const Careers = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   const [careerList, setCareerList] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     jobTitle: "", jobCode: "", address: "", location: "",
//     jobType: "", textEditor: "", postDate: "", bannerImage: null
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await authService.getAllCareers();
//       // Logic according to your logs: res.data.jobs
//       const finalArray = res?.data?.jobs || res?.jobs || (Array.isArray(res?.data) ? res.data : []);
//       setCareerList(finalArray);
//       console.log("Career Data Loaded:", finalArray);
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({
//         jobTitle: "", jobCode: "", address: "", location: "",
//         jobType: "", textEditor: "", postDate: "", bannerImage: null
//       });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.location.length > 50) return toast.error("Location name too long!");

//     setLoading(true);
//     try {
//       const data = new FormData();
//       data.append("adminId", 3);
//       data.append("jobTitle", formData.jobTitle);
//       data.append("jobCode", formData.jobCode);
//       data.append("address", formData.address);
//       data.append("location", formData.location);
//       data.append("jobType", formData.jobType);
//       data.append("textEditor", formData.textEditor);
//       data.append("postDate", formData.postDate);

//       if (formData.bannerImage instanceof File) {
//         data.append("bannerImage", formData.bannerImage);
//       }

//       const res = isEditing
//         ? await authService.updateCareer(currentId, data)
//         : await authService.createCareer(data);

//       if (res.success || res) {
//         toast.success(`Job ${isEditing ? "Updated" : "Posted"}!`);
//         toggle();
//         fetchData();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Submit failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       jobTitle: item.jobTitle || "",
//       jobCode: item.jobCode || "",
//       address: item.address || "",
//       location: item.location || "",
//       jobType: item.jobType || "",
//       textEditor: item.textEditor || "",
//       postDate: item.postDate ? item.postDate.split('T')[0] : "",
//       bannerImage: null
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   return (
//     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
//       <ToastContainer theme="colored" />

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="fw-bold mb-0">Career Management</h4>
//         <Button className="px-4 text-white fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none' }} onClick={toggle}>+ Add Job Post</Button>
//       </div>

//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <Table hover className="align-middle mb-0">
//             <thead style={{ backgroundColor: LIGHT_GOLD }}>
//               <tr>
//                 <th className="px-4 py-3">SR. NO.</th>
//                 <th>BANNER</th>
//                 <th>JOB TITLE & CODE</th>
//                 <th>LOCATION</th>
//                 <th>JOB TYPE</th>
//                 <th className="text-end px-4">ACTION</th>
//               </tr>
//             </thead>
//             <tbody>
//               {careerList.length > 0 ? careerList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
//                 <tr key={item.id} className="border-bottom">
//                   <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
//                   <td>
//                     <img
//                       src={authService.getImgUrl(item.bannerImage)}
//                       style={{ width: "70px", height: "45px", borderRadius: "4px", objectFit: "cover", border: "1px solid #eee" }}
//                       onError={(e) => {
//                         // Isse aapko console mein dikhega ki kaun sa URL fail ho raha hai
//                         console.error("Failed to load image at:", e.target.src);
//                         e.target.src = "https://placehold.co/70x45?text=Error";
//                       }}
//                       alt="Job"
//                     />
//                   </td>
//                   <td>
//                     <div className="fw-bold text-dark">{item.jobTitle}</div>
//                     <div className="text-muted small">{item.jobCode}</div>
//                   </td>
//                   <td className="small text-muted">{item.location}</td>
//                   <td><Badge className="text-dark border px-2" style={{ backgroundColor: LIGHT_GOLD, border: `1px solid ${GOLD}` }}>{item.jobType}</Badge></td>
//                   <td className="text-end px-4">
//                     <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
//                     <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => {if(window.confirm("Delete?")) authService.deleteCareer(item.id).then(() => fetchData())}}>🗑️</Button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan="6" className="text-center py-5 text-muted">No careers found.</td></tr>
//               )}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       <div className="mt-3 text-center">
//         <PaginationComponent totalItems={careerList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
//       </div>

//       <Modal isOpen={modal} toggle={toggle} centered size="lg" scrollable>
//         <ModalHeader toggle={toggle} className="border-0 pb-0 fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit Job" : "Add Job"}</ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col md={8}><FormGroup><Label className="fw-bold small">Job Title *</Label><Input value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} required /></FormGroup></Col>
//               <Col md={4}><FormGroup><Label className="fw-bold small">Job Code *</Label><Input value={formData.jobCode} onChange={e => setFormData({ ...formData, jobCode: e.target.value })} required /></FormGroup></Col>
//               <Col md={6}><FormGroup><Label className="fw-bold small">Office Address *</Label><Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required /></FormGroup></Col>
//               <Col md={6}><FormGroup><Label className="fw-bold small">Location (City) *</Label><Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required /></FormGroup></Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Job Type *</Label>
//                   <Input type="select" value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})} required>
//                     <option value="">-- Choose Type --</option>
//                     <option value="FullTime">Full Time</option>
//                     <option value="PartTime">Part Time</option>
//                     <option value="Remote">Remote</option>
//                     <option value="Hybrid">Hybrid</option>
//                     <option value="Internship">Internship</option>
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={6}><FormGroup><Label className="fw-bold small">Posting Date *</Label><Input type="date" value={formData.postDate} onChange={e => setFormData({ ...formData, postDate: e.target.value })} required /></FormGroup></Col>
//               <Col md={12}><FormGroup><Label className="fw-bold small">Banner Image</Label><Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" required={!isEditing} /></FormGroup></Col>
//               <Col xs={12}>
//                 <Label className="fw-bold small">Description *</Label>
//                 <div className="bg-white border rounded">
//                   <ReactQuill theme="snow" value={formData.textEditor} onChange={v => setFormData({ ...formData, textEditor: v })} style={{ height: "200px", marginBottom: "50px" }} />
//                 </div>
//               </Col>
//             </Row>
//             <div className="mt-4 d-flex gap-2">
//               <Button type="submit" className="px-5 text-white fw-bold" style={{ backgroundColor: GOLD, border: 'none' }} disabled={loading}>{loading ? "Saving..." : "Save Job"}</Button>
//               <Button outline className="px-5 fw-bold" onClick={toggle}>Cancel</Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </Container>
//   );
// };

// export default Careers;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from "@/services/authService";
import PaginationComponent from "../../../context/Pagination";

// Rich Text Editor Setup
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-center border rounded small">
      Loading Editor...
    </div>
  ),
});

const Careers = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [careerList, setCareerList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCode: "",
    address: "",
    location: "",
    jobType: "",
    textEditor: "",
    postDate: "",
    bannerImage: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authService.getAllCareers();
      // Logic according to your logs: res.data.jobs ya res.data
      const finalArray = res?.data?.jobs || res?.data || [];
      setCareerList(Array.isArray(finalArray) ? finalArray : []);
      console.log("Career Data Loaded:", finalArray);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        jobTitle: "",
        jobCode: "",
        address: "",
        location: "",
        jobType: "",
        textEditor: "",
        postDate: "",
        bannerImage: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Trim all text fields
      const jobTitleTrimmed = formData.jobTitle.trim();
      const jobCodeTrimmed = formData.jobCode.trim();
      const addressTrimmed = formData.address.trim();
      const locationTrimmed = formData.location.trim().slice(0, 50); // DB limit
      const jobTypeTrimmed = formData.jobType.trim();
      const textEditorTrimmed = formData.textEditor.trim();
      const postDateTrimmed = formData.postDate;

      // Validation
      if (
        !jobTitleTrimmed ||
        !jobCodeTrimmed ||
        !addressTrimmed ||
        !locationTrimmed ||
        !jobTypeTrimmed ||
        !textEditorTrimmed ||
        !postDateTrimmed ||
        (!formData.bannerImage && !isEditing)
      ) {
        toast.error("Please fill all required fields!");
        setLoading(false);
        return;
      }

      const data = new FormData();
      const user = authService.getCurrentUser();
      const currentAdminId = user?.id || 1;

      data.append("adminId", currentAdminId);
      data.append("jobTitle", jobTitleTrimmed);
      data.append("jobCode", jobCodeTrimmed);
      data.append("address", addressTrimmed);
      data.append("location", locationTrimmed);
      data.append("jobType", jobTypeTrimmed);
      data.append("textEditor", textEditorTrimmed);
      data.append("postDate", postDateTrimmed);

      if (formData.bannerImage instanceof File) {
        data.append("bannerImage", formData.bannerImage);
      }

      console.log("📢 Submitting FormData for Admin ID:", currentAdminId);

      const res = isEditing
        ? await authService.updateCareer(currentId, data)
        : await authService.createCareer(data);

      if (res.success || res) {
        toast.success(`Job ${isEditing ? "Updated" : "Posted"}!`);
        toggle();
        fetchData();
      }
    } catch (err) {
      console.error("❌ Submit Error:", err.response?.data);
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Submit failed",
      );
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (item) => {
    setFormData({
      jobTitle: item.jobTitle || "",
      jobCode: item.jobCode || "",
      address: item.address || "",
      location: item.location || "",
      jobType: item.jobType || "",
      textEditor: item.textEditor || "",
      postDate: item.postDate ? item.postDate.split("T")[0] : "",
      bannerImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Career Management</h4>
        <Button
          className="px-4 text-white fw-bold shadow-sm"
          style={{ backgroundColor: GOLD, border: "none" }}
          onClick={toggle}>
          + Add Job Post
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <Table hover className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4 py-3">SR. NO.</th>
                <th>BANNER</th>
                <th>JOB TITLE & CODE</th>
                <th>LOCATION</th>
                <th>JOB TYPE</th>
                <th className="text-end px-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {careerList.length > 0 ? (
                careerList
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage,
                  )
                  .map((item, index) => (
                    <tr key={item.id} className="border-bottom">
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td>
                        <img
                          src={authService.getImgUrl(item.bannerImage)}
                          style={{
                            width: "70px",
                            height: "45px",
                            borderRadius: "4px",
                            objectFit: "cover",
                            border: "1px solid #eee",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/70x45?text=No+Image";
                          }}
                          alt="Job"
                        />
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{item.jobTitle}</div>
                        <div className="text-muted small">{item.jobCode}</div>
                      </td>
                      <td className="small text-muted">{item.location}</td>
                      <td>
                        <Badge
                          className="text-dark border px-2"
                          style={{
                            backgroundColor: LIGHT_GOLD,
                            border: `1px solid ${GOLD}`,
                          }}>
                          {item.jobType}
                        </Badge>
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="white"
                          className="border shadow-sm me-2"
                          onClick={() => handleEdit(item)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="white"
                          className="text-danger border shadow-sm"
                          onClick={async () => {
                            if (window.confirm("Delete?")) {
                              await authService.deleteCareer(item.id);
                              fetchData();
                            }
                          }}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No careers found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <div className="mt-3 text-center">
        <PaginationComponent
          totalItems={careerList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="lg" scrollable>
        <ModalHeader
          toggle={toggle}
          className="border-0 pb-0 fw-bold"
          style={{ color: GOLD }}>
          {isEditing ? "Edit Job" : "Add Job"}
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={8}>
                <FormGroup>
                  <Label className="fw-bold small">Job Title *</Label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="fw-bold small">Job Code *</Label>
                  <Input
                    value={formData.jobCode}
                    onChange={(e) =>
                      setFormData({ ...formData, jobCode: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Office Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Location (City) *</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Job Type *</Label>
                  <Input
                    type="select"
                    value={formData.jobType}
                    onChange={(e) =>
                      setFormData({ ...formData, jobType: e.target.value })
                    }
                    required>
                    <option value="">-- Choose Type --</option>
                    <option value="FullTime">Full Time</option>
                    <option value="PartTime">Part Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Internship">Internship</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Posting Date *</Label>
                  <Input
                    type="date"
                    value={formData.postDate}
                    onChange={(e) =>
                      setFormData({ ...formData, postDate: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label className="fw-bold small">Banner Image</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bannerImage: e.target.files[0],
                      })
                    }
                    accept="image/*"
                    required={!isEditing}
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <Label className="fw-bold small">Description *</Label>
                <div className="bg-white border rounded">
                  <ReactQuill
                    theme="snow"
                    value={formData.textEditor}
                    onChange={(v) =>
                      setFormData({ ...formData, textEditor: v })
                    }
                    style={{ height: "200px", marginBottom: "50px" }}
                  />
                </div>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                className="px-5 text-white fw-bold"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}>
                {loading ? "Saving..." : "Save Job"}
              </Button>
              <Button outline className="px-5 fw-bold" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Careers;
