'use client';
import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Clients = () => {
  const { clients, setClients } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = (clients || []).filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const toggle = () => { setModal(!modal); if(!modal) { setFormData({name:"", email:"", phone:"", address:""}); setIsEditing(false); }};

  const handleSubmit = () => {
    if(!formData.name || !formData.email) return toast.error("Name & Email Required!", {theme: "colored"});
    if(isEditing) {
        setClients(clients.map(i => i.id === currentId ? {...i, ...formData} : i));
        toast.success("Client Updated!", {theme: "colored"});
    } else {
        setClients([...clients, {...formData, id: Date.now()}]);
        toast.success("Client Added!", {theme: "colored"});
    }
    toggle();
  };

  const handleDelete = (id) => { if(confirm("Delete Client?")) { setClients(clients.filter(i => i.id !== id)); toast.success("Client Deleted!", {theme: "colored"}); }};
  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
  const GOLD = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Clients</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-between mb-4"><Input placeholder="Search..." className="rounded-pill" style={{maxWidth:'300px'}} onChange={e=>setSearchTerm(e.target.value)} /><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Client</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th className="text-end">Action</th></tr></thead><tbody>
          {filteredData.map(item => (<tr key={item.id}><td>{item.name}</td><td>{item.email}</td><td>{item.phone}</td><td>{item.address}</td><td className="text-end"><button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} Client</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Email</Label><Input value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} /></FormGroup>
            <FormGroup><Label>Phone</Label><Input value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} /></FormGroup>
            <FormGroup><Label>Address</Label><Input type="textarea" value={formData.address} onChange={e=>setFormData({...formData, address:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Clients;