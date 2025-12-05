'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Expenses = () => {
  const { expenses, setExpenses } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", amount: "", date: "", status: "Pending" });
  const toggle = () => { setModal(!modal); setFormData({ title: "", amount: "", date: "", status: "Pending" }); };
  const GOLD = "#eebb5d";

  const handleSubmit = () => {
    if(!formData.title || !formData.amount) return toast.error("Details Required!", {theme: "colored"});
    setExpenses([...expenses, {...formData, id: Date.now()}]);
    toast.success("Expense Added!", {theme: "colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete?")) { setExpenses(expenses.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Expenses</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Expense</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Title</th><th>Amount</th><th>Date</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
          {(expenses || []).map(item => (<tr key={item.id}><td>{item.title}</td><td className="fw-bold">${item.amount}</td><td>{item.date}</td><td><Badge color={item.status==='Approved'?'success':'warning'}>{item.status}</Badge></td><td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>Add Expense</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Title</Label><Input value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></FormGroup>
            <FormGroup><Label>Amount</Label><Input type="number" value={formData.amount} onChange={e=>setFormData({...formData, amount:e.target.value})} /></FormGroup>
            <FormGroup><Label>Date</Label><Input type="date" value={formData.date} onChange={e=>setFormData({...formData, date:e.target.value})} /></FormGroup>
            <FormGroup><Label>Status</Label><Input type="select" value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})}><option>Pending</option><option>Approved</option><option>Rejected</option></Input></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Expenses;