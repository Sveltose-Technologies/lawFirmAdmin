// 'use client';
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Badge } from "reactstrap";
// import { useGlobalData } from '../../../context/GlobalContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const OurCases = () => {
//   const { ourCases, setOurCases } = useGlobalData();
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
  
//   const [formData, setFormData] = useState({ title: "", client: "", attorney: "", status: "Ongoing" });

//   useEffect(() => {
//     setFilteredData((ourCases || []).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())));
//   }, [searchTerm, ourCases]);

//   const toggle = () => { setModal(!modal); if(!modal) { setFormData({ title: "", client: "", attorney: "", status: "Ongoing" }); setIsEditing(false); } };

//   const handleSubmit = () => {
//     if (!formData.title) return toast.error("Case Title is required!", { theme: "colored" });

//     if (isEditing) {
//       setOurCases(ourCases.map(item => item.id === currentId ? { ...item, ...formData } : item));
//       toast.success("Case updated successfully!", { theme: "colored" });
//     } else {
//       setOurCases([...ourCases, { ...formData, id: Date.now() }]);
//       toast.success("New Case added successfully!", { theme: "colored" });
//     }
//     toggle();
//   };

//   const handleDelete = (id) => {
//     if(confirm("Delete this case?")) {
//         setOurCases(ourCases.filter(c => c.id !== id));
//         toast.success("Case deleted!", { theme: "colored" });
//     }
//   };

//   const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
//   const GOLD = "#eebb5d";

//   return (
//     <div className="p-3 bg-light min-vh-100 font-sans">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Our Cases</h5></CardBody></Card>
//       <Card className="border-0 shadow-sm"><CardBody className="p-4">
//           <div className="d-flex justify-content-between mb-4">
//             <Input placeholder="Search Cases..." className="rounded-pill" style={{ maxWidth: '300px' }} onChange={(e)=>setSearchTerm(e.target.value)} />
//             <Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Add Case</Button>
//           </div>
//           <div className="table-responsive">
//             <Table className="align-middle text-nowrap">
//                 <thead className="table-light"><tr><th>#</th><th>Title</th><th>Client</th><th>Attorney</th><th>Status</th><th className="text-end">Action</th></tr></thead>
//                 <tbody>
//                 {filteredData.map((item, index) => (
//                     <tr key={item.id}>
//                     <td>{index + 1}</td><td>{item.title}</td><td>{item.client}</td><td>{item.attorney}</td>
//                     <td><Badge color={item.status === 'Ongoing' ? 'info' : 'success'}>{item.status}</Badge></td>
//                     <td className="text-end">
//                         <button onClick={() => handleEdit(item)} className="btn btn-sm me-2" style={{ color: GOLD, borderColor: GOLD }}><i className="bi bi-pencil"></i></button>
//                         <button onClick={() => handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
//                     </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </Table>
//           </div>
//       </CardBody></Card>
//       <Modal isOpen={modal} toggle={toggle} centered>
//         <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Case</ModalHeader>
//         <ModalBody className="p-4 pt-0">
//             <Form>
//                 <FormGroup><Label>Case Title</Label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /></FormGroup>
//                 <FormGroup><Label>Client Name</Label><Input value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} /></FormGroup>
//                 <FormGroup><Label>Attorney Name</Label><Input value={formData.attorney} onChange={(e) => setFormData({...formData, attorney: e.target.value})} /></FormGroup>
//                 <FormGroup><Label>Status</Label><Input type="select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option>Ongoing</option><option>Won</option><option>Lost</option></Input></FormGroup>
//                 <Button block style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>Save Case</Button>
//             </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };
// export default OurCases;




'use client';
import React, { useState, useEffect } from "react";
import { 
  Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, 
  Form, FormGroup, Label, Badge, Row, Col 
} from "reactstrap";
import { useGlobalData } from '@/context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OurCases = () => {
  const { ourCases, setOurCases } = useGlobalData();
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  const [formData, setFormData] = useState({ title: "", client: "", attorney: "", status: "Ongoing" });

  useEffect(() => {
    setFilteredData((ourCases || []).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, ourCases]);

  const toggle = () => { setModal(!modal); if(!modal) { setFormData({ title: "", client: "", attorney: "", status: "Ongoing" }); setIsEditing(false); } };

  const handleSubmit = () => {
    if (!formData.title) return toast.error("Case Title is required!", { theme: "colored" });

    if (isEditing) {
      setOurCases(ourCases.map(item => item.id === currentId ? { ...item, ...formData } : item));
      toast.success("Case updated successfully!", { theme: "colored" });
    } else {
      setOurCases([...ourCases, { ...formData, id: Date.now() }]);
      toast.success("New Case added successfully!", { theme: "colored" });
    }
    toggle();
  };

  const handleDelete = (id) => {
    if(confirm("Delete this case?")) {
        setOurCases(ourCases.filter(c => c.id !== id));
        toast.success("Case deleted!", { theme: "colored" });
    }
  };

  const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
  const GOLD = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Our Cases</h5></CardBody></Card>
      
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
          
          {/* RESPONSIVE LAYOUT FIX USING ROW/COL */}
          <Row className="mb-4 g-3 justify-content-between align-items-center">
            {/* Search Bar Column */}
            <Col xs={12} sm={6} md={4}>
                <Input 
                    placeholder="Search Cases..." 
                    className="rounded-pill" 
                    onChange={(e)=>setSearchTerm(e.target.value)} 
                    // No max-width here so it adapts to the column size, easier for mobile
                />
            </Col>
            
            {/* Button Column */}
            {/* xs={12} -> Mobile par Full Width 
                sm="auto" -> Desktop par Button content jitna bada */}
            <Col xs={12} sm="auto">
                <Button 
                    onClick={toggle} 
                    className="w-100" // Fills the column width
                    style={{ backgroundColor: GOLD, border: 'none' }}
                >
                    Add Case
                </Button>
            </Col>
          </Row>

          {/* Table Responsive Prop */}
          <Table responsive className="align-middle text-nowrap">
                <thead className="table-light"><tr><th>#</th><th>Title</th><th>Client</th><th>Attorney</th><th>Status</th><th className="text-end">Action</th></tr></thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{item.title}</td>
                    <td>{item.client}</td>
                    <td>{item.attorney}</td>
                    <td><Badge color={item.status === 'Ongoing' ? 'info' : 'success'}>{item.status}</Badge></td>
                    <td className="text-end">
                        <button onClick={() => handleEdit(item)} className="btn btn-sm me-2" style={{ color: GOLD, borderColor: GOLD }}><i className="bi bi-pencil"></i></button>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
                    </td>
                    </tr>
                ))}
                </tbody>
          </Table>
      </CardBody></Card>
      
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Case</ModalHeader>
        <ModalBody className="p-4 pt-0">
            <Form>
                <FormGroup><Label>Case Title</Label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /></FormGroup>
                <FormGroup><Label>Client Name</Label><Input value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} /></FormGroup>
                <FormGroup><Label>Attorney Name</Label><Input value={formData.attorney} onChange={(e) => setFormData({...formData, attorney: e.target.value})} /></FormGroup>
                <FormGroup><Label>Status</Label><Input type="select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option>Ongoing</option><option>Won</option><option>Lost</option></Input></FormGroup>
                <Button block style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>Save Case</Button>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default OurCases;