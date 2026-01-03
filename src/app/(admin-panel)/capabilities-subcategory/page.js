'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../../../services/authService';
import PaginationComponent from '../../../context/Pagination';

const CapabilitySubCategory = () => {
  const GOLD = "#eebb5d";
  // ✅ 1. स्लैश फिक्स किया (URL सही बनेगा)
  const BASE_URL = "https://nodejs.nrislawfirm.com/"; 

  const [subcategories, setSubcategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryName: "",
    description: "",
    bannerImage: null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggle = () => {
    setModal(!modal);
    setFormData({ categoryId: "", subcategoryName: "", description: "", bannerImage: null });
    setIsEditing(false);
  };

  // ✅ 2. fetchData को बाहर निकाला (ताकि सब जगह इस्तेमाल हो सके)
  const fetchData = useCallback(async () => {
    try {
      console.log("📢 Fetching data...");
      const subRes = await authService.getAllCapabilitySubCategories();
      const catRes = await authService.getAllCapabilityCategories();

      if (subRes.success) {
        setSubcategories(Array.isArray(subRes.data) ? subRes.data : []);
      }
      if (catRes.success) {
        // Parent Categories का डेटा निकालें
        const catData = catRes.data.data || catRes.data;
        setParentCategories(Array.isArray(catData) ? catData : []);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      toast.error("Error loading data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ 3. Category ID से नाम निकालने का हेल्पर
  const getCategoryName = (id) => {
    const found = parentCategories.find(cat => String(cat.id) === String(id));
    return found ? found.categoryName : `ID: ${id}`;
  };

  const handleSubmit = async () => {
    if (!formData.categoryId || !formData.subcategoryName) {
      return toast.error("Please fill required fields!");
    }

    try {
      const res = isEditing 
        ? await authService.updateCapabilitySubCategory(currentId, formData)
        : await authService.createCapabilitySubCategory(formData);

      if (res.success) {
        toast.success(isEditing ? "Updated!" : "Created!");
        toggle();
        fetchData(); // अब यह काम करेगा
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    const res = await authService.deleteCapabilitySubCategory(id);
    if (res.success) {
      toast.success("Deleted!");
      fetchData();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      categoryId: item.categoryId,
      subcategoryName: item.subcategoryName,
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
  const currentItems = subcategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3">
          <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Capability Subcategories</h5>
        </CardBody>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <div className="text-end mb-3">
            <Button onClick={toggle} style={{ backgroundColor: GOLD, border: 'none' }}>Add Subcategory</Button>
          </div>

          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Subcategory Name</th>
                <th>Parent Category</th>
                <th>Description</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.bannerImage ? `${BASE_URL}${item.bannerImage}` : ""}
                      alt="subcategory"
                      style={{ width: "60px", height: "40px", borderRadius: "4px", objectFit: "cover" }}
                      onError={(e) => {
                        console.log("⚠️ Img Error at:", e.target.src);
                        e.currentTarget.src = "https://via.placeholder.com/60x40?text=Error";
                      }}
                    />
                  </td>
                  <td className="fw-bold">{item.subcategoryName}</td>
                  {/* ✅ 4. Category Name फिक्स */}
                  <td>
                    <span className="badge bg-light text-dark border">
                      {getCategoryName(item.categoryId)}
                    </span>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>{item.description}</td>
                  <td className="text-end">
                    <Button color="link" onClick={() => handleEdit(item)} style={{ color: GOLD }}><i className="bi bi-pencil-square"></i></Button>
                    <Button color="link" className="text-danger" onClick={() => handleDelete(item.id)}><i className="bi bi-trash"></i></Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center py-4">No Subcategories Found</td></tr>
              )}
            </tbody>
          </Table>

          <PaginationComponent 
            totalItems={subcategories.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CardBody>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{isEditing ? "Edit" : "Add"} Subcategory</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Select Parent Category</Label>
              <Input 
                type="select" 
                value={formData.categoryId} 
                onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">-- Select Category --</option>
                {parentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Subcategory Name</Label>
              <Input 
                value={formData.subcategoryName} 
                onChange={e => setFormData({ ...formData, subcategoryName: e.target.value })} 
              />
            </FormGroup>

            <FormGroup>
              <Label>Banner Image</Label>
              <Input type="file" onChange={e => setFormData({ ...formData, bannerImage: e.target.files[0] })} accept="image/*" />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input 
                type="textarea" 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
              />
            </FormGroup>

            <Button block style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>
              {isEditing ? "Update" : "Save"} Subcategory
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CapabilitySubCategory;