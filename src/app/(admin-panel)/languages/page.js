'use client';
import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Languages = () => {
  const { languages = [], setLanguages } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState({ name: "", code: "", flag: "", status: "Active" });

  useEffect(() => setFilteredData((languages || []).filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))), [searchTerm, languages]);

  const toggle = () => { setModal(!modal); if(!modal) { setFormData({name:"", code:"", flag:"", status:"Active"}); setIsEditing(false); } };
  
  const handleSubmit = () => {
    // --- RED TOAST VALIDATION ---
    if(!formData.name) {
        toast.error("Name is required!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    if(isEditing) {
        setLanguages(languages.map(i => i.id === currentId ? {...i, ...formData} : i));
        // --- GREEN TOAST UPDATE ---
        toast.success("Language updated successfully!", { theme: "colored" });
    } else {
        setLanguages([...languages, { ...formData, id: Date.now(), isDefault: false }]);
        // --- GREEN TOAST ADD ---
        toast.success("New language added successfully!", { theme: "colored" });
    }
    toggle();
  };

  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
  
  const handleDelete = (id) => { 
    if(confirm("Are you sure you want to delete this language?")) {
        setLanguages(languages.filter(i => i.id !== id));
        // --- GREEN TOAST DELETE ---
        toast.success("Language deleted successfully!", {
            theme: "colored",
            position: "top-right"
        });
    }
  };

  const goldColor = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: goldColor}}>Languages</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-between mb-4 flex-wrap gap-2">
            <Input type="text" placeholder="Search..." className="rounded-pill border-secondary-subtle" style={{maxWidth:'300px'}} onChange={e=>setSearchTerm(e.target.value)}/>
            <Button onClick={toggle} style={{backgroundColor: goldColor, border:'none'}}>Add Language</Button>
        </div>
        <div className="table-responsive"><Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>#</th><th>NAME</th><th>CODE</th><th>STATUS</th><th className="text-end">ACTION</th></tr></thead><tbody>
            {filteredData.map((item, index) => (
                <tr key={item.id}><td className="p-3">{index+1}</td><td className="p-3">{item.name}</td><td className="p-3">{item.code}</td><td className="p-3">{item.status}</td><td className="p-3 text-end"><button onClick={()=>handleEdit(item)} className="btn btn-sm rounded-circle me-2" style={{borderColor:goldColor, color:goldColor}}><i className="bi bi-pencil"></i></button><button onClick={()=>handleDelete(item.id)} className="btn btn-sm rounded-circle border-danger text-danger"><i className="bi bi-trash"></i></button></td></tr>
            ))}
        </tbody></Table></div>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered size="lg"><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} Language</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})}/></FormGroup>
            <FormGroup><Label>Code</Label><Input value={formData.code} onChange={e=>setFormData({...formData, code:e.target.value})}/></FormGroup>
            <Button block style={{backgroundColor:goldColor, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Languages;