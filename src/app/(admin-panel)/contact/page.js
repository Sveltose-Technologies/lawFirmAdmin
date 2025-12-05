'use client';
import React from "react";
import { Card, CardBody, Table, Button } from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { contacts, setContacts } = useGlobalData();
  const GOLD = "#eebb5d";
  const handleDelete = (id) => { if(confirm("Delete Message?")) { setContacts(contacts.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Contact Messages</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Name</th><th>Email</th><th>Message</th><th className="text-end">Action</th></tr></thead><tbody>
          {(contacts || []).map(item => (<tr key={item.id}><td>{item.name}</td><td>{item.email}</td><td>{item.msg}</td><td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td></tr>))}
        </tbody></Table>
      </CardBody></Card>
    </div>
  );
};
export default Contact;