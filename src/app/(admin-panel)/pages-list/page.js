'use client'; // Ye line zaroori hai Next.js App Router ke liye

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
// Context path check kar lena aapke folder structure ke hisab se
import { useGlobalData } from '../../../context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PagesList = () => {
  const { pageSettings, setPageSettings } = useGlobalData();
  
  const tabs = ["Home", "About Us", "Client & Partners", "Help & Support", "Privacy Policy", "Terms & Conditions"];

  const [activeTab, setActiveTab] = useState("Home");
  const [activeLang, setActiveLang] = useState("English");
  
  // Default empty object to prevent hydration errors
  const [allData, setAllData] = useState({});
  const [formData, setFormData] = useState({});
  // Hydration fix: Check if mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pageSettings) setAllData(pageSettings);
  }, [pageSettings]);

  useEffect(() => {
    if(mounted) {
        setFormData(allData[activeTab] || {});
    }
  }, [activeTab, allData, mounted]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, [fieldName]: previewUrl });
    }
  };

  const handleRemoveImage = (fieldName) => {
    setFormData({ ...formData, [fieldName]: "" });
  };

  // --- 2. SUBMIT FUNCTION WITH TOAST ---
  const handleSubmit = () => {
    const updatedData = { ...allData, [activeTab]: formData };
    setAllData(updatedData);
    setPageSettings(updatedData);
    
    // Toast Notification Trigger
    toast.success(`${activeTab} Settings Saved!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: { backgroundColor: "#eebb5d", color: "#fff" } // Gold Theme
    });
  };

  const goldColor = "#eebb5d"; 

  // --- Components ---
  const LangPill = ({ text }) => (
    <span 
      onClick={() => setActiveLang(text)}
      className="px-3 py-1 rounded-pill small fw-bold me-2 cursor-pointer border"
      style={{ 
        backgroundColor: activeLang === text ? goldColor : '#fff', 
        color: activeLang === text ? '#fff' : '#6c757d',
        borderColor: activeLang === text ? goldColor : '#dee2e6',
        display: 'inline-block',
        marginBottom: '10px',
        transition: 'all 0.3s',
        cursor: 'pointer'
      }}
    >
      {text}
    </span>
  );

  const ImageUploadBox = ({ icon, label, name, value, size = "120px" }) => (
    <div className="mb-3">
      {label && <Label className="small text-muted fw-bold">{label}</Label>}
      <div className="d-flex align-items-start gap-3">
        <div>
            <input 
              type="file" 
              accept="image/*" 
              id={`file-upload-${name}`}
              style={{ display: 'none' }}
              onChange={(e) => handleImageChange(e, name)}
            />
            <label 
                htmlFor={`file-upload-${name}`}
                className="border rounded d-flex align-items-center justify-content-center bg-white shadow-sm overflow-hidden position-relative"
                style={{ height: size, width: size, cursor: 'pointer', borderColor: '#dee2e6' }}
            >
                {value ? (
                  <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} />
                ) : (
                  <i className={`bi ${icon} display-6`} style={{ color: goldColor }}></i>
                )}
            </label>
        </div>
        {value && (
          <Button color="danger" outline size="sm" onClick={() => handleRemoveImage(name)} style={{ marginTop: '10px' }}>
            <i className="bi bi-trash"></i>
          </Button>
        )}
      </div>
    </div>
  );

  const EditorToolbar = () => (
    <div className="border-bottom p-2 bg-light d-flex gap-3 text-muted">
        <i className="bi bi-type-bold"></i>
        <i className="bi bi-type-italic"></i>
        <i className="bi bi-type-underline"></i>
        <span className="border-end mx-1"></span>
        <i className="bi bi-list-ul"></i>
        <i className="bi bi-list-ol"></i>
        <span className="border-end mx-1"></span>
        <i className="bi bi-link-45deg"></i>
        <i className="bi bi-image"></i>
    </div>
  );

  // --- RENDER CONTENT ---
  const renderTabContent = () => {
    // Agar component mount nahi hua to null return kare (Hydration error fix)
    if (!mounted) return null;

    switch (activeTab) {
      case "Home":
      case "About Us":
        return (
            <div className="border rounded p-3 mb-4 bg-white">
                <h6 className="fw-bold mb-3" style={{color: '#495057'}}>Hero & Info</h6>
                <FormGroup>
                    <Label className="small text-muted fw-bold">Title</Label>
                    <Input type="text" name="pageTitle" value={formData.pageTitle || ""} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label className="small text-muted fw-bold">Heading</Label>
                    <Input type="text" name="pageHeading" value={formData.pageHeading || ""} onChange={handleChange} />
                </FormGroup>
                <ImageUploadBox icon="bi-image" label="Main Image" name="mainImg" value={formData.mainImg} />
            </div>
        );

      case "Client & Partners":
        return (
            <div>
                <div className="mb-4">
                    <Label className="fw-bold">Trusted Clients Title</Label>
                    <Input 
                        type="text" 
                        name="clientTitle" 
                        placeholder="Trusted by 100k+ Trusted Client"
                        value={formData.clientTitle || ""} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="mb-4">
                    <Label className="fw-bold mb-2">Client Logos</Label>
                    <div className="d-flex gap-3 flex-wrap">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <ImageUploadBox 
                                key={num}
                                icon="bi-building" 
                                name={`clientLogo${num}`} 
                                value={formData[`clientLogo${num}`]} 
                                size="80px"
                            />
                        ))}
                    </div>
                </div>
                <hr className="my-4"/>
                <Row>
                    <Col md={6} className="mb-4">
                        <h6 className="fw-bold text-muted small">Successful Cases</h6>
                        <div className="border p-3 rounded bg-white">
                            <Label className="small text-muted">Icon</Label>
                            <ImageUploadBox icon="bi-briefcase" name="successIcon" value={formData.successIcon} size="80px" />
                            <Label className="small text-muted mt-2">Case Count</Label>
                            <Input type="number" name="successCount" value={formData.successCount || ""} onChange={handleChange} />
                        </div>
                    </Col>
                    <Col md={6} className="mb-4">
                        <h6 className="fw-bold text-muted small">Case Close</h6>
                        <div className="border p-3 rounded bg-white">
                            <Label className="small text-muted">Icon</Label>
                            <ImageUploadBox icon="bi-hammer" name="closeIcon" value={formData.closeIcon} size="80px" />
                            <Label className="small text-muted mt-2">Close Case Count</Label>
                            <Input type="number" name="closeCount" value={formData.closeCount || ""} onChange={handleChange} />
                        </div>
                    </Col>
                    <Col md={6} className="mb-4">
                        <h6 className="fw-bold text-muted small">Trusted Client</h6>
                        <div className="border p-3 rounded bg-white">
                            <Label className="small text-muted">Icon</Label>
                            <ImageUploadBox icon="bi-person-check" name="trustedIcon" value={formData.trustedIcon} size="80px" />
                            <Label className="small text-muted mt-2">Trusted Count</Label>
                            <Input type="number" name="trustedCount" value={formData.trustedCount || ""} onChange={handleChange} />
                        </div>
                    </Col>
                    <Col md={6} className="mb-4">
                        <h6 className="fw-bold text-muted small">Expert Team</h6>
                        <div className="border p-3 rounded bg-white">
                            <Label className="small text-muted">Icon</Label>
                            <ImageUploadBox icon="bi-people" name="teamIcon" value={formData.teamIcon} size="80px" />
                            <Label className="small text-muted mt-2">Expert Team Count</Label>
                            <Input type="number" name="teamCount" value={formData.teamCount || ""} onChange={handleChange} />
                        </div>
                    </Col>
                </Row>
            </div>
        );

      case "Help & Support":
      case "Privacy Policy":
      case "Terms & Conditions":
        return (
            <div>
                <Label className="fw-bold mb-2">Content</Label>
                <div className="border rounded bg-white" style={{ minHeight: '400px' }}>
                    <EditorToolbar />
                    <Input 
                        type="textarea" 
                        name="pageContent"
                        value={formData.pageContent || ""}
                        onChange={handleChange}
                        className="border-0 p-3"
                        style={{ minHeight: '350px', resize: 'none', boxShadow: 'none' }}
                        placeholder={`Enter content for ${activeTab}...`}
                    />
                </div>
                <div className="text-end mt-1">
                    <small className="text-muted">CHARS: {(formData.pageContent || "").length} | WORDS: {(formData.pageContent || "").split(" ").length}</small>
                </div>
            </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  // Agar mounted nahi hai to loading state dikha sakte hain (Optional)
  if (!mounted) return null;

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 3. TOAST CONTAINER HERE --- */}
      <ToastContainer />

      {/* --- Header --- */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3 d-flex align-items-center">
          <div className="me-2">
            <i className="bi bi-bank display-6" style={{ color: goldColor, fontSize: '1.5rem' }}></i>
          </div>
          <h5 className="mb-0 fw-bold" style={{ color: goldColor }}>Pages List</h5>
        </CardBody>
      </Card>

      {/* --- Navigation Tabs --- */}
      <div className="bg-white px-3 pt-3 mb-4 rounded shadow-sm overflow-auto">
        <Nav tabs className="border-bottom-0 flex-nowrap" style={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
            {tabs.map((tab, idx) => (
                <NavItem key={idx}>
                    <NavLink 
                        onClick={() => setActiveTab(tab)}
                        className={`border-0 rounded-0 pb-3 px-4 fw-medium`}
                        style={{ 
                            color: activeTab === tab ? '#fff' : '#6c757d',
                            backgroundColor: activeTab === tab ? goldColor : 'transparent',
                            cursor: 'pointer',
                            borderBottom: activeTab === tab ? `3px solid ${goldColor}` : 'none'
                        }}
                    >
                        {tab === "Home" && <i className="bi bi-house-door-fill me-2"></i>}
                        {tab}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
      </div>

      {/* --- Main Content Area --- */}
      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
            
            <div className="mb-3 border-bottom pb-3">
                <h6 className="fw-bold text-dark mb-0">{activeTab}</h6>
            </div>
            
            <div className="mb-4">
                <LangPill text="English" />
                <LangPill text="Indonesia" />
                <LangPill text="Bangla" />
                <LangPill text="Italian" />
            </div>

            {renderTabContent()}

            <div className="mt-4">
                <Button 
                    className="border-0 px-4 py-2 fw-medium text-white"
                    style={{ backgroundColor: goldColor }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default PagesList;



// 'use client';
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Input, Button, Form, FormGroup, Label, Row, Col } from "reactstrap";
// import { useGlobalData } from '../../../context/GlobalContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PageSettings = () => {
//   const { pageSettings, setPageSettings } = useGlobalData();
//   const GOLD = "#eebb5d";
//   const [formData, setFormData] = useState({});

//   useEffect(() => { if(pageSettings) setFormData(pageSettings); }, [pageSettings]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = () => {
//     setPageSettings(formData);
//     toast.success("Page Settings Updated Successfully!", { theme: "colored" });
//   };

//   return (
//     <div className="p-3 bg-light min-vh-100 font-sans">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Landing Page Content</h5></CardBody></Card>
      
//       <Card className="border-0 shadow-sm"><CardBody className="p-5">
//         <Form>
//             <h6 className="text-muted border-bottom pb-2 mb-3">Hero Section</h6>
//             <Row>
//                 <Col md={6}><FormGroup><Label>Hero Title</Label><Input name="heroTitle" value={formData.heroTitle || ""} onChange={handleChange}/></FormGroup></Col>
//                 <Col md={6}><FormGroup><Label>Hero Heading</Label><Input name="heroHeading" value={formData.heroHeading || ""} onChange={handleChange}/></FormGroup></Col>
//                 <Col md={12}><FormGroup><Label>Hero Description</Label><Input type="textarea" name="heroDesc" value={formData.heroDesc || ""} onChange={handleChange}/></FormGroup></Col>
//             </Row>

//             <h6 className="text-muted border-bottom pb-2 mb-3 mt-4">About Section</h6>
//             <Row>
//                 <Col md={6}><FormGroup><Label>About Heading</Label><Input name="aboutHeading" value={formData.aboutHeading || ""} onChange={handleChange}/></FormGroup></Col>
//                 <Col md={12}><FormGroup><Label>About Description</Label><Input type="textarea" name="aboutDesc" value={formData.aboutDesc || ""} onChange={handleChange}/></FormGroup></Col>
//             </Row>

//             <h6 className="text-muted border-bottom pb-2 mb-3 mt-4">Counter Section</h6>
//             <Row>
//                 <Col md={3}><FormGroup><Label>Case Title</Label><Input name="caseTitle" value={formData.caseTitle || ""} onChange={handleChange}/></FormGroup></Col>
//                 <Col md={3}><FormGroup><Label>Success Rate Title</Label><Input name="rateTitle" value={formData.rateTitle || ""} onChange={handleChange}/></FormGroup></Col>
//             </Row>

//             <div className="d-flex justify-content-end mt-4">
//                 <Button style={{ backgroundColor: GOLD, border: 'none', padding: '10px 30px' }} onClick={handleSubmit}>Update Settings</Button>
//             </div>
//         </Form>
//       </CardBody></Card>
//     </div>
//   );
// };
// export default PageSettings;