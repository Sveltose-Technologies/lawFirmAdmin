

// 'use client';
// import React, { useState } from 'react';
// import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BlogCategory = () => {
//   const GOLD = "#eebb5d";
//   const [categories, setCategories] = useState([
//     { id: 1, name: "Legal Advice" },
//     { id: 2, name: "Corporate Law" }
//   ]);
//   const [modal, setModal] = useState(false);
//   const [formData, setFormData] = useState({ name: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   const toggle = () => { setModal(!modal); setFormData({ name: "" }); setIsEditing(false); };

//   const handleSubmit = () => {
//     if(!formData.name) return toast.error("Name Required!", {theme:"colored"});
//     if(isEditing) {
//         setCategories(categories.map(c => c.id === currentId ? {...c, ...formData} : c));
//         toast.success("Updated!", {theme:"colored"});
//     } else {
//         setCategories([...categories, {...formData, id: Date.now()}]);
//         toast.success("Added!", {theme:"colored"});
//     }
//     toggle();
//   };

//   const handleDelete = (id) => { if(confirm("Delete?")) { setCategories(categories.filter(c => c.id !== id)); toast.success("Deleted!", {theme:"colored"}); }};
//   const handleEdit = (item) => { setFormData(item); setCurrentId(item.id); setIsEditing(true); setModal(true); };

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Blog Categories</h5></CardBody></Card>
      
//       <Card className="border-0 shadow-sm"><CardBody className="p-4">
        
//         {/* Responsive Button Layout using Grid System */}
//         <Row className="mb-4 justify-content-end">
//             {/* Mobile: Full Width (xs=12), Desktop: Auto Width (sm=auto) */}
//             <Col xs={12} sm="auto">
//                 <Button 
//                     onClick={toggle} 
//                     className="w-100" 
//                     style={{backgroundColor: GOLD, border:'none'}}
//                 >
//                     Add Category
//                 </Button>
//             </Col>
//         </Row>

//         {/* Responsive Table */}
//         <Table responsive className="align-middle text-nowrap">
//             <thead className="table-light"><tr><th>Category Name</th><th className="text-end">Action</th></tr></thead>
//             <tbody>
//             {categories.map(item => (
//                 <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td className="text-end">
//                         <button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button>
//                         <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
//                     </td>
//                 </tr>
//             ))}
//             </tbody>
//         </Table>

//       </CardBody></Card>
      
//       <Modal isOpen={modal} toggle={toggle} centered>
//         <ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing?"Edit":"Add"} Category</ModalHeader>
//         <ModalBody className="p-4 pt-0">
//         <Form>
//             <FormGroup><Label>Name</Label><Input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} /></FormGroup>
//             <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
//         </Form>
//       </ModalBody></Modal>
//     </div>
//   );
// };
// export default BlogCategory;

'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../../../services/authService';

const BlogCategory = () => {
  const GOLD = "#eebb5d";

  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ categoryName: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Show 5 categories per page

  const toggle = () => {
    setModal(!modal);
    setFormData({ categoryName: "", description: "" });
    setIsEditing(false);
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await authService.getAllCategories();
      console.log("Fetch Categories Response:", res);
      if (res.success) {
        setCategories(res.data);
      } else {
        toast.error(res.message, { theme: "colored" });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories", { theme: "colored" });
    }
  };

  // useEffect to fetch categories
  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  // Handle Add / Update
  const handleSubmit = async () => {
    if (!formData.categoryName) return toast.error("Name Required!", { theme: "colored" });

    if (isEditing) {
      try {
        const res = await authService.updateCategory(currentId, formData);
        console.log("Update Category Response:", res);
        if (res.success) toast.success("Category Updated!", { theme: "colored" });
        else toast.error(res.message, { theme: "colored" });
      } catch (error) {
        console.error("Update category error:", error);
        toast.error("Failed to update category", { theme: "colored" });
      }
    } else {
      try {
        const res = await authService.createCategory(formData);
        console.log("Create Category Response:", res);
        if (res.success) toast.success("Category Added!", { theme: "colored" });
        else toast.error(res.message, { theme: "colored" });
      } catch (error) {
        console.error("Create category error:", error);
        toast.error("Failed to add category", { theme: "colored" });
      }
    }

    toggle();
    setCurrentPage(1); // Reset to first page
    fetchCategories();
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    try {
      const res = await authService.deleteCategory(id);
      console.log("Delete Category Response:", res);
      if (res.success) toast.success("Category Deleted!", { theme: "colored" });
      else toast.error(res.message, { theme: "colored" });
      fetchCategories();
    } catch (error) {
      console.error("Delete category error:", error);
      toast.error("Failed to delete category", { theme: "colored" });
    }
  };

  // Handle Edit
  const handleEdit = (item) => {
    setFormData({ categoryName: item.categoryName, description: item.description || "" });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3">
          <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Case Categories</h5>
        </CardBody>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <Row className="mb-4 justify-content-end">
            <Col xs={12} sm="auto">
              <Button onClick={toggle} className="w-100" style={{ backgroundColor: GOLD, border: 'none' }}>Add Category</Button>
            </Col>
          </Row>

          <Table responsive className="align-middle text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">No categories found</td>
                </tr>
              ) : (
                currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.categoryName}</td>
                    <td>{item.description}</td>
                    <td className="text-end">
                      <button onClick={() => handleEdit(item)} className="btn btn-sm me-2" style={{ color: GOLD, borderColor: GOLD }}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="btn btn-sm text-danger border-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="me-2"
              >
                Prev
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  color={i + 1 === currentPage ? "primary" : "secondary"}
                  onClick={() => setCurrentPage(i + 1)}
                  className="me-2"
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal for Add / Edit */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Category</ModalHeader>
        <ModalBody className="p-4 pt-0">
          <Form>
            <FormGroup>
              <Label>Category Name</Label>
              <Input value={formData.categoryName} onChange={e => setFormData({ ...formData, categoryName: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </FormGroup>
            <Button block style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BlogCategory;
