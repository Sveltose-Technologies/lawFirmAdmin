'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourtroomMapping = () => {
  const GOLD = "#eebb5d";
  const [courts, setCourts] = useState([
    { id: 1, name: "High Court Delhi", room: "302", judge: "Justice Sharma" },
    { id: 2, name: "District Court", room: "105", judge: "Justice Verma" }
  ]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", room: "", judge: "" });

  const toggle = () => { setModal(!modal); setFormData({ name: "", room: "", judge: "" }); };
  const handleSubmit = () => {
    if(!formData.name) return toast.error("Court Name required", {theme:"colored"});
    setCourts([...courts, {...formData, id: Date.now()}]);
    toast.success("Courtroom Mapped!", {theme:"colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete?")) { setCourts(courts.filter(c => c.id !== id)); toast.success("Deleted!", {theme:"colored"}); } };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Courtroom Mapping</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Courtroom</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Court Name</th><th>Room No.</th><th>Judge</th><th className="text-end">Action</th></tr></thead><tbody>
            {courts.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td><td><span className="badge bg-secondary">{item.room}</span></td><td>{item.judge}</td>
                    <td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle}>Add Court Info</ModalHeader><ModalBody className="p-4">
        <Form>
            <FormGroup><Label>Court Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Room Number</Label><Input value={formData.room} onChange={e=>setFormData({...formData, room:e.target.value})} /></FormGroup>
            <FormGroup><Label>Judge Name</Label><Input value={formData.judge} onChange={e=>setFormData({...formData, judge:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Save Mapping</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default CourtroomMapping;