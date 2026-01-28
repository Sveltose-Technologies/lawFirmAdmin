


// 'use client';
// import React, { useEffect, useState, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import {
//   Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
//   Form, FormGroup, Label, Input, Row, Col, Badge
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Custom Components
// import PaginationComponent from '../../../context/Pagination';
// import authService from '@/services/authService';

// // Rich Text Editor with Next.js Fix
// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), { 
//   ssr: false,
//   loading: () => <div className="p-3 text-center border rounded small">Loading Editor...</div>
// });

// const AwardPage = () => {
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
//     personName: '',
//     organization: '',
//     year: '',
//     awardTitle: '',
//     details: ''
//   });

//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['clean']
//     ],
//   }), []);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     const res = await authService.getAllAwards();
//     if (res.success) {
//       setDataList(Array.isArray(res.data.data) ? res.data.data : []);
//     }
//   };

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({
//         bannerImage: null, personName: '', organization: '',
//         year: '', awardTitle: '', details: ''
//       });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.awardTitle || !formData.year) {
//       return toast.error("Title and Year are required!");
//     }

//     const user = authService.getCurrentUser();
//     const data = new FormData();
//     data.append('adminId', user?.id || 3);
//     data.append('personName', formData.personName);
//     data.append('organization', formData.organization);
//     data.append('year', formData.year);
//     data.append('awardTitle', formData.awardTitle);
//     data.append('details', formData.details);

//     if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);

//     const res = isEditing 
//       ? await authService.updateAward(currentId, data)
//       : await authService.createAward(data);

//     if (res.success) {
//       toast.success(`Award ${isEditing ? 'Updated' : 'Created'} Successfully!`);
//       fetchData();
//       toggle();
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       personName: item.personName,
//       organization: item.organization,
//       year: item.year,
//       awardTitle: item.awardTitle,
//       details: item.details,
//       bannerImage: null 
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this award?")) {
//       const res = await authService.deleteAward(id);
//       if (res.success) {
//         toast.success("Award Deleted!");
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
      
//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Awards & Recognition</h4>
//           <p className="text-muted small mb-0">Manage firm and individual achievements.</p>
//         </div>
//         <Button className="btn-gold px-4" onClick={toggle}>
//           + Add Award
//         </Button>
//       </div>

//       {/* Table Section */}
//       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
//         <CardBody className="p-0">
//           <Table hover responsive className="align-middle mb-0">
//             <thead style={{ backgroundColor: LIGHT_GOLD }}>
//               <tr>
//                 <th className="py-3 px-4 text-center">Banner</th>
//                 <th>Award Title</th>
//                 <th>Recipient / Org</th>
//                 <th>Year</th>
//                 <th className="text-end px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length === 0 ? (
//                 <tr><td colSpan="5" className="py-5 text-center text-muted">No records found.</td></tr>
//               ) : (
//                 currentItems.map((item) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="py-3 text-center">
//                       <img 
//                         src={authService.getImgUrl(item.bannerImage)} 
//                         alt="Award" 
//                         style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} 
//                         className="border shadow-sm"
//                       />
//                     </td>
//                     <td>
//                       <div className="fw-bold text-dark">{item.awardTitle}</div>
//                     </td>
//                     <td>
//                       <div className="small fw-bold">{item.personName || "N/A"}</div>
//                       <div className="small text-muted" style={{ fontSize: '11px' }}>{item.organization}</div>
//                     </td>
//                     <td>
//                       <Badge pill style={{ backgroundColor: LIGHT_GOLD, color: GOLD, border: `1px solid ${GOLD}` }}>
//                         {item.year}
//                       </Badge>
//                     </td>
//                     <td className="text-end px-4">
//                       <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
//                       <Button size="sm" color="white" className="border shadow-sm text-danger" onClick={() => handleDelete(item.id)}>🗑️</Button>
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
//             {isEditing ? 'Edit Award Details' : 'Register New Award'}
//           </span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
          // <Form>
          //   <Row className="gy-3">
          //     <Col xs={12} md={8}>
          //       <FormGroup>
          //         <Label>Award Title</Label>
          //         <Input 
          //           type="text" 
          //           placeholder="e.g. Best Law Firm 2025" 
          //           value={formData.awardTitle} 
          //           onChange={(e)=>setFormData({...formData, awardTitle: e.target.value})} 
          //         />
          //       </FormGroup>
          //     </Col>
          //     <Col xs={12} md={4}>
          //       <FormGroup>
          //         <Label>Year</Label>
          //         <Input 
          //           type="number" 
          //           placeholder="2025" 
          //           value={formData.year} 
          //           onChange={(e)=>setFormData({...formData, year: e.target.value})} 
          //         />
          //       </FormGroup>
          //     </Col>
              
          //     <Col xs={12} md={6}>
          //       <FormGroup>
          //         <Label>Person Name (Optional)</Label>
          //         <Input 
          //           type="text" 
          //           value={formData.personName} 
          //           onChange={(e)=>setFormData({...formData, personName: e.target.value})} 
          //         />
          //       </FormGroup>
          //     </Col>
          //     <Col xs={12} md={6}>
          //       <FormGroup>
          //         <Label>Organization</Label>
          //         <Input 
          //           type="text" 
          //           value={formData.organization} 
          //           onChange={(e)=>setFormData({...formData, organization: e.target.value})} 
          //         />
          //       </FormGroup>
          //     </Col>

          //     <Col xs={12}>
          //       <FormGroup>
          //         <Label>Award Banner Image</Label>
          //         <Input type="file" onChange={(e)=>setFormData({...formData, bannerImage: e.target.files[0]})} />
          //       </FormGroup>
          //     </Col>

          //     <Col xs={12}>
          //       <FormGroup>
          //         <Label>Award Description</Label>
          //         <div className="bg-white border rounded">
          //           <ReactQuill 
          //             theme="snow" 
          //             modules={modules} 
          //             value={formData.details} 
          //             onChange={(v)=>setFormData({...formData, details: v})} 
          //             style={{height: '200px', marginBottom: '50px'}}
          //           />
          //         </div>
          //       </FormGroup>
          //     </Col>
          //   </Row>

          //   {/* Global Buttons Consistency */}
          //   <div className="mt-4 d-flex justify-content-start gap-2">
          //     <Button className="btn-gold" style={{ width: '130px' }} onClick={handleSubmit}>
          //       {isEditing ? 'Update' : 'Save'}
          //     </Button>
          //     <Button outline className="fw-bold" style={{ width: '130px', color: '#666', borderColor: '#ccc' }} onClick={toggle}>
          //       Cancel
          //     </Button>
          //   </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default AwardPage;


'use client';
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Row, Col, Badge
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Components
import PaginationComponent from '../../../context/Pagination';
import authService from '@/services/authService';

// Rich Text Editor
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const AwardPage = () => {
  const GOLD = '#eebb5d';
  const LIGHT_GOLD = '#fdf8ef';

  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // 🔹 Search
  const [search, setSearch] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    bannerImage: null,
    personName: '',
    organization: '',
    year: '',
    awardTitle: '',
    details: ''
  });

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  }), []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await authService.getAllAwards();
    if (res.success) {
      setDataList(Array.isArray(res.data.data) ? res.data.data : []);
    }
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        bannerImage: null,
        personName: '',
        organization: '',
        year: '',
        awardTitle: '',
        details: ''
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.awardTitle || !formData.year) {
      return toast.error("Title and Year are required!");
    }

    const user = authService.getCurrentUser();
    const data = new FormData();
    data.append('adminId', user?.id || 3);
    data.append('personName', formData.personName);
    data.append('organization', formData.organization);
    data.append('year', formData.year);
    data.append('awardTitle', formData.awardTitle);
    data.append('details', formData.details);
    if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);

    const res = isEditing
      ? await authService.updateAward(currentId, data)
      : await authService.createAward(data);

    if (res.success) {
      toast.success(`Award ${isEditing ? 'Updated' : 'Created'} Successfully!`);
      fetchData();
      toggle();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      personName: item.personName,
      organization: item.organization,
      year: item.year,
      awardTitle: item.awardTitle,
      details: item.details,
      bannerImage: null
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      const res = await authService.deleteAward(id);
      if (res.success) {
        toast.success("Award Deleted!");
        fetchData();
      }
    }
  };

  // 🔹 SEARCH FILTER
  const filteredData = dataList.filter((item) =>
    item.awardTitle?.toLowerCase().includes(search.toLowerCase()) ||
    item.personName?.toLowerCase().includes(search.toLowerCase()) ||
    item.organization?.toLowerCase().includes(search.toLowerCase()) ||
    item.year?.toString().includes(search)
  );

  // 🔹 PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer theme="colored" />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0">Awards & Recognition</h4>
          <p className="text-muted small mb-0">Manage firm and individual achievements.</p>
        </div>
        <Button className="btn-gold px-4" onClick={toggle}>+ Add Award</Button>
      </div>

      {/* 🔹 Search (limited width) */}
      <Row className="mb-3">
        <Col xs="12" md="4" lg="3">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
      </Row>

      {/* Table */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-3">S.No</th>
                <th className="text-center">Banner</th>
                <th>Award Title</th>
                <th>Recipient / Org</th>
                <th>Year</th>
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
                  <tr key={item.id}>
                    {/* 🔹 Serial No */}
                    <td className="px-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="text-center">
                      <img
                        src={authService.getImgUrl(item.bannerImage)}
                        alt="Award"
                        style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '6px' }}
                        className="border shadow-sm"
                      />
                    </td>
                    <td className="fw-bold">{item.awardTitle}</td>
                    <td>
                      <div className="small fw-bold">{item.personName || 'N/A'}</div>
                      <div className="small text-muted">{item.organization}</div>
                    </td>
                    <td>
                      <Badge style={{ backgroundColor: LIGHT_GOLD, color: GOLD, border: `1px solid ${GOLD}` }}>
                        {item.year}
                      </Badge>
                    </td>
                    <td className="text-end px-4">
                      <Button size="sm" color="white" className="me-2 border" onClick={() => handleEdit(item)}>✏️</Button>
                      <Button size="sm" color="white" className="border text-danger" onClick={() => handleDelete(item.id)}>🗑️</Button>
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
        onPageChange={setCurrentPage}
      />

      {/* MODAL (unchanged) */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader toggle={toggle}>
          {isEditing ? 'Edit Award Details' : 'Register New Award'}
        </ModalHeader>
        <ModalBody>
                    <Form>
            <Row className="gy-3">
              <Col xs={12} md={8}>
                <FormGroup>
                  <Label>Award Title</Label>
                  <Input 
                    type="text" 
                    placeholder="e.g. Best Law Firm 2025" 
                    value={formData.awardTitle} 
                    onChange={(e)=>setFormData({...formData, awardTitle: e.target.value})} 
                  />
                </FormGroup>
              </Col>
              <Col xs={12} md={4}>
                <FormGroup>
                  <Label>Year</Label>
                  <Input 
                    type="number" 
                    placeholder="2025" 
                    value={formData.year} 
                    onChange={(e)=>setFormData({...formData, year: e.target.value})} 
                  />
                </FormGroup>
              </Col>
              
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Person Name (Optional)</Label>
                  <Input 
                    type="text" 
                    value={formData.personName} 
                    onChange={(e)=>setFormData({...formData, personName: e.target.value})} 
                  />
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Label>Organization</Label>
                  <Input 
                    type="text" 
                    value={formData.organization} 
                    onChange={(e)=>setFormData({...formData, organization: e.target.value})} 
                  />
                </FormGroup>
              </Col>

              <Col xs={12}>
                <FormGroup>
                  <Label>Award Banner Image</Label>
                  <Input type="file" onChange={(e)=>setFormData({...formData, bannerImage: e.target.files[0]})} />
                </FormGroup>
              </Col>

              <Col xs={12}>
                <FormGroup>
                  <Label>Award Description</Label>
                  <div className="bg-white border rounded">
                    <ReactQuill 
                      theme="snow" 
                      modules={modules} 
                      value={formData.details} 
                      onChange={(v)=>setFormData({...formData, details: v})} 
                      style={{height: '200px', marginBottom: '50px'}}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>

            {/* Global Buttons Consistency */}
            <div className="mt-4 d-flex justify-content-start gap-2">
              <Button className="btn-gold" style={{ width: '130px' }} onClick={handleSubmit}>
                {isEditing ? 'Update' : 'Save'}
              </Button>
              <Button outline className="fw-bold" style={{ width: '130px', color: '#666', borderColor: '#ccc' }} onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AwardPage;
