// // // 'use client';
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import axios from 'axios';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import PaginationComponent from '../../../context/Pagination'; // Path check kar lein

// // // const CapabilityCategory = () => {
// // //   const GOLD = "#eebb5d";
// // //   const BASE_URL ="http://72.62.87.252:3000";

// // //   // States
// // //   const [categories, setCategories] = useState([]);
// // //   const [modal, setModal] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [currentId, setCurrentId] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   // Form State
// // //   const [formData, setFormData] = useState({
// // //     adminId: 3, 
// // //     categoryName: "",
// // //     description: "",
// // //     bannerImage: null
// // //   });

// // //   // Pagination States
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 5;

// // //   // Toggle Modal
// // //   const toggle = () => {
// // //     setModal(!modal);
// // //     setFormData({ adminId: 3, categoryName: "", description: "", bannerImage: null });
// // //     setIsEditing(false);
// // //   };

// // //   // 1. GET ALL DATA (Direct API Call)
// // //   const fetchData = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.get(`${BASE_URL}/capability-categories/get-all`);
// // //       if (response.data.success) {
// // //         // Aapke console ke hisab se response.data.data array hai
// // //         setCategories(response.data.data || []);
// // //       }
// // //     } catch (error) {
// // //       console.error("Fetch error:", error);
// // //       toast.error("Failed to load categories");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [fetchData]);

// // //   // 2. CREATE & UPDATE (Direct API Call)
// // //   const handleSubmit = async () => {
// // //     if (!formData.categoryName || !formData.description) {
// // //       return toast.error("Please fill required fields!");
// // //     }

// // //     const data = new FormData();
// // //     data.append('adminId', formData.adminId);
// // //     data.append('categoryName', formData.categoryName);
// // //     data.append('description', formData.description);
// // //     if (formData.bannerImage) {
// // //       data.append('bannerImage', formData.bannerImage);
// // //     }

// // //     try {
// // //       let res;
// // //       if (isEditing) {
// // //         // Update API
// // //         res = await axios.put(`${BASE_URL}/capability-categories/update/${currentId}`, data);
// // //       } else {
// // //         // Create API (Note: underscore used as per your input)
// // //         res = await axios.post(`${BASE_URL}/capability-categories/create`, data);
// // //       }

// // //       if (res.data.success) {
// // //         toast.success(isEditing ? "Updated Successfully!" : "Created Successfully!");
// // //         toggle();
// // //         fetchData();
// // //       }
// // //     } catch (err) {
// // //       toast.error("Operation failed. Try again.");
// // //     }
// // //   };

// // //   // 3. DELETE (Direct API Call)
// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Are you sure you want to delete this category?")) return;
// // //     try {
// // //       const res = await axios.delete(`${BASE_URL}/capability-categories/delete/${id}`);
// // //       if (res.data.success) {
// // //         toast.success("Category deleted!");
// // //         fetchData();
// // //       }
// // //     } catch (error) {
// // //       toast.error("Delete failed");
// // //     }
// // //   };

// // //   // Handle Edit Click
// // //   const handleEdit = (item) => {
// // //     setFormData({
// // //       adminId: item.adminId,
// // //       categoryName: item.categoryName,
// // //       description: item.description,
// // //       bannerImage: null
// // //     });
// // //     setCurrentId(item.id);
// // //     setIsEditing(true);
// // //     setModal(true);
// // //   };

// // //   // Pagination Logic
// // //   const indexOfLastItem = currentPage * itemsPerPage;
// // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //   const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

// // //   return (
// // //     <div className="p-3 bg-light min-vh-100">
// // //       <ToastContainer position="top-right" autoClose={3000} />
      
// // //       {/* Top Header Card */}
// // //       <Card className="mb-4 border-0 shadow-sm">
// // //         <CardBody className="p-3">
// // //           <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Capability Categories</h5>
// // //         </CardBody>
// // //       </Card>

// // //       {/* Main Table Card */}
// // //       <Card className="border-0 shadow-sm">
// // //         <CardBody className="p-4">
// // //           <div className="text-end mb-3">
// // //             <Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none', fontWeight: '500' }}>
// // //               + Add Category
// // //             </Button>
// // //           </div>

// // //           <Table responsive hover className="align-middle">
// // //             <thead className="table-light">
// // //               <tr>
// // //                 <th style={{ width: '100px' }}>Image</th>
// // //                 <th>Category Name</th>
// // //                 <th>Description</th>
// // //                 <th className="text-end">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr><td colSpan="4" className="text-center">Loading...</td></tr>
// // //               ) : currentItems.length > 0 ? (
// // //                 currentItems.map((item) => (
// // //                   <tr key={item.id}>
// // //                     <td>
// // //                       <img
// // //                         src={item.bannerImage ? `${BASE_URL}/${item.bannerImage}` : "https://via.placeholder.com/60"}
// // //                         alt="banner"
// // //                         style={{ width: "60px", height: "45px", borderRadius: "6px", objectFit: "cover", border: "1px solid #eee" }}
// // //                         onError={(e) => { e.target.src = "https://via.placeholder.com/60"; }}
// // //                       />
// // //                     </td>
// // //                     <td><span className="fw-bold text-dark">{item.categoryName}</span></td>
// // //                     <td>
// // //                         <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
// // //                             {item.description}
// // //                         </div>
// // //                     </td>
// // //                     <td className="text-end">
// // //                       <Button color="link" onClick={() => handleEdit(item)} style={{ color: GOLD, fontSize: '1.2rem' }}>
// // //                         <i className="bi bi-pencil-square"></i>
// // //                       </Button>
// // //                       <Button color="link" className="text-danger" onClick={() => handleDelete(item.id)} style={{ fontSize: '1.2rem' }}>
// // //                         <i className="bi bi-trash"></i>
// // //                       </Button>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr><td colSpan="4" className="text-center py-5 text-muted">No Categories Found</td></tr>
// // //               )}
// // //             </tbody>
// // //           </Table>

// // //           {/* Pagination */}
// // //           <div className="mt-4">
// // //             <PaginationComponent 
// // //                 totalItems={categories.length}
// // //                 itemsPerPage={itemsPerPage}
// // //                 currentPage={currentPage}
// // //                 onPageChange={(page) => setCurrentPage(page)}
// // //             />
// // //           </div>
// // //         </CardBody>
// // //       </Card>

// // //       {/* Add/Edit Modal */}
// // //       <Modal isOpen={modal} toggle={toggle} centered size="md">
// // //         <ModalHeader toggle={toggle} className="border-0 pb-0">
// // //             <span className="fw-bold">{isEditing ? "Edit Category" : "Add New Category"}</span>
// // //         </ModalHeader>
// // //         <ModalBody className="p-4">
// // //           <Form>
// // //             <FormGroup>
// // //               <Label className="small fw-bold">Category Name</Label>
// // //               <Input 
// // //                 type="text"
// // //                 placeholder="Enter category name"
// // //                 value={formData.categoryName} 
// // //                 onChange={e => setFormData({ ...formData, categoryName: e.target.value })} 
// // //               />
// // //             </FormGroup>

// // //             <FormGroup>
// // //               <Label className="small fw-bold">Banner Image</Label>
// // //               <Input 
// // //                 type="file" 
// // //                 onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} 
// // //                 accept="image/*" 
// // //               />
// // //               <small className="text-muted">Upload high-quality banner image</small>
// // //             </FormGroup>

// // //             <FormGroup>
// // //               <Label className="small fw-bold">Description</Label>
// // //               <Input 
// // //                 type="textarea" 
// // //                 rows="4"
// // //                 placeholder="Write description here..."
// // //                 value={formData.description} 
// // //                 onChange={e => setFormData({ ...formData, description: e.target.value })} 
// // //               />
// // //             </FormGroup>

// // //             <Button block className="mt-4 py-2" style={{ backgroundColor: GOLD, border: 'none', fontWeight: 'bold' }} onClick={handleSubmit}>
// // //               {isEditing ? "Update Category" : "Save Category"}
// // //             </Button>
// // //           </Form>
// // //         </ModalBody>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default CapabilityCategory;


// // 'use client';
// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import dynamic from 'next/dynamic';
// // import { 
// //   Container, Row, Col, Card, CardBody, Table, Button, Modal, 
// //   ModalHeader, ModalBody, Form, FormGroup, Label, Input 
// // } from 'reactstrap';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // // Custom Services
// // import authService from '@/services/authService';
// // import PaginationComponent from '../../../context/Pagination';

// // // Rich Text Editor Setup (Next.js Safe)
// // import 'react-quill-new/dist/quill.snow.css';
// // const ReactQuill = dynamic(() => import('react-quill-new'), { 
// //   ssr: false,
// //   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
// // });

// // const CapabilityCategory = () => {
// //   const GOLD = "#eebb5d";
// //   const LIGHT_GOLD = "#fdf8ef";

// //   const [categories, setCategories] = useState([]);
// //   const [modal, setModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentId, setCurrentId] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const [formData, setFormData] = useState({
// //     categoryName: "",
// //     description: "",
// //     bannerImage: null
// //   });

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 6;

// //   // Editor Toolbar Modules
// //   const modules = useMemo(() => ({
// //     toolbar: [
// //       [{ 'header': [1, 2, 3, false] }],
// //       ['bold', 'italic', 'underline', 'strike'],
// //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
// //       ['clean']
// //     ],
// //   }), []);

// //   const fetchData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await authService.getAllCapabilityCategories();
// //       if (res.success || Array.isArray(res.data)) {
// //         setCategories(res.data?.data || res.data || []);
// //       }
// //     } catch (error) { toast.error("Fetch failed"); }
// //     finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => { fetchData(); }, [fetchData]);

// //   const toggle = () => {
// //     setModal(!modal);
// //     if (!modal) {
// //       setFormData({ categoryName: "", description: "", bannerImage: null });
// //       setIsEditing(false);
// //       setCurrentId(null);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.categoryName || !formData.description) return toast.error("Fill all required fields!");

// //     setLoading(true);
// //     const fd = new FormData();
// //     fd.append('categoryName', formData.categoryName);
// //     fd.append('description', formData.description);
// //     if (formData.bannerImage) fd.append('bannerImage', formData.bannerImage);

// //     const res = isEditing 
// //       ? await authService.updateCapabilityCategory(currentId, formData) 
// //       : await authService.createCapabilityCategory(formData);

// //     if (res.success) {
// //       toast.success("Saved!");
// //       toggle();
// //       fetchData();
// //     }
// //     setLoading(false);
// //   };

// //   const handleEdit = (item) => {
// //     setFormData({ categoryName: item.categoryName, description: item.description, bannerImage: null });
// //     setCurrentId(item.id);
// //     setIsEditing(true);
// //     setModal(true);
// //   };

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <Container fluid className="p-3 p-md-4 min-vh-100">
// //       <ToastContainer theme="colored" />
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h4 className="fw-bold mb-0">Capability Categories</h4>
// //         <Button className="btn-gold px-4 shadow-sm" onClick={toggle}>+ Add Category</Button>
// //       </div>

// //       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
// //         <CardBody className="p-0">
// //           <div className="table-responsive">
// //             <Table hover className="align-middle mb-0">
// //               <thead style={{ backgroundColor: LIGHT_GOLD }}>
// //                 <tr>
// //                   <th className="px-4">Sr. No.</th>
// //                   <th>Image</th>
// //                   <th>Name</th>
// //                   <th>Description</th>
// //                   <th className="text-end px-4">Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {currentItems.map((item, index) => (
// //                   <tr key={item.id}>
// //                     <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
// //                     <td><img src={authService.getImgUrl(item.bannerImage)} style={{ width: "70px", height: "45px", borderRadius: "6px", objectFit: "cover" }} className="border" /></td>
// //                     <td className="fw-bold">{item.categoryName}</td>
// //                     <td>
// //                       <div className="text-truncate" style={{ maxWidth: '200px', fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: item.description }} />
// //                     </td>
// //                     <td className="text-end px-4">
// //                       <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
// //                       <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => {/* delete */}}>🗑️</Button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </Table>
// //           </div>
// //         </CardBody>
// //       </Card>
      
// //       <PaginationComponent totalItems={categories.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />

// //       <Modal isOpen={modal} toggle={toggle} centered size="lg">
// //         <ModalHeader toggle={toggle} className="border-0">Category Editor</ModalHeader>
// //         <ModalBody className="px-4 pb-4">
// //           <Form onSubmit={handleSubmit}>
// //             <FormGroup>
// //               <Label className="fw-bold small">Category Name *</Label>
// //               <Input value={formData.categoryName} onChange={e => setFormData({ ...formData, categoryName: e.target.value })} required />
// //             </FormGroup>
// //             <FormGroup>
// //               <Label className="fw-bold small">Banner Image *</Label>
// //               <Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} />
// //             </FormGroup>
// //             <FormGroup>
// //               <Label className="fw-bold small">Full Description *</Label>
// //               <div className="bg-white">
// //                 <ReactQuill theme="snow" modules={modules} value={formData.description} onChange={v => setFormData({ ...formData, description: v })} style={{ height: '200px', marginBottom: '50px' }} />
// //               </div>
// //             </FormGroup>
// //             <div className="mt-4 d-flex gap-2">
// //               <Button type="submit" className="btn-gold" style={{ width: '130px' }} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
// //               <Button outline className="fw-bold" style={{ width: '130px', color: '#666' }} onClick={toggle}>Cancel</Button>
// //             </div>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default CapabilityCategory;

// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import { 
//   Container, Row, Col, Card, CardBody, Table, Button, Modal, 
//   ModalHeader, ModalBody, Form, FormGroup, Label, Input 
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Custom Services & Components
// import authService from '@/services/authService';
// import PaginationComponent from '../../../context/Pagination';

// // Rich Text Editor Setup (Next.js Safe)
// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), { 
//   ssr: false,
//   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
// });

// const CapabilityCategory = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   const [categories, setCategories] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     categoryName: "",
//     description: "",
//     bannerImage: null
//   });

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Editor Toolbar Configuration
//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['clean']
//     ],
//   }), []);

//   // 1. Fetch Data Logic
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await authService.getAllCapabilityCategories();
//       if (res.success || Array.isArray(res.data)) {
//         // Extract data correctly based on API structure
//         const finalData = res.data?.data || res.data || [];
//         setCategories(finalData);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({ categoryName: "", description: "", bannerImage: null });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   // 2. Submit Logic (Create/Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.categoryName || !formData.description) {
//       return toast.error("Please fill all required fields!");
//     }

//     setLoading(true);
//     try {
//       // API expects object (handled inside authService)
//       const res = isEditing 
//         ? await authService.updateCapabilityCategory(currentId, formData) 
//         : await authService.createCapabilityCategory(formData);

//       if (res.success) {
//         toast.success(`Category ${isEditing ? "Updated" : "Created"} Successfully!`);
//         toggle();
//         fetchData();
//       } else {
//         toast.error(res.message || "Something went wrong");
//       }
//     } catch (error) {
//       toast.error("Process failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. Delete Logic
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         const res = await authService.deleteCapabilityCategory(id);
//         if (res.success) {
//           toast.success("Category deleted!");
//           fetchData();
//         }
//       } catch (error) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({ 
//       categoryName: item.categoryName, 
//       description: item.description, 
//       bannerImage: null // Image stays same unless changed
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   // Pagination Helper
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
//       <ToastContainer theme="colored" />
      
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//         <div>
//           <h4 className="fw-bold mb-0">Capability Categories</h4>
//           <p className="text-muted small mb-0">Manage practice areas and main service categories.</p>
//         </div>
//         <Button className="btn-gold px-4 shadow-sm" onClick={toggle}>
//           + Add Category
//         </Button>
//       </div>

//       {/* Main Table Card */}
//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <div className="table-responsive">
//             <Table hover className="align-middle mb-0">
//               <thead style={{ backgroundColor: LIGHT_GOLD }}>
//                 <tr>
//                   <th className="px-4 py-3">Sr. No.</th>
//                   <th>Image</th>
//                   <th>Name</th>
//                   <th>Description Preview</th>
//                   <th className="text-end px-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                    <tr><td colSpan="5" className="text-center py-5">Loading data...</td></tr>
//                 ) : currentItems.length > 0 ? (
//                   currentItems.map((item, index) => (
//                     <tr key={item.id} className="border-bottom">
//                       <td className="px-4 text-muted">
//                         {(currentPage - 1) * itemsPerPage + index + 1}.
//                       </td>
//                       <td>
//                         <img 
//                           src={authService.getImgUrl(item.bannerImage)} 
//                           alt="Category"
//                           style={{ width: "80px", height: "45px", borderRadius: "6px", objectFit: "cover" }} 
//                           className="border shadow-sm"
//                           onError={(e) => { e.target.src = "https://placehold.co/80x45?text=No+Image"; }}
//                         />
//                       </td>
//                       <td className="fw-bold text-dark">{item.categoryName}</td>
//                       <td>
//                         <div 
//                           className="text-truncate text-muted small" 
//                           style={{ maxWidth: '250px' }} 
//                           dangerouslySetInnerHTML={{ __html: item.description }} 
//                         />
//                       </td>
//                       <td className="text-end px-4">
//                         <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
//                         <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr><td colSpan="5" className="text-center py-5 text-muted">No Categories Found.</td></tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </CardBody>
//       </Card>
      
//       {/* Pagination Integration */}
//       <div className="mt-3">
//         <PaginationComponent 
//           totalItems={categories.length} 
//           itemsPerPage={itemsPerPage} 
//           currentPage={currentPage} 
//           onPageChange={setCurrentPage} 
//         />
//       </div>

//       {/* MODAL */}
//       <Modal isOpen={modal} toggle={toggle} centered size="lg">
//         <ModalHeader toggle={toggle} className="border-0 pb-0">
//            <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit Category" : "Add New Category"}</span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Category Name *</Label>
//                   <Input 
//                     placeholder="e.g. Family Law"
//                     value={formData.categoryName} 
//                     onChange={e => setFormData({ ...formData, categoryName: e.target.value })} 
//                     required 
//                   />
//                 </FormGroup>
//               </Col>

//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Banner Image (Rectangular) *</Label>
//                   <Input 
//                     type="file" 
//                     onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} 
//                     required={!isEditing}
//                     accept="image/*"
//                   />
//                 </FormGroup>
//               </Col>

//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Full Description *</Label>
//                   <div className="bg-white border rounded">
//                     <ReactQuill 
//                       theme="snow" 
//                       modules={modules} 
//                       value={formData.description} 
//                       onChange={v => setFormData({ ...formData, description: v })} 
//                       style={{ height: '200px', marginBottom: '50px' }} 
//                       placeholder="Write category details here..."
//                     />
//                   </div>
//                 </FormGroup>
//               </Col>
//             </Row>

//             {/* Responsive Actions */}
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

// export default CapabilityCategory;

'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Container, Row, Col, Card, CardBody, Table, Button, Modal, 
  ModalHeader, ModalBody, Form, FormGroup, Label, Input 
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authService from '@/services/authService';
import PaginationComponent from '../../../context/Pagination';

// Rich Text Editor Setup
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
});

const CapabilityCategory = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    bannerImage: null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  }), []);

  const stripHtml = (html) => {
    if (!html) return "";
    if (typeof window !== 'undefined') {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    return html;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authService.getAllCapabilityCategories();
      // Backend response structure handle karein
      const finalData = res.data || (Array.isArray(res) ? res : []);
      setCategories(finalData);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (modal) { // Reset only when closing
      setFormData({ categoryName: "", description: "", bannerImage: null });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryName || !formData.description) {
      return toast.error("Name and Description are required!");
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", "3"); // As per your requirement
      data.append("categoryName", formData.categoryName.trim());
      data.append("description", formData.description);
      
      // Image tabhi bhejein agar user ne File select ki ho
      if (formData.bannerImage instanceof File) {
        data.append("bannerImage", formData.bannerImage);
      }

      const res = isEditing 
        ? await authService.updateCapabilityCategory(currentId, data) 
        : await authService.createCapabilityCategory(data);

      if (res.success || res) {
        toast.success(`Category ${isEditing ? "Updated" : "Created"} Successfully!`);
        toggle();
        fetchData();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "Action failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await authService.deleteCapabilityCategory(id);
        toast.success("Category deleted!");
        fetchData();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({ 
      categoryName: item.categoryName, 
      description: item.description, 
      bannerImage: null // Nayi image upload karne ke liye null rakhein
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const currentItems = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer theme="colored" />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Capability Categories</h4>
          <p className="text-muted small">Manage your core practice areas.</p>
        </div>
        <Button className="px-4 shadow-sm" style={{ backgroundColor: GOLD, border: 'none', color: '#fff' }} onClick={toggle}>
          + Add Category
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="px-4 py-3">SR. NO.</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>DESCRIPTION PREVIEW</th>
                  <th className="text-end px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id} className="border-bottom">
                      <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
                      <td>
                        <div style={{ 
                          width: "60px", 
                          height: "40px", 
                          backgroundColor: "#f0f0f0", 
                          borderRadius: "4px", 
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #ddd"
                        }}>
                          <img 
                            src={authService.getImgUrl(item.bannerImage)} 
                            alt="category" 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = "https://placehold.co/60x40?text=No+Image";
                            }}
                          />
                        </div>
                      </td>
                      <td className="fw-bold">{item.categoryName}</td>
                      <td>
                        <div style={{ fontSize: '13px', color: '#666', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {stripHtml(item.description)}
                        </div>
                      </td>
                      <td className="text-end px-4">
                        <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
                        <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="text-center py-5">No categories found.</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      
      <div className="mt-3">
        <PaginationComponent totalItems={categories.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="lg">
        <ModalHeader toggle={toggle} className="border-0">
            <span className="fw-bold" style={{ color: GOLD }}>
                {isEditing ? "Edit Category" : "Add New Category"}
            </span>
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Category Name *</Label>
                  <Input 
                    placeholder="e.g. Corporate Law"
                    value={formData.categoryName} 
                    onChange={e => setFormData({ ...formData, categoryName: e.target.value })} 
                    required 
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Banner Image {!isEditing && "*"}</Label>
                  <Input 
                    type="file" 
                    onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} 
                    required={!isEditing}
                    accept="image/*"
                  />
                  {isEditing && <small className="text-muted">Leave empty to keep existing image</small>}
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Full Description *</Label>
                  <div style={{ minHeight: '250px' }}>
                    <ReactQuill 
                        theme="snow" 
                        modules={modules}
                        value={formData.description} 
                        onChange={v => setFormData({ ...formData, description: v })} 
                        style={{ height: '200px' }} 
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button type="submit" style={{ backgroundColor: GOLD, border: 'none', width: '130px' }} disabled={loading}>
                {loading ? "Saving..." : (isEditing ? "Update" : "Save")}
              </Button>
              <Button outline type="button" style={{ width: '120px' }} onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CapabilityCategory;