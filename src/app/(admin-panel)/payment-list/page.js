'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentList = () => {
  const { paymentList, setPaymentList } = useGlobalData();
  const GOLD = "#eebb5d";
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", amount: "", method: "Cash", status: "Paid" });

  const toggle = () => { setModal(!modal); setFormData({ name: "", amount: "", method: "Cash", status: "Paid" }); };

  const handleSubmit = () => {
    if (!formData.name) return toast.error("Payer Name required!", { theme: "colored" });
    setPaymentList([...paymentList, { ...formData, id: Date.now(), attorney: "System" }]);
    toast.success("Payment Recorded!", { theme: "colored" });
    toggle();
  };

  const handleDelete = (id) => { if(confirm("Delete Record?")) { setPaymentList(paymentList.filter(c => c.id !== id)); toast.success("Record deleted!", { theme: "colored" }); }};

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Payment History</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
          <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Record Payment</Button></div>
          <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Payer</th><th>Amount</th><th>Method</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
            {(paymentList || []).map((item) => (
                <tr key={item.id}>
                <td>{item.name}</td><td className="fw-bold">{item.amount}</td><td>{item.method}</td>
                <td><Badge color="success">{item.status}</Badge></td>
                <td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
          </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>Record Payment</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Payer Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Amount</Label><Input value={formData.amount} onChange={e=>setFormData({...formData, amount:e.target.value})} /></FormGroup>
            <FormGroup><Label>Method</Label><Input type="select" value={formData.method} onChange={e=>setFormData({...formData, method:e.target.value})}><option>Cash</option><option>Stripe</option><option>Paypal</option></Input></FormGroup>
            <Button block style={{backgroundColor:GOLD, border:'none'}} onClick={handleSubmit}>Save Record</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default PaymentList;