// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import {
//   Container, Row, Col, Card, CardBody, Table, Button, Modal,
//   ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import authService from '@/services/authService';
// import PaginationComponent from '../../../context/Pagination';

// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
// });

// const CapabilitySubCategory = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   const [subcategories, setSubcategories] = useState([]);
//   const [parentCategories, setParentCategories] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     categoryId: "",
//     subcategoryName: "",
//     description: "",
//     bannerImage: null
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['clean']
//     ],
//   }), []);

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({ categoryId: "", subcategoryName: "", description: "", bannerImage: null });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       console.log("--- Fetching Initial Data ---");
//       const subRes = await authService.getAllCapabilitySubCategories();
//       const catRes = await authService.getAllCapabilityCategories();

//       console.log("Subcategories Response:", subRes);
//       console.log("Categories Response:", catRes);

//       if (subRes.success) {
//         setSubcategories(Array.isArray(subRes.data) ? subRes.data : []);
//       }
//       if (catRes.success) {
//         const catData = catRes.data.data || catRes.data;
//         setParentCategories(Array.isArray(catData) ? catData : []);
//       }
//     } catch (error) {
//       console.error("Fetch Data Error:", error);
//       toast.error("Error loading data");
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const getCategoryName = (id) => {
//     const found = parentCategories.find(cat => String(cat.id) === String(id));
//     return found ? found.categoryName : `ID: ${id}`;
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.categoryId || !formData.subcategoryName || !formData.description) {
//     return toast.error("Please fill all required fields!");
//   }

//   setLoading(true);
//   try {
//     const dataToSend = new FormData();
//     dataToSend.append('categoryId', formData.categoryId);
//     dataToSend.append('subcategoryName', formData.subcategoryName);
//     dataToSend.append('description', formData.description);

//     // --- FIX STARTS HERE ---
//     // 1. Parent Categories mein se selected category dhundo taaki uska adminId mil sake
//     const selectedCategory = parentCategories.find(cat => String(cat.id) === String(formData.categoryId));

//     if (selectedCategory && selectedCategory.adminId) {
//       dataToSend.append('adminId', selectedCategory.adminId);
//       console.log("Found adminId:", selectedCategory.adminId);
//     } else {
//       // Agar category se nahi mila, toh aapke logs ke hisaab se adminId: 3 bhej sakte hain (testing ke liye)
//       // dataToSend.append('adminId', 3);
//       console.error("AdminId not found in selected category!");
//     }
//     // --- FIX ENDS HERE ---

//     if (formData.bannerImage) {
//       dataToSend.append('bannerImage', formData.bannerImage);
//     }

//     // FormData log karne ka sahi tareeka
//     console.log("Sending Final Data:");
//     dataToSend.forEach((value, key) => console.log(`${key}: ${value}`));

//     const res = isEditing
//       ? await authService.updateCapabilitySubCategory(currentId, dataToSend)
//       : await authService.createCapabilitySubCategory(dataToSend);

//     if (res.success) {
//       toast.success(`Subcategory ${isEditing ? 'Updated' : 'Created'} Successfully!`);
//       toggle();
//       fetchData();
//     } else {
//       toast.error(res.message || "Something went wrong");
//     }
//   } catch (err) {
//     console.error("Full Error Object:", err.response?.data || err);
//     toast.error(err.response?.data?.message || "Operation failed");
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
//     console.log("Deleting ID:", id);
//     try {
//         const res = await authService.deleteCapabilitySubCategory(id);
//         console.log("Delete Response:", res);
//         if (res.success) {
//           toast.success("Deleted!");
//           fetchData();
//         }
//     } catch (error) {
//         console.error("Delete Error:", error);
//     }
//   };

//   const handleEdit = (item) => {
//     console.log("Editing Item:", item);
//     setFormData({
//       categoryId: item.categoryId,
//       subcategoryName: item.subcategoryName,
//       description: item.description,
//       bannerImage: null // Image reset for edit unless changed
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = subcategories.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
//       <ToastContainer theme="colored" />

//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <h4 className="fw-bold mb-0" style={{ color: "#333" }}>Capability Subcategories</h4>
//           <p className="text-muted small mb-0">Manage services and sub-practice areas.</p>
//         </div>
//         <Button className="btn-gold px-4" onClick={toggle}>
//           + Add Subcategory
//         </Button>
//       </div>

//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <div className="table-responsive">
//             <Table hover className="align-middle mb-0">
//               <thead style={{ backgroundColor: LIGHT_GOLD }}>
//                 <tr>
//                   <th className="py-3 px-4">Sr. No.</th>
//                   <th>Image</th>
//                   <th>Subcategory Name</th>
//                   <th>Parent Category</th>
//                   <th>Description Preview</th>
//                   <th className="text-end px-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length > 0 ? currentItems.map((item, index) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="px-4 text-muted">
//                         {(currentPage - 1) * itemsPerPage + index + 1}.
//                     </td>
//                     <td>
//                       <img
//                         src={authService.getImgUrl(item.bannerImage)}
//                         alt="subcategory"
//                         style={{ width: "70px", height: "45px", borderRadius: "6px", objectFit: "cover" }}
//                         className="border shadow-sm"
//                         onError={(e) => { e.target.src = "https://placehold.co/70x45?text=No+Image"; }}
//                       />
//                     </td>
//                     <td className="fw-bold text-dark">{item.subcategoryName}</td>
//                     <td>
//                       <Badge pill style={{ backgroundColor: LIGHT_GOLD, color: GOLD, border: `1px solid ${GOLD}` }}>
//                         {getCategoryName(item.categoryId)}
//                       </Badge>
//                     </td>
//                     <td>
//                         <div
//                           className="text-muted small text-truncate"
//                           style={{ maxWidth: '200px' }}
//                           dangerouslySetInnerHTML={{ __html: item.description }}
//                         />
//                     </td>
//                     <td className="text-end px-4">
//                       <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
//                       <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr><td colSpan="6" className="text-center py-5 text-muted">No records found.</td></tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </CardBody>
//       </Card>

//       <div className="mt-3">
//         <PaginationComponent
//           totalItems={subcategories.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
//         <ModalHeader toggle={toggle} className="border-0 pb-0">
//             <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit Subcategory" : "Add New Subcategory"}</span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Select Parent Category *</Label>
//                   <Input
//                     type="select"
//                     value={formData.categoryId}
//                     onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
//                     required
//                   >
//                     <option value="">-- Select Category --</option>
//                     {parentCategories.map(cat => (
//                       <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Subcategory Name *</Label>
//                   <Input
//                     placeholder="e.g. Corporate Litigation"
//                     value={formData.subcategoryName}
//                     onChange={e => setFormData({ ...formData, subcategoryName: e.target.value })}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Banner Image (Rectangular)</Label>
//                   <Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" />
//                 </FormGroup>
//               </Col>
//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Detailed Description *</Label>
//                   <div className="bg-white border rounded">
//                     <ReactQuill
//                       theme="snow"
//                       modules={modules}
//                       value={formData.description}
//                       onChange={val => setFormData({ ...formData, description: val })}
//                       style={{ height: '200px', marginBottom: '50px' }}
//                       placeholder="Write details about this subcategory..."
//                     />
//                   </div>
//                 </FormGroup>
//               </Col>
//             </Row>

//             <div className="mt-4 d-flex justify-content-start gap-2">
//               <Button type="submit" className="btn-gold" style={{ width: '130px' }} disabled={loading}>
//                 {loading ? "Saving..." : (isEditing ? "Update" : "Save")}
//               </Button>
//               <Button outline className="fw-bold" style={{ width: '130px', color: '#666', borderColor: '#ccc' }} onClick={toggle}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </Container>
//   );
// };

// export default CapabilitySubCategory;

"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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

import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-center border rounded small">
      Loading Editor...
    </div>
  ),
});

const CapabilitySubCategory = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [subcategories, setSubcategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryName: "",
    description: "",
    bannerImage: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    [],
  );

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        categoryId: "",
        subcategoryName: "",
        description: "",
        bannerImage: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const subRes = await authService.getAllCapabilitySubCategories();
      const catRes = await authService.getAllCapabilityCategories();

      if (subRes.success) {
        setSubcategories(Array.isArray(subRes.data) ? subRes.data : []);
      }
      if (catRes.success) {
        const catData = catRes.data.data || catRes.data;
        setParentCategories(Array.isArray(catData) ? catData : []);
      }
    } catch (error) {
      console.error("Fetch Data Error:", error);
      toast.error("Error loading data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getCategoryName = (id) => {
    const found = parentCategories.find((cat) => String(cat.id) === String(id));
    return found ? found.categoryName : `ID: ${id}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.categoryId ||
      !formData.subcategoryName ||
      !formData.description
    ) {
      return toast.error("Please fill all required fields!");
    }

    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("categoryId", formData.categoryId);
      dataToSend.append("subcategoryName", formData.subcategoryName);
      dataToSend.append("description", formData.description);

      // AdminId Logic
      const selectedCategory = parentCategories.find(
        (cat) => String(cat.id) === String(formData.categoryId),
      );
      if (selectedCategory && selectedCategory.adminId) {
        dataToSend.append("adminId", selectedCategory.adminId);
      }

      // Check if image is a File object before appending
      if (formData.bannerImage instanceof File) {
        dataToSend.append("bannerImage", formData.bannerImage);
      }

      const res = isEditing
        ? await authService.updateCapabilitySubCategory(currentId, dataToSend)
        : await authService.createCapabilitySubCategory(dataToSend);

      if (res.success) {
        toast.success(
          `Subcategory ${isEditing ? "Updated" : "Created"} Successfully!`,
        );
        toggle();
        fetchData();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      const res = await authService.deleteCapabilitySubCategory(id);
      if (res.success) {
        toast.success("Deleted!");
        fetchData();
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      categoryId: item.categoryId,
      subcategoryName: item.subcategoryName,
      description: item.description,
      bannerImage: null, // Keep null so we don't overwrite with string/old path
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subcategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: "#333" }}>
            Capability Subcategories
          </h4>
          <p className="text-muted small mb-0">
            Manage services and sub-practice areas.
          </p>
        </div>
        <Button className="btn-gold px-4" onClick={toggle}>
          + Add Subcategory
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="py-3 px-4">Sr. No.</th>
                  <th>Image</th>
                  <th>Subcategory Name</th>
                  <th>Parent Category</th>
                  <th>Description Preview</th>
                  <th className="text-end px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id} className="border-bottom">
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td>
                        {/* FIXED IMAGE SRC LOGIC */}
                        <img
                          src={
                            item.bannerImage
                              ? authService.getImgUrl(item.bannerImage)
                              : "https://placehold.co/70x45?text=No+Image"
                          }
                          alt="subcategory"
                          style={{
                            width: "70px",
                            height: "45px",
                            borderRadius: "6px",
                            objectFit: "cover",
                          }}
                          className="border shadow-sm"
                          onError={(e) => {
                            if (
                              e.target.src !==
                              "https://placehold.co/70x45?text=No+Image"
                            ) {
                              e.target.src =
                                "https://placehold.co/70x45?text=No+Image";
                            }
                          }}
                        />
                      </td>
                      <td className="fw-bold text-dark">
                        {item.subcategoryName}
                      </td>
                      <td>
                        <Badge
                          pill
                          style={{
                            backgroundColor: LIGHT_GOLD,
                            color: GOLD,
                            border: `1px solid ${GOLD}`,
                          }}>
                          {getCategoryName(item.categoryId)}
                        </Badge>
                      </td>
                      <td>
                        <div
                          className="text-muted small text-truncate"
                          style={{ maxWidth: "200px" }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
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
                          onClick={() => handleDelete(item.id)}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent
          totalItems={subcategories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader toggle={toggle} className="border-0 pb-0">
          <span className="fw-bold" style={{ color: GOLD }}>
            {isEditing ? "Edit Subcategory" : "Add New Subcategory"}
          </span>
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label className="small fw-bold">
                    Select Parent Category *
                  </Label>
                  <Input
                    type="select"
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    required>
                    <option value="">-- Select Category --</option>
                    {parentCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Subcategory Name *</Label>
                  <Input
                    placeholder="e.g. Corporate Litigation"
                    value={formData.subcategoryName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subcategoryName: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">
                    Banner Image (Rectangular)
                  </Label>
                  {/* Ensure file is captured correctly */}
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bannerImage: e.target.files[0],
                      })
                    }
                    accept="image/*"
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">
                    Detailed Description *
                  </Label>
                  <div className="bg-white border rounded">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={formData.description}
                      onChange={(val) =>
                        setFormData({ ...formData, description: val })
                      }
                      style={{ height: "200px", marginBottom: "50px" }}
                      placeholder="Write details about this subcategory..."
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <div className="mt-4 d-flex justify-content-start gap-2">
              <Button
                type="submit"
                className="btn-gold"
                style={{ width: "130px" }}
                disabled={loading}>
                {loading ? "Saving..." : isEditing ? "Update" : "Save"}
              </Button>
              <Button
                outline
                className="fw-bold"
                style={{ width: "130px", color: "#666", borderColor: "#ccc" }}
                onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CapabilitySubCategory;