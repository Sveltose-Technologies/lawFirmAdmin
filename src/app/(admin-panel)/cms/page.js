
// 'use client';
// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import {
//   Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
//   Form, FormGroup, Label, Input, Row, Col
// } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import 'react-quill-new/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill-new'), { 
//   ssr: false,
//   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
// });

// import authService from '@/services/authService';

// const LocationCMS = () => {
//   const GOLD = '#eebb5d';

//   const [pages, setPages] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [allCities, setAllCities] = useState([]); 
//   const [cities, setCities] = useState([]);    
  
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     countryId: '',
//     cityId: '',
//     content: '',
//   });

//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['clean']
//     ],
//   }), []);

//   const safeArray = (res) => {
//     return res?.data?.data || res?.data || res || [];
//   };

//   const fetchInitialData = useCallback(async () => {
//     setLoading(true);
//     try {
//       console.log("--- 📢 Fetching Location Data ---");
//       // Use .catch to prevent 404 from crashing the whole UI
//       const [cmsRes, countryRes, cityRes] = await Promise.all([
//         authService.getAllLocationCMS().catch(e => { console.error("CMS 404"); return []; }),
//         authService.getAllCountries().catch(e => { console.error("Countries 404"); return []; }),
//         authService.getAllCities().catch(e => { console.error("Cities 404"); return []; })
//       ]);

//       setPages(safeArray(cmsRes));
//       setCountries(safeArray(countryRes));
//       setAllCities(safeArray(cityRes));
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchInitialData();
//   }, [fetchInitialData]);

//   const handleCountryChange = async (e) => {
//     const countryId = e.target.value;
//     console.log("Selected Country ID:", countryId);
//     setFormData({ ...formData, countryId, cityId: '' });
    
//     if (countryId) {
//         // Filter from allCities if you already have them, or fetch again
//         const filtered = allCities.filter(c => String(c.countryId) === String(countryId));
//         setCities(filtered);
//     } else {
//         setCities([]);
//     }
//   };

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({ countryId: '', cityId: '', content: '' });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.countryId || !formData.cityId || !formData.content) {
//       return toast.error('Sare fields bharna zaroori hai!');
//     }

//     setLoading(true);
//     try {
//       // Data format transformation
//       const payload = {
//         countryId: Number(formData.countryId),
//         cityId: Number(formData.cityId),
//         content: formData.content,
//         adminId: 3 // Static or from authService.getCurrentUser().id
//       };

//       console.log("🚀 Submitting CMS Payload:", payload);

//       const res = isEditing 
//         ? await authService.updateLocationCMS(currentId, payload) 
//         : await authService.createLocationCMS(payload);

//       if (res.success || res) {
//         toast.success(`CMS ${isEditing ? 'Updated' : 'Created'}!`);
//         fetchInitialData();
//         toggle();
//       }
//     } catch (error) {
//       console.error("Submit Error:", error.response?.data || error);
//       toast.error(error.response?.data?.message || "Internal Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       countryId: item.countryId,
//       cityId: item.cityId,
//       content: item.content,
//     });
    
//     // Set cities for the selected country
//     const filtered = allCities.filter(c => String(c.countryId) === String(item.countryId));
//     setCities(filtered);

//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const res = await authService.deleteLocationCMS(id);
//       if (res.success) {
//         toast.success("Deleted!");
//         fetchInitialData();
//       }
//     } catch (error) {
//       toast.error("Delete failed!");
//     }
//   };

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer theme="colored" />

//       <Card className="mb-4 border-0 shadow-sm rounded-3">
//         <CardBody className="d-flex justify-content-between align-items-center py-3">
//           <div>
//             <h5 className="fw-bold mb-0" style={{ color: GOLD }}>Location CMS</h5>
//             <p className="text-muted small mb-0">Manage website content for different cities.</p>
//           </div>
//           <Button style={{ backgroundColor: GOLD, border: 'none' }} className="px-4 fw-bold" onClick={toggle}>
//             + Add Location Content
//           </Button>
//         </CardBody>
//       </Card>

//       <Card className="border-0 shadow-sm rounded-3">
//         <CardBody className="p-0">
//           <Table hover responsive className="align-middle mb-0">
//             <thead className="table-light">
//               <tr className="small text-uppercase">
//                 <th className="ps-4">Country</th>
//                 <th>City</th>
//                 <th>Preview</th>
//                 <th className="text-end pe-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pages.length > 0 ? (
//                 pages.map((item) => {
//                   const country = countries.find(c => String(c.id) === String(item.countryId));
//                   const city = allCities.find(c => String(c.id) === String(item.cityId));
//                   return (
//                     <tr key={item.id}>
//                       <td className="ps-4 fw-bold">{country ? country.countryName : `ID: ${item.countryId}`}</td>
//                       <td>{city ? city.cityName : `ID: ${item.cityId}`}</td>
//                       <td className="text-muted small">
//                         <div className="text-truncate" style={{ maxWidth: '300px' }} 
//                              dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }} />
//                       </td>
//                       <td className="text-end pe-4">
//                         <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
//                         <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr><td colSpan="4" className="text-center p-5 text-muted">No records found.</td></tr>
//               )}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
//         <ModalHeader toggle={toggle} className="border-0 pb-0">
//             <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? 'Edit' : 'Add'} Location Details</span>
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Select Country *</Label>
//                   <Input type="select" value={formData.countryId} onChange={handleCountryChange} required>
//                     <option value="">-- Select Country --</option>
//                     {countries.map(c => <option key={c.id} value={c.id}>{c.countryName}</option>)}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Select City *</Label>
//                   <Input 
//                     type="select" 
//                     value={formData.cityId} 
//                     onChange={(e) => setFormData({...formData, cityId: e.target.value})} 
//                     required
//                     disabled={!formData.countryId}
//                   >
//                     <option value="">-- Select City --</option>
//                     {cities.map(c => <option key={c.id} value={c.id}>{c.cityName}</option>)}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Detailed Content *</Label>
//                   <div className="bg-white border rounded">
//                     <ReactQuill
//                       theme="snow"
//                       modules={modules}
//                       value={formData.content}
//                       onChange={(val) => setFormData({...formData, content: val})}
//                       style={{ height: '250px', marginBottom: '50px' }}
//                       placeholder="Enter city specific details..."
//                     />
//                   </div>
//                 </FormGroup>
//               </Col>
//             </Row>

//             <div className="d-flex gap-2 mt-4">
//               <Button type="submit" className="px-4 fw-bold" style={{ backgroundColor: GOLD, border: 'none', color: '#fff' }} disabled={loading}>
//                 {loading ? "Saving..." : (isEditing ? 'Update Page' : 'Save Page')}
//               </Button>
//               <Button outline onClick={toggle} className="px-4">Cancel</Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default LocationCMS;




'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Rich Text Editor Setup
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>
});

import authService from '@/services/authService';

const LocationCMS = () => {
  const GOLD = '#eebb5d';
  const LIGHT_GOLD = '#fdf8ef';

  const [pages, setPages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [allCities, setAllCities] = useState([]); 
  const [cities, setCities] = useState([]);    
  
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    countryId: '',
    cityId: '',
    content: '',
  });

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  }), []);

  // API se aane wale data ko array format mein safe karne ke liye
  const safeArray = (res) => {
    return res?.data?.data || res?.data || res || [];
  };

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      console.log("--- 📢 Fetching Location Data ---");
      // Sahi Endpoints jo Rituraj ne bataye: /location-country, /location-city, /location-cms
      const [cmsRes, countryRes, cityRes] = await Promise.all([
        authService.getAllLocationCMS().catch(() => []),
        authService.getAllCountries().catch(() => []),
        authService.getAllCities().catch(() => [])
      ]);

      setPages(safeArray(cmsRes));
      setCountries(safeArray(countryRes));
      setAllCities(safeArray(cityRes));
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setFormData({ ...formData, countryId, cityId: '' });
    
    if (countryId) {
        const filtered = allCities.filter(c => String(c.countryId) === String(countryId));
        setCities(filtered);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.countryId || !formData.cityId || !formData.content) {
      return toast.error('Sare fields bharna zaroori hai!');
    }

    setLoading(true);
    try {
      const payload = {
        adminId: 3,
        countryId: Number(formData.countryId),
        cityId: Number(formData.cityId),
        content: formData.content,
      };

      const res = isEditing 
        ? await authService.updateLocationCMS(currentId, payload) 
        : await authService.createLocationCMS(payload);

      if (res.success || res) {
        toast.success(`CMS ${isEditing ? 'Updated' : 'Created'} Successfully!`);
        fetchInitialData();
        toggle();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      countryId: item.countryId,
      cityId: item.cityId,
      content: item.content,
    });
    
    const filtered = allCities.filter(c => String(c.countryId) === String(item.countryId));
    setCities(filtered);

    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap ise delete karna chahte hain?")) return;
    try {
      const res = await authService.deleteLocationCMS(id);
      if (res.success) {
        toast.success("Deleted!");
        fetchInitialData();
      }
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  return (
    <div className="p-3 p-md-4 bg-light min-vh-100">
      <ToastContainer theme="colored" />

      {/* Header Section */}
      <Card className="mb-4 border-0 shadow-sm rounded-3">
        <CardBody className="d-flex justify-content-between align-items-center py-3">
          <div>
            <h5 className="fw-bold mb-0" style={{ color: GOLD }}>Location CMS</h5>
            <p className="text-muted small mb-0">Manage landing page content for countries and cities.</p>
          </div>
          <Button style={{ backgroundColor: GOLD, border: 'none', color: '#fff' }} className="px-4 fw-bold shadow-sm" onClick={toggle}>
            + Add Content
          </Button>
        </CardBody>
      </Card>

      {/* Data Table */}
      <Card className="border-0 shadow-sm rounded-3">
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr className="small text-uppercase">
                <th className="ps-4 py-3" style={{ width: '80px' }}>Sr. No.</th>
                <th>Country</th>
                <th>City</th>
                <th>Content Preview</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0 ? (
                pages.map((item, index) => {
                  const countryObj = countries.find(c => String(c.id) === String(item.countryId));
                  const cityObj = allCities.find(c => String(c.id) === String(item.cityId));
                  return (
                    <tr key={item.id} className="border-bottom">
                      <td className="ps-4 text-muted">{index + 1}.</td>
                      <td className="fw-bold text-dark">{countryObj ? countryObj.countryName : `ID: ${item.countryId}`}</td>
                      <td>{cityObj ? cityObj.cityName : `ID: ${item.cityId}`}</td>
                      <td>
                        <div 
                          className="text-muted small text-truncate" 
                          style={{ maxWidth: '300px' }} 
                          dangerouslySetInnerHTML={{ __html: item.content.substring(0, 80) + '...' }} 
                        />
                      </td>
                      <td className="text-end pe-4">
                        <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
                        <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-muted">
                    {loading ? "Loading data..." : "No records found."}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal Section */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader toggle={toggle} className="border-0 pb-0">
            <span className="fw-bold" style={{ color: GOLD }}>{isEditing ? 'Edit' : 'Add'} Location Details</span>
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Select Country *</Label>
                  <Input type="select" value={formData.countryId} onChange={handleCountryChange} required>
                    <option value="">-- Choose Country --</option>
                    {countries.map(c => <option key={c.id} value={c.id}>{c.countryName}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Select City *</Label>
                  <Input 
                    type="select" 
                    value={formData.cityId} 
                    onChange={(e) => setFormData({...formData, cityId: e.target.value})} 
                    required
                    disabled={!formData.countryId}
                  >
                    <option value="">-- Choose City --</option>
                    {cities.map(c => <option key={c.id} value={c.id}>{c.cityName}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Landing Page Content *</Label>
                  <div className="bg-white border rounded">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={formData.content}
                      onChange={(val) => setFormData({...formData, content: val})}
                      style={{ height: '250px', marginBottom: '50px' }}
                      placeholder="Write detailed information here..."
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex gap-2 mt-4">
              <Button type="submit" className="px-4 fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none', color: '#fff' }} disabled={loading}>
                {loading ? "Saving..." : (isEditing ? 'Update Page' : 'Save Page')}
              </Button>
              <Button outline onClick={toggle} className="px-4">Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LocationCMS;