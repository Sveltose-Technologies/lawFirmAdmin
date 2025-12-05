'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge } from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignTask = () => {
  const { tasks, setTasks } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", assignTo: "", priority: "Medium", dueDate: "", status: "Pending" });
  const toggle = () => { setModal(!modal); setFormData({ title: "", assignTo: "", priority: "Medium", dueDate: "", status: "Pending" }); };
  const GOLD = "#eebb5d";

  const handleSubmit = () => {
    if(!formData.title) return toast.error("Title Required!", {theme: "colored"});
    setTasks([...tasks, {...formData, id: Date.now()}]);
    toast.success("Task Assigned!", {theme: "colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete Task?")) { setTasks(tasks.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Assign Task</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Create Task</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Task</th><th>Assigned To</th><th>Priority</th><th>Due Date</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
          {(tasks || []).map(item => (<tr key={item.id}><td>{item.title}</td><td>{item.assignTo}</td><td><Badge color={item.priority==='High'?'danger':'warning'}>{item.priority}</Badge></td><td>{item.dueDate}</td><td>{item.status}</td><td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>New Task</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Task Title</Label><Input value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></FormGroup>
            <FormGroup><Label>Assign To</Label><Input value={formData.assignTo} onChange={e=>setFormData({...formData, assignTo:e.target.value})} /></FormGroup>
            <FormGroup><Label>Priority</Label><Input type="select" value={formData.priority} onChange={e=>setFormData({...formData, priority:e.target.value})}><option>High</option><option>Medium</option><option>Low</option></Input></FormGroup>
            <FormGroup><Label>Due Date</Label><Input type="date" value={formData.dueDate} onChange={e=>setFormData({...formData, dueDate:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Save Task</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default AssignTask;