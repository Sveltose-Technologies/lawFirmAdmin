'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Card, CardBody, Table, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label
} from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';
// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
  // Global Data
  const { blogs, setBlogs, categories = [], tags = [] } = useGlobalData();

  // Local States
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeLang, setActiveLang] = useState("English");

  // Ref for File Input
  const fileInputRef = useRef(null);

  // Initial Form State
  const initialForm = {
    title: "",
    category: "",
    tags: "",
    shortDesc: "",
    description: "",
    isPopular: false,
    isPublished: false,
    img: ""
  };
  const [formData, setFormData] = useState(initialForm);

  // Search Logic
  useEffect(() => {
    const data = blogs || [];
    setFilteredData(data.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, blogs]);

  // Toggle Modal
  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData(initialForm);
      setIsEditing(false);
      setActiveLang("English");
    }
  };

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Custom Toggle Handler
  const handleToggleChange = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  // Handle Edit Setup
  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter(item => item.id !== id));
      // --- GREEN TOAST FOR DELETE ---
      toast.success("Blog deleted successfully!", {
        theme: "colored",
        position: "top-right"
      });
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    // --- RED TOAST FOR VALIDATION ---
    if (!formData.title) {
        toast.error("Title is required!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    if (isEditing) {
      setBlogs(blogs.map(item => item.id === currentId ? { ...formData, id: currentId } : item));
      // --- GREEN TOAST FOR UPDATE ---
      toast.success("Blog updated successfully!", { theme: "colored" });
    } else {
      const newItem = { 
        ...formData, 
        id: Date.now(), 
        img: formData.img || "https://via.placeholder.com/100" 
      };
      setBlogs([...blogs, newItem]);
      // --- GREEN TOAST FOR ADD ---
      toast.success("New blog added successfully!", { theme: "colored" });
    }
    toggle();
  };

  // Handle Image Upload
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, img: previewUrl });
    }
  };

  // Styles
  const goldColor = "#eebb5d";
  const btnStyle = { backgroundColor: goldColor, border: 'none', fontWeight: 'bold' };

  // --- COMPONENTS ---

  const CustomSwitch = ({ active, onClick }) => (
    <div 
      onClick={onClick}
      style={{
        width: '40px', height: '20px', backgroundColor: active ? goldColor : '#ccc',
        borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s'
      }}
    >
      <div style={{
        width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%',
        position: 'absolute', top: '2px', left: active ? '22px' : '2px', transition: '0.3s'
      }}></div>
    </div>
  );

  const StatusBadge = ({ active }) => (
    <span className="px-3 py-1 rounded-pill small fw-bold text-white" 
          style={{ backgroundColor: active ? goldColor : '#6c757d' }}>
      {active ? 'Active' : 'Inactive'}
    </span>
  );

  const LangPill = ({ text }) => (
    <span 
      onClick={() => setActiveLang(text)}
      className="px-3 py-1 rounded-pill small fw-bold me-2 cursor-pointer border"
      style={{ 
        backgroundColor: activeLang === text ? goldColor : '#e9ecef', 
        color: activeLang === text ? 'white' : '#6c757d',
        borderColor: activeLang === text ? goldColor : '#dee2e6'
      }}
    >
      {text}
    </span>
  );

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      {/* Header */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3 d-flex align-items-center">
          <h5 className="mb-0 fw-bold" style={{ color: '#eebb5d' }}>
             <i className="bi bi-bank me-2"></i> Blog
          </h5>
        </CardBody>
      </Card>

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardBody className="p-0">
          <div className="p-4 border-bottom d-flex justify-content-between flex-wrap gap-3">
            <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
                <i className="bi bi-search position-absolute text-muted" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}></i>
                <Input type="text" placeholder="Search" className="rounded-pill ps-5 border-secondary-subtle" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>
            <Button onClick={toggle} style={btnStyle}>Add Blog</Button>
          </div>

          <div className="table-responsive">
            <Table className="mb-0 align-middle text-nowrap">
              <thead className="table-light">
                <tr><th>#</th><th>IMAGE</th><th>TITLE</th><th>CATEGORY</th><th>TAGS</th><th>STATUS</th><th>POPULAR</th><th className="text-end">ACTION</th></tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-3 text-secondary">{index + 1}</td>
                    <td className="p-3">
                        <img src={item.img} className="rounded object-fit-cover" width="50" height="35" alt="" />
                    </td>
                    <td className="p-3 text-truncate" style={{maxWidth: '150px'}}>{item.title}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.tags}</td>
                    <td className="p-3"><StatusBadge active={item.isPublished} /></td>
                    <td className="p-3"><StatusBadge active={item.isPopular} /></td>
                    <td className="p-3 text-end">
                        <button className="btn btn-sm rounded-circle border-success text-success me-1"><i className="bi bi-eye"></i></button>
                        <button onClick={() => handleEdit(item)} className="btn btn-sm rounded-circle me-1" style={{ borderColor: goldColor, color: goldColor }}><i className="bi bi-pencil"></i></button>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-sm rounded-circle border-danger text-danger"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* --- ADD/EDIT MODAL --- */}
      <Modal isOpen={modal} toggle={toggle} size="lg" scrollable>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit Blog" : "Add Blog"}</ModalHeader>
        <ModalBody className="p-4 pt-0">
            <Form>
                {/* Language Tabs */}
                <div className="mb-3">
                    <LangPill text="English" /><LangPill text="Indonesia" /><LangPill text="Bangla" /><LangPill text="Italian" />
                </div>

                <FormGroup>
                    <Label className="small fw-bold text-muted">Title</Label>
                    <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter Title" />
                </FormGroup>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="small fw-bold text-muted">Blog Category</Label>
                            <Input type="select" name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select Category</option>
                                {categories && categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                <option value="Consumer Protection">Consumer Protection</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="small fw-bold text-muted">Blog Tags</Label>
                            <Input type="select" name="tags" value={formData.tags} onChange={handleChange}>
                                <option value="">Select Blog Tags</option>
                                {tags && tags.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                <option value="Legal Advice">Legal Advice</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label className="small fw-bold text-muted">Short Description</Label>
                    <Input type="textarea" name="shortDesc" value={formData.shortDesc} onChange={handleChange} placeholder="Enter Short Description" rows="2" />
                </FormGroup>

                <FormGroup>
                    <Label className="small fw-bold text-muted">Details</Label>
                    <div className="border rounded">
                        <div className="bg-light p-2 border-bottom d-flex gap-3 text-secondary">
                            <i className="bi bi-type-bold"></i><i className="bi bi-type-italic"></i><i className="bi bi-type-underline"></i>
                            <i className="bi bi-list-ul"></i><i className="bi bi-image"></i>
                        </div>
                        <Input type="textarea" name="description" value={formData.description} onChange={handleChange} rows="4" className="border-0" placeholder="Start typing..." style={{boxShadow: 'none'}} />
                    </div>
                </FormGroup>

                <Row className="align-items-start">
                    <Col md={3}>
                        <Label className="small fw-bold text-muted d-block">Add to popular</Label>
                        <CustomSwitch active={formData.isPopular} onClick={() => handleToggleChange('isPopular')} />
                    </Col>
                    <Col md={3}>
                        <Label className="small fw-bold text-muted d-block">Published</Label>
                        <CustomSwitch active={formData.isPublished} onClick={() => handleToggleChange('isPublished')} />
                    </Col>
                    
                    {/* --- REAL IMAGE UPLOAD SECTION --- */}
                    <Col md={6}>
                        <Label className="small fw-bold text-muted">Images</Label>
                        
                        {/* 1. Hidden Input */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {/* 2. Visual Box */}
                        <div 
                            onClick={handleImageClick}
                            className="d-flex align-items-center justify-content-center overflow-hidden position-relative"
                            style={{ 
                                border: '1px dashed #ccc', 
                                borderRadius: '5px', 
                                height: '80px', 
                                width: '100px', 
                                cursor: 'pointer', 
                                color: '#666',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            {formData.img ? (
                                <img 
                                    src={formData.img} 
                                    alt="Preview" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                            ) : (
                                <span className="small">+ Upload</span>
                            )}
                        </div>
                    </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                    <Button color="secondary" style={{ backgroundColor: '#cfa145', border: 'none', width: '100px' }} onClick={toggle}>Cancel</Button>
                    <Button style={{ backgroundColor: goldColor, border: 'none', width: '100px' }} onClick={handleSubmit}>Submit</Button>
                </div>

            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Blogs;