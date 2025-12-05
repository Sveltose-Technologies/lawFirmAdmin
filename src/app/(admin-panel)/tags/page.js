'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tags = () => {
  const { tags, setTags } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const toggle = () => { setModal(!modal); setFormData({ name: "" }); };
  const GOLD = "#eebb5d";

  const handleSubmit = () => {
    if(!formData.name) return toast.error("Name Required!", {theme: "colored"});
    setTags([...tags, {...formData, id: Date.now()}]);
    toast.success("Tag Added!", {theme: "colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete?")) { setTags(tags.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Tags</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Tag</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Name</th><th className="text-end">Action</th></tr></thead><tbody>
          {(tags || []).map(item => (<tr key={item.id}><td>{item.name}</td><td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>Add Tag</ModalHeader><ModalBody className="p-4 pt-0">
        <Form><FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup><Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button></Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Tags;