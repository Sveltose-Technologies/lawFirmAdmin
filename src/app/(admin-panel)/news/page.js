// // // "use client";
// // // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // // import dynamic from "next/dynamic";
// // // import {
// // //   Container, Row, Col, Card, CardBody, Table, Button, Modal,
// // //   ModalHeader, ModalBody, Form, FormGroup, Label, Input,
// // //   Dropdown, DropdownToggle, DropdownMenu, DropdownItem
// // // } from "reactstrap";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // import authService from "@/services/authService";
// // // import PaginationComponent from "../../../context/Pagination";

// // // // Rich Text Editor
// // // import "react-quill-new/dist/quill.snow.css";
// // // const ReactQuill = dynamic(() => import("react-quill-new"), {
// // //   ssr: false,
// // //   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>,
// // // });

// // // const News = () => {
// // //   const GOLD = "#eebb5d";
// // //   const LIGHT_GOLD = "#fdf8ef";

// // //   const [newsList, setNewsList] = useState([]);
// // //   const [modal, setModal] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [currentId, setCurrentId] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   // Dropdown Open/Close States
// // //   const [dropdownOpen, setDropdownOpen] = useState({ cat: false, count: false, city: false });
// // //   const toggleDropdown = (key) => setDropdownOpen({ ...dropdownOpen, [key]: !dropdownOpen[key] });

// // //   // Data States
// // //   const [categories, setCategories] = useState([]);
// // //   const [countries, setCountries] = useState([]);
// // //   const [cities, setCities] = useState([]);

// // //   const [formData, setFormData] = useState({
// // //     title: "", date: "", year: new Date().getFullYear(), textEditor: "",
// // //     bannerImage: null, newsImage: null,
// // //     capabilityCategoryId: [], countryId: [], cityId: [],
// // //     linkedin: "", twitter: "", facebook: "",
// // //   });

// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 8;

// // //   const safeArray = (res) => {
// // //     const data = res.data?.data || res.data || [];
// // //     return Array.isArray(data) ? data : [];
// // //   };

// // //   const fetchData = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [newsRes, catRes, countRes, cityRes] = await Promise.all([
// // //         authService.getAllNews(),
// // //         authService.getAllCapabilityCategories().catch(() => ({ data: [] })),
// // //         authService.getAllCountries().catch(() => ({ data: [] })),
// // //         authService.getAllCities().catch(() => ({ data: [] })),
// // //       ]);
// // //       setNewsList(safeArray(newsRes));
// // //       setCategories(safeArray(catRes));
// // //       setCountries(safeArray(countRes));
// // //       setCities(safeArray(cityRes));
// // //     } catch (error) {
// // //       toast.error("Failed to load data");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => { fetchData(); }, [fetchData]);

// // //   // Helper for multi-select checkboxes
// // //   const handleMultiSelect = (id, field) => {
// // //     const currentItems = [...formData[field]];
// // //     const index = currentItems.indexOf(id);
// // //     if (index > -1) {
// // //       currentItems.splice(index, 1);
// // //     } else {
// // //       currentItems.push(id);
// // //     }
// // //     setFormData({ ...formData, [field]: currentItems });
// // //   };

// // //   const toggle = () => {
// // //     setModal(!modal);
// // //     if (!modal) {
// // //       setFormData({
// // //         title: "", date: "", year: new Date().getFullYear(), textEditor: "",
// // //         bannerImage: null, newsImage: null,
// // //         capabilityCategoryId: [], countryId: [], cityId: [],
// // //         linkedin: "", twitter: "", facebook: "",
// // //       });
// // //       setIsEditing(false);
// // //       setCurrentId(null);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     try {
// // //       const user = JSON.parse(localStorage.getItem("user"));
// // //       const data = new FormData();
// // //       data.append("adminId", user?.id || 1);
// // //       data.append("title", formData.title);
// // //       data.append("date", formData.date);
// // //       data.append("year", formData.year);
// // //       data.append("textEditor", formData.textEditor);
// // //       data.append("capabilityCategoryId", JSON.stringify(formData.capabilityCategoryId));
// // //       data.append("countryId", JSON.stringify(formData.countryId));
// // //       data.append("cityId", JSON.stringify(formData.cityId));
// // //       data.append("attorneyId", JSON.stringify([]));

// // //       const socialLinks = { linkedin: formData.linkedin, twitter: formData.twitter, facebook: formData.facebook };
// // //       data.append("socialLinks", JSON.stringify(socialLinks));

// // //       if (formData.bannerImage) data.append("bannerImage", formData.bannerImage);
// // //       if (formData.newsImage) data.append("newsImage", formData.newsImage);

// // //       const res = isEditing ? await authService.updateNews(currentId, data) : await authService.createNews(data);
// // //       if (res.success || res.status) {
// // //         toast.success(`News ${isEditing ? "Updated" : "Created"}!`);
// // //         toggle();
// // //         fetchData();
// // //       }
// // //     } catch (error) {
// // //       toast.error("Process failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEdit = (item) => {
// // //     let social = { linkedin: "", twitter: "", facebook: "" };
// // //     try { social = typeof item.socialLinks === "string" ? JSON.parse(item.socialLinks) : (item.socialLinks || social); } catch (e) {}

// // //     const parseArr = (val) => { try { return typeof val === "string" ? JSON.parse(val) : (val || []); } catch (e) { return []; } };

// // //     setFormData({
// // //       title: item.title, date: item.date, year: item.year, textEditor: item.textEditor,
// // //       linkedin: social.linkedin || "", twitter: social.twitter || "", facebook: social.facebook || "",
// // //       capabilityCategoryId: parseArr(item.capabilityCategoryId),
// // //       countryId: parseArr(item.countryId),
// // //       cityId: parseArr(item.cityId),
// // //       bannerImage: null, newsImage: null,
// // //     });
// // //     setCurrentId(item.id);
// // //     setIsEditing(true);
// // //     setModal(true);
// // //   };

// // //   const renderDropdown = (label, list, field, key, nameKey) => (
// // //     <FormGroup>
// // //       <Label className="fw-bold small">{label}</Label>
// // //       <Dropdown isOpen={dropdownOpen[key]} toggle={() => toggleDropdown(key)} className="w-100">
// // //         <DropdownToggle caret className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark text-capitalize" style={{ minHeight: '38px' }}>
// // //           {formData[field].length > 0 ? `${formData[field].length} Selected` : `Select ${label}`}
// // //         </DropdownToggle>
// // //         <DropdownMenu className="w-100 shadow-sm overflow-auto" style={{ maxHeight: '250px' }}>
// // //           {list.length > 0 ? list.map((item) => (
// // //             <div key={item.id} className="px-3 py-1 dropdown-item d-flex align-items-center" onClick={(e) => e.stopPropagation()}>
// // //               <Input 
// // //                 type="checkbox" 
// // //                 className="me-2 cursor-pointer"
// // //                 checked={formData[field].includes(item.id.toString()) || formData[field].includes(item.id)}
// // //                 onChange={() => handleMultiSelect(item.id, field)}
// // //               />
// // //               <span className="small text-dark" onClick={() => handleMultiSelect(item.id, field)} style={{ cursor: 'pointer' }}>
// // //                 {item[nameKey]}
// // //               </span>
// // //             </div>
// // //           )) : <div className="text-center small py-2">No data available</div>}
// // //         </DropdownMenu>
// // //       </Dropdown>
// // //     </FormGroup>
// // //   );

// // //   return (
// // //     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
// // //       <ToastContainer theme="colored" />
      
// // //       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
// // //         <div>
// // //           <h4 className="fw-bold mb-0">News Management</h4>
// // //           <p className="text-muted small mb-0">Manage legal news and updates.</p>
// // //         </div>
// // //         <Button className="px-4 text-white fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none' }} onClick={toggle}>+ Add News</Button>
// // //       </div>

// // //       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
// // //         <CardBody className="p-0">
// // //           <Table hover className="align-middle mb-0">
// // //             <thead style={{ backgroundColor: LIGHT_GOLD }}>
// // //               <tr>
// // //                 <th className="px-4 py-3">Sr. No.</th>
// // //                 <th>Banner</th>
// // //                 <th>Title</th>
// // //                 <th>Date</th>
// // //                 <th className="text-end px-4">Action</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {newsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
// // //                 <tr key={item.id} className="border-bottom">
// // //                   <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
// // //                   <td><img src={authService.getImgUrl(item.bannerImage)} style={{ width: "60px", height: "35px", borderRadius: "4px", objectFit: "cover" }} onError={(e) => e.target.src="https://placehold.co/60x35"} alt="img" /></td>
// // //                   <td className="fw-bold text-dark">{item.title}</td>
// // //                   <td className="text-muted small">{item.date} ({item.year})</td>
// // //                   <td className="text-end px-4">
// // //                     <Button size="sm" color="white" className="border me-2" onClick={() => handleEdit(item)}>✏️</Button>
// // //                     <Button size="sm" color="white" className="text-danger border" onClick={() => handleDelete(item.id)}>🗑️</Button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </Table>
// // //         </CardBody>
// // //       </Card>

// // //       <div className="mt-3">
// // //         <PaginationComponent totalItems={newsList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
// // //       </div>

// // //       <Modal isOpen={modal} toggle={toggle} centered size="xl">
// // //         <ModalHeader toggle={toggle} className="border-0 pb-0 fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit News" : "Add New News"}</ModalHeader>
// // //         <ModalBody className="px-4 pb-4">
// // //           <Form onSubmit={handleSubmit}>
// // //             <Row className="gy-3">
// // //               <Col md={6}><FormGroup><Label className="fw-bold small">News Title *</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></FormGroup></Col>
// // //               <Col md={3}><FormGroup><Label className="fw-bold small">Date *</Label><Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required /></FormGroup></Col>
// // //               <Col md={3}><FormGroup><Label className="fw-bold small">Year *</Label><Input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required /></FormGroup></Col>

// // //               {/* These are the new Dropdown Selectors */}
// // //               <Col md={4}>{renderDropdown("Categories", categories, "capabilityCategoryId", "cat", "categoryName")}</Col>
// // //               <Col md={4}>{renderDropdown("Countries", countries, "countryId", "count", "countryName")}</Col>
// // //               <Col md={4}>{renderDropdown("Cities", cities, "cityId", "city", "cityName")}</Col>

// // //               <Col md={6}><FormGroup><Label className="fw-bold small">Banner Image *</Label><Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>
// // //               <Col md={6}><FormGroup><Label className="fw-bold small">News Image *</Label><Input type="file" onChange={e => setFormData({ ...formData, newsImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>

// // //               <Col md={4}><Label className="small fw-bold">LinkedIn</Label><Input value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} /></Col>
// // //               <Col md={4}><Label className="small fw-bold">Twitter</Label><Input value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} /></Col>
// // //               <Col md={4}><Label className="small fw-bold">Facebook</Label><Input value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} /></Col>

// // //               <Col xs={12}>
// // //                 <Label className="fw-bold small">News Content *</Label>
// // //                 <div className="bg-white border rounded">
// // //                   <ReactQuill theme="snow" value={formData.textEditor} onChange={v => setFormData({ ...formData, textEditor: v })} style={{ height: "200px", marginBottom: "50px" }} />
// // //                 </div>
// // //               </Col>
// // //             </Row>
// // //             <div className="mt-4 d-flex gap-2">
// // //               <Button type="submit" className="px-5 text-white fw-bold" style={{ backgroundColor: GOLD, border: 'none' }} disabled={loading}>{loading ? "Saving..." : "Save News"}</Button>
// // //               <Button outline className="px-5" onClick={toggle}>Cancel</Button>
// // //             </div>
// // //           </Form>
// // //         </ModalBody>
// // //       </Modal>
// // //     </Container>
// // //   );
// // // };

// // // export default News;


// // "use client";
// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import dynamic from "next/dynamic";
// // import {
// //   Container, Row, Col, Card, CardBody, Table, Button, Modal,
// //   ModalHeader, ModalBody, Form, FormGroup, Label, Input,
// //   Dropdown, DropdownToggle, DropdownMenu
// // } from "reactstrap";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import authService from "@/services/authService";
// // import PaginationComponent from "../../../context/Pagination";

// // // Rich Text Editor Setup
// // import "react-quill-new/dist/quill.snow.css";
// // const ReactQuill = dynamic(() => import("react-quill-new"), {
// //   ssr: false,
// //   loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>,
// // });

// // const News = () => {
// //   const GOLD = "#eebb5d";
// //   const LIGHT_GOLD = "#fdf8ef";

// //   const [newsList, setNewsList] = useState([]);
// //   const [modal, setModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentId, setCurrentId] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // Dropdown States
// //   const [categories, setCategories] = useState([]);
// //   const [countries, setCountries] = useState([]);
// //   const [cities, setCities] = useState([]);
// //   const [openDropdown, setOpenDropdown] = useState(null); // 'cat', 'count', 'city'

// //   const [formData, setFormData] = useState({
// //     title: "", date: "", year: new Date().getFullYear(), textEditor: "",
// //     bannerImage: null, newsImage: null,
// //     capabilityCategoryId: [], countryId: [], cityId: [],
// //     linkedin: "", twitter: "", facebook: "",
// //   });

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 8;

// //   // Helper to safely get data
// //   const safeArray = (res) => {
// //     const data = res?.data?.data || res?.data || res || [];
// //     return Array.isArray(data) ? data : [];
// //   };

// //   const fetchData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const [newsRes, catRes, countRes, cityRes] = await Promise.all([
// //         authService.getAllNews(),
// //         authService.getAllCapabilityCategories().catch(() => ({ data: [] })),
// //         authService.getAllCountries().catch(() => ({ data: [] })),
// //         authService.getAllCities().catch(() => ({ data: [] })),
// //       ]);
// //       setNewsList(safeArray(newsRes));
// //       setCategories(safeArray(catRes));
// //       setCountries(safeArray(countRes));
// //       setCities(safeArray(cityRes));
// //     } catch (error) {
// //       toast.error("Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => { fetchData(); }, [fetchData]);

// //   // Multi-select Handler for Checkboxes
// //   const handleCheckboxChange = (id, field) => {
// //     const stringId = id.toString();
// //     let updatedList = [...formData[field]];
// //     if (updatedList.includes(stringId)) {
// //       updatedList = updatedList.filter(item => item !== stringId);
// //     } else {
// //       updatedList.push(stringId);
// //     }
// //     setFormData({ ...formData, [field]: updatedList });
// //   };

// //   const toggle = () => {
// //     setModal(!modal);
// //     if (!modal) {
// //       setFormData({
// //         title: "", date: "", year: new Date().getFullYear(), textEditor: "",
// //         bannerImage: null, newsImage: null,
// //         capabilityCategoryId: [], countryId: [], cityId: [],
// //         linkedin: "", twitter: "", facebook: "",
// //       });
// //       setIsEditing(false);
// //       setCurrentId(null);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const user = JSON.parse(localStorage.getItem("user"));
// //       const data = new FormData();
// //       data.append("adminId", user?.id || 3);
// //       data.append("title", formData.title);
// //       data.append("date", formData.date);
// //       data.append("year", formData.year);
// //       data.append("textEditor", formData.textEditor);
// //       data.append("capabilityCategoryId", JSON.stringify(formData.capabilityCategoryId));
// //       data.append("countryId", JSON.stringify(formData.countryId));
// //       data.append("cityId", JSON.stringify(formData.cityId));
// //       data.append("attorneyId", JSON.stringify([]));

// //       const socialLinks = {
// //         linkedin: formData.linkedin,
// //         twitter: formData.twitter,
// //         facebook: formData.facebook
// //       };
// //       data.append("socialLinks", JSON.stringify(socialLinks));

// //       if (formData.bannerImage) data.append("bannerImage", formData.bannerImage);
// //       if (formData.newsImage) data.append("newsImage", formData.newsImage);

// //       const res = isEditing 
// //         ? await authService.updateNews(currentId, data)
// //         : await authService.createNews(data);

// //       if (res.success || res.status) {
// //         toast.success(`News ${isEditing ? "Updated" : "Created"}!`);
// //         toggle();
// //         fetchData();
// //       }
// //     } catch (error) {
// //       toast.error("Submit failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     let social = { linkedin: "", twitter: "", facebook: "" };
// //     try { social = typeof item.socialLinks === "string" ? JSON.parse(item.socialLinks) : (item.socialLinks || social); } catch (e) {}

// //     const parseIds = (val) => {
// //       try {
// //         const parsed = typeof val === "string" ? JSON.parse(val) : (val || []);
// //         return Array.isArray(parsed) ? parsed.map(String) : [];
// //       } catch (e) { return []; }
// //     };

// //     setFormData({
// //       title: item.title, date: item.date, year: item.year, textEditor: item.textEditor,
// //       linkedin: social.linkedin || "", twitter: social.twitter || "", facebook: social.facebook || "",
// //       capabilityCategoryId: parseIds(item.capabilityCategoryId),
// //       countryId: parseIds(item.countryId),
// //       cityId: parseIds(item.cityId),
// //       bannerImage: null, newsImage: null,
// //     });
// //     setCurrentId(item.id);
// //     setIsEditing(true);
// //     setModal(true);
// //   };

// //   // Dropdown UI Component
// //   const Selector = ({ label, items, field, type, nameKey }) => (
// //     <FormGroup>
// //       <Label className="fw-bold small">{label}</Label>
// //       <Dropdown isOpen={openDropdown === type} toggle={() => setOpenDropdown(openDropdown === type ? null : type)}>
// //         <DropdownToggle caret className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark">
// //           {formData[field].length > 0 ? `${formData[field].length} Selected` : `Select ${label}`}
// //         </DropdownToggle>
// //         <DropdownMenu className="w-100 shadow-lg border-0 p-2" style={{ maxHeight: "250px", overflowY: "auto" }}>
// //           {items.map(item => (
// //             <div key={item.id} className="d-flex align-items-center p-2 dropdown-item" onClick={(e) => e.stopPropagation()}>
// //               <Input 
// //                 type="checkbox" 
// //                 className="me-2 mt-0 cursor-pointer" 
// //                 checked={formData[field].includes(item.id.toString())}
// //                 onChange={() => handleCheckboxChange(item.id, field)}
// //               />
// //               <span className="small" onClick={() => handleCheckboxChange(item.id, field)} style={{ cursor: 'pointer' }}>
// //                 {item[nameKey]}
// //               </span>
// //             </div>
// //           ))}
// //         </DropdownMenu>
// //       </Dropdown>
// //     </FormGroup>
// //   );

// //   return (
// //     <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
// //       <ToastContainer theme="colored" />
      
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h4 className="fw-bold mb-0">News Management</h4>
// //         <Button className="px-4 text-white fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none' }} onClick={toggle}>+ Add News</Button>
// //       </div>

// //       <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
// //         <CardBody className="p-0">
// //           <Table hover className="align-middle mb-0">
// //             <thead style={{ backgroundColor: LIGHT_GOLD }}>
// //               <tr>
// //                 <th className="px-4 py-3">Sr. No.</th>
// //                 <th>Banner</th>
// //                 <th>Title</th>
// //                 <th>Date & Year</th>
// //                 <th className="text-end px-4">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {newsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
// //                 <tr key={item.id} className="border-bottom">
// //                   <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
// //                   <td>
// //                     <img 
// //                       src={authService.getImgUrl(item.bannerImage)} 
// //                       style={{ width: "80px", height: "45px", borderRadius: "6px", objectFit: "cover", border: "1px solid #eee" }} 
// //                       onError={(e) => { e.target.src = "https://placehold.co/80x45?text=No+Image"; }}
// //                       alt="Banner"
// //                     />
// //                   </td>
// //                   <td className="fw-bold text-dark">{item.title}</td>
// //                   <td className="text-muted small">{item.date} ({item.year})</td>
// //                   <td className="text-end px-4">
// //                     <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
// //                     <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => authService.deleteNews(item.id).then(() => fetchData())}>🗑️</Button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </CardBody>
// //       </Card>

// //       <div className="mt-3">
// //         <PaginationComponent totalItems={newsList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
// //       </div>

// //       <Modal isOpen={modal} toggle={toggle} centered size="xl">
// //         <ModalHeader toggle={toggle} className="border-0 pb-0 fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit News" : "Add New News"}</ModalHeader>
// //         <ModalBody className="px-4 pb-4">
// //           <Form onSubmit={handleSubmit}>
// //             <Row className="gy-3">
// //               <Col md={6}><FormGroup><Label className="fw-bold small">News Title *</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></FormGroup></Col>
// //               <Col md={3}><FormGroup><Label className="fw-bold small">Date *</Label><Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required /></FormGroup></Col>
// //               <Col md={3}><FormGroup><Label className="fw-bold small">Year *</Label><Input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required /></FormGroup></Col>

// //               {/* Selector Components */}
// //               <Col md={4}><Selector label="Categories" items={categories} field="capabilityCategoryId" type="cat" nameKey="categoryName" /></Col>
// //               <Col md={4}><Selector label="Countries" items={countries} field="countryId" type="count" nameKey="countryName" /></Col>
// //               <Col md={4}><Selector label="Cities" items={cities} field="cityId" type="city" nameKey="cityName" /></Col>

// //               <Col md={6}><FormGroup><Label className="fw-bold small">Banner Image (Main Listing) *</Label><Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>
// //               <Col md={6}><FormGroup><Label className="fw-bold small">News Image (Inner Page) *</Label><Input type="file" onChange={e => setFormData({ ...formData, newsImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>

// //               <Col md={4}><Label className="small fw-bold">LinkedIn URL</Label><Input value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} /></Col>
// //               <Col md={4}><Label className="small fw-bold">Twitter URL</Label><Input value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} /></Col>
// //               <Col md={4}><Label className="small fw-bold">Facebook URL</Label><Input value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} /></Col>

// //               <Col xs={12}>
// //                 <Label className="fw-bold small">News Content *</Label>
// //                 <div className="bg-white border rounded">
// //                   <ReactQuill theme="snow" value={formData.textEditor} onChange={v => setFormData({ ...formData, textEditor: v })} style={{ height: "200px", marginBottom: "50px" }} />
// //                 </div>
// //               </Col>
// //             </Row>
// //             <div className="mt-4 d-flex gap-2">
// //               <Button type="submit" className="px-5 text-white fw-bold" style={{ backgroundColor: GOLD, border: 'none' }} disabled={loading}>{loading ? "Saving..." : "Save News"}</Button>
// //               <Button outline className="px-5" onClick={toggle}>Cancel</Button>
// //             </div>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default News;



"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Container, Row, Col, Card, CardBody, Table, Button, Modal,
  ModalHeader, ModalBody, Form, FormGroup, Label, Input,
  Dropdown, DropdownToggle, DropdownMenu
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from "@/services/authService";
import PaginationComponent from "../../../context/Pagination";

// Rich Text Editor Setup
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>,
});

const News = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [newsList, setNewsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dropdown states
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); 

  const [formData, setFormData] = useState({
    title: "", date: "", year: new Date().getFullYear(), textEditor: "",
    bannerImage: null, newsImage: null,
    capabilityCategoryId: [], countryId: [], cityId: [],
    linkedin: "", twitter: "", facebook: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Helper: API Response से डेटा निकालने के लिए (आपका डेटा res.data.data में है)
  const safeArray = (res) => {
    const data = res?.data?.data || res?.data || res || [];
    return Array.isArray(data) ? data : [];
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [newsRes, catRes, countRes, cityRes] = await Promise.all([
        authService.getAllNews(),
        authService.getAllCapabilityCategories().catch(() => ({ data: [] })),
        authService.getAllCountries().catch(() => ({ data: [] })),
        authService.getAllCities().catch(() => ({ data: [] })),
      ]);
      setNewsList(safeArray(newsRes));
      setCategories(safeArray(catRes));
      setCountries(safeArray(countRes));
      setCities(safeArray(cityRes));
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCheckboxChange = (id, field) => {
    const stringId = id.toString();
    let updatedList = [...formData[field]];
    if (updatedList.includes(stringId)) {
      updatedList = updatedList.filter(item => item !== stringId);
    } else {
      updatedList.push(stringId);
    }
    setFormData({ ...formData, [field]: updatedList });
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        title: "", date: "", year: new Date().getFullYear(), textEditor: "",
        bannerImage: null, newsImage: null,
        capabilityCategoryId: [], countryId: [], cityId: [],
        linkedin: "", twitter: "", facebook: "",
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = authService.getCurrentUser();
      const data = new FormData();
      data.append("adminId", user?.id || 3);
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("year", formData.year);
      data.append("textEditor", formData.textEditor);
      data.append("capabilityCategoryId", JSON.stringify(formData.capabilityCategoryId));
      data.append("countryId", JSON.stringify(formData.countryId));
      data.append("cityId", JSON.stringify(formData.cityId));
      data.append("attorneyId", JSON.stringify([]));

      const socialLinks = { linkedin: formData.linkedin, twitter: formData.twitter, facebook: formData.facebook };
      data.append("socialLinks", JSON.stringify(socialLinks));

      if (formData.bannerImage) data.append("bannerImage", formData.bannerImage);
      if (formData.newsImage) data.append("newsImage", formData.newsImage);

      const res = isEditing ? await authService.updateNews(currentId, data) : await authService.createNews(data);
      if (res.success || res.status) {
        toast.success(`News ${isEditing ? "Updated" : "Created"}!`);
        toggle();
        fetchData();
      }
    } catch (error) {
      toast.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    let social = { linkedin: "", twitter: "", facebook: "" };
    try { 
      social = typeof item.socialLinks === "string" ? JSON.parse(item.socialLinks) : (item.socialLinks || social); 
    } catch (e) { console.log("Social parse error"); }

    const parseIds = (val) => {
      try {
        const parsed = typeof val === "string" ? JSON.parse(val) : (val || []);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch (e) { return []; }
    };

    setFormData({
      title: item.title, date: item.date, year: item.year, textEditor: item.textEditor,
      linkedin: social.linkedin || "", twitter: social.twitter || "", facebook: social.facebook || "",
      capabilityCategoryId: parseIds(item.capabilityCategoryId),
      countryId: parseIds(item.countryId),
      cityId: parseIds(item.cityId),
      bannerImage: null, newsImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const Selector = ({ label, items, field, type, nameKey }) => (
    <FormGroup>
      <Label className="fw-bold small">{label}</Label>
      <Dropdown isOpen={openDropdown === type} toggle={() => setOpenDropdown(openDropdown === type ? null : type)}>
        <DropdownToggle caret className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark">
          {formData[field].length > 0 ? `${formData[field].length} Selected` : `Select ${label}`}
        </DropdownToggle>
        <DropdownMenu className="w-100 shadow-lg border-0 p-2" style={{ maxHeight: "250px", overflowY: "auto" }}>
          {items.map(item => (
            <div key={item.id} className="d-flex align-items-center p-2 dropdown-item" onClick={(e) => e.stopPropagation()}>
              <Input 
                type="checkbox" 
                className="me-2 mt-0 cursor-pointer" 
                checked={formData[field].includes(item.id.toString())}
                onChange={() => handleCheckboxChange(item.id, field)}
              />
              <span className="small" onClick={() => handleCheckboxChange(item.id, field)} style={{ cursor: 'pointer' }}>
                {item[nameKey] || item.countryName || item.cityName || item.categoryName}
              </span>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );

  return (
    <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">News Management</h4>
        <Button className="px-4 text-white fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none' }} onClick={toggle}>+ Add News</Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <Table hover className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4 py-3">Sr. No.</th>
                <th>Banner</th>
                <th>Title</th>
                <th>Date & Year</th>
                <th className="text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {newsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                <tr key={item.id} className="border-bottom">
                  <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
                  <td>
                  
<img 
  src={
    item.bannerImage?.startsWith('uploads/') 
      ? authService.getImgUrl(item.bannerImage) 
      : authService.getImgUrl(`uploads/${item.bannerImage}`)
  } 
  style={{ width: "80px", height: "45px", borderRadius: "6px", objectFit: "cover", border: "1px solid #eee" }} 
  onError={(e) => { e.target.src = "https://placehold.co/80x45?text=No+Image"; }}
  alt="Banner"
/>
                  </td>
                  <td className="fw-bold text-dark">{item.title}</td>
                  <td className="text-muted small">{item.date} ({item.year})</td>
                  <td className="text-end px-4">
                    <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
                    <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => {if(window.confirm("Delete?")) authService.deleteNews(item.id).then(() => fetchData())}}>🗑️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent totalItems={newsList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="xl">
        <ModalHeader toggle={toggle} className="border-0 pb-0 fw-bold" style={{ color: GOLD }}>{isEditing ? "Edit News" : "Add New News"}</ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}><FormGroup><Label className="fw-bold small">News Title *</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></FormGroup></Col>
              <Col md={3}><FormGroup><Label className="fw-bold small">Date *</Label><Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required /></FormGroup></Col>
              <Col md={3}><FormGroup><Label className="fw-bold small">Year *</Label><Input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required /></FormGroup></Col>

              <Col md={4}><Selector label="Categories" items={categories} field="capabilityCategoryId" type="cat" nameKey="categoryName" /></Col>
              <Col md={4}><Selector label="Countries" items={countries} field="countryId" type="count" nameKey="countryName" /></Col>
              <Col md={4}><Selector label="Cities" items={cities} field="cityId" type="city" nameKey="cityName" /></Col>

              <Col md={6}><FormGroup><Label className="fw-bold small">Banner Image *</Label><Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>
              <Col md={6}><FormGroup><Label className="fw-bold small">News Image *</Label><Input type="file" onChange={e => setFormData({ ...formData, newsImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>

              <Col md={4}><Label className="small fw-bold">LinkedIn URL</Label><Input value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} /></Col>
              <Col md={4}><Label className="small fw-bold">Twitter URL</Label><Input value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} /></Col>
              <Col md={4}><Label className="small fw-bold">Facebook URL</Label><Input value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} /></Col>

              <Col xs={12}>
                <Label className="fw-bold small">News Content *</Label>
                <div className="bg-white border rounded">
                  <ReactQuill theme="snow" value={formData.textEditor} onChange={v => setFormData({ ...formData, textEditor: v })} style={{ height: "200px", marginBottom: "50px" }} />
                </div>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button type="submit" className="px-5 text-white fw-bold" style={{ backgroundColor: GOLD, border: 'none' }} disabled={loading}>{loading ? "Saving..." : "Save News"}</Button>
              <Button outline className="px-5 fw-bold" onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default News;

