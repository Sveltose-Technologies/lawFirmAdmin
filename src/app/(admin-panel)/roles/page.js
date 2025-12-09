// 'use client';
// import React, { useState } from "react";
// import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Roles = () => {
//   const GOLD = "#eebb5d";
//   const [roles, setRoles] = useState([
//     { id: 1, name: "Super Admin", desc: "Full Access" },
//     { id: 2, name: "Attorney", desc: "Legal Access" }
//   ]);
//   const [modal, setModal] = useState(false);
//   const [formData, setFormData] = useState({ name: "", desc: "" });

//   const toggle = () => { setModal(!modal); setFormData({ name: "", desc: "" }); };
//   const handleSubmit = () => {
//     if(!formData.name) return toast.error("Role Name Required!", {theme:"colored"});
//     setRoles([...roles, {...formData, id: Date.now()}]);
//     toast.success("Role Created!", {theme:"colored"});
//     toggle();
//   };
//   const handleDelete = (id) => { if(confirm("Delete Role?")) { setRoles(roles.filter(r => r.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>User Roles</h5></CardBody></Card>
//       <Card className="border-0 shadow-sm"><CardBody className="p-4">
//         <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Create Role</Button></div>
//         <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Name</th><th>Description</th><th className="text-end">Action</th></tr></thead><tbody>
//             {roles.map(item => (
//                 <tr key={item.id}>
//                     <td className="fw-bold">{item.name}</td><td>{item.desc}</td>
//                     <td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
//                 </tr>
//             ))}
//         </tbody></Table>
//       </CardBody></Card>
//       <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle}>Create Role</ModalHeader><ModalBody className="p-4">
//         <Form>
//             <FormGroup><Label>Role Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
//             <FormGroup><Label>Description</Label><Input type="textarea" value={formData.desc} onChange={e=>setFormData({...formData, desc:e.target.value})} /></FormGroup>
//             <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
//         </Form>
//       </ModalBody></Modal>
//     </div>
//   );
// };
// export default Roles;


'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Row, Col } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
  const GOLD = "#eebb5d";
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin", desc: "Full Access" },
    { id: 2, name: "Attorney", desc: "Legal Access" }
  ]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", desc: "" });

  const toggle = () => { setModal(!modal); setFormData({ name: "", desc: "" }); };
  const handleSubmit = () => {
    if(!formData.name) return toast.error("Role Name Required!", {theme:"colored"});
    setRoles([...roles, {...formData, id: Date.now()}]);
    toast.success("Role Created!", {theme:"colored"});
    toggle();
  };
  const handleDelete = (id) => { if(confirm("Delete Role?")) { setRoles(roles.filter(r => r.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>User Roles</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        
        {/* FIX: Using Reactstrap Row/Col for perfect resizing */}
        <Row className="mb-4 justify-content-end">
            {/* 
               xs={12} -> Mobile par Column 100% width lega.
               sm="auto" -> Desktop/Tablet par Column sirf content jitna bada hoga.
            */}
            <Col xs={12} sm="auto">
                <Button 
                    onClick={toggle} 
                    className="w-100" // Button apne Column ko fill karega (Mobile: Full, Desktop: Auto)
                    style={{backgroundColor: GOLD, border:'none'}}
                >
                    Create Role
                </Button>
            </Col>
        </Row>

        <Table responsive className="align-middle text-nowrap">
            <thead className="table-light"><tr><th>Name</th><th>Description</th><th className="text-end">Action</th></tr></thead>
            <tbody>
            {roles.map(item => (
                <tr key={item.id}>
                    <td className="fw-bold">{item.name}</td><td>{item.desc}</td>
                    <td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
            </tbody>
        </Table>
      </CardBody></Card>
      <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle}>Create Role</ModalHeader><ModalBody className="p-4">
        <Form>
            <FormGroup><Label>Role Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Description</Label><Input type="textarea" value={formData.desc} onChange={e=>setFormData({...formData, desc:e.target.value})} /></FormGroup>
            <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Roles;