'use client';
import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentMethod = () => {
  const { paymentMethods, setPaymentMethods } = useGlobalData();
  
  // Local States
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  // Ref for File Input
  const fileInputRef = useRef(null);

  // Initial Form
  const initialForm = { name: "", type: "", img: "" };
  const [formData, setFormData] = useState(initialForm);

  const goldColor = "#eebb5d";

  useEffect(() => {
    setFilteredData(paymentMethods.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, paymentMethods]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) { setFormData(initialForm); setIsEditing(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Edit: Purana data + Image load karo
  const handleEdit = (item) => {
    setFormData({ name: item.name, type: item.type, img: item.img });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = (id) => {
    if(confirm("Delete this Payment Method?")) {
        setPaymentMethods(paymentMethods.filter(item => item.id !== id));
        // --- GREEN TOAST DELETE ---
        toast.success("Payment Method deleted successfully!", {
            theme: "colored",
            position: "top-right"
        });
    }
  };

  // --- IMAGE UPLOAD LOGIC ---
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

  const handleSubmit = () => {
    // --- RED TOAST VALIDATION ---
    if (!formData.name) {
        toast.error("Name is required!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    // Agar image nahi hai to placeholder use karo
    const finalImg = formData.img || "https://via.placeholder.com/50";

    if(isEditing) {
        setPaymentMethods(paymentMethods.map(item => item.id === currentId ? { ...item, ...formData, img: finalImg } : item));
        // --- GREEN TOAST UPDATE ---
        toast.success("Payment Method updated successfully!", { theme: "colored" });
    } else {
        setPaymentMethods([...paymentMethods, { ...formData, id: Date.now(), img: finalImg }]);
        // --- GREEN TOAST ADD ---
        toast.success("New Payment Method added successfully!", { theme: "colored" });
    }
    toggle();
  };

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      {/* Header */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3">
            <h5 className="mb-0 fw-bold" style={{ color: goldColor }}>Payment Method List</h5>
        </CardBody>
      </Card>

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardBody className="p-0">
          <div className="p-4 border-bottom d-flex justify-content-between">
            <Input type="text" placeholder="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="rounded-pill border-secondary-subtle" style={{ maxWidth: '300px' }} />
            <Button onClick={toggle} className="border-0 px-4 fw-medium text-white" style={{ backgroundColor: goldColor }}>Add Payment Method</Button>
          </div>
          
          <div className="table-responsive">
            <Table className="mb-0 align-middle">
              <thead className="table-light"><tr><th>#</th><th>IMAGE</th><th>NAME</th><th>TYPE</th><th className="text-end">ACTION</th></tr></thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                        <img src={item.img} style={{ height: '35px', width: '50px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '4px' }} alt="" />
                    </td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3 text-end">
                      <button onClick={() => handleEdit(item)} className="btn btn-sm rounded-circle me-2" style={{ borderColor: goldColor, color: goldColor }}><i className="bi bi-pencil"></i></button>
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
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Payment Method</ModalHeader>
        <ModalBody className="p-4 pt-0">
            <Form>
                <FormGroup>
                    <Label className="small fw-bold text-muted">Name</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. PayPal" />
                </FormGroup>
                
                <FormGroup>
                    <Label className="small fw-bold text-muted">Type</Label>
                    <Input type="select" name="type" value={formData.type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option>Paypal</option>
                        <option>Stripe</option>
                        <option>Bank Transfer</option>
                        <option>Credit Card</option>
                    </Input>
                </FormGroup>

                {/* --- IMAGE UPLOAD --- */}
                <FormGroup>
                    <Label className="small fw-bold text-muted">Logo / Image</Label>
                    
                    {/* Hidden Input */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {/* Visual Box */}
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
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} 
                            />
                        ) : (
                            <div className="text-center">
                                <i className="bi bi-cloud-upload d-block mb-1"></i>
                                <span className="small" style={{fontSize: '10px'}}>Upload</span>
                            </div>
                        )}
                    </div>
                </FormGroup>

                <div className="d-flex justify-content-end mt-4">
                    <Button color="secondary" onClick={toggle} className="me-2" style={{ border: 'none' }}>Cancel</Button>
                    <Button style={{ backgroundColor: goldColor, border: 'none' }} onClick={handleSubmit}>Submit</Button>
                </div>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default PaymentMethod;