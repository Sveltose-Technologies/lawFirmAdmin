
// 'use client';
// import React, { useEffect, useState, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import {
//   Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
//   Form, FormGroup, Label, Input, Row, Col, Badge
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Rich Text Editor Setup
// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), { 
//   ssr: false,
//   loading: () => <div className="p-3 text-center border rounded">Loading Editor...</div>
// });

// import authService from '@/services/authService';

// const OurFirmPage = () => {
//   const GOLD = '#eebb5d';
//   const LIGHT_GOLD = '#fdf8ef';

//   const [dataList, setDataList] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   const [formData, setFormData] = useState({
//     bannerImage: null,
//     innovationImage: null,
//     peopleImage: null,
//     historyImage: null,
//     innovationContent: '',
//     peopleContent: '',
//     historyContent: ''
//   });

//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline'],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['clean']
//     ],
//   }), []);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     const res = await authService.getAllOurFirm();
//     if (res.success) {
//       setDataList(Array.isArray(res.data.data) ? res.data.data : []);
//     }
//   };

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({
//         bannerImage: null, innovationImage: null, peopleImage: null, historyImage: null,
//         innovationContent: '', peopleContent: '', historyContent: ''
//       });
//       setIsEditing(false);
//     }
//   };

//   const handleFileChange = (e, field) => {
//     setFormData({ ...formData, [field]: e.target.files[0] });
//   };

//   const handleSubmit = async () => {
//     const user = authService.getCurrentUser();
//     const data = new FormData();
//     data.append('adminId', user?.id || 3);
//     data.append('innovationContent', formData.innovationContent);
//     data.append('peopleContent', formData.peopleContent);
//     data.append('historyContent', formData.historyContent);

//     if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);
//     if (formData.innovationImage) data.append('innovationImage', formData.innovationImage);
//     if (formData.peopleImage) data.append('peopleImage', formData.peopleImage);
//     if (formData.historyImage) data.append('historyImage', formData.historyImage);

//     const res = isEditing 
//       ? await authService.updateOurFirm(currentId, data)
//       : await authService.createOurFirm(data);

//     if (res.success) {
//       toast.success(`Our Firm Details ${isEditing ? 'Updated' : 'Created'} Successfully!`, { theme: 'colored' });
//       fetchData();
//       toggle();
//     } else {
//       toast.error("Process failed. Please try again.");
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       innovationContent: item.innovationContent,
//       peopleContent: item.peopleContent,
//       historyContent: item.historyContent,
//       bannerImage: null,
//       innovationImage: null,
//       peopleImage: null,
//       historyImage: null
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete these details?")) {
//       const res = await authService.deleteOurFirm(id);
//       if (res.success) {
//         toast.success("Details Deleted!", { theme: 'colored' });
//         fetchData();
//       }
//     }
//   };

//   return (
//     <div className="p-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
//       <ToastContainer />
      
//       {/* Page Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Our Firm Details</h4>
//           <p className="text-muted small mb-0">Manage Innovation, People, and History sections of About Us page.</p>
//         </div>
//         <Button 
//           className="px-4 fw-bold shadow-sm"
//           style={{ backgroundColor: GOLD, border: 'none', borderRadius: '8px' }} 
//           onClick={toggle}
//         >
//           + Add New Entry
//         </Button>
//       </div>

//       {/* Main Table Card */}
//       <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
//         <CardBody className="p-0">
//           <Table hover responsive className="align-middle mb-0 text-center">
//             <thead style={{ backgroundColor: LIGHT_GOLD }}>
//               <tr>
//                 <th className="py-3 border-0">Banner Preview</th>
//                 <th className="py-3 border-0">Innovation Section</th>
//                 <th className="py-3 border-0">People Section</th>
//                 <th className="py-3 border-0">History Section</th>
//                 <th className="py-3 border-0 text-end px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataList.length === 0 ? (
//                 <tr><td colSpan="5" className="py-5 text-muted">No records found. Start by adding new firm details.</td></tr>
//               ) : (
//                 dataList.map((item) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="py-3">
//                       <div className="d-inline-block p-1 border rounded shadow-sm">
//                         <img 
//                           src={authService.getImgUrl(item.bannerImage)} 
//                           alt="Banner" 
//                           style={{ width: '100px', height: '55px', objectFit: 'cover', borderRadius: '4px' }} 
//                         />
//                       </div>
//                     </td>
//                     <td>
//                       <img src={authService.getImgUrl(item.innovationImage)} alt="I" className="rounded-circle border mb-1" style={{ width: '40px', height: '40px' }} />
//                       <div className="small fw-bold" style={{ color: GOLD }}>Innovation</div>
//                     </td>
//                     <td>
//                       <img src={authService.getImgUrl(item.peopleImage)} alt="P" className="rounded-circle border mb-1" style={{ width: '40px', height: '40px' }} />
//                       <div className="small fw-bold" style={{ color: GOLD }}>People</div>
//                     </td>
//                     <td>
//                       <img src={authService.getImgUrl(item.historyImage)} alt="H" className="rounded-circle border mb-1" style={{ width: '40px', height: '40px' }} />
//                       <div className="small fw-bold" style={{ color: GOLD }}>History</div>
//                     </td>
//                     <td className="text-end px-4">
//                       <Button size="sm" color="white" className="shadow-sm me-2 border" onClick={() => handleEdit(item)}>✏️</Button>
//                       <Button size="sm" color="white" className="shadow-sm text-danger border" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       {/* MODAL */}
//       <Modal isOpen={modal} toggle={toggle} size="xl" centered scrollable>
//         <ModalHeader toggle={toggle} className="border-0 pb-0">
//           <span className="fw-bold h5" style={{ color: GOLD }}>
//             {isEditing ? 'Edit Firm Details' : 'Create Firm Content'}
//           </span>
//         </ModalHeader>
//         <ModalBody className="p-4 pt-2">
//           <Form>
//             {/* Image Upload Section */}
//             <div className="p-3 mb-4 rounded" style={{ backgroundColor: '#fcfcfc', border: '1px dashed #ddd' }}>
//               <h6 className="fw-bold mb-3" style={{ fontSize: '14px', letterSpacing: '1px' }}>IMAGE UPLOADS</h6>
//               <Row>
//                 <Col md={3}>
//                   <FormGroup>
//                     <Label className="small fw-bold text-muted">Banner Image</Label>
//                     <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'bannerImage')} />
//                   </FormGroup>
//                 </Col>
//                 <Col md={3}>
//                   <FormGroup>
//                     <Label className="small fw-bold text-muted">Innovation Icon</Label>
//                     <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'innovationImage')} />
//                   </FormGroup>
//                 </Col>
//                 <Col md={3}>
//                   <FormGroup>
//                     <Label className="small fw-bold text-muted">People Icon</Label>
//                     <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'peopleImage')} />
//                   </FormGroup>
//                 </Col>
//                 <Col md={3}>
//                   <FormGroup>
//                     <Label className="small fw-bold text-muted">History Icon</Label>
//                     <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'historyImage')} />
//                   </FormGroup>
//                 </Col>
//               </Row>
//             </div>

//             {/* Content Section */}
//             <Row>
//               <Col lg={4} className="mb-3">
//                 <Card className="border-0 bg-light h-100 shadow-sm">
//                   <CardBody>
//                     <Badge className="mb-2 px-3 py-2" style={{ backgroundColor: GOLD }}>Innovation Content</Badge>
//                     <ReactQuill 
//                       theme="snow" 
//                       modules={modules} 
//                       value={formData.innovationContent} 
//                       onChange={(v)=>setFormData({...formData, innovationContent:v})} 
//                       style={{height:'180px', backgroundColor:'#fff'}} 
//                     />
//                   </CardBody>
//                 </Card>
//               </Col>
//               <Col lg={4} className="mb-3">
//                 <Card className="border-0 bg-light h-100 shadow-sm">
//                   <CardBody>
//                     <Badge className="mb-2 px-3 py-2" style={{ backgroundColor: GOLD }}>People Content</Badge>
//                     <ReactQuill 
//                       theme="snow" 
//                       modules={modules} 
//                       value={formData.peopleContent} 
//                       onChange={(v)=>setFormData({...formData, peopleContent:v})} 
//                       style={{height:'180px', backgroundColor:'#fff'}} 
//                     />
//                   </CardBody>
//                 </Card>
//               </Col>
//               <Col lg={4} className="mb-3">
//                 <Card className="border-0 bg-light h-100 shadow-sm">
//                   <CardBody>
//                     <Badge className="mb-2 px-3 py-2" style={{ backgroundColor: GOLD }}>History Content</Badge>
//                     <ReactQuill 
//                       theme="snow" 
//                       modules={modules} 
//                       value={formData.historyContent} 
//                       onChange={(v)=>setFormData({...formData, historyContent:v})} 
//                       style={{height:'180px', backgroundColor:'#fff'}} 
//                     />
//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row>

//             <div className="mt-5 d-flex gap-2">
//               <Button 
//                 block 
//                 className="py-2 fw-bold shadow-sm" 
//                 style={{ backgroundColor: GOLD, border: 'none', flex: 1 }} 
//                 onClick={handleSubmit}
//               >
//                 {isEditing ? 'Confirm Changes' : 'Publish Firm Profile'}
//               </Button>
//               <Button 
//                 outline 
//                 className="py-2 fw-bold" 
//                 style={{ color: '#666', borderColor: '#ddd', flex: 0.3 }} 
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

// export default OurFirmPage;


'use client';
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Row, Col, Badge
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pagination Component Import
import PaginationComponent from '../../../context/Pagination';

// Rich Text Editor Setup
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="p-3 text-center border rounded">Loading Editor...</div>
});

import authService from '@/services/authService';

const OurFirmPage = () => {
  const GOLD = '#eebb5d';
  const LIGHT_GOLD = '#fdf8ef';

  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    bannerImage: null,
    innovationImage: null,
    peopleImage: null,
    historyImage: null,
    innovationContent: '',
    peopleContent: '',
    historyContent: ''
  });

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  }), []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await authService.getAllOurFirm();
    if (res.success) {
      setDataList(Array.isArray(res.data.data) ? res.data.data : []);
    }
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        bannerImage: null, innovationImage: null, peopleImage: null, historyImage: null,
        innovationContent: '', peopleContent: '', historyContent: ''
      });
      setIsEditing(false);
    }
  };

  const handleFileChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const user = authService.getCurrentUser();
    const data = new FormData();
    data.append('adminId', user?.id || 3);
    data.append('innovationContent', formData.innovationContent);
    data.append('peopleContent', formData.peopleContent);
    data.append('historyContent', formData.historyContent);

    if (formData.bannerImage) data.append('bannerImage', formData.bannerImage);
    if (formData.innovationImage) data.append('innovationImage', formData.innovationImage);
    if (formData.peopleImage) data.append('peopleImage', formData.peopleImage);
    if (formData.historyImage) data.append('historyImage', formData.historyImage);

    const res = isEditing 
      ? await authService.updateOurFirm(currentId, data)
      : await authService.createOurFirm(data);

    if (res.success) {
      toast.success(`Our Firm Details ${isEditing ? 'Updated' : 'Created'} Successfully!`, { theme: 'colored' });
      fetchData();
      toggle();
    } else {
      toast.error("Process failed. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      innovationContent: item.innovationContent,
      peopleContent: item.peopleContent,
      historyContent: item.historyContent,
      bannerImage: null,
      innovationImage: null,
      peopleImage: null,
      historyImage: null
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete these details?")) {
      const res = await authService.deleteOurFirm(id);
      if (res.success) {
        toast.success("Details Deleted!", { theme: 'colored' });
        fetchData();
      }
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer />
      
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Our Firm Details</h4>
          <p className="text-muted small mb-0">Manage Innovation, People, and History rectangular sections.</p>
        </div>
        <Button 
          className="px-4 fw-bold shadow-sm"
          style={{ backgroundColor: GOLD, border: 'none', borderRadius: '8px' }} 
          onClick={toggle}
        >
          + Add New Entry
        </Button>
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0 text-center">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="py-3 border-0">Banner</th>
                <th className="py-3 border-0">Innovation</th>
                <th className="py-3 border-0">People</th>
                <th className="py-3 border-0">History</th>
                <th className="py-3 border-0 text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr><td colSpan="5" className="py-5 text-muted">No records found.</td></tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="py-3">
                      <div className="d-inline-block p-1 border rounded shadow-sm">
                        <img 
                          src={authService.getImgUrl(item.bannerImage)} 
                          alt="Banner" 
                          style={{ width: '90px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                      </div>
                    </td>
                    <td>
                      <img src={authService.getImgUrl(item.innovationImage)} alt="I" className="border rounded shadow-sm mb-1" style={{ width: '80px', height: '45px', objectFit: 'cover' }} />
                      <div className="small fw-bold" style={{ color: GOLD }}>Innovation</div>
                    </td>
                    <td>
                      <img src={authService.getImgUrl(item.peopleImage)} alt="P" className="border rounded shadow-sm mb-1" style={{ width: '80px', height: '45px', objectFit: 'cover' }} />
                      <div className="small fw-bold" style={{ color: GOLD }}>People</div>
                    </td>
                    <td>
                      <img src={authService.getImgUrl(item.historyImage)} alt="H" className="border rounded shadow-sm mb-1" style={{ width: '80px', height: '45px', objectFit: 'cover' }} />
                      <div className="small fw-bold" style={{ color: GOLD }}>History</div>
                    </td>
                    <td className="text-end px-4">
                      <Button size="sm" color="white" className="shadow-sm me-2 border" onClick={() => handleEdit(item)}>✏️</Button>
                      <Button size="sm" color="white" className="shadow-sm text-danger border" onClick={() => handleDelete(item.id)}>🗑️</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Pagination Integration */}
      <PaginationComponent 
        totalItems={dataList.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={(page) => setCurrentPage(page)} 
      />

      {/* MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="xl" centered scrollable>
        <ModalHeader toggle={toggle} className="border-0 pb-0">
          <span className="fw-bold h5" style={{ color: GOLD }}>
            {isEditing ? 'Edit Firm Details' : 'Create Firm Content'}
          </span>
        </ModalHeader>
        <ModalBody className="p-4 pt-2">
          <Form>
            {/* Image Upload Section */}
            <div className="p-3 mb-4 rounded" style={{ backgroundColor: '#fcfcfc', border: '1px dashed #ddd' }}>
              <h6 className="fw-bold mb-3" style={{ fontSize: '14px', letterSpacing: '1px' }}>IMAGE UPLOADS (RECTANGULAR)</h6>
              <Row className="gy-2">
                <Col xs={12} md={3}>
                  <FormGroup>
                    <Label className="small fw-bold text-muted">Banner Image</Label>
                    <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'bannerImage')} />
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <FormGroup>
                    <Label className="small fw-bold text-muted">Innovation Image</Label>
                    <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'innovationImage')} />
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <FormGroup>
                    <Label className="small fw-bold text-muted">People Image</Label>
                    <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'peopleImage')} />
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <FormGroup>
                    <Label className="small fw-bold text-muted">History Image</Label>
                    <Input type="file" className="form-control-sm" onChange={(e)=>handleFileChange(e, 'historyImage')} />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            {/* Content Section */}
            <Row>
              <Col xs={12} lg={4} className="mb-3">
                <Card className="border-0 bg-light h-100 shadow-sm">
                  <CardBody>
                    <Badge className="mb-2 px-3 py-2" style={{ backgroundColor: GOLD }}>Innovation Content</Badge>
                    <ReactQuill 
                      theme="snow" 
                      modules={modules} 
                      value={formData.innovationContent} 
                      onChange={(v)=>setFormData({...formData, innovationContent:v})} 
                      style={{height:'180px', backgroundColor:'#fff'}} 
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} lg={4} className="mb-3">
                <Card className="border-0 bg-light h-100 shadow-sm">
                  <CardBody>
                    <Badge className="mb-2 px-3 py-2" style={{ backgroundColor: GOLD }}>People Content</Badge>
                    <ReactQuill 
                      theme="snow" 
                      modules={modules} 
                      value={formData.peopleContent} 
                      onChange={(v)=>setFormData({...formData, peopleContent:v})} 
                      style={{height:'180px', backgroundColor:'#fff'}} 
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} lg={4} className="mb-3">
                <Card className="border-0 bg-light h-100 shadow-sm">
                  <CardBody>
                    <Badge className="mb-2 px-3 py-2" style={{ backgroundColor: GOLD }}>History Content</Badge>
                    <ReactQuill 
                      theme="snow" 
                      modules={modules} 
                      value={formData.historyContent} 
                      onChange={(v)=>setFormData({...formData, historyContent:v})} 
                      style={{height:'180px', backgroundColor:'#fff'}} 
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <div className="mt-5 d-flex justify-content-start gap-2">
              <Button 
                style={{ backgroundColor: GOLD, border: 'none', width: '150px' }} 
                className="py-2 fw-bold shadow-sm btn-sm"
                onClick={handleSubmit}
              >
                {isEditing ? 'Update Changes' : 'Publish Profile'}
              </Button>
              <Button 
                outline 
                className="py-2 fw-bold btn-sm" 
                style={{ color: '#666', borderColor: '#ddd', width: '150px' }} 
                onClick={toggle}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default OurFirmPage;