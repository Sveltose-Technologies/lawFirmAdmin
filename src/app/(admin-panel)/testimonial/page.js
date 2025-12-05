'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Testimonial = () => {
  const { testimonials, setTestimonials } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", msg: "", rating: 5 });
  const toggle = () => { setModal(!modal); setFormData({ name: "", msg: "", rating: 5 }); };
  const GOLD = "#eebb5d";

  const handleSubmit = () => {
    if(!formData.name) return toast.error("Name Required!", {theme: "colored"});
    setTestimonials([...testimonials, {...formData, id: Date.now()}]);
    toast.success("Testimonial Added!", {theme: "colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete?")) { setTestimonials(testimonials.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Testimonials</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Testimonial</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Name</th><th>Message</th><th>Rating</th><th className="text-end">Action</th></tr></thead><tbody>
          {(testimonials || []).map(item => (<tr key={item.id}><td>{item.name}</td><td>{item.msg}</td><td>{item.rating} ⭐</td><td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>Add Testimonial</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Message</Label><Input type="textarea" value={formData.msg} onChange={e=>setFormData({...formData, msg:e.target.value})} /></FormGroup>
            <FormGroup><Label>Rating (1-5)</Label><Input type="number" min="1" max="5" value={formData.rating} onChange={e=>setFormData({...formData, rating:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Testimonial;