'use client';
import React, { useState } from "react";
// --- FIXED IMPORT LINE (Added Row, Col) ---
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge, Row, Col } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DailyHearing = () => {
  const GOLD = "#eebb5d";
  const [data, setData] = useState([{ id: 1, caseTitle: "Rahul vs State", date: "2024-12-15", time: "10:00 AM", judge: "Justice Sharma", court: "High Court", status: "Scheduled" }]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ caseTitle: "", date: "", time: "", judge: "", court: "", status: "Scheduled" });

  const toggle = () => { setModal(!modal); if(!modal) { setFormData({ caseTitle: "", date: "", time: "", judge: "", court: "", status: "Scheduled" }); setIsEditing(false); } };

  const handleSubmit = () => {
    if (!formData.caseTitle) return toast.error("Case Title required!", { theme: "colored" });
    if (isEditing) { setData(data.map(item => item.id === currentId ? { ...item, ...formData } : item)); toast.success("Hearing Updated!", { theme: "colored" }); }
    else { setData([...data, { ...formData, id: Date.now() }]); toast.success("Hearing Scheduled!", { theme: "colored" }); }
    toggle();
  };

  const handleDelete = (id) => { if(confirm("Delete Hearing?")) { setData(data.filter(c => c.id !== id)); toast.success("Hearing Deleted!", { theme: "colored" }); }};
  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Daily Hearing</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
          <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Schedule Hearing</Button></div>
          <div className="table-responsive"><Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Case</th><th>Date/Time</th><th>Judge/Court</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
            {data.map((item) => (
                <tr key={item.id}>
                <td>{item.caseTitle}</td><td>{item.date} <br/><small className="text-muted">{item.time}</small></td><td>{item.judge}<br/><small>{item.court}</small></td>
                <td><Badge color="warning">{item.status}</Badge></td>
                <td className="text-end"><button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
          </tbody></Table></div>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Schedule"} Hearing</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Case Title</Label><Input value={formData.caseTitle} onChange={e=>setFormData({...formData, caseTitle:e.target.value})} /></FormGroup>
            
            {/* ROW AND COL USED HERE - NOW IT WILL WORK */}
            <Row>
                <Col md={6}><FormGroup><Label>Date</Label><Input type="date" value={formData.date} onChange={e=>setFormData({...formData, date:e.target.value})} /></FormGroup></Col>
                <Col md={6}><FormGroup><Label>Time</Label><Input type="time" value={formData.time} onChange={e=>setFormData({...formData, time:e.target.value})} /></FormGroup></Col>
            </Row>

            <FormGroup><Label>Judge Name</Label><Input value={formData.judge} onChange={e=>setFormData({...formData, judge:e.target.value})} /></FormGroup>
            <FormGroup><Label>Court Room</Label><Input value={formData.court} onChange={e=>setFormData({...formData, court:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor:GOLD, border:'none'}} onClick={handleSubmit}>Save Hearing</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default DailyHearing;