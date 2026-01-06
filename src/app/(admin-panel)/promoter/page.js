// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
// //   Form, FormGroup, Label, Input, Row, Col, Badge
// // } from 'reactstrap';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // import authService from '@/services/authService';

// // const PromoterPage = () => {
// //   const GOLD = '#eebb5d';
// //   const LIGHT_GOLD = '#fdf8ef';

// //   const [dataList, setDataList] = useState([]);
// //   const [modal, setModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentId, setCurrentId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     bannerImage: null,
// //     personImage: null,
// //     personName: '',
// //     designation: '',
// //     specialization: '',
// //   });

// //   useEffect(() => { fetchData(); }, []);

// //   const fetchData = async () => {
// //     const res = await authService.getAllPromoters();
// //     if (res.success) {
// //       setDataList(Array.isArray(res.data.data) ? res.data.data : []);
// //     }
// //   };

// //   const toggle = () => {
// //     setModal(!modal);
// //     if (!modal) {
// //       setFormData({
// //         bannerImage: null, personImage: null,
// //         personName: '', designation: '', specialization: ''
// //       });
// //       setIsEditing(false);
// //     }
// //   };

// //   const handleFileChange = (e, field) => {
// //     setFormData({ ...formData, [field]: e.target.files[0] });
// //   };

// //   const handleSubmit = async () => {
// //     if (!formData.personName || !formData.designation) {
// //       return toast.error("Name and Designation are required!");
// //     }

// //     const user = authService.getCurrentUser();
// //     const data = new FormData();
// //     data.append('adminId', user?.id || 3);
// //     data.append('personName', formData.personName);
// //     data.append('designation', formData.designation);
// //     data.append('specialization', formData.specialization);

// //     if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);
// //     if (formData.personImage) data.append('personImage', formData.personImage);

// //     try {
// //       const res = isEditing 
// //         ? await authService.updatePromoter(currentId, data)
// //         : await authService.createPromoter(data);

// //       if (res.success) {
// //         toast.success(`Promoter ${isEditing ? 'Updated' : 'Created'} Successfully!`);
// //         fetchData();
// //         toggle();
// //       } else {
// //         toast.error(res.message || "Operation failed");
// //       }
// //     } catch (error) {
// //       toast.error("Internal Server Error (500)");
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setFormData({
// //       personName: item.personName,
// //       designation: item.designation,
// //       specialization: item.specialization,
// //       bannerImage: null,
// //       personImage: null
// //     });
// //     setCurrentId(item.id);
// //     setIsEditing(true);
// //     setModal(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this promoter?")) {
// //       const res = await authService.deletePromoter(id);
// //       if (res.success) {
// //         toast.success("Deleted!");
// //         fetchData();
// //       }
// //     }
// //   };

// //   return (
// //     <div className="p-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
// //       <ToastContainer theme="colored" />
      
// //       {/* Header Area */}
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <div>
// //           <h4 className="fw-bold mb-0">Promoters Management</h4>
// //           <p className="text-muted small mb-0">Manage key people and leadership profiles</p>
// //         </div>
// //         <Button 
// //           className="px-4 fw-bold shadow-sm"
// //           style={{ backgroundColor: GOLD, border: 'none', borderRadius: '8px' }} 
// //           onClick={toggle}
// //         >
// //           + Add Promoter
// //         </Button>
// //       </div>

// //       {/* Table Card */}
// //       <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
// //         <CardBody className="p-0">
// //           <Table hover responsive className="align-middle mb-0">
// //             <thead style={{ backgroundColor: LIGHT_GOLD }}>
// //               <tr>
// //                 <th className="py-3 px-4">Profile</th>
// //                 <th>Full Name</th>
// //                 <th>Designation</th>
// //                 <th>Specialization</th>
// //                 <th className="text-end px-4">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {dataList.length === 0 ? (
// //                 <tr><td colSpan="5" className="py-5 text-center text-muted">No promoters found.</td></tr>
// //               ) : (
// //                 dataList.map((item) => (
// //                   <tr key={item.id} className="border-bottom">
// //                     <td className="py-3 px-4">
// //                       <img 
// //                         src={authService.getImgUrl(item.personImage)} 
// //                         alt="Profile" 
// //                         style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%', border: `2px solid ${GOLD}` }} 
// //                       />
// //                     </td>
// //                     <td><div className="fw-bold text-dark">{item.personName}</div></td>
// //                     <td><Badge color="light" className="text-dark border">{item.designation}</Badge></td>
// //                     <td><small className="text-muted">{item.specialization}</small></td>
// //                     <td className="text-end px-4">
// //                       <Button size="sm" color="light" className="me-2 border shadow-sm" onClick={() => handleEdit(item)}>✏️</Button>
// //                       <Button size="sm" color="light" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </Table>
// //         </CardBody>
// //       </Card>

// //       {/* MODAL */}
// //       <Modal isOpen={modal} toggle={toggle} size="lg" centered>
// //         <ModalHeader toggle={toggle} className="border-0">
// //           <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? 'Edit' : 'Add'} Promoter Profile</span>
// //         </ModalHeader>
// //         <ModalBody className="px-4 pb-4">
// //           <Form>
// //             <Row>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label className="small fw-bold">Full Name</Label>
// //                   <Input type="text" value={formData.personName} onChange={(e)=>setFormData({...formData, personName: e.target.value})} placeholder="Enter name" />
// //                 </FormGroup>
// //               </Col>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label className="small fw-bold">Designation</Label>
// //                   <Input type="text" value={formData.designation} onChange={(e)=>setFormData({...formData, designation: e.target.value})} placeholder="e.g. Managing Director" />
// //                 </FormGroup>
// //               </Col>
// //             </Row>

// //             <FormGroup>
// //               <Label className="small fw-bold">Specialization</Label>
// //               <Input type="textarea" rows="2" value={formData.specialization} onChange={(e)=>setFormData({...formData, specialization: e.target.value})} placeholder="e.g. Corporate Law, Mergers & Acquisitions" />
// //             </FormGroup>

// //             <Row>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label className="small fw-bold">Person Profile Image</Label>
// //                   <Input type="file" onChange={(e)=>handleFileChange(e, 'personImage')} />
// //                 </FormGroup>
// //               </Col>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label className="small fw-bold">Banner Image</Label>
// //                   <Input type="file" onChange={(e)=>handleFileChange(e, 'bannerImage')} />
// //                 </FormGroup>
// //               </Col>
// //             </Row>

// //             {/* Buttons: Left Aligned, Small, Same Width */}
// //             <div className="mt-4 d-flex justify-content-start gap-2">
// //               <Button 
// //                 onClick={handleSubmit}
// //                 style={{ backgroundColor: GOLD, border: 'none', width: '120px' }} 
// //                 className="btn-sm fw-bold shadow-sm"
// //               >
// //                 {isEditing ? 'Update' : 'Save'}
// //               </Button>
// //               <Button 
// //                 outline 
// //                 onClick={toggle}
// //                 style={{ width: '120px', color: '#666', borderColor: '#ccc' }} 
// //                 className="btn-sm fw-bold shadow-sm"
// //               >
// //                 Cancel
// //               </Button>
// //             </div>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default PromoterPage;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
//   Form, FormGroup, Label, Input, Row, Col, Badge
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Custom Components
// import PaginationComponent from '../../../context/Pagination';
// import authService from '@/services/authService';

// const PromoterPage = () => {
//   const GOLD = '#eebb5d';
//   const LIGHT_GOLD = '#fdf8ef';

//   const [dataList, setDataList] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const [formData, setFormData] = useState({
//     bannerImage: null,
//     personImage: null,
//     personName: '',
//     designation: '',
//     specialization: '',
//   });

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     const res = await authService.getAllPromoters();
//     if (res.success) {
//       setDataList(Array.isArray(res.data.data) ? res.data.data : []);
//     }
//   };

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({
//         bannerImage: null, personImage: null,
//         personName: '', designation: '', specialization: ''
//       });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const handleFileChange = (e, field) => {
//     setFormData({ ...formData, [field]: e.target.files[0] });
//   };

//   const handleSubmit = async () => {
//     if (!formData.personName || !formData.designation) {
//       return toast.error("Name and Designation are required!");
//     }

//     const user = authService.getCurrentUser();
//     const data = new FormData();
//     data.append('adminId', user?.id || 3);
//     data.append('personName', formData.personName);
//     data.append('designation', formData.designation);
//     data.append('specialization', formData.specialization);

//     if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);
//     if (formData.personImage) data.append('personImage', formData.personImage);

//     try {
//       const res = isEditing 
//         ? await authService.updatePromoter(currentId, data)
//         : await authService.createPromoter(data);

//       if (res.success) {
//         toast.success(`Promoter ${isEditing ? 'Updated' : 'Created'} Successfully!`);
//         fetchData();
//         toggle();
//       } else {
//         toast.error(res.message || "Operation failed");
//       }
//     } catch (error) {
//       toast.error("Internal Server Error (500)");
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       personName: item.personName,
//       designation: item.designation,
//       specialization: item.specialization,
//       bannerImage: null,
//       personImage: null
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this promoter?")) {
//       const res = await authService.deletePromoter(id);
//       if (res.success) {
//         toast.success("Deleted!");
//         fetchData();
//       }
//     }
//   };

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
//       <ToastContainer theme="colored" />
      
//       {/* Header Area */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Promoters Management</h4>
//           <p className="text-muted small mb-0">Manage key leadership profiles and specialists.</p>
//         </div>
//         <Button className="btn-gold px-4" onClick={toggle}>
//           + Add Promoter
//         </Button>
//       </div>

//       {/* Table Card */}
//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <Table hover responsive className="align-middle mb-0">
//             <thead style={{ backgroundColor: LIGHT_GOLD }}>
//               <tr>
//                 <th className="py-3 px-4">Profile</th>
//                 <th>Full Name</th>
//                 <th>Designation</th>
//                 <th>Specialization</th>
//                 <th className="text-end px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length === 0 ? (
//                 <tr><td colSpan="5" className="py-5 text-center text-muted">No records found.</td></tr>
//               ) : (
//                 currentItems.map((item) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="py-3 px-4">
//                       {/* Rectangular Profile Image */}
//                       <img 
//                         src={authService.getImgUrl(item.personImage)} 
//                         alt="Profile" 
//                         style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} 
//                         className="border shadow-sm"
//                       />
//                     </td>
//                     <td><div className="fw-bold text-dark">{item.personName}</div></td>
//                     <td><Badge color="light" className="text-dark border px-2 py-1">{item.designation}</Badge></td>
//                     <td><small className="text-muted">{item.specialization}</small></td>
//                     <td className="text-end px-4">
//                       <Button size="sm" color="white" className="me-2 border shadow-sm" onClick={() => handleEdit(item)}>✏️</Button>
//                       <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       {/* Pagination Component */}
//       <PaginationComponent 
//         totalItems={dataList.length} 
//         itemsPerPage={itemsPerPage} 
//         currentPage={currentPage} 
//         onPageChange={(page) => setCurrentPage(page)} 
//       />

//       {/* MODAL */}
//       <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
//         <ModalHeader toggle={toggle} className="border-0 pb-0">
//           <span className="fw-bold h5" style={{ color: GOLD }}>
//             {isEditing ? 'Edit Promoter' : 'Add New Promoter'}
//           </span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form>
//             <Row className="gy-3">
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label>Full Name</Label>
//                   <Input type="text" value={formData.personName} onChange={(e)=>setFormData({...formData, personName: e.target.value})} placeholder="Enter full name" required />
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label>Designation</Label>
//                   <Input type="text" value={formData.designation} onChange={(e)=>setFormData({...formData, designation: e.target.value})} placeholder="e.g. Founder & CEO" required />
//                 </FormGroup>
//               </Col>

//               <Col xs={12}>
//                 <FormGroup>
//                   <Label>Specialization</Label>
//                   <Input type="textarea" rows="2" value={formData.specialization} onChange={(e)=>setFormData({...formData, specialization: e.target.value})} placeholder="Describe area of expertise..." />
//                 </FormGroup>
//               </Col>

//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label>Profile Image (Rectangular)</Label>
//                   <Input type="file" onChange={(e)=>handleFileChange(e, 'personImage')} />
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label>Banner Image (Rectangular)</Label>
//                   <Input type="file" onChange={(e)=>handleFileChange(e, 'bannerImage')} />
//                 </FormGroup>
//               </Col>
//             </Row>

//             {/* Action Buttons: Left Aligned, Global Gold Style */}
//             <div className="mt-4 d-flex justify-content-start gap-2">
//               <Button 
//                 className="btn-gold"
//                 style={{ width: '130px' }} 
//                 onClick={handleSubmit}
//               >
//                 {isEditing ? 'Update' : 'Save'}
//               </Button>
//               <Button 
//                 outline 
//                 className="fw-bold"
//                 style={{ width: '130px', color: '#666', borderColor: '#ccc' }} 
//                 onClick={toggle}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default PromoterPage;

'use client';
import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Row, Col, Badge
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Components
import PaginationComponent from '../../../context/Pagination';
import authService from '@/services/authService';

const PromoterPage = () => {
  const GOLD = '#eebb5d';
  const LIGHT_GOLD = '#fdf8ef';

  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // 🔹 Search State
  const [search, setSearch] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    bannerImage: null,
    personImage: null,
    personName: '',
    designation: '',
    specialization: '',
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await authService.getAllPromoters();
    if (res.success) {
      setDataList(Array.isArray(res.data.data) ? res.data.data : []);
    }
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        bannerImage: null,
        personImage: null,
        personName: '',
        designation: '',
        specialization: ''
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleFileChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!formData.personName || !formData.designation) {
      return toast.error("Name and Designation are required!");
    }

    const user = authService.getCurrentUser();
    const data = new FormData();
    data.append('adminId', user?.id || 3);
    data.append('personName', formData.personName);
    data.append('designation', formData.designation);
    data.append('specialization', formData.specialization);

    if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);
    if (formData.personImage) data.append('personImage', formData.personImage);

    try {
      const res = isEditing
        ? await authService.updatePromoter(currentId, data)
        : await authService.createPromoter(data);

      if (res.success) {
        toast.success(`Promoter ${isEditing ? 'Updated' : 'Created'} Successfully!`);
        fetchData();
        toggle();
      } else {
        toast.error(res.message || "Operation failed");
      }
    } catch (error) {
      toast.error("Internal Server Error (500)");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      personName: item.personName,
      designation: item.designation,
      specialization: item.specialization,
      bannerImage: null,
      personImage: null
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promoter?")) {
      const res = await authService.deletePromoter(id);
      if (res.success) {
        toast.success("Deleted!");
        fetchData();
      }
    }
  };

  // 🔹 SEARCH FILTER
  const filteredData = dataList.filter((item) =>
    item.personName?.toLowerCase().includes(search.toLowerCase()) ||
    item.designation?.toLowerCase().includes(search.toLowerCase()) ||
    item.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination Logic (filtered data)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer theme="colored" />

      {/* Header Area */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Promoters Management</h4>
          <p className="text-muted small mb-0">Manage key leadership profiles and specialists.</p>
        </div>
        <Button className="btn-gold px-4" onClick={toggle}>
          + Add Promoter
        </Button>
      </div>

      {/* 🔹 Search Input */}
   <Row className="mb-3">
  <Col xs="12" md="4" lg="3">
    <Input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </Col>
</Row>


      {/* Table Card */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="py-3 px-4">S.No</th>
                <th className="py-3 px-4">Profile</th>
                <th>Full Name</th>
                <th>Designation</th>
                <th>Specialization</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-5 text-center text-muted">
                    No records found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="border-bottom">
                    {/* 🔹 Serial Number */}
                    <td className="py-3 px-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <img
                        src={authService.getImgUrl(item.personImage)}
                        alt="Profile"
                        style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }}
                        className="border shadow-sm"
                      />
                    </td>
                    <td><div className="fw-bold text-dark">{item.personName}</div></td>
                    <td>
                      <Badge color="light" className="text-dark border px-2 py-1">
                        {item.designation}
                      </Badge>
                    </td>
                    <td><small className="text-muted">{item.specialization}</small></td>
                    <td className="text-end px-4">
                      <Button size="sm" color="white" className="me-2 border shadow-sm" onClick={() => handleEdit(item)}>✏️</Button>
                      <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Pagination */}
      <PaginationComponent
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader toggle={toggle} className="border-0 pb-0">
          <span className="fw-bold h5" style={{ color: GOLD }}>
            {isEditing ? 'Edit Promoter' : 'Add New Promoter'}
          </span>
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form>
            <Row className="gy-3">
              <Col md={6}>
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={formData.personName}
                    onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Designation</Label>
                  <Input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label>Specialization</Label>
                  <Input
                    type="textarea"
                    rows="2"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <Input type="file" onChange={(e) => handleFileChange(e, 'personImage')} />
              </Col>
              <Col md={6}>
                <Input type="file" onChange={(e) => handleFileChange(e, 'bannerImage')} />
              </Col>
            </Row>

            <div className="mt-4 d-flex gap-2">
              <Button className="btn-gold" onClick={handleSubmit}>
                {isEditing ? 'Update' : 'Save'}
              </Button>
              <Button outline onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PromoterPage;
