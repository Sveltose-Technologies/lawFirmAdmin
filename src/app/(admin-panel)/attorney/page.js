'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Card, CardBody, Button, Table, Input, Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Attorney = () => {
  const { attorneys, setAttorneys } = useGlobalData();
  
  // UI States
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const initialForm = { name: "", email: "", password: "", phone: "", caseType: "", experience: "", price: "", image: "" };
  const [formData, setFormData] = useState(initialForm);
  
  // File Upload Ref
  const fileInputRef = useRef(null);

  // Sync Search & Pagination
  useEffect(() => {
    const data = attorneys || [];
    const results = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(results);
    setCurrentPage(1); 
  }, [searchTerm, attorneys]);

  // Calculate Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggle = () => {
    setModal(!modal);
    if (!modal) { setFormData(initialForm); setIsEditing(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Image Upload Logic
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // CRUD Operations
  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = (id) => {
    if(confirm("Are you sure?")) {
        setAttorneys(attorneys.filter(item => item.id !== id));
        // --- GREEN TOAST FOR DELETE ---
        toast.success("Attorney deleted successfully!", {
            theme: "colored",
            position: "top-right"
        });
    }
  };

  const handleSubmit = () => {
    // --- RED TOAST FOR VALIDATION ---
    if (!formData.name || !formData.email) {
        toast.error("Name & Email are required!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    if (isEditing) {
        setAttorneys(attorneys.map(item => item.id === currentId ? { ...formData, id: currentId } : item));
        // --- GREEN TOAST FOR UPDATE ---
        toast.success("Attorney updated successfully!", {
            theme: "colored"
        });
    } else {
        const newItem = { ...formData, id: Date.now(), image: formData.image || "https://via.placeholder.com/50" };
        setAttorneys([...attorneys, newItem]);
        // --- GREEN TOAST FOR ADD ---
        toast.success("New Attorney added successfully!", {
            theme: "colored"
        });
    }
    toggle();
  };

  const goldColor = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: goldColor }}>Attorney</h5></CardBody></Card>
      
      <Card className="border-0 shadow-sm">
        <CardBody className="p-0">
          {/* Controls */}
          <div className="p-4 border-bottom">
            <Row className="g-3 align-items-center justify-content-between">
                <Col xs={12} md={6}>
                    <Input type="text" placeholder="Search..." className="rounded-pill border-secondary-subtle" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                </Col>
                <Col xs={12} md="auto" className="text-md-end text-start">
                    <Button onClick={toggle} className="border-0 px-4 fw-bold text-white w-100 w-md-auto" style={{ backgroundColor: goldColor }}>Add Attorney</Button>
                </Col>
            </Row>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <Table className="mb-0 align-middle text-nowrap">
              <thead className="table-light"><tr><th>#</th><th>Image</th><th>Name</th><th>Email</th><th>Phone</th><th>Case Type</th><th>Exp</th><th className="text-end">Action</th></tr></thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-3">{indexOfFirstItem + index + 1}</td>
                    <td className="p-3"><img src={item.image} className="rounded" width="35" height="35" style={{objectFit:'cover'}} alt="" /></td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3">{item.caseType}</td>
                    <td className="p-3">{item.experience}</td>
                    <td className="p-3 text-end">
                        <button onClick={() => handleEdit(item)} className="btn btn-sm rounded-circle me-2" style={{ borderColor: goldColor, color: goldColor }}><i className="bi bi-pencil"></i></button>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-sm rounded-circle border-danger text-danger"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-top d-flex justify-content-between align-items-center">
            <span className="text-muted small">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries</span>
            <Pagination size="sm" className="mb-0">
                <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem active={i + 1 === currentPage} key={i}>
                        <PaginationLink onClick={() => setCurrentPage(i + 1)} style={{ backgroundColor: i + 1 === currentPage ? goldColor : '#fff', borderColor: goldColor, color: i + 1 === currentPage ? '#fff' : '#000' }}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
                </PaginationItem>
            </Pagination>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Attorney</ModalHeader>
        <ModalBody className="pb-4 px-4">
            <Form>
                <Row className="mb-3">
                    <Col xs={12} md={6}><Label>Name</Label><Input name="name" value={formData.name} onChange={handleChange} /></Col>
                    <Col xs={12} md={6}><Label>Email</Label><Input name="email" value={formData.email} onChange={handleChange} /></Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12} md={6}><Label>Phone</Label><Input name="phone" value={formData.phone} onChange={handleChange} /></Col>
                    <Col xs={12} md={6}><Label>Case Type</Label>
                        <Input type="select" name="caseType" value={formData.caseType} onChange={handleChange}>
                            <option value="">Select</option><option>Criminal Law</option><option>Civil Law</option>
                        </Input>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={6}><Label>Experience</Label><Input name="experience" value={formData.experience} onChange={handleChange} /></Col>
                    <Col xs={6}><Label>Price</Label><Input name="price" value={formData.price} onChange={handleChange} /></Col>
                </Row>
                
                {/* Image Upload Section */}
                <FormGroup>
                    <Label>Image</Label>
                    <input type="file" ref={fileInputRef} style={{display:'none'}} onChange={handleFileChange} accept="image/*" />
                    <div onClick={handleImageClick} className="d-flex align-items-center justify-content-center flex-column bg-light" style={{ border: '1px dashed #ccc', height: '100px', cursor: 'pointer', borderRadius: '5px' }}>
                        {formData.image ? <img src={formData.image} alt="Preview" style={{height:'80px', objectFit:'contain'}} /> : <span className="text-muted">+ Upload</span>}
                    </div>
                </FormGroup>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button color="secondary" onClick={toggle} style={{ border: 'none' }}>Cancel</Button>
                    <Button style={{ backgroundColor: goldColor, border: 'none' }} onClick={handleSubmit}>Submit</Button>
                </div>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Attorney;