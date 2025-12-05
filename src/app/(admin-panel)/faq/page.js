'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Faq = () => {
  const { faqs, setFaqs } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const toggle = () => { setModal(!modal); setFormData({ question: "", answer: "" }); };
  const GOLD = "#eebb5d";

  const handleSubmit = () => {
    if(!formData.question) return toast.error("Question Required!", {theme: "colored"});
    setFaqs([...faqs, {...formData, id: Date.now()}]);
    toast.success("FAQ Added!", {theme: "colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete FAQ?")) { setFaqs(faqs.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>FAQ</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add FAQ</Button></div>
        <Table className="align-middle"><thead className="table-light"><tr><th>Question</th><th>Answer</th><th className="text-end">Action</th></tr></thead><tbody>
          {(faqs || []).map(item => (<tr key={item.id}><td className="fw-bold">{item.question}</td><td>{item.answer}</td><td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>Add FAQ</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Question</Label><Input value={formData.question} onChange={e=>setFormData({...formData, question:e.target.value})} /></FormGroup>
            <FormGroup><Label>Answer</Label><Input type="textarea" value={formData.answer} onChange={e=>setFormData({...formData, answer:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Faq;