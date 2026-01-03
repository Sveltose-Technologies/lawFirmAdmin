'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import PaginationComponent from '../../../context/Pagination'; // Path check kar lein

const CapabilityCategory = () => {
  const GOLD = "#eebb5d";
  const BASE_URL = "https://nodejs.nrislawfirm.com";

  // States
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    adminId: 3, 
    categoryName: "",
    description: "",
    bannerImage: null
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Toggle Modal
  const toggle = () => {
    setModal(!modal);
    setFormData({ adminId: 3, categoryName: "", description: "", bannerImage: null });
    setIsEditing(false);
  };

  // 1. GET ALL DATA (Direct API Call)
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/capability-categories/get-all`);
      if (response.data.success) {
        // Aapke console ke hisab se response.data.data array hai
        setCategories(response.data.data || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. CREATE & UPDATE (Direct API Call)
  const handleSubmit = async () => {
    if (!formData.categoryName || !formData.description) {
      return toast.error("Please fill required fields!");
    }

    const data = new FormData();
    data.append('adminId', formData.adminId);
    data.append('categoryName', formData.categoryName);
    data.append('description', formData.description);
    if (formData.bannerImage) {
      data.append('bannerImage', formData.bannerImage);
    }

    try {
      let res;
      if (isEditing) {
        // Update API
        res = await axios.put(`${BASE_URL}/capability-categories/update/${currentId}`, data);
      } else {
        // Create API (Note: underscore used as per your input)
        res = await axios.post(`${BASE_URL}/capability-categories/create`, data);
      }

      if (res.data.success) {
        toast.success(isEditing ? "Updated Successfully!" : "Created Successfully!");
        toggle();
        fetchData();
      }
    } catch (err) {
      toast.error("Operation failed. Try again.");
    }
  };

  // 3. DELETE (Direct API Call)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await axios.delete(`${BASE_URL}/capability-categories/delete/${id}`);
      if (res.data.success) {
        toast.success("Category deleted!");
        fetchData();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setFormData({
      adminId: item.adminId,
      categoryName: item.categoryName,
      description: item.description,
      bannerImage: null
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Top Header Card */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3">
          <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Capability Categories</h5>
        </CardBody>
      </Card>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <div className="text-end mb-3">
            <Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none', fontWeight: '500' }}>
              + Add Category
            </Button>
          </div>

          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: '100px' }}>Image</th>
                <th>Category Name</th>
                <th>Description</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center">Loading...</td></tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.bannerImage ? `${BASE_URL}/${item.bannerImage}` : "https://via.placeholder.com/60"}
                        alt="banner"
                        style={{ width: "60px", height: "45px", borderRadius: "6px", objectFit: "cover", border: "1px solid #eee" }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/60"; }}
                      />
                    </td>
                    <td><span className="fw-bold text-dark">{item.categoryName}</span></td>
                    <td>
                        <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.description}
                        </div>
                    </td>
                    <td className="text-end">
                      <Button color="link" onClick={() => handleEdit(item)} style={{ color: GOLD, fontSize: '1.2rem' }}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button color="link" className="text-danger" onClick={() => handleDelete(item.id)} style={{ fontSize: '1.2rem' }}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-5 text-muted">No Categories Found</td></tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="mt-4">
            <PaginationComponent 
                totalItems={categories.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} toggle={toggle} centered size="md">
        <ModalHeader toggle={toggle} className="border-0 pb-0">
            <span className="fw-bold">{isEditing ? "Edit Category" : "Add New Category"}</span>
        </ModalHeader>
        <ModalBody className="p-4">
          <Form>
            <FormGroup>
              <Label className="small fw-bold">Category Name</Label>
              <Input 
                type="text"
                placeholder="Enter category name"
                value={formData.categoryName} 
                onChange={e => setFormData({ ...formData, categoryName: e.target.value })} 
              />
            </FormGroup>

            <FormGroup>
              <Label className="small fw-bold">Banner Image</Label>
              <Input 
                type="file" 
                onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} 
                accept="image/*" 
              />
              <small className="text-muted">Upload high-quality banner image</small>
            </FormGroup>

            <FormGroup>
              <Label className="small fw-bold">Description</Label>
              <Input 
                type="textarea" 
                rows="4"
                placeholder="Write description here..."
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
              />
            </FormGroup>

            <Button block className="mt-4 py-2" style={{ backgroundColor: GOLD, border: 'none', fontWeight: 'bold' }} onClick={handleSubmit}>
              {isEditing ? "Update Category" : "Save Category"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CapabilityCategory;