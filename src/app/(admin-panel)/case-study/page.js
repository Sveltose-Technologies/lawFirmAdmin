'use client';
import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Table, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CaseStudy = () => {
  const { caseStudies, setCaseStudies } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const initialForm = { title: "", description: "", img: "", thumb: "" };
  const [formData, setFormData] = useState(initialForm);

  // File Refs
  const imgRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const data = caseStudies || [];
    setFilteredData(data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())));
    setCurrentPage(1);
  }, [searchTerm, caseStudies]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggle = () => { setModal(!modal); if(!modal) { setFormData(initialForm); setIsEditing(false); } };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle File Upload
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({ ...formData, [field]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    // --- RED TOAST VALIDATION ---
    if (!formData.title) {
        toast.error("Title is required!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    if(isEditing) {
        setCaseStudies(caseStudies.map(item => item.id === currentId ? { ...formData, id: currentId } : item));
        // --- GREEN TOAST UPDATE ---
        toast.success("Case Study updated successfully!", { theme: "colored" });
    } else {
        setCaseStudies([...caseStudies, { ...formData, id: Date.now() }]);
        // --- GREEN TOAST ADD ---
        toast.success("New Case Study added successfully!", { theme: "colored" });
    }
    toggle();
  };

  const handleDelete = (id) => { 
    if(confirm("Are you sure you want to delete this Case Study?")) {
        setCaseStudies(caseStudies.filter(i => i.id !== id));
        // --- GREEN TOAST DELETE ---
        toast.success("Case Study deleted successfully!", {
            theme: "colored",
            position: "top-right"
        });
    }
  };

  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

  const goldColor = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: goldColor }}>Case Study</h5></CardBody></Card>
      
      <Card className="border-0 shadow-sm"><CardBody className="p-0">
          <div className="p-4 border-bottom d-flex justify-content-between">
            <Input type="text" placeholder="Search..." className="rounded-pill border-secondary-subtle" style={{ maxWidth: '300px' }} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            <Button onClick={toggle} style={{ backgroundColor: goldColor, border: 'none' }}>Add Case Study</Button>
          </div>
          <div className="table-responsive">
            <Table className="mb-0 align-middle">
              <thead className="table-light"><tr><th>#</th><th>THUMBNAIL</th><th>TITLE</th><th>DESCRIPTION</th><th className="text-end">ACTION</th></tr></thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-3">{indexOfFirstItem + index + 1}</td>
                    <td className="p-3"><img src={item.img || "https://via.placeholder.com/50"} className="rounded" width="50" height="35" alt="" style={{objectFit:'cover'}} /></td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.description}</td>
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
            <span className="text-muted small">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} entries</span>
            <Pagination size="sm" className="mb-0">
                <PaginationItem disabled={currentPage <= 1}><PaginationLink previous onClick={()=>setCurrentPage(currentPage-1)} /></PaginationItem>
                {[...Array(totalPages)].map((_, i) => <PaginationItem key={i} active={i+1 === currentPage}><PaginationLink onClick={()=>setCurrentPage(i+1)} style={{background: i+1===currentPage?goldColor:'white', borderColor:goldColor, color:i+1===currentPage?'white':'black'}}>{i+1}</PaginationLink></PaginationItem>)}
                <PaginationItem disabled={currentPage >= totalPages}><PaginationLink next onClick={()=>setCurrentPage(currentPage+1)} /></PaginationItem>
            </Pagination>
          </div>
      </CardBody></Card>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Case Study</ModalHeader>
        <ModalBody className="p-4">
            <Form>
                <Row><Col md={6}><FormGroup><Label>Title</Label><Input name="title" value={formData.title} onChange={handleChange} /></FormGroup></Col>
                <Col md={6}><FormGroup><Label>Description</Label><Input name="description" value={formData.description} onChange={handleChange} /></FormGroup></Col></Row>
                
                {/* Image Uploads */}
                <Row>
                    <Col md={3}>
                        <Label>Image</Label>
                        <input type="file" ref={imgRef} style={{display:'none'}} onChange={(e)=>handleFileChange(e, 'img')} />
                        <div onClick={()=>imgRef.current.click()} className="border p-2 text-center" style={{cursor:'pointer', borderRadius:'5px', height:'100px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            {formData.img ? <img src={formData.img} style={{height:'80px'}} alt="preview"/> : "+ Upload"}
                        </div>
                    </Col>
                    <Col md={3}>
                        <Label>Thumbnail</Label>
                        <input type="file" ref={thumbRef} style={{display:'none'}} onChange={(e)=>handleFileChange(e, 'thumb')} />
                        <div onClick={()=>thumbRef.current.click()} className="border p-2 text-center" style={{cursor:'pointer', borderRadius:'5px', height:'100px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            {formData.thumb ? <img src={formData.thumb} style={{height:'80px'}} alt="thumb"/> : "+ Upload"}
                        </div>
                    </Col>
                </Row>

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
export default CaseStudy;