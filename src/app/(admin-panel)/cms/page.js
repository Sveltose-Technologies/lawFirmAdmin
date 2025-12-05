'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CMS = () => {
  const GOLD = "#eebb5d";
  const [pages, setPages] = useState([
    { id: 1, title: "About Us", slug: "about-us", status: "Active" },
    { id: 2, title: "Privacy Policy", slug: "privacy-policy", status: "Active" }
  ]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", slug: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const toggle = () => { setModal(!modal); if(!modal) setFormData({title:"", slug:"", content:""}); };

  const handleSubmit = () => {
    if(!formData.title) return toast.error("Title required", {theme:"colored"});
    if(isEditing) {
        setPages(pages.map(p => p.id === currentId ? {...p, ...formData} : p));
        toast.success("Page Updated!", {theme:"colored"});
    } else {
        setPages([...pages, {...formData, id: Date.now(), status: "Active"}]);
        toast.success("Page Created!", {theme:"colored"});
    }
    toggle();
  };

  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
  const handleDelete = (id) => { if(confirm("Delete Page?")) { setPages(pages.filter(p => p.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>CMS Pages</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Page</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Title</th><th>Slug</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
            {pages.map(item => (
                <tr key={item.id}>
                    <td>{item.title}</td><td>{item.slug}</td><td>{item.status}</td>
                    <td className="text-end">
                        <button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} size="lg"><ModalHeader toggle={toggle}>{isEditing?"Edit":"Add"} Page</ModalHeader><ModalBody className="p-4">
        <Form>
            <FormGroup><Label>Page Title</Label><Input value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></FormGroup>
            <FormGroup><Label>Slug</Label><Input value={formData.slug} onChange={e=>setFormData({...formData, slug:e.target.value})} /></FormGroup>
            <FormGroup><Label>Content</Label><Input type="textarea" rows="5" value={formData.content} onChange={e=>setFormData({...formData, content:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Save Page</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default CMS;