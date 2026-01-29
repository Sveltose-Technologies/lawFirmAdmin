// // 'use client';
// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import dynamic from 'next/dynamic';
// // import { Container, Row, Col, Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import authService from '@/services/authService';
// // import PaginationComponent from '../../../context/Pagination';

// // // Rich Text Editor (Next.js Safe)
// // import 'react-quill-new/dist/quill.snow.css';
// // const ReactQuill = dynamic(() => import('react-quill-new'), { 
// //   ssr: false,
// //   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
// // });

// // const CMSCategory = () => {
// //   const GOLD = "#eebb5d";
// //   const LIGHT_GOLD = "#fdf8ef";

// //   const [dataList, setDataList] = useState([]);
// //   const [modal, setModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentId, setCurrentId] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // Form State
// //   const [formData, setFormData] = useState({
// //     adminId: "3", // Hardcoded as per your logs
// //     categoryId: "",
// //     subcategoryIds: "", // Will handle as string in form, convert to array for API
// //     content: ""
// //   });

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 6;

// //   // Helper to remove HTML tags for table preview
// //   const stripHtml = (html) => {
// //     if (!html) return "";
// //     const doc = new DOMParser().parseFromString(html, 'text/html');
// //     return doc.body.textContent || "";
// //   };

// //   const fetchData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await authService.getAllCMSCategories();
// //       console.log("📢 CMS Category GET Response:", res);
// //       const finalData = res.data || res.categories || res || [];
// //       setDataList(finalData);
// //     } catch (error) {
// //       toast.error("Failed to fetch data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => { fetchData(); }, [fetchData]);

// //   const toggle = () => {
// //     setModal(!modal);
// //     if (!modal) {
// //       setFormData({ adminId: "3", categoryId: "", subcategoryIds: "", content: "" });
// //       setIsEditing(false);
// //       setCurrentId(null);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Simple Validation
// //     if (!formData.categoryId || !formData.content) {
// //       return toast.error("Category ID and Content are required!");
// //     }

// //     setLoading(true);
// //     try {
// //       // Transformation Logic: Convert string inputs to Numbers/Arrays as expected by API
// //       const payload = {
// //         adminId: Number(formData.adminId),
// //         categoryId: Number(formData.categoryId),
// //         content: formData.content,
// //         // Convert "26, 27" -> [26, 27]
// //         subcategoryIds: typeof formData.subcategoryIds === "string" 
// //           ? formData.subcategoryIds.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id))
// //           : formData.subcategoryIds
// //       };

// //       console.log("🚀 Sending Payload to API:", payload);

// //       const res = isEditing 
// //         ? await authService.updateCMSCategory(currentId, payload) 
// //         : await authService.createCMSCategory(payload);

// //       console.log("✅ API Success Response:", res);

// //       if (res) {
// //         toast.success(`CMS Category ${isEditing ? "Updated" : "Created"} Successfully!`);
// //         toggle();
// //         fetchData();
// //       }
// //     } catch (error) {
// //       console.error("❌ API Error:", error);
// //       toast.error(error.response?.data?.message || "Internal Server Error (500)");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setFormData({
// //       adminId: item.adminId || "3",
// //       categoryId: item.categoryId,
// //       // Convert [26, 27] -> "26, 27" for the Input field
// //       subcategoryIds: Array.isArray(item.subcategoryIds) ? item.subcategoryIds.join(', ') : item.subcategoryIds,
// //       content: item.content
// //     });
// //     setCurrentId(item.id);
// //     setIsEditing(true);
// //     setModal(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this CMS content?")) {
// //       try {
// //         const res = await authService.deleteCMSCategory(id);
// //         console.log("🗑️ Delete Response:", res);
// //         toast.success("Content Deleted!");
// //         fetchData();
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   const currentItems = dataList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// //   return (
// //     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
// //       <ToastContainer theme="colored" />
      
// //       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
// //         <div>
// //           <h4 className="fw-bold mb-0">CMS Category</h4>
// //           <p className="text-muted small mb-0">Manage landing page content for your practice areas.</p>
// //         </div>
// //         <Button className="px-4 shadow-sm" style={{ backgroundColor: GOLD, border: 'none', color: '#fff' }} onClick={toggle}>
// //           + Add Category Content
// //         </Button>
// //       </div>

// //       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
// //         <CardBody className="p-0">
// //           <div className="table-responsive">
// //             <Table hover className="align-middle mb-0">
// //               <thead style={{ backgroundColor: LIGHT_GOLD }}>
// //                 <tr>
// //                   <th className="px-4 py-3">SR. NO.</th>
// //                   <th>CATEGORY ID</th>
// //                   <th>SUB-CATEGORIES</th>
// //                   <th>CONTENT PREVIEW</th>
// //                   <th className="text-end px-4">ACTION</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading && dataList.length === 0 ? (
// //                    <tr><td colSpan="5" className="text-center py-5">Loading...</td></tr>
// //                 ) : currentItems.length > 0 ? (
// //                   currentItems.map((item, index) => (
// //                     <tr key={item.id || index} className="border-bottom">
// //                       <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
// //                       <td className="fw-bold" style={{ color: GOLD }}>CAT-{item.categoryId}</td>
// //                       <td>
// //                         <span className="small text-muted">
// //                           {Array.isArray(item.subcategoryIds) ? item.subcategoryIds.map(id => `SUB-${id}`).join(', ') : (item.subcategoryIds || "-")}
// //                         </span>
// //                       </td>
// //                       <td>
// //                         <div style={{ fontSize: '13px', color: '#666', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
// //                           {stripHtml(item.content)}
// //                         </div>
// //                       </td>
// //                       <td className="text-end px-4">
// //                         <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
// //                         <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id || item._id)}>🗑️</Button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr><td colSpan="5" className="text-center py-5 text-muted">No CMS Content Found.</td></tr>
// //                 )}
// //               </tbody>
// //             </Table>
// //           </div>
// //         </CardBody>
// //       </Card>
      
// //       <div className="mt-3">
// //         <PaginationComponent totalItems={dataList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
// //       </div>

// //       {/* CREATE/EDIT MODAL */}
// //       <Modal isOpen={modal} toggle={toggle} centered size="lg">
// //         <ModalHeader toggle={toggle} className="border-0 pb-0">
// //            <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit" : "Add"} CMS Content</span>
// //         </ModalHeader>
// //         <ModalBody className="px-4 pb-4">
// //           <Form onSubmit={handleSubmit}>
// //             <Row className="gy-3">
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label className="fw-bold small">Category ID (Numbers Only) *</Label>
// //                   <Input 
// //                     type="number"
// //                     placeholder="e.g. 21"
// //                     value={formData.categoryId} 
// //                     onChange={e => setFormData({ ...formData, categoryId: e.target.value })} 
// //                     required 
// //                   />
// //                 </FormGroup>
// //               </Col>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label className="fw-bold small">Subcategory IDs (Comma Separated)</Label>
// //                   <Input 
// //                     placeholder="e.g. 26, 27, 28"
// //                     value={formData.subcategoryIds} 
// //                     onChange={e => setFormData({ ...formData, subcategoryIds: e.target.value })} 
// //                   />
// //                 </FormGroup>
// //               </Col>
// //               <Col xs={12}>
// //                 <FormGroup>
// //                   <Label className="fw-bold small">Page Content (Rich Text) *</Label>
// //                   <div className="bg-white">
// //                     <ReactQuill 
// //                       theme="snow" 
// //                       value={formData.content} 
// //                       onChange={v => setFormData({ ...formData, content: v })} 
// //                       style={{ height: '200px', marginBottom: '50px' }} 
// //                       placeholder="Write the full description here..."
// //                     />
// //                   </div>
// //                 </FormGroup>
// //               </Col>
// //             </Row>
// //             <div className="mt-4 d-flex gap-2">
// //               <Button type="submit" style={{ backgroundColor: GOLD, border: 'none', width: '150px' }} disabled={loading}>
// //                 {loading ? "Saving..." : (isEditing ? "Update Content" : "Save Content")}
// //               </Button>
// //               <Button outline className="fw-bold" style={{ width: '120px' }} onClick={toggle}>Cancel</Button>
// //             </div>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default CMSCategory;

// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import { 
//   Container, Row, Col, Card, CardBody, Table, Button, Modal, 
//   ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge 
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Custom Services & Components
// import authService from '@/services/authService';
// import PaginationComponent from '../../../context/Pagination';

// // Rich Text Editor
// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), { 
//   ssr: false,
//   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
// });

// const CMSCategory = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   // Data States
//   const [cmsData, setCmsData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allSubcategories, setAllSubcategories] = useState([]);
  
//   // UI States
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Form State
//   const [formData, setFormData] = useState({
//     adminId: "3", 
//     categoryId: "",
//     subcategoryIds: [], 
//     content: ""
//   });

//   // Fetch all necessary data
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [cmsRes, catRes, subRes] = await Promise.all([
//         authService.getAllCMSCategories(),
//         authService.getAllCapabilityCategories(),
//         authService.getAllCapabilitySubCategories()
//       ]);

//       if (cmsRes.success) setCmsData(cmsRes.data || []);
//       if (catRes.success) setCategories(catRes.data.data || catRes.data || []);
//       if (subRes.success) setAllSubcategories(subRes.data || []);
      
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   // --- HELPERS FOR TABLE NAMES ---
  
//   // 1. Category ID se Name nikaalne ke liye
//   const getCategoryName = (id) => {
//     const found = categories.find(c => String(c.id) === String(id));
//     return found ? found.categoryName : `ID: ${id}`;
//   };

//   // 2. Sub-category ID se Name nikaalne ke liye (Ab table mein naam dikhega)
//   const getSubcategoryName = (id) => {
//     const found = allSubcategories.find(s => String(s.id) === String(id));
//     return found ? found.subcategoryName : `ID: ${id}`;
//   };

//   // 3. HTML hata kar plain text preview ke liye
//   const stripHtml = (html) => {
//     if (!html) return "";
//     return html.replace(/<[^>]*>?/gm, '');
//   };

//   // --- ACTIONS ---

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({ adminId: "3", categoryId: "", subcategoryIds: [], content: "" });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const handleSubCheck = (subId) => {
//     setFormData(prev => {
//       const current = [...prev.subcategoryIds];
//       if (current.includes(subId)) {
//         return { ...prev, subcategoryIds: current.filter(id => id !== subId) };
//       } else {
//         return { ...prev, subcategoryIds: [...current, subId] };
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.categoryId || !formData.content) {
//       return toast.error("Please select a category and add content!");
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         adminId: Number(formData.adminId),
//         categoryId: Number(formData.categoryId),
//         subcategoryIds: formData.subcategoryIds
//       };

//       const res = isEditing 
//         ? await authService.updateCMSCategory(currentId, payload) 
//         : await authService.createCMSCategory(payload);

//       if (res.success || res) {
//         toast.success(`Content ${isEditing ? "Updated" : "Created"} Successfully!`);
//         toggle();
//         fetchData();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       adminId: item.adminId || "3",
//       categoryId: item.categoryId,
//       subcategoryIds: Array.isArray(item.subcategoryIds) ? item.subcategoryIds : [],
//       content: item.content
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await authService.deleteCMSCategory(id);
//       toast.success("Deleted!");
//       fetchData();
//     } catch (e) { toast.error("Delete failed"); }
//   };

//   const currentItems = cmsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
//       <ToastContainer theme="colored" />
      
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//         <div>
//           <h4 className="fw-bold mb-0">CMS Category Management</h4>
//           <p className="text-muted small mb-0">Manage content and link sub-categories easily.</p>
//         </div>
//         <Button className="px-4 shadow-sm fw-bold" style={{ backgroundColor: GOLD, border: 'none', color: '#fff' }} onClick={toggle}>
//           + Create CMS Content
//         </Button>
//       </div>

//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <div className="table-responsive">
//             <Table hover className="align-middle mb-0">
//               <thead style={{ backgroundColor: LIGHT_GOLD }}>
//                 <tr>
//                   <th className="px-4 py-3">SR.</th>
//                   <th>PARENT CATEGORY</th>
//                   <th>LINKED SUB-CATEGORIES</th>
//                   <th>CONTENT PREVIEW</th>
//                   <th className="text-end px-4">ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length > 0 ? currentItems.map((item, index) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
                    
//                     {/* Category Name Dikhane ke liye */}
//                     <td className="fw-bold text-dark">{getCategoryName(item.categoryId)}</td>
                    
//                     {/* Sub-Category NAMES Dikhane ke liye */}
//                     <td>
//                       <div className="d-flex flex-wrap gap-1">
//                         {item.subcategoryIds && item.subcategoryIds.length > 0 ? (
//                           item.subcategoryIds.map(subId => (
//                             <Badge key={subId} pill color="warning" className="text-dark border-0 px-2" style={{ backgroundColor: '#fff3cd' }}>
//                               {getSubcategoryName(subId)}
//                             </Badge>
//                           ))
//                         ) : (
//                           <span className="text-muted small">No links</span>
//                         )}
//                       </div>
//                     </td>

//                     <td className="text-muted small">
//                         <div className="text-truncate" style={{ maxWidth: '250px' }}>{stripHtml(item.content)}</div>
//                     </td>
//                     <td className="text-end px-4">
//                       <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
//                       <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr><td colSpan="5" className="text-center py-5 text-muted">No data found. Click "Create CMS Content" to start.</td></tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </CardBody>
//       </Card>

//       <div className="mt-3">
//         <PaginationComponent totalItems={cmsData.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
//       </div>

//       {/* MODAL */}
//       <Modal isOpen={modal} toggle={toggle} centered size="lg" scrollable>
//         <ModalHeader toggle={toggle} className="border-0">
//            <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit" : "Create"} CMS Entry</span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col md={12}>
//                 <FormGroup>
//                   <Label className="fw-bold small text-uppercase">1. Choose Category *</Label>
//                   <Input 
//                     type="select"
//                     value={formData.categoryId} 
//                     onChange={e => setFormData({ ...formData, categoryId: e.target.value, subcategoryIds: [] })} 
//                     required 
//                     className="border-2"
//                   >
//                     <option value="">-- Select --</option>
//                     {categories.map(cat => (
//                       <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>

//               <Col md={12}>
//                 <Label className="fw-bold small text-uppercase">2. Map Sub-categories *</Label>
//                 <div className="border rounded-3 p-3 bg-light" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//                     <Row>
//                         {allSubcategories
//                         .filter(sub => String(sub.categoryId) === String(formData.categoryId))
//                         .map(sub => (
//                             <Col md={6} key={sub.id} className="mb-2">
//                                 <div className="form-check custom-checkbox">
//                                     <Input 
//                                         type="checkbox" 
//                                         id={`sub-${sub.id}`}
//                                         checked={formData.subcategoryIds.includes(sub.id)}
//                                         onChange={() => handleSubCheck(sub.id)}
//                                     />
//                                     <Label for={`sub-${sub.id}`} className="ms-2 small cursor-pointer fw-medium">
//                                         {sub.subcategoryName}
//                                     </Label>
//                                 </div>
//                             </Col>
//                         ))}
//                         {formData.categoryId === "" && <div className="text-center py-3 text-muted">Please select a category above first</div>}
//                         {formData.categoryId !== "" && allSubcategories.filter(sub => String(sub.categoryId) === String(formData.categoryId)).length === 0 && (
//                             <div className="text-center py-3 text-danger small">No sub-categories found for this category.</div>
//                         )}
//                     </Row>
//                 </div>
//               </Col>

//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="fw-bold small text-uppercase">3. Landing Page Description *</Label>
//                   <div className="bg-white border rounded">
//                     <ReactQuill 
//                       theme="snow" 
//                       value={formData.content} 
//                       onChange={v => setFormData({ ...formData, content: v })} 
//                       style={{ height: '250px', marginBottom: '50px' }} 
//                       placeholder="Write professional content for this category..."
//                     />
//                   </div>
//                 </FormGroup>
//               </Col>
//             </Row>

//             <div className="mt-4 d-flex gap-2">
//               <Button type="submit" className="fw-bold" style={{ backgroundColor: GOLD, border: 'none', width: '160px' }} disabled={loading}>
//                 {loading ? "Processing..." : (isEditing ? "Update Data" : "Save Data")}
//               </Button>
//               <Button outline onClick={toggle} className="px-4">Cancel</Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </Container>
//   );
// };

// export default CMSCategory;

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
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-center border rounded small">
      Loading Editor...
    </div>
  ),
});

const CMSCategory = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [cmsData, setCmsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    adminId: "3",
    categoryId: "",
    subcategoryIds: [],
    content: "",
  });

  // Decode HTML entities
  const decodeHtmlEntities = (text) => {
    if (!text) return "";
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Strip HTML and decode entities for preview
  const stripHtml = (html) => {
    if (!html) return "";
    const plainText = html.replace(/<[^>]*>?/gm, "");
    return decodeHtmlEntities(plainText);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [cmsRes, catRes, subRes] = await Promise.all([
        authService.getAllCMSCategories(),
        authService.getAllCapabilityCategories(),
        authService.getAllCapabilitySubCategories(),
      ]);

      if (cmsRes.success) setCmsData(cmsRes.data || []);
      if (catRes.success) setCategories(catRes.data.data || catRes.data || []);
      if (subRes.success) setAllSubcategories(subRes.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getCategoryName = (id) => {
    const found = categories.find((c) => String(c.id) === String(id));
    return found ? found.categoryName : `ID: ${id}`;
  };

  const getSubcategoryName = (id) => {
    const found = allSubcategories.find((s) => String(s.id) === String(id));
    return found ? found.subcategoryName : `ID: ${id}`;
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        adminId: "3",
        categoryId: "",
        subcategoryIds: [],
        content: "",
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubCheck = (subId) => {
    setFormData((prev) => {
      const current = [...prev.subcategoryIds];
      if (current.includes(subId)) {
        return {
          ...prev,
          subcategoryIds: current.filter((id) => id !== subId),
        };
      } else {
        return { ...prev, subcategoryIds: [...current, subId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.content) {
      return toast.error("Please select a category and add content!");
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        adminId: Number(formData.adminId),
        categoryId: Number(formData.categoryId),
        subcategoryIds: formData.subcategoryIds,
      };

      const res = isEditing
        ? await authService.updateCMSCategory(currentId, payload)
        : await authService.createCMSCategory(payload);

      if (res.success || res) {
        toast.success(
          `Content ${isEditing ? "Updated" : "Created"} Successfully!`,
        );
        toggle();
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      adminId: item.adminId || "3",
      categoryId: item.categoryId,
      subcategoryIds: Array.isArray(item.subcategoryIds)
        ? item.subcategoryIds
        : [],
      content: decodeHtmlEntities(item.content), // <-- decode HTML here
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await authService.deleteCMSCategory(id);
      toast.success("Deleted!");
      fetchData();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const currentItems = cmsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 className="fw-bold mb-0">CMS Category Management</h4>
          <p className="text-muted small mb-0">
            Manage content and link sub-categories easily.
          </p>
        </div>
        <Button
          className="px-4 shadow-sm fw-bold"
          style={{ backgroundColor: GOLD, border: "none", color: "#fff" }}
          onClick={toggle}>
          + Create CMS Content
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="px-4 py-3">SR.</th>
                  <th>PARENT CATEGORY</th>
                  <th>LINKED SUB-CATEGORIES</th>
                  <th>CONTENT PREVIEW</th>
                  <th className="text-end px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id} className="border-bottom">
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td className="fw-bold text-dark">
                        {getCategoryName(item.categoryId)}
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {item.subcategoryIds &&
                          item.subcategoryIds.length > 0 ? (
                            item.subcategoryIds.map((subId) => (
                              <Badge
                                key={subId}
                                pill
                                color="warning"
                                className="text-dark border-0 px-2"
                                style={{ backgroundColor: "#fff3cd" }}>
                                {getSubcategoryName(subId)}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted small">No links</span>
                          )}
                        </div>
                      </td>
                      <td className="text-muted small">
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "250px" }}>
                          {stripHtml(item.content)}
                        </div>
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
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No data found. Click "Create CMS Content" to start.
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
          totalItems={cmsData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="lg" scrollable>
        <ModalHeader toggle={toggle} className="border-0">
          <span className="fw-bold" style={{ color: GOLD }}>
            {isEditing ? "Edit" : "Create"} CMS Entry
          </span>
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={12}>
                <FormGroup>
                  <Label className="fw-bold small text-uppercase">
                    1. Choose Category *
                  </Label>
                  <Input
                    type="select"
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        subcategoryIds: [],
                      })
                    }
                    required
                    className="border-2">
                    <option value="">-- Select --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={12}>
                <Label className="fw-bold small text-uppercase">
                  2. Map Sub-categories *
                </Label>
                <div
                  className="border rounded-3 p-3 bg-light"
                  style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <Row>
                    {allSubcategories
                      .filter(
                        (sub) =>
                          String(sub.categoryId) ===
                          String(formData.categoryId),
                      )
                      .map((sub) => (
                        <Col md={6} key={sub.id} className="mb-2">
                          <div className="form-check custom-checkbox">
                            <Input
                              type="checkbox"
                              id={`sub-${sub.id}`}
                              checked={formData.subcategoryIds.includes(sub.id)}
                              onChange={() => handleSubCheck(sub.id)}
                            />
                            <Label
                              for={`sub-${sub.id}`}
                              className="ms-2 small cursor-pointer fw-medium">
                              {sub.subcategoryName}
                            </Label>
                          </div>
                        </Col>
                      ))}
                    {formData.categoryId === "" && (
                      <div className="text-center py-3 text-muted">
                        Please select a category above first
                      </div>
                    )}
                    {formData.categoryId !== "" &&
                      allSubcategories.filter(
                        (sub) =>
                          String(sub.categoryId) ===
                          String(formData.categoryId),
                      ).length === 0 && (
                        <div className="text-center py-3 text-danger small">
                          No sub-categories found for this category.
                        </div>
                      )}
                  </Row>
                </div>
              </Col>

              <Col xs={12}>
                <FormGroup>
                  <Label className="fw-bold small text-uppercase">
                    3. Landing Page Description *
                  </Label>
                  <div className="bg-white border rounded">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(v) => setFormData({ ...formData, content: v })}
                      style={{ height: "250px", marginBottom: "50px" }}
                      placeholder="Write professional content for this category..."
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                className="fw-bold"
                style={{
                  backgroundColor: GOLD,
                  border: "none",
                  width: "160px",
                }}
                disabled={loading}>
                {loading
                  ? "Processing..."
                  : isEditing
                    ? "Update Data"
                    : "Save Data"}
              </Button>
              <Button outline onClick={toggle} className="px-4">
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CMSCategory;
