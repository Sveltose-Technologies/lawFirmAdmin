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

import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="p-2 text-center border rounded small">Loading Editor...</div>,
});

const Events = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [eventsList, setEventsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [attorneys, setAttorneys] = useState([]);

  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [formData, setFormData] = useState({
    title: "", startDate: "", endDate: "", description: "",
    registrationLink: "", linkedin: "", facebook: "", twitter: "",
    bannerImage: null, capabilityCategoryId: "", subcategoryIds: [],
    countryId: "", cityIds: [], attorneyIds: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const safeArray = (res) => {
    const data = res?.data?.data || res?.data || res || [];
    return Array.isArray(data) ? data : [];
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    console.log("--- 📢 Fetching Master Data ---");
    try {
      // Har call ke peeche .catch lagaya hai taaki 404 se page crash na ho
      const [eventRes, catRes, subRes, countRes, cityRes, attRes] = await Promise.all([
        authService.getAllEvents().catch(() => ({ data: [] })),
        authService.getAllCapabilityCategories().catch(() => ({ data: [] })),
        authService.getAllCapabilitySubCategories().catch(() => ({ data: [] })),
        authService.getAllCountries().catch(() => ({ data: [] })),
        authService.getAllCities().catch(() => ({ data: [] })),
        authService.getAllAttorneys().catch(() => ({ data: [] }))
      ]);

      setEventsList(safeArray(eventRes));
      setCategories(safeArray(catRes));
      setSubcategories(safeArray(subRes));
      setCountries(safeArray(countRes));
      setCities(safeArray(cityRes));
      setAttorneys(safeArray(attRes));
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCheckboxChange = (id, field) => {
    const numId = Number(id);
    setFormData(prev => {
      const list = Array.isArray(prev[field]) ? [...prev[field]] : [];
      return {
        ...prev,
        [field]: list.includes(numId) ? list.filter(i => i !== numId) : [...list, numId]
      };
    });
  };

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        title: "", startDate: "", endDate: "", description: "",
        registrationLink: "", linkedin: "", facebook: "", twitter: "",
        bannerImage: null, capabilityCategoryId: "", subcategoryIds: [],
        countryId: "", cityIds: [], attorneyIds: []
      });
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", 3);
      data.append("title", formData.title);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("description", formData.description);
      data.append("registrationLink", formData.registrationLink);
      data.append("linkedin", formData.linkedin);
      data.append("facebook", formData.facebook);
      data.append("twitter", formData.twitter);
      data.append("capabilityCategoryId", Number(formData.capabilityCategoryId));
      data.append("countryId", Number(formData.countryId));
      data.append("subcategoryIds", JSON.stringify(formData.subcategoryIds));
      data.append("cityIds", JSON.stringify(formData.cityIds));
      data.append("attorneyIds", JSON.stringify(formData.attorneyIds));

      if (formData.bannerImage) data.append("bannerImage", formData.bannerImage);

      console.log("🚀 Payload Log:");
      for (let pair of data.entries()) { console.log(pair[0] + ': ' + pair[1]); }

      const res = isEditing ? await authService.updateEvent(currentId, data) : await authService.createEvent(data);

      if (res.success) {
        toast.success("Event Saved!");
        toggle();
        fetchData();
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    const parseIds = (v) => {
        try { return typeof v === "string" ? JSON.parse(v).map(Number) : (v || []); } catch { return []; }
    }
    setFormData({
      ...item,
      bannerImage: null,
      subcategoryIds: parseIds(item.subcategoryIds),
      cityIds: parseIds(item.cityIds),
      attorneyIds: parseIds(item.attorneyIds)
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // FIXED SELECTOR COMPONENT
  const Selector = ({ label, items, field, type, nameKey }) => (
    <FormGroup>
      <Label className="fw-bold small">{label}</Label>
      <Dropdown isOpen={openDropdown === type} toggle={() => setOpenDropdown(openDropdown === type ? null : type)}>
        <DropdownToggle caret className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark">
          {(formData[field] || []).length > 0 ? `${formData[field].length} Selected` : `Select ${label}`}
        </DropdownToggle>
        <DropdownMenu className="w-100 shadow-lg border-0 p-2" style={{ maxHeight: "250px", overflowY: "auto" }}>
          {/* Loop karne se pehle check karein ki items ek array hai */}
          {items && Array.isArray(items) && items.length > 0 ? (
            items.map(item => (
              <div key={item.id} className="d-flex align-items-center p-2 dropdown-item" onClick={(e) => e.stopPropagation()}>
                <Input 
                  type="checkbox" 
                  className="me-2 mt-0 cursor-pointer" 
                  checked={(formData[field] || []).includes(Number(item.id))}
                  onChange={() => handleCheckboxChange(item.id, field)}
                />
                <span className="small" onClick={() => handleCheckboxChange(item.id, field)} style={{ cursor: 'pointer' }}>
                  {item[nameKey] || (item.firstName ? `${item.firstName} ${item.lastName || ""}` : `ID: ${item.id}`)}
                </span>
              </div>
            ))
          ) : (
            <div className="p-2 text-muted small text-center">No {label} available</div>
          )}
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );

  return (
    <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Events Management</h4>
          <p className="text-muted small mb-0">Manage global legal conferences and webinars.</p>
        </div>
        <Button className="px-4 text-white fw-bold shadow-sm" style={{ backgroundColor: GOLD, border: 'none' }} onClick={toggle}>+ Add Event</Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <Table hover className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4 py-3">Sr. No.</th>
                <th>Banner</th>
                <th>Event Title</th>
                <th>Duration</th>
                <th className="text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {eventsList.length > 0 ? eventsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                <tr key={item.id} className="border-bottom">
                  <td className="px-4 text-muted">{(currentPage - 1) * itemsPerPage + index + 1}.</td>
                  <td>
                    <img 
                      src={authService.getImgUrl(item.bannerImage)} 
                      style={{ width: "80px", height: "45px", borderRadius: "6px", objectFit: "cover", border: "1px solid #eee" }} 
                      onError={(e) => { e.target.src = "https://placehold.co/80x45?text=No+Image"; }}
                      alt="Banner"
                    />
                  </td>
                  <td className="fw-bold text-dark">{item.title}</td>
                  <td className="text-muted small">{item.startDate} to {item.endDate}</td>
                  <td className="text-end px-4">
                    <Button size="sm" color="white" className="border shadow-sm me-2" onClick={() => handleEdit(item)}>✏️</Button>
                    <Button size="sm" color="white" className="text-danger border shadow-sm" onClick={() => {if(window.confirm("Delete?")) authService.deleteEvent(item.id).then(() => fetchData())}}>🗑️</Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center py-5 text-muted">No events found. Check API path /event/getall</td></tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent totalItems={eventsList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="xl" scrollable>
        <ModalHeader toggle={toggle} className="border-0 pb-0 fw-bold" style={{ color: GOLD }}>{isEditing ? "Update Event" : "Create New Event"}</ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={12}><FormGroup><Label className="fw-bold small">Event Title *</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></FormGroup></Col>
              <Col md={6}><FormGroup><Label className="fw-bold small">Start Date *</Label><Input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required /></FormGroup></Col>
              <Col md={6}><FormGroup><Label className="fw-bold small">End Date *</Label><Input type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} required /></FormGroup></Col>
              
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Main Category *</Label>
                  <Input type="select" value={formData.capabilityCategoryId} onChange={e => setFormData({...formData, capabilityCategoryId: e.target.value})} required>
                    <option value="">-- Select Category --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.categoryName}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Country *</Label>
                  <Input type="select" value={formData.countryId} onChange={e => setFormData({...formData, countryId: e.target.value})} required>
                    <option value="">-- Select Country --</option>
                    {countries.map(c => <option key={c.id} value={c.id}>{c.countryName}</option>)}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={4}><Selector label="Subcategories" items={subcategories} field="subcategoryIds" type="sub" nameKey="subcategoryName" /></Col>
              <Col md={4}><Selector label="Cities" items={cities} field="cityIds" type="city" nameKey="cityName" /></Col>
              <Col md={4}><Selector label="Attorneys" items={attorneys} field="attorneyIds" type="attor" nameKey="firstName" /></Col>

              <Col md={12}><FormGroup><Label className="fw-bold small">Banner Image</Label><Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" /></FormGroup></Col>
              
              <Col md={12}><FormGroup><Label className="fw-bold small">Registration Link</Label><Input value={formData.registrationLink} onChange={e => setFormData({ ...formData, registrationLink: e.target.value })} /></FormGroup></Col>

              <Col md={4}><Label className="small fw-bold">LinkedIn</Label><Input value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} /></Col>
              <Col md={4}><Label className="small fw-bold">Facebook</Label><Input value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} /></Col>
              <Col md={4}><Label className="small fw-bold">Twitter</Label><Input value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} /></Col>

              <Col xs={12}>
                <Label className="fw-bold small">Description *</Label>
                <div className="bg-white border rounded">
                  <ReactQuill theme="snow" value={formData.description} onChange={v => setFormData({ ...formData, description: v })} style={{ height: "200px", marginBottom: "50px" }} />
                </div>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button type="submit" className="px-5 text-white fw-bold" style={{ backgroundColor: GOLD, border: 'none' }} disabled={loading}>{loading ? "Saving..." : "Save Event"}</Button>
              <Button outline className="px-5 fw-bold" onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Events;