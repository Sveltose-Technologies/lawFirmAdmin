// 'use client';
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Row, Col, Pagination, PaginationItem, PaginationLink
// } from "reactstrap";
// import { useGlobalData } from '../../../context/GlobalContext'; // Adjust path as needed

// // --- TOAST IMPORTS ---
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Service = () => {
//   // --- 1. MOCK DATA (Initial State to match image) ---
//   const [services, setServices] = useState([
//     { id: 1, createAt: "Jul 02, 2025", name: "NTN Registration", desc: "NTN REGISTRATION NTN REGISTRATION...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Icon", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=50&q=80" },
//     { id: 2, createAt: "Apr 10, 2025", name: "Law Professional Advice", desc: "Get expert legal guidance from certified...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Law", img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=50&q=80" },
//     { id: 3, createAt: "Apr 10, 2025", name: "Sales Tax Return Services", desc: "Here's your Sales Tax Return Services...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Tax", img: "https://images.unsplash.com/photo-1450101499121-e3b9e9793a0b?w=50&q=80" },
//     { id: 4, createAt: "Apr 10, 2025", name: "Law Criminal", desc: "Law Criminal Expert defense protecting...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Crm", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=50&q=80" },
//     { id: 5, createAt: "Apr 10, 2025", name: "Law Family", desc: "Law Family Dedicated attorneys offering...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Fam", img: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=50&q=80" },
//     { id: 6, createAt: "Apr 09, 2025", name: "Legal Consultation", desc: "We provide comprehensive legal consultat...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Lgl", img: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=50&q=80" },
//     { id: 7, createAt: "Apr 09, 2025", name: "Corporate & Business Law", desc: "We assist businesses in navigating the c...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Bus", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=50&q=80" },
//     { id: 8, createAt: "Apr 08, 2025", name: "Bankruptcy & Debt Relief", desc: "Our bankruptcy attorneys help individual...", icon: "https://via.placeholder.com/30/eebb5d/ffffff?text=Bnk", img: "https://images.unsplash.com/photo-1555374018-13a8994ab246?w=50&q=80" },
//   ]);

//   // --- 2. STATES ---
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
  
//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Form State
//   const initialForm = { name: "", desc: "", icon: "", img: "" };
//   const [formData, setFormData] = useState(initialForm);

//   // File Upload Refs
//   const iconInputRef = useRef(null);
//   const imgInputRef = useRef(null);

//   // --- 3. THEME COLOR ---
//   const goldColor = "#eebb5d";

//   // --- 4. SEARCH & FILTER LOGIC ---
//   useEffect(() => {
//     const results = services.filter(item => 
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//       item.desc.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(results);
//     setCurrentPage(1); // Reset to page 1 on search
//   }, [searchTerm, services]);

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // --- 5. HANDLERS ---
//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData(initialForm);
//       setIsEditing(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Generic File Handler for both Icon and Image
//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setFormData(prev => ({ ...prev, [field]: previewUrl }));
//     }
//   };

//   const handleSubmit = () => {
//     // Validation
//     if (!formData.name) {
//       toast.error("Service Name is required!", { theme: "colored", position: "top-right" });
//       return;
//     }

//     const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
//     const finalIcon = formData.icon || "https://via.placeholder.com/30";
//     const finalImg = formData.img || "https://via.placeholder.com/50";

//     if (isEditing) {
//       setServices(services.map(item => item.id === currentId ? { ...item, ...formData, icon: finalIcon, img: finalImg } : item));
//       toast.success("Service updated successfully!", { theme: "colored" });
//     } else {
//       const newService = { 
//         ...formData, 
//         id: Date.now(), 
//         createAt: today,
//         icon: finalIcon,
//         img: finalImg
//       };
//       setServices([newService, ...services]);
//       toast.success("New Service added successfully!", { theme: "colored" });
//     }
//     toggle();
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this service?")) {
//       setServices(services.filter(item => item.id !== id));
//       toast.success("Service deleted successfully!", { theme: "colored" });
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({ name: item.name, desc: item.desc, icon: item.icon, img: item.img });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   return (
//     <div className="p-3 bg-light min-vh-100 font-sans">
      
//       <ToastContainer />

//       {/* --- HEADER CARD --- */}
//       <Card className="mb-4 border-0 shadow-sm bg-white">
//         <CardBody className="p-3 d-flex align-items-center">
//             {/* Simple Icon imitating the scale icon in image */}
//             <div className="me-2" style={{color: goldColor}}>
//                 <i className="bi bi-bank2 fs-4"></i>
//             </div>
//             <h5 className="mb-0 fw-bold" style={{ color: goldColor }}>Service</h5>
//         </CardBody>
//       </Card>

//       {/* --- MAIN CONTENT --- */}
//       <Card className="border-0 shadow-sm">
//         <CardBody className="p-0">
          
//           {/* Toolbar: Search & Add Button */}
//           <div className="p-4 border-bottom d-flex justify-content-between flex-wrap gap-2">
//             <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
//                 <span className="position-absolute text-muted" style={{left: '12px', top: '8px'}}>
//                     <i className="bi bi-search"></i>
//                 </span>
//                 <Input 
//                     type="text" 
//                     placeholder="Search" 
//                     className="rounded-pill ps-5 border-secondary-subtle" 
//                     value={searchTerm} 
//                     onChange={(e)=>setSearchTerm(e.target.value)} 
//                 />
//             </div>
//             <Button 
//                 onClick={toggle} 
//                 className="text-white border-0 fw-bold px-4 rounded" 
//                 style={{ backgroundColor: goldColor }}
//             >
//                 Add Service
//             </Button>
//           </div>

//           {/* Table */}
//           <div className="table-responsive">
//             <Table className="mb-0 align-middle text-nowrap">
//               <thead className="table-light">
//                 <tr className="text-muted small text-uppercase">
//                     <th className="ps-4">#</th>
//                     <th>Create At</th>
//                     <th>Icon</th>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Description</th>
//                     <th className="text-end pe-4">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="ps-4 text-muted">{indexOfFirstItem + index + 1}</td>
//                     <td className="text-dark">{item.createAt}</td>
                    
//                     {/* Icon Column */}
//                     <td>
//                         <img 
//                             src={item.icon} 
//                             alt="icon" 
//                             className="rounded"
//                             style={{ width: '30px', height: '30px', objectFit: 'contain' }}
//                         />
//                     </td>

//                     {/* Image Column */}
//                     <td>
//                         <img 
//                             src={item.img} 
//                             alt="service" 
//                             className="rounded"
//                             style={{ width: '50px', height: '35px', objectFit: 'cover' }}
//                         />
//                     </td>
                    
//                     <td className="fw-medium text-dark">{item.name}</td>
                    
//                     {/* Truncated Description */}
//                     <td className="text-muted text-truncate" style={{ maxWidth: '250px' }}>
//                         {item.desc}
//                     </td>

//                     <td className="text-end pe-4">
//                         {/* View Button (Green Eye) */}
//                         <button className="btn btn-sm rounded-circle border-success text-success me-2 hover-shadow" title="View">
//                             <i className="bi bi-eye"></i>
//                         </button>
//                         {/* Edit Button (Gold Pencil) */}
//                         <button 
//                             onClick={() => handleEdit(item)} 
//                             className="btn btn-sm rounded-circle me-2" 
//                             style={{ borderColor: goldColor, color: goldColor }}
//                             title="Edit"
//                         >
//                             <i className="bi bi-pencil-fill"></i>
//                         </button>
//                         {/* Delete Button (Red Trash) */}
//                         <button 
//                             onClick={() => handleDelete(item.id)} 
//                             className="btn btn-sm rounded-circle border-danger text-danger"
//                             title="Delete"
//                         >
//                             <i className="bi bi-trash-fill"></i>
//                         </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>

//           {/* Pagination Footer */}
//           <div className="p-3 border-top d-flex justify-content-between align-items-center flex-wrap">
//             <div className="d-flex align-items-center mb-2 mb-md-0">
//                 <span className="text-muted small me-2">Show</span>
//                 <Input type="select" bsSize="sm" style={{width: '60px'}} className="me-2" disabled>
//                     <option>10</option>
//                 </Input>
//                 <span className="text-muted small">
//                     Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
//                 </span>
//             </div>

//             <Pagination size="sm" className="mb-0">
//                 <PaginationItem disabled={currentPage <= 1}>
//                     <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)}>
//                         Previous
//                     </PaginationLink>
//                 </PaginationItem>
//                 {[...Array(totalPages)].map((_, i) => (
//                     <PaginationItem active={i + 1 === currentPage} key={i}>
//                         <PaginationLink 
//                             onClick={() => setCurrentPage(i + 1)}
//                             style={{ 
//                                 backgroundColor: i + 1 === currentPage ? 'black' : 'white', 
//                                 borderColor: i + 1 === currentPage ? 'black' : '#dee2e6',
//                                 color: i + 1 === currentPage ? 'white' : 'black'
//                             }}
//                         >
//                             {i + 1}
//                         </PaginationLink>
//                     </PaginationItem>
//                 ))}
//                 <PaginationItem disabled={currentPage >= totalPages}>
//                     <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)}>
//                         Next
//                     </PaginationLink>
//                 </PaginationItem>
//             </Pagination>
//           </div>

//         </CardBody>
//       </Card>

//       {/* --- ADD/EDIT MODAL --- */}
//       <Modal isOpen={modal} toggle={toggle} size="lg" centered>
//         <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>
//             <span className="fw-bold" style={{color: '#333'}}>{isEditing ? "Edit Service" : "Add Service"}</span>
//         </ModalHeader>
//         <ModalBody className="p-4 pt-0">
//             <Form>
//                 <Row>
//                     <Col md={12} className="mb-3">
//                         <FormGroup>
//                             <Label className="fw-bold small">Service Name</Label>
//                             <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter service name" />
//                         </FormGroup>
//                     </Col>
                    
//                     <Col md={12} className="mb-3">
//                         <FormGroup>
//                             <Label className="fw-bold small">Description</Label>
//                             <Input type="textarea" rows="3" name="desc" value={formData.desc} onChange={handleChange} placeholder="Enter description" />
//                         </FormGroup>
//                     </Col>
//                 </Row>

//                 <Row>
//                     {/* Icon Upload */}
//                     <Col md={6} className="mb-3">
//                         <FormGroup>
//                             <Label className="fw-bold small">Icon (Small Image)</Label>
//                             <input type="file" ref={iconInputRef} style={{display:'none'}} onChange={(e) => handleFileChange(e, 'icon')} accept="image/*" />
//                             <div 
//                                 onClick={() => iconInputRef.current.click()} 
//                                 className="d-flex align-items-center justify-content-center border rounded bg-light"
//                                 style={{ height: '80px', cursor: 'pointer', borderStyle: 'dashed' }}
//                             >
//                                 {formData.icon ? (
//                                     <img src={formData.icon} alt="Preview" style={{height:'50px', width:'50px', objectFit:'contain'}} />
//                                 ) : (
//                                     <div className="text-center text-muted">
//                                         <i className="bi bi-upload"></i> <small>Upload Icon</small>
//                                     </div>
//                                 )}
//                             </div>
//                         </FormGroup>
//                     </Col>

//                     {/* Main Image Upload */}
//                     <Col md={6} className="mb-3">
//                         <FormGroup>
//                             <Label className="fw-bold small">Service Image</Label>
//                             <input type="file" ref={imgInputRef} style={{display:'none'}} onChange={(e) => handleFileChange(e, 'img')} accept="image/*" />
//                             <div 
//                                 onClick={() => imgInputRef.current.click()} 
//                                 className="d-flex align-items-center justify-content-center border rounded bg-light"
//                                 style={{ height: '80px', cursor: 'pointer', borderStyle: 'dashed' }}
//                             >
//                                 {formData.img ? (
//                                     <img src={formData.img} alt="Preview" style={{height:'100%', width:'100%', objectFit:'cover', borderRadius:'4px'}} />
//                                 ) : (
//                                     <div className="text-center text-muted">
//                                         <i className="bi bi-image"></i> <small>Upload Image</small>
//                                     </div>
//                                 )}
//                             </div>
//                         </FormGroup>
//                     </Col>
//                 </Row>

//                 <div className="text-end mt-4">
//                     <Button color="light" onClick={toggle} className="me-2 border">Cancel</Button>
//                     <Button 
//                         onClick={handleSubmit}
//                         style={{ backgroundColor: goldColor, border: 'none' }}
//                         className="px-4"
//                     >
//                         Submit
//                     </Button>
//                 </div>
//             </Form>
//         </ModalBody>
//       </Modal>

//     </div>
//   );
// };

// export default Service;

'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Service = () => {
  const { services, setServices } = useGlobalData();
  const GOLD = "#eebb5d";
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "bi-hammer" });

  const toggle = () => { setModal(!modal); if(!modal) { setFormData({ name: "", description: "", icon: "bi-hammer" }); setIsEditing(false); } };

  const handleSubmit = () => {
    if (!formData.name) return toast.error("Service Name required!", { theme: "colored" });
    if (isEditing) {
      setServices(services.map(item => item.id === currentId ? { ...item, ...formData } : item));
      toast.success("Service updated!", { theme: "colored" });
    } else {
      setServices([...services, { ...formData, id: Date.now(), date: new Date().toDateString() }]);
      toast.success("Service added!", { theme: "colored" });
    }
    toggle();
  };

  const handleDelete = (id) => { if(confirm("Delete Service?")) { setServices(services.filter(c => c.id !== id)); toast.success("Service deleted!", { theme: "colored" }); }};
  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Services</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
          <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Add Service</Button></div>
          <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Icon</th><th>Name</th><th>Description</th><th className="text-end">Action</th></tr></thead><tbody>
            {(services || []).map((item) => (
                <tr key={item.id}>
                <td><i className={`bi ${item.icon} fs-4`}></i></td>
                <td className="fw-bold">{item.name}</td><td>{item.description}</td>
                <td className="text-end"><button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
          </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} Service</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Service Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Description</Label><Input type="textarea" value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} /></FormGroup>
            <FormGroup><Label>Icon Class (Bootstrap)</Label><Input value={formData.icon} onChange={e=>setFormData({...formData, icon:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor:GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Service;