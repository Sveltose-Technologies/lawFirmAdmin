'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientCommunication = () => {
  const GOLD = "#eebb5d";
  const [msgs, setMsgs] = useState([
    { id: 1, sender: "Rahul Kumar", subject: "Hearing Date", msg: "When is my hearing?", status: "Unread" },
    { id: 2, sender: "Sneha", subject: "Documents", msg: "Attached documents.", status: "Read" }
  ]);
  const [modal, setModal] = useState(false);
  const [reply, setReply] = useState("");
  const [currentMsg, setCurrentMsg] = useState(null);

  const openReply = (msg) => { setCurrentMsg(msg); setModal(true); };
  const handleSend = () => {
    toast.success(`Reply sent to ${currentMsg.sender}`, {theme:"colored"});
    setModal(false); setReply("");
  };
  const handleDelete = (id) => { setMsgs(msgs.filter(m => m.id !== id)); toast.success("Message Deleted", {theme:"colored"}); };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Client Communication</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Sender</th><th>Subject</th><th>Message</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
            {msgs.map(item => (
                <tr key={item.id} className={item.status === 'Unread' ? 'fw-bold' : ''}>
                    <td>{item.sender}</td><td>{item.subject}</td><td className="text-truncate" style={{maxWidth:'200px'}}>{item.msg}</td>
                    <td><Badge color={item.status==='Unread'?'danger':'success'}>{item.status}</Badge></td>
                    <td className="text-end">
                        <button onClick={()=>openReply(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}>Reply</button>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger"><i className="bi bi-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={()=>setModal(!modal)} centered><ModalHeader toggle={()=>setModal(!modal)}>Reply to {currentMsg?.sender}</ModalHeader><ModalBody className="p-4">
        <Form>
            <p className="bg-light p-2 rounded small">Query: {currentMsg?.msg}</p>
            <FormGroup><Label>Your Reply</Label><Input type="textarea" rows="4" value={reply} onChange={e=>setReply(e.target.value)} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSend}>Send Reply</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default ClientCommunication;