'use client';

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../../services/authService";
import PaginationComponent from "../../../context/Pagination";

const CapabilityCategory = () => {
  const GOLD = "#eebb5d";
  const BASE_URL = "https://nodejs.nrislawfirm.com/";

  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    bannerImage: null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ---------- Image URL Helper ----------
  const getImageUrl = (path) => {
    if (!path) return "/no-image.png";
    return `${BASE_URL}${path.replace(/^\//, "")}`;
  };

  // ---------- Fetch Categories ----------
  const fetchCategories = useCallback(async () => {
    try {
      const res = await authService.getAllCapabilityCategories();
      if (res.success) {
        setCategories(Array.isArray(res.data) ? res.data : []);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to load categories");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ---------- Modal ----------
  const toggle = () => {
    setModal(!modal);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ categoryName: "", description: "", bannerImage: null });
  };

  // ---------- Submit ----------
  const handleSubmit = async () => {
    if (!formData.categoryName) {
      return toast.error("Category Name is required");
    }

    const res = isEditing
      ? await authService.updateCapabilityCategory(currentId, formData)
      : await authService.createCapabilityCategory(formData);

    if (res.success) {
      toast.success(isEditing ? "Category Updated" : "Category Added");
      toggle();
      fetchCategories();
    } else {
      toast.error(res.message);
    }
  };

  // ---------- Edit ----------
  const handleEdit = (item) => {
    setFormData({
      categoryName: item.categoryName,
      description: item.description || "",
      bannerImage: null
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  // ---------- Delete ----------
  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    const res = await authService.deleteCapabilityCategory(id);
    if (res.success) {
      toast.success("Deleted");
      fetchCategories();
    } else {
      toast.error(res.message);
    }
  };

  // ---------- Pagination ----------
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(start, start + itemsPerPage);

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm">
        <CardBody>
          <h5 className="fw-bold" style={{ color: GOLD }}>
            Capability Categories
          </h5>
        </CardBody>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <div className="text-end mb-3">
            <Button
              style={{ backgroundColor: GOLD, border: "none" }}
              onClick={toggle}
            >
              Add Category
            </Button>
          </div>

          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Banner</th>
                <th>Category Name</th>
                <th>Description</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length ? (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={getImageUrl(item.bannerImage)}
                        alt="category"
                        style={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 4
                        }}
                        onError={(e) =>
                          (e.currentTarget.src = "/no-image.png")
                        }
                      />
                    </td>
                    <td className="fw-bold">{item.categoryName}</td>
                    <td>{item.description}</td>
                    <td className="text-end">
                      <Button
                        color="link"
                        style={{ color: GOLD }}
                        onClick={() => handleEdit(item)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button
                        color="link"
                        className="text-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <PaginationComponent
            totalItems={categories.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </CardBody>
      </Card>

      {/* ---------- MODAL ---------- */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>
          {isEditing ? "Edit" : "Add"} Category
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Category Name</Label>
              <Input
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Banner Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bannerImage: e.target.files[0]
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </FormGroup>

            <Button
              block
              style={{ backgroundColor: GOLD, border: "none" }}
              onClick={handleSubmit}
            >
              {isEditing ? "Update" : "Save"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CapabilityCategory;
