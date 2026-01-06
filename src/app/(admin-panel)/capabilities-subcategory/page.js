// // 'use client';
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import authService from '../../../services/authService';
// // import PaginationComponent from '../../../context/Pagination';

// // const CapabilitySubCategory = () => {
// //   const GOLD = "#eebb5d";
// //   // ✅ 1. स्लैश फिक्स किया (URL सही बनेगा)
// //   const BASE_URL ="http://72.62.87.252:3000"; 

// //   const [subcategories, setSubcategories] = useState([]);
// //   const [parentCategories, setParentCategories] = useState([]);
// //   const [modal, setModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentId, setCurrentId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     categoryId: "",
// //     subcategoryName: "",
// //     description: "",
// //     bannerImage: null
// //   });

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5;

// //   const toggle = () => {
// //     setModal(!modal);
// //     setFormData({ categoryId: "", subcategoryName: "", description: "", bannerImage: null });
// //     setIsEditing(false);
// //   };

// //   // ✅ 2. fetchData को बाहर निकाला (ताकि सब जगह इस्तेमाल हो सके)
// //   const fetchData = useCallback(async () => {
// //     try {
// //       console.log("📢 Fetching data...");
// //       const subRes = await authService.getAllCapabilitySubCategories();
// //       const catRes = await authService.getAllCapabilityCategories();

// //       if (subRes.success) {
// //         setSubcategories(Array.isArray(subRes.data) ? subRes.data : []);
// //       }
// //       if (catRes.success) {
// //         // Parent Categories का डेटा निकालें
// //         const catData = catRes.data.data || catRes.data;
// //         setParentCategories(Array.isArray(catData) ? catData : []);
// //       }
// //     } catch (error) {
// //       console.error("❌ Fetch error:", error);
// //       toast.error("Error loading data");
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   // ✅ 3. Category ID से नाम निकालने का हेल्पर
// //   const getCategoryName = (id) => {
// //     const found = parentCategories.find(cat => String(cat.id) === String(id));
// //     return found ? found.categoryName : `ID: ${id}`;
// //   };

// //   const handleSubmit = async () => {
// //     if (!formData.categoryId || !formData.subcategoryName) {
// //       return toast.error("Please fill required fields!");
// //     }

// //     try {
// //       const res = isEditing 
// //         ? await authService.updateCapabilitySubCategory(currentId, formData)
// //         : await authService.createCapabilitySubCategory(formData);

// //       if (res.success) {
// //         toast.success(isEditing ? "Updated!" : "Created!");
// //         toggle();
// //         fetchData(); // अब यह काम करेगा
// //       } else {
// //         toast.error(res.message);
// //       }
// //     } catch (err) {
// //       toast.error("Operation failed");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure?")) return;
// //     const res = await authService.deleteCapabilitySubCategory(id);
// //     if (res.success) {
// //       toast.success("Deleted!");
// //       fetchData();
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setFormData({
// //       categoryId: item.categoryId,
// //       subcategoryName: item.subcategoryName,
// //       description: item.description,
// //       bannerImage: null
// //     });
// //     setCurrentId(item.id);
// //     setIsEditing(true);
// //     setModal(true);
// //   };

// //   // Pagination Logic
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = subcategories.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <div className="p-3 bg-light min-vh-100">
// //       <ToastContainer />
// //       <Card className="mb-4 border-0 shadow-sm">
// //         <CardBody className="p-3">
// //           <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Capability Subcategories</h5>
// //         </CardBody>
// //       </Card>

// //       <Card className="border-0 shadow-sm">
// //         <CardBody className="p-4">
// //           <div className="text-end mb-3">
// //             <Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Add Subcategory</Button>
// //           </div>

// //           <Table responsive hover className="align-middle">
// //             <thead className="table-light">
// //               <tr>
// //                 <th>Image</th>
// //                 <th>Subcategory Name</th>
// //                 <th>Parent Category</th>
// //                 <th>Description</th>
// //                 <th className="text-end">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {currentItems.length > 0 ? currentItems.map((item) => (
// //                 <tr key={item.id}>
// //                   <td>
// //                     <img
// //                       src={item.bannerImage ? `${BASE_URL}${item.bannerImage}` : ""}
// //                       alt="subcategory"
// //                       style={{ width: "60px", height: "40px", borderRadius: "4px", objectFit: "cover" }}
// //                       onError={(e) => {
// //                         console.log("⚠️ Img Error at:", e.target.src);
// //                         e.currentTarget.src = "https://via.placeholder.com/60x40?text=Error";
// //                       }}
// //                     />
// //                   </td>
// //                   <td className="fw-bold">{item.subcategoryName}</td>
// //                   {/* ✅ 4. Category Name फिक्स */}
// //                   <td>
// //                     <span className="badge bg-light text-dark border">
// //                       {getCategoryName(item.categoryId)}
// //                     </span>
// //                   </td>
// //                   <td className="text-truncate" style={{ maxWidth: '150px' }}>{item.description}</td>
// //                   <td className="text-end">
// //                     <Button color="link" onClick={() => handleEdit(item)} style={{ color: GOLD }}><i className="bi bi-pencil-square"></i></Button>
// //                     <Button color="link" className="text-danger" onClick={() => handleDelete(item.id)}><i className="bi bi-trash"></i></Button>
// //                   </td>
// //                 </tr>
// //               )) : (
// //                 <tr><td colSpan="5" className="text-center py-4">No Subcategories Found</td></tr>
// //               )}
// //             </tbody>
// //           </Table>

// //           <PaginationComponent 
// //             totalItems={subcategories.length}
// //             itemsPerPage={itemsPerPage}
// //             currentPage={currentPage}
// //             onPageChange={(page) => setCurrentPage(page)}
// //           />
// //         </CardBody>
// //       </Card>

// //       {/* Modal for Add/Edit */}
// //       <Modal isOpen={modal} toggle={toggle} centered>
// //         <ModalHeader toggle={toggle}>{isEditing ? "Edit" : "Add"} Subcategory</ModalHeader>
// //         <ModalBody>
// //           <Form>
// //             <FormGroup>
// //               <Label>Select Parent Category</Label>
// //               <Input 
// //                 type="select" 
// //                 value={formData.categoryId} 
// //                 onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
// //               >
// //                 <option value="">-- Select Category --</option>
// //                 {parentCategories.map(cat => (
// //                   <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
// //                 ))}
// //               </Input>
// //             </FormGroup>

// //             <FormGroup>
// //               <Label>Subcategory Name</Label>
// //               <Input 
// //                 value={formData.subcategoryName} 
// //                 onChange={e => setFormData({ ...formData, subcategoryName: e.target.value })} 
// //               />
// //             </FormGroup>

// //             <FormGroup>
// //               <Label>Banner Image</Label>
// //               <Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" />
// //             </FormGroup>

// //             <FormGroup>
// //               <Label>Description</Label>
// //               <Input 
// //                 type="textarea" 
// //                 value={formData.description} 
// //                 onChange={e => setFormData({ ...formData, description: e.target.value })} 
// //               />
// //             </FormGroup>

// //             <Button block style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>
// //               {isEditing ? "Update" : "Save"} Subcategory
// //             </Button>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default CapabilitySubCategory;

// 'use client';
// import React, { useState, useEffect, useCallback } from 'react';
// import { 
//   Container, Row, Col, Card, CardBody, Table, Button, Modal, 
//   ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge
// } from 'reactstrap';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import authService from '@/services/authService';
// import PaginationComponent from '../../../context/Pagination';

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
//       const subRes = await authService.getAllCapabilitySubCategories();
//       const catRes = await authService.getAllCapabilityCategories();

//       if (subRes.success) {
//         setSubcategories(Array.isArray(subRes.data) ? subRes.data : []);
//       }
//       if (catRes.success) {
//         const catData = catRes.data.data || catRes.data;
//         setParentCategories(Array.isArray(catData) ? catData : []);
//       }
//     } catch (error) {
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

//   const handleSubmit = async () => {
//     if (!formData.categoryId || !formData.subcategoryName) {
//       return toast.error("Category and Subcategory Name are required!");
//     }

//     setLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("categoryId", formData.categoryId);
//       fd.append("subcategoryName", formData.subcategoryName);
//       fd.append("description", formData.description);
//       if (formData.bannerImage) fd.append("bannerImage", formData.bannerImage);

//       const res = isEditing 
//         ? await authService.updateCapabilitySubCategory(currentId, formData) // Check if your service needs FormData here
//         : await authService.createCapabilitySubCategory(formData);

//       if (res.success) {
//         toast.success(isEditing ? "Updated Successfully!" : "Created Successfully!");
//         toggle();
//         fetchData();
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err) {
//       toast.error("Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this subcategory?")) return;
//     const res = await authService.deleteCapabilitySubCategory(id);
//     if (res.success) {
//       toast.success("Deleted!");
//       fetchData();
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       categoryId: item.categoryId,
//       subcategoryName: item.subcategoryName,
//       description: item.description,
//       bannerImage: null
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

//       {/* Header Area */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <h4 className="fw-bold mb-0" style={{ color: "#333" }}>Capability Subcategories</h4>
//         </div>
//         <Button className="btn-gold px-4" onClick={toggle}>
//           + Add Subcategory
//         </Button>
//       </div>

//       {/* Table Card */}
//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <div className="table-responsive">
//             <Table hover className="align-middle mb-0">
//               <thead style={{ backgroundColor: LIGHT_GOLD }}>
//                 <tr>
//                   <th className="py-3 px-4">Sr. No.</th>
//                   <th>Image</th>
//                   <th>Subcategory</th>
//                   <th>Parent Category</th>
//                   <th>Description</th>
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
//                         alt="sub"
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
//                         <div className="text-muted small text-truncate" style={{ maxWidth: '180px' }}>
//                             {item.description || "No description"}
//                         </div>
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

//       {/* Pagination */}
//       <div className="mt-3">
//         <PaginationComponent 
//           totalItems={subcategories.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* MODAL */}
//       <Modal isOpen={modal} toggle={toggle} size="lg" centered>
//         <ModalHeader toggle={toggle} className="border-0">
//             <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit" : "Add"} Subcategory</span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form>
//             <Row className="gy-3">
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Select Parent Category</Label>
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
//                   <Label className="small fw-bold">Subcategory Name</Label>
//                   <Input 
//                     placeholder="e.g. Divorce Law"
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
//                   <Label className="small fw-bold">Description</Label>
//                   <Input 
//                     type="textarea" 
//                     rows="3"
//                     placeholder="Short details about this subcategory..."
//                     value={formData.description} 
//                     onChange={e => setFormData({ ...formData, description: e.target.value })} 
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <div className="mt-4 d-flex justify-content-start gap-2">
//               <Button className="btn-gold" style={{ width: '130px' }} onClick={handleSubmit} disabled={loading}>
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



'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Container, Row, Col, Card, CardBody, Table, Button, Modal, 
  ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Services & Components
import authService from '@/services/authService';
import PaginationComponent from '../../../context/Pagination';

// Rich Text Editor Fix (SSR False for Next.js)
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
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
    bannerImage: null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Quill Toolbar configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  }), []);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({ categoryId: "", subcategoryName: "", description: "", bannerImage: null });
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
      toast.error("Error loading data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getCategoryName = (id) => {
    const found = parentCategories.find(cat => String(cat.id) === String(id));
    return found ? found.categoryName : `ID: ${id}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.subcategoryName || !formData.description) {
      return toast.error("Please fill all required fields!");
    }

    setLoading(true);
    try {
      // Logic for API calls using authService
      const res = isEditing 
        ? await authService.updateCapabilitySubCategory(currentId, formData) 
        : await authService.createCapabilitySubCategory(formData);

      if (res.success) {
        toast.success(`Subcategory ${isEditing ? 'Updated' : 'Created'} Successfully!`);
        toggle();
        fetchData();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    const res = await authService.deleteCapabilitySubCategory(id);
    if (res.success) {
      toast.success("Deleted!");
      fetchData();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      categoryId: item.categoryId,
      subcategoryName: item.subcategoryName,
      description: item.description,
      bannerImage: null
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subcategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer theme="colored" />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: "#333" }}>Capability Subcategories</h4>
          <p className="text-muted small mb-0">Manage services and sub-practice areas.</p>
        </div>
        <Button className="btn-gold px-4" onClick={toggle}>
          + Add Subcategory
        </Button>
      </div>

      {/* Table Card */}
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
                {currentItems.length > 0 ? currentItems.map((item, index) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                    </td>
                    <td>
                      <img
                        src={authService.getImgUrl(item.bannerImage)}
                        alt="subcategory"
                        style={{ width: "70px", height: "45px", borderRadius: "6px", objectFit: "cover" }}
                        className="border shadow-sm"
                        onError={(e) => { e.target.src = "https://placehold.co/70x45?text=No+Image"; }}
                      />
                    </td>
                    <td className="fw-bold text-dark">{item.subcategoryName}</td>
                    <td>
                      <Badge pill style={{ backgroundColor: LIGHT_GOLD, color: GOLD, border: `1px solid ${GOLD}` }}>
                        {getCategoryName(item.categoryId)}
                      </Badge>
                    </td>
                    <td>
                        <div 
                          className="text-muted small text-truncate" 
                          style={{ maxWidth: '200px' }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                    </td>
                    <td className="text-end px-4">
                      <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
                      <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="text-center py-5 text-muted">No records found.</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Pagination */}
      <div className="mt-3">
        <PaginationComponent 
          totalItems={subcategories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader toggle={toggle} className="border-0 pb-0">
            <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit Subcategory" : "Add New Subcategory"}</span>
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Select Parent Category *</Label>
                  <Input 
                    type="select" 
                    value={formData.categoryId} 
                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {parentCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
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
                    onChange={e => setFormData({ ...formData, subcategoryName: e.target.value })} 
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Banner Image (Rectangular)</Label>
                  <Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Detailed Description *</Label>
                  <div className="bg-white border rounded">
                    <ReactQuill 
                      theme="snow" 
                      modules={modules}
                      value={formData.description} 
                      onChange={val => setFormData({ ...formData, description: val })}
                      style={{ height: '200px', marginBottom: '50px' }}
                      placeholder="Write details about this subcategory..."
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <div className="mt-4 d-flex justify-content-start gap-2">
              <Button type="submit" className="btn-gold" style={{ width: '130px' }} disabled={loading}>
                {loading ? "Saving..." : (isEditing ? "Update" : "Save")}
              </Button>
              <Button outline className="fw-bold" style={{ width: '130px', color: '#666', borderColor: '#ccc' }} onClick={toggle}>
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