'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogCategory = () => {
  const GOLD = "#eebb5d";
  const [categories, setCategories] = useState([
    { id: 1, name: "Legal Advice" },
    { id: 2, name: "Corporate Law" }
  ]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const toggle = () => { setModal(!modal); setFormData({ name: "" }); setIsEditing(false); };

  const handleSubmit = () => {
    if(!formData.name) return toast.error("Name Required!", {theme:"colored"});
    if(isEditing) {
        setCategories(categories.map(c => c.id === currentId ? {...c, ...formData} : c));
        toast.success("Updated!", {theme:"colored"});
    } else {
        setCategories([...categories, {...formData, id: Date.now()}]);
        toast.success("Added!", {theme:"colored"});
    }
    toggle();
  };

  const handleDelete = (id) => { if(confirm("Delete?")) { setCategories(categories.filter(c => c.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};
  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Blog Categories</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Category</Button></div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Category Name</th><th className="text-end">Action</th></tr></thead><tbody>
            {categories.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="text-end">
                        <button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} Category</ModalHeader><ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default BlogCategory;