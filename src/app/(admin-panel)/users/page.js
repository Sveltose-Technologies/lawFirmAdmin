// 'use client';
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge } from "reactstrap";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Users = () => {
//   const GOLD = "#eebb5d";
//   // Local Mock Data
//   const [data, setData] = useState([{ id: 1, name: "Super Admin", email: "admin@law.com", role: "Admin", status: "Active" }]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [formData, setFormData] = useState({ name: "", email: "", role: "Staff", status: "Active" });

//   const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   const toggle = () => { setModal(!modal); if(!modal) { setFormData({ name: "", email: "", role: "Staff", status: "Active" }); setIsEditing(false); } };

//   const handleSubmit = () => {
//     if (!formData.name || !formData.email) return toast.error("Name & Email required!", { theme: "colored" });
//     if (isEditing) {
//       setData(data.map(item => item.id === currentId ? { ...item, ...formData } : item));
//       toast.success("User updated!", { theme: "colored" });
//     } else {
//       setData([...data, { ...formData, id: Date.now() }]);
//       toast.success("User added!", { theme: "colored" });
//     }
//     toggle();
//   };

//   const handleDelete = (id) => {
//     if(confirm("Delete User?")) { setData(data.filter(c => c.id !== id)); toast.success("User deleted!", { theme: "colored" }); }
//   };

//   const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

//   return (
//     <div className="p-3 bg-light min-vh-100 font-sans">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>System Users</h5></CardBody></Card>
//       <Card className="border-0 shadow-sm"><CardBody className="p-4">
//           <div className="d-flex justify-content-between mb-4">
//             <Input placeholder="Search Users..." className="rounded-pill" style={{ maxWidth: '300px' }} onChange={(e)=>setSearchTerm(e.target.value)} />
//             <Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Add User</Button>
//           </div>
//           <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
//             {filteredData.map((item) => (
//                 <tr key={item.id}>
//                 <td>{item.name}</td><td>{item.email}</td><td>{item.role}</td>
//                 <td><Badge color={item.status==='Active'?'success':'secondary'}>{item.status}</Badge></td>
//                 <td className="text-end"><button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
//                 </tr>
//             ))}
//           </tbody></Table>
//       </CardBody></Card>
//       <Modal isOpen={modal} toggle={toggle} centered><ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} User</ModalHeader><ModalBody className="p-4 pt-0">
//         <Form>
//             <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
//             <FormGroup><Label>Email</Label><Input value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} /></FormGroup>
//             <FormGroup><Label>Role</Label><Input type="select" value={formData.role} onChange={e=>setFormData({...formData, role:e.target.value})}><option>Admin</option><option>Staff</option><option>Attorney</option></Input></FormGroup>
//             <Button block style={{backgroundColor:GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
//         </Form>
//       </ModalBody></Modal>
//     </div>
//   );
// };
// export default Users;

'use client';
import React, { useState } from "react";
import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const GOLD = "#eebb5d";
  // Local Mock Data
  const [data, setData] = useState([{ id: 1, name: "Super Admin", email: "admin@law.com", role: "Admin", status: "Active" }]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", role: "Staff", status: "Active" });

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggle = () => { setModal(!modal); if(!modal) { setFormData({ name: "", email: "", role: "Staff", status: "Active" }); setIsEditing(false); } };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) return toast.error("Name & Email required!", { theme: "colored" });
    if (isEditing) {
      setData(data.map(item => item.id === currentId ? { ...item, ...formData } : item));
      toast.success("User updated!", { theme: "colored" });
    } else {
      setData([...data, { ...formData, id: Date.now() }]);
      toast.success("User added!", { theme: "colored" });
    }
    toggle();
  };

  const handleDelete = (id) => {
    if(confirm("Delete User?")) { setData(data.filter(c => c.id !== id)); toast.success("User deleted!", { theme: "colored" }); }
  };

  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>System Users</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
          
          {/* RESPONSIVE LAYOUT: Stacks on mobile, Row on desktop */}
          <div className="d-flex flex-column flex-sm-row justify-content-between mb-4 gap-3">
            {/* Search Wrapper */}
            <div className="w-100" style={{ maxWidth: '300px' }}>
                <Input 
                    placeholder="Search Users..." 
                    className="rounded-pill" 
                    onChange={(e)=>setSearchTerm(e.target.value)} 
                />
            </div>
            
            {/* Button Wrapper: Ensures button is auto-width on desktop, full on mobile */}
            <div>
                <Button 
                    onClick={toggle} 
                    className="w-100" // Fills the wrapper div (wrapper stretches on mobile)
                    style={{ backgroundColor: GOLD, border: 'none', whiteSpace: 'nowrap' }}
                >
                    Add User
                </Button>
            </div>
          </div>

          {/* Table Responsive Prop Added */}
          <Table responsive className="align-middle text-nowrap">
            <thead className="table-light"><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th className="text-end">Action</th></tr></thead>
            <tbody>
            {filteredData.map((item) => (
                <tr key={item.id}>
                <td>{item.name}</td><td>{item.email}</td><td>{item.role}</td>
                <td><Badge color={item.status==='Active'?'success':'secondary'}>{item.status}</Badge></td>
                <td className="text-end"><button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
            </tbody>
          </Table>
      </CardBody></Card>
      
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} User</ModalHeader>
        <ModalBody className="p-4 pt-0">
        <Form>
            <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
            <FormGroup><Label>Email</Label><Input value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} /></FormGroup>
            <FormGroup><Label>Role</Label><Input type="select" value={formData.role} onChange={e=>setFormData({...formData, role:e.target.value})}><option>Admin</option><option>Staff</option><option>Attorney</option></Input></FormGroup>
            <Button block style={{backgroundColor:GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </ModalBody></Modal>
    </div>
  );
};
export default Users;