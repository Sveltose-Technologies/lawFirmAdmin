'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlatformFees = () => {
  const GOLD = "#eebb5d";
  const [fees, setFees] = useState([
    { id: 1, type: "Consultation Commission", amount: "10%", status: "Active" },
    { id: 2, type: "Transaction Fee", amount: "$5", status: "Active" }
  ]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ type: "", amount: "", status: "Active" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const toggle = () => { setModal(!modal); setFormData({ type: "", amount: "", status: "Active" }); setIsEditing(false); };

  const handleSubmit = () => {
    if(!formData.type) return toast.error("Fee Type Required!", {theme:"colored"});
    if(isEditing) {
        setFees(fees.map(f => f.id === currentId ? {...f, ...formData} : f));
        toast.success("Fee Updated!", {theme:"colored"});
    } else {
        setFees([...fees, {...formData, id: Date.now()}]);
        toast.success("Fee Added!", {theme:"colored"});
    }
    toggle();
  };

  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
  const handleDelete = (id) => { if(confirm("Delete Fee?")) { setFees(fees.filter(f => f.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Platform Fees</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Fee Rule</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Fee Type</th><th>Amount / Percentage</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
            {fees.map(item => (
                <tr key={item.id}>
                    <td className="fw-bold">{item.type}</td><td>{item.amount}</td>
                    <td><Badge color={item.status==='Active'?'success':'secondary'}>{item.status}</Badge></td>
                    <td className="text-end">
                        <button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} Fee</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Fee Name</Label><Input value={formData.type} onChange={e=>setFormData({...formData, type:e.target.value})} /></FormGroup>
            <FormGroup><Label>Amount (e.g. 10% or $5)</Label><Input value={formData.amount} onChange={e=>setFormData({...formData, amount:e.target.value})} /></FormGroup>
            <FormGroup><Label>Status</Label><Input type="select" value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})}><option>Active</option><option>Inactive</option></Input></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default PlatformFees;