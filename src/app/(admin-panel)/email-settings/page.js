'use client';
import React, { useState } from "react";
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
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailSettings = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isDefault, setIsDefault] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    host: "test",
    port: "test",
    username: "test",
    password: "...",
    senderEmail: "appstick@gmail.com"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleDefaultToggle = () => {
    const newState = !isDefault;
    setIsDefault(newState);
    // --- INFO TOAST FOR TOGGLE ---
    toast.info(`Default setting ${newState ? 'Enabled' : 'Disabled'}`, {
        theme: "colored",
        position: "bottom-right",
        autoClose: 2000
    });
  };

  const handleSubmit = () => {
    const provider = activeTab === '1' ? 'SendGrid' : 'Gmail';
    console.log(formData);
    
    // --- GREEN TOAST SUBMIT ---
    toast.success(`${provider} settings saved successfully!`, {
        theme: "colored",
        position: "top-right"
    });
  };

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ active, onClick }) => (
    <div 
      onClick={onClick}
      className="d-inline-flex align-items-center rounded-pill px-1 user-select-none"
      style={{ 
        backgroundColor: active ? '#a88645' : '#e9ecef', 
        width: '50px', 
        height: '24px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s'
      }}
    >
        <div 
            className="rounded-circle shadow-sm bg-white" 
            style={{ 
                width: '18px', 
                height: '18px', 
                position: 'absolute',
                left: active ? '28px' : '4px',
                transition: 'left 0.3s'
            }}
        ></div>
        <span 
            className="text-white small fw-bold" 
            style={{ 
                position: 'absolute', 
                left: '6px', 
                opacity: active ? 1 : 0,
                fontSize: '10px'
            }}
        >
            On
        </span>
        <span 
            className="text-muted small fw-bold" 
            style={{ 
                position: 'absolute', 
                right: '6px', 
                opacity: !active ? 1 : 0,
                fontSize: '10px'
            }}
        >
            Off
        </span>
    </div>
  );

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      {/* --- Header --- */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3 d-flex align-items-center">
          <div className="me-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16" style={{ color: '#eebb5d' }}>
              <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2.6a.5.5 0 0 1-.485.621h-13a.5.5 0 0 1-.485-.621l.5-2.6A.5.5 0 0 1 1 14v-7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.777 4h8.447L8 2.05 3.777 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-3.958 8.5a.5.5 0 1 1-.984.18.5.5 0 1 1 .984-.18z"/>
            </svg>
          </div>
          <h5 className="mb-0 fw-bold" style={{ color: '#eebb5d' }}>Email Settings</h5>
        </CardBody>
      </Card>

      {/* --- Main Content --- */}
      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
            
            {/* Tabs */}
            <div className="d-flex justify-content-center mb-4">
                <Nav pills className="bg-light rounded p-1">
                    <NavItem>
                        <NavLink
                            className={`px-4 cursor-pointer ${activeTab === '1' ? 'bg-white shadow-sm text-dark fw-bold' : 'text-muted'}`}
                            onClick={() => toggleTab('1')}
                            style={{ cursor: 'pointer', border: activeTab === '1' ? '1px solid #ddd' : 'none' }}
                        >
                            <span style={{ color: activeTab === '1' ? '#eebb5d' : '' }}>SendGrid SMTP</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={`px-4 cursor-pointer ${activeTab === '2' ? 'bg-white shadow-sm text-dark fw-bold' : 'text-muted'}`}
                            onClick={() => toggleTab('2')}
                            style={{ cursor: 'pointer', border: activeTab === '2' ? '1px solid #ddd' : 'none' }}
                        >
                            <span style={{ color: activeTab === '2' ? '#eebb5d' : '' }}>Gmail Provider</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <h6 className="mb-3">SendGrid SMTP</h6>
                    <hr className="mb-4" style={{ borderColor: '#eebb5d', opacity: 1 }} />
                    
                    <FormGroup className="mb-3">
                        <Label className="small fw-bold text-muted">Email Host</Label>
                        <Input type="text" name="host" value={formData.host} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Label className="small fw-bold text-muted">Email Port</Label>
                        <Input type="text" name="port" value={formData.port} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Label className="small fw-bold text-muted">Email Username</Label>
                        <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3 position-relative">
                        <Label className="small fw-bold text-muted">Email Password</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                        <i className="bi bi-eye-slash position-absolute" style={{ right: '10px', top: '38px', cursor: 'pointer', color: '#eebb5d' }}></i>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Label className="small fw-bold text-muted">Sender Email</Label>
                        <Input type="email" name="senderEmail" value={formData.senderEmail} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Label className="small fw-bold text-muted d-block">Set Default</Label>
                        <ToggleSwitch active={isDefault} onClick={handleDefaultToggle} />
                    </FormGroup>

                    <Button 
                        className="mt-2 border-0 px-4 py-2 fw-medium text-white"
                        style={{ backgroundColor: '#eebb5d' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </TabPane>

                <TabPane tabId="2">
                     <h6 className="mb-3">Gmail Provider Settings</h6>
                     <hr className="mb-4" style={{ borderColor: '#28a745', opacity: 1 }} />
                     <div className="text-center text-muted p-5">
                        Gmail Settings Form would go here...
                     </div>
                </TabPane>
            </TabContent>

        </CardBody>
      </Card>
    </div>
  );
};

export default EmailSettings;