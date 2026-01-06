// 'use client';
// import React, { useState } from 'react';
// import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CMS = () => {
//   const GOLD = "#eebb5d";
//   const [pages, setPages] = useState([
//     { id: 1, title: "About Us", slug: "about-us", status: "Active" },
//     { id: 2, title: "Privacy Policy", slug: "privacy-policy", status: "Active" }
//   ]);
//   const [modal, setModal] = useState(false);
//   const [formData, setFormData] = useState({ title: "", slug: "", content: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   const toggle = () => { setModal(!modal); if(!modal) setFormData({title:"", slug:"", content:""}); };

//   const handleSubmit = () => {
//     if(!formData.title) return toast.error("Title required", {theme:"colored"});
//     if(isEditing) {
//         setPages(pages.map(p => p.id === currentId ? {...p, ...formData} : p));
//         toast.success("Page Updated!", {theme:"colored"});
//     } else {
//         setPages([...pages, {...formData, id: Date.now(), status: "Active"}]);
//         toast.success("Page Created!", {theme:"colored"});
//     }
//     toggle();
//   };

//   const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };
//   const handleDelete = (id) => { if(confirm("Delete Page?")) { setPages(pages.filter(p => p.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>CMS Pages</h5></CardBody></Card>
//       <Card className="border-0 shadow-sm"><CardBody className="p-4">
//         <div className="d-flex justify-content-end mb-4"><Button onClick={toggle} style={{backgroundColor: GOLD, border:'none'}}>Add Page</Button></div>
//         <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Title</th><th>Slug</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
//             {pages.map(item => (
//                 <tr key={item.id}>
//                     <td>{item.title}</td><td>{item.slug}</td><td>{item.status}</td>
//                     <td className="text-end">
//                         <button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button>
//                         <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
//                     </td>
//                 </tr>
//             ))}
//         </tbody></Table>
//       </CardBody></Card>
//       <Modal isOpen={modal} toggle={toggle} size="lg"><ModalHeader toggle={toggle}>{isEditing?"Edit":"Add"} Page</ModalHeader><ModalBody className="p-4">
//         <Form>
//             <FormGroup><Label>Page Title</Label><Input value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></FormGroup>
//             <FormGroup><Label>Slug</Label><Input value={formData.slug} onChange={e=>setFormData({...formData, slug:e.target.value})} /></FormGroup>
//             <FormGroup><Label>Content</Label><Input type="textarea" rows="5" value={formData.content} onChange={e=>setFormData({...formData, content:e.target.value})} /></FormGroup>
//             <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Save Page</Button>
//         </Form>
//       </ModalBody></Modal>
//     </div>
//   );
// };
// export default CMS;
'use client';
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CSS Import
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import react-quill-new (SSR: false is must)
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="p-3 text-center border">Loading Editor...</div>
});

import authService from '@/services/authService';

const LocationCMS = () => {
  const GOLD = '#eebb5d';

  const [pages, setPages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [allCities, setAllCities] = useState([]); // Sabhi cities (Table mapping ke liye)
  const [cities, setCities] = useState([]);    // Filtered cities (Modal dropdown ke liye)
  
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    countryId: '',
    cityId: '',
    content: '',
  });

  // Editor configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  }), []);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      console.log("📢 Refreshing Table Data...");
      const [cmsRes, countryRes, cityRes] = await Promise.all([
        authService.getAllLocationCMS(),
        authService.getAllCountries(),
        authService.getAllCities()
      ]);

      if (cmsRes.success) setPages(cmsRes.data.data || []);
      if (countryRes.success) setCountries(countryRes.data.data || []);
      if (cityRes.success) setAllCities(cityRes.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Country badalne par cities fetch karna
  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setFormData({ ...formData, countryId, cityId: '' });
    if (countryId) {
      console.log(`📢 Fetching cities for Country ID: ${countryId}`);
      const res = await authService.getAllCities(countryId);
      if (res.success) setCities(res.data.data || []);
    } else {
      setCities([]);
    }
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({ countryId: '', cityId: '', content: '' });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  // ==========================================
  // CREATE & UPDATE (SUBMIT)
  // ==========================================
  const handleSubmit = async () => {
    if (!formData.countryId || !formData.cityId || !formData.content) {
      return toast.error('Sare fields bharna zaroori hai!', { theme: "colored" });
    }

    try {
      let res;
      if (isEditing) {
        console.log("📢 Calling Update CMS API...");
        res = await authService.updateLocationCMS(currentId, formData);
      } else {
        console.log("📢 Calling Create CMS API...");
        res = await authService.createLocationCMS(formData);
      }

      if (res.success) {
        toast.success(`CMS ${isEditing ? 'Update' : 'Create'} ho gaya!`);
        fetchInitialData();
        toggle();
      } else {
        toast.error(res.message || "Kuch galat hua");
      }
    } catch (error) {
      toast.error("API Error");
    }
  };

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = async (item) => {
    setFormData({
      countryId: item.countryId,
      cityId: item.cityId,
      content: item.content,
    });
    
    // Modal khulne se pehle us country ki cities load karna
    const res = await authService.getAllCities(item.countryId);
    if (res.success) setCities(res.data.data || []);

    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // ==========================================
  // DELETE
  // ==========================================
  const handleDelete = async (id) => {
    if (window.confirm("Kya aap ise delete karna chahte hain?")) {
      try {
        console.log(`📢 Deleting CMS ID: ${id}`);
        const res = await authService.deleteLocationCMS(id);
        if (res.success) {
          toast.success("Delete successfully!");
          fetchInitialData();
        }
      } catch (error) {
        toast.error("Delete failed!");
      }
    }
  };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="d-flex justify-content-between align-items-center py-3">
          <h5 className="fw-bold mb-0" style={{ color: GOLD }}>Location CMS</h5>
          <Button style={{ backgroundColor: GOLD, border: 'none' }} onClick={toggle}>
            + Add Content
          </Button>
        </CardBody>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardBody>
          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Country</th>
                <th>City</th>
                <th>Content Preview</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-4 text-muted">No Data Found</td></tr>
              ) : (
                pages.map((item) => {
                  const country = countries.find(c => String(c.id) === String(item.countryId));
                  const city = allCities.find(c => String(c.id) === String(item.cityId));
                  return (
                    <tr key={item.id}>
                      <td className="fw-bold text-dark">{country ? country.countryName : `ID: ${item.countryId}`}</td>
                      <td>{city ? city.cityName : `ID: ${item.cityId}`}</td>
                      <td>
                        <div 
                          style={{ maxWidth: '300px', maxHeight: '50px', overflow: 'hidden', color: '#666' }}
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </td>
                      <td className="text-end">
                        <Button size="sm" color="light" className="me-2" onClick={() => handleEdit(item)}>✏️</Button>
                        <Button size="sm" color="light" className="text-danger" onClick={() => handleDelete(item.id)}>🗑️</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle} className="border-0">{isEditing ? 'Edit' : 'Add'} Location CMS</ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Select Country</Label>
                  <Input type="select" value={formData.countryId} onChange={handleCountryChange}>
                    <option value="">-- Choose Country --</option>
                    {countries.map(c => <option key={c.id} value={c.id}>{c.countryName}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Select City</Label>
                  <Input type="select" value={formData.cityId} onChange={(e) => setFormData({...formData, cityId: e.target.value})}>
                    <option value="">-- Choose City --</option>
                    {cities.map(c => <option key={c.id} value={c.id}>{c.cityName}</option>)}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mb-4">
              <Label className="small fw-bold">CMS Content</Label>
              <div style={{ background: '#fff' }}>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  value={formData.content}
                  onChange={(val) => setFormData({...formData, content: val})}
                  style={{ height: '250px', marginBottom: '50px' }}
                  placeholder="Write something amazing about this location..."
                />
              </div>
            </FormGroup>

            <Button block className="mt-4 py-2 fw-bold" style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>
              {isEditing ? 'Update Page' : 'Save Page'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LocationCMS;