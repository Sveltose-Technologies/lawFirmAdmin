// 'use client';
// import React, { useEffect, useState, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import {
//   Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
//   Form, FormGroup, Label, Input, Badge
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Rich Text Editor with Next.js Fix
// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), { 
//   ssr: false,
//   loading: () => <div className="p-3 text-center border rounded small">Loading Editor...</div>
// });

// import authService from '@/services/authService';

// const TermsPage = () => {
//   const GOLD = '#eebb5d';
//   const LIGHT_GOLD = '#fdf8ef';

//   const [dataList, setDataList] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     content: ''
//   });

//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['link', 'clean']
//     ],
//   }), []);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     const res = await authService.getAllTerms();
//     if (res.success) {
//       setDataList(Array.isArray(res.data.data) ? res.data.data : []);
//     }
//   };

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({ title: '', content: '' });
//       setIsEditing(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.title || !formData.content) {
//       return toast.error("Title and Content are required!");
//     }

//     try {
//       const res = isEditing 
//         ? await authService.updateTerm(currentId, formData)
//         : await authService.createTerm(formData);

//       if (res.success) {
//         toast.success(`Terms ${isEditing ? 'Updated' : 'Created'} Successfully!`);
//         fetchData();
//         toggle();
//       }
//     } catch (error) {
//       toast.error("Internal Server Error");
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       title: item.title,
//       content: item.content
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this policy?")) {
//       const res = await authService.deleteTerm(id);
//       if (res.success) {
//         toast.success("Deleted!");
//         fetchData();
//       }
//     }
//   };

//   return (
//     <div className="p-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
//       <ToastContainer theme="colored" />
      
//       {/* Header Area */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Terms & Conditions</h4>
//         </div>
//         <Button 
//           className="px-4 fw-bold shadow-sm"
//           style={{ backgroundColor: GOLD, border: 'none', borderRadius: '8px' }} 
//           onClick={toggle}
//         >
//           + Add New Policy
//         </Button>
//       </div>

//       {/* Table Card */}
//       <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
//         <CardBody className="p-0">
//           <Table hover responsive className="align-middle mb-0">
//             <thead style={{ backgroundColor: LIGHT_GOLD }}>
//               <tr>
//                 <th className="py-3 px-4" style={{ width: '30%' }}>Policy Title</th>
//                 <th className="py-3">Content Snippet</th>
//                 <th className="py-3">Last Updated</th>
//                 <th className="py-3 text-end px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataList.length === 0 ? (
//                 <tr><td colSpan="4" className="py-5 text-center text-muted">No terms or conditions found.</td></tr>
//               ) : (
//                 dataList.map((item) => (
//                   <tr key={item.id} className="border-bottom">
//                     <td className="py-3 px-4">
//                       <div className="fw-bold text-dark">{item.title}</div>
//                     </td>
//                     <td>
//                       <div 
//                         style={{ maxWidth: '400px', maxHeight: '40px', overflow: 'hidden', fontSize: '13px', color: '#666' }}
//                         dangerouslySetInnerHTML={{ __html: item.content }}
//                       />
//                     </td>
//                     <td><small>{new Date(item.updatedAt).toLocaleDateString()}</small></td>
//                     <td className="text-end px-4">
//                       <Button size="sm" color="light" className="me-2 border shadow-sm" onClick={() => handleEdit(item)}>✏️</Button>
//                       <Button size="sm" color="light" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       {/* MODAL */}
//       <Modal isOpen={modal} toggle={toggle} size="lg" centered>
//         <ModalHeader toggle={toggle} className="border-0 pb-0">
//           <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? 'Edit' : 'Create'} Legal Policy</span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form>
//             <FormGroup>
//               <Label className="small fw-bold">Policy Title</Label>
//               <Input 
//                 type="text" 
//                 value={formData.title} 
//                 onChange={(e)=>setFormData({...formData, title: e.target.value})} 
//                 placeholder="e.g. Website Usage Policy" 
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label className="small fw-bold">Full Content (Legal Text)</Label>
//               <div className="bg-white border rounded">
//                 <ReactQuill 
//                   theme="snow" 
//                   modules={modules} 
//                   value={formData.content} 
//                   onChange={(v)=>setFormData({...formData, content: v})} 
//                   style={{ height: '300px', marginBottom: '50px' }}
//                   placeholder="Paste or write your terms and conditions here..."
//                 />
//               </div>
//             </FormGroup>

//             {/* Buttons: Left Aligned, Small, Same Width */}
//             <div className="mt-4 d-flex justify-content-start gap-2">
//               <Button 
//                 onClick={handleSubmit}
//                 style={{ backgroundColor: GOLD, border: 'none', width: '120px' }} 
//                 className="btn-sm fw-bold shadow-sm"
//               >
//                 {isEditing ? 'Update' : 'Save'}
//               </Button>
//               <Button 
//                 outline 
//                 onClick={toggle}
//                 style={{ width: '120px', color: '#666', borderColor: '#ccc' }} 
//                 className="btn-sm fw-bold shadow-sm"
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

// export default TermsPage;


'use client';
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label,Input
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="p-3 text-center border rounded small">Loading Editor...</div>
});

import authService from '@/services/authService';
import PaginationComponent from '../../../context/Pagination';

const TermsPage = () => {
  const GOLD = '#eebb5d';
  const LIGHT_GOLD = '#fdf8ef';

  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({ title: '', content: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'clean']
    ],
  }), []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await authService.getAllTerms();
    if (res.success) {
      setDataList(Array.isArray(res.data.data) ? res.data.data : []);
    }
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({ title: '', content: '' });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) return toast.error("Title and Content required!");

    try {
      const res = isEditing 
        ? await authService.updateTerm(currentId, formData)
        : await authService.createTerm(formData);

      if (res.success) {
        toast.success(`Terms ${isEditing ? 'Updated' : 'Created'}!`);
        fetchData();
        toggle();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, content: item.content });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this policy?")) return;
    const res = await authService.deleteTerm(id);
    if (res.success) {
      toast.success("Deleted!");
      fetchData();
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer theme="colored" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Terms & Conditions</h4>
        <Button className="px-4 fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none', borderRadius: '8px' }} onClick={toggle}>
          + Add New Policy
        </Button>
      </div>

      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="py-3 px-4">#</th>
                <th>Title</th>
                <th>Content Preview</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr><td colSpan="4" className="py-5 text-center text-muted">No terms found</td></tr>
              ) : currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4">{(currentPage-1)*itemsPerPage + index + 1}</td>
                  <td>{item.title}</td>
                  <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      dangerouslySetInnerHTML={{ __html: item.content }} />
                  <td className="text-end px-4">
                    <Button size="sm" className="me-2" onClick={() => handleEdit(item)}>✏️</Button>
                    <Button size="sm" className="text-danger" onClick={() => handleDelete(item.id)}>🗑️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <PaginationComponent 
        totalItems={dataList.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle} className="border-0 pb-0">{isEditing ? 'Edit' : 'Add'} Terms</ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form>
            <FormGroup>
              <Label>Title</Label>
              <Input type="text" value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})}/>
            </FormGroup>
            <FormGroup>
              <Label>Content</Label>
              <ReactQuill theme="snow" modules={modules} value={formData.content} onChange={v=>setFormData({...formData,content:v})} style={{height:'250px'}} />
            </FormGroup>
            <div className="d-flex gap-2 mt-3">
              <Button onClick={handleSubmit}>{isEditing ? 'Update' : 'Save'}</Button>
              <Button outline onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TermsPage;
