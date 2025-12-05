'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CaseDocuments = () => {
  const GOLD = "#eebb5d";
  const [docs, setDocs] = useState([
    { id: 1, title: "FIR Copy", case: "Property Dispute", date: "2024-12-01" },
    { id: 2, title: "Evidence 1", case: "Criminal Case 102", date: "2024-12-05" }
  ]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", case: "" });

  const toggle = () => { setModal(!modal); setFormData({ title: "", case: "" }); };

  const handleSubmit = () => {
    if(!formData.title) return toast.error("Title required", {theme:"colored"});
    setDocs([...docs, {...formData, id: Date.now(), date: new Date().toISOString().split('T')[0]}]);
    toast.success("Document Uploaded!", {theme:"colored"});
    toggle();
  };

  const handleDelete = (id) => { if(confirm("Delete Document?")) { setDocs(docs.filter(d => d.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Case Documents</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Upload Document</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Document Title</th><th>Related Case</th><th>Date</th><th className="text-end">Action</th></tr></thead><tbody>
            {docs.map(item => (
                <tr key={item.id}>
                    <td><i className="bi bi-file-earmark-text me-2 text-primary"></i>{item.title}</td><td>{item.case}</td><td>{item.date}</td>
                    <td className="text-end">
                        <button className="btn btn-sm text-success me-2"><i className="bi bi-download"></i></button>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger"><i className="bi bi-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle}>Upload Document</ModalHeader><ModalBody className="p-4">
        <Form>
            <FormGroup><Label>Document Title</Label><Input value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></FormGroup>
            <FormGroup><Label>Related Case</Label><Input value={formData.case} onChange={e=>setFormData({...formData, case:e.target.value})} placeholder="Enter Case Name or ID" /></FormGroup>
            <FormGroup><Label>File</Label><Input type="file" /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Upload</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default CaseDocuments;