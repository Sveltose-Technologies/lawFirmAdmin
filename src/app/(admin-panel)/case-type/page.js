'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Button, Input, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from 'reactstrap';
import { useGlobalData } from '@/context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CaseType = () => {
  const { caseTypes, setCaseTypes } = useGlobalData();
  
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Search Logic
  useEffect(() => {
    setFilteredData(caseTypes.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, caseTypes]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) { // Reset on open
        setFormData({ name: "" });
        setIsEditing(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete?")) {
        setCaseTypes(caseTypes.filter(item => item.id !== id));
        // --- GREEN TOAST ON DELETE ---
        toast.success("Deleted successfully!", {
            theme: "colored", // Green Background
            position: "top-right"
        });
    }
  };

  const handleSubmit = () => {
    // --- RED TOAST VALIDATION ---
    if (!formData.name.trim()) {
        toast.error("Name is required!", {
            theme: "colored", // Red Background
            position: "top-right"
        });
        return;
    }

    if (isEditing) {
        setCaseTypes(caseTypes.map(item => item.id === currentId ? { ...item, name: formData.name } : item));
        // --- GREEN TOAST UPDATE ---
        toast.success("Case Type updated successfully!", {
            theme: "colored"
        });
    } else {
        setCaseTypes([...caseTypes, { id: Date.now(), name: formData.name }]);
        // --- GREEN TOAST ADD ---
        toast.success("New Case Type added successfully!", {
            theme: "colored"
        });
    }
    toggle();
  };

  const btnColor = "#eebb5d"; 

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER (Zaroori hai) --- */}
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: '#eebb5d' }}>Attorney Case Types</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
          <div className="d-flex justify-content-between mb-4">
            <Input type="text" placeholder="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="rounded-pill border-secondary-subtle" style={{ maxWidth: '300px' }} />
            <Button onClick={toggle} style={{ backgroundColor: btnColor, border: "none", fontWeight: "600" }}>Add New</Button>
          </div>
          <div className="table-responsive">
            <Table className="align-middle text-nowrap">
              <thead className="table-light"><tr><th>#</th><th>NAME</th><th className="text-end">ACTION</th></tr></thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-3 text-secondary">{index + 1}</td>
                    <td className="p-3 fw-medium">{item.name}</td>
                    <td className="p-3 text-end">
                      <button onClick={() => handleEdit(item)} className="btn btn-sm me-2" style={{ color: '#eebb5d', border: '1px solid #eebb5d', borderRadius: '50%', width: '30px', height: '30px' }}><i className="bi bi-pencil-fill"></i></button>
                      <button onClick={() => handleDelete(item.id)} className="btn btn-sm" style={{ color: "#dc3545", border: "1px solid #dc3545", borderRadius: '50%', width: '30px', height: '30px' }}><i className="bi bi-trash-fill"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}><span className="fw-bold">{isEditing ? "Edit" : "Add"} Case Type</span></ModalHeader>
        <ModalBody className="p-4 pt-0">
            <Form>
                <FormGroup><Label>Name</Label><Input name="name" value={formData.name} onChange={(e) => setFormData({name: e.target.value})} placeholder="Enter Name" /></FormGroup>
                <Button block style={{ backgroundColor: btnColor, border: 'none' }} onClick={handleSubmit}>Submit</Button>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default CaseType;