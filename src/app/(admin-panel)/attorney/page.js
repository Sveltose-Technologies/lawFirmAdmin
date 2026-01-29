"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Badge,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "@/services/authService";
import PaginationComponent from "../../../context/Pagination";

const Attorney = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [attorneys, setAttorneys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    countryCode: "",
    isActive: true,
  });

  const fetchAttorneys = useCallback(async () => {
    try {
      const res = await authService.getAllAttorneys();
      // API structure handle kar rahe hain
      const data = res?.data?.attorneys || res?.attorneys || res?.data || [];
      setAttorneys(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load attorneys");
    }
  }, []);

  useEffect(() => {
    fetchAttorneys();
  }, [fetchAttorneys]);

  const toggle = () => {
    setModal(!modal);
    if (modal) setCurrentId(null);
  };

  // Status Toggle Logic (Clickable Badge)
  const handleStatusToggle = async (user) => {
    const newStatus = !user.isActive;
    if (
      window.confirm(
        `Do you want to ${newStatus ? "Activate" : "Deactivate"} ${user.firstName}?`,
      )
    ) {
      try {
        await authService.updateAttorney(user.id, { isActive: newStatus });
        toast.success(`Status updated to ${newStatus ? "Active" : "Deactive"}`);
        fetchAttorneys();
      } catch (err) {
        toast.error("Failed to update status");
      }
    }
  };

  const handleEdit = (u) => {
    setFormData({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      mobile: u.mobile || "",
      street: u.street || "",
      city: u.city || "",
      state: u.state || "",
      zipCode: u.zipCode || "",
      countryCode: u.countryCode || "",
      isActive: u.isActive ?? true,
    });
    setCurrentId(u.id);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this attorney?")) {
      try {
        await authService.deleteAttorney(id);
        toast.success("Attorney deleted successfully");
        fetchAttorneys();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.updateAttorney(currentId, formData);
      toast.success("Attorney profile updated!");
      fetchAttorneys();
      toggle();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = attorneys.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.mobile}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Attorney Management</h4>
        <Badge style={{ backgroundColor: GOLD }} className="px-3 py-2">
          Total Attorneys: {filteredData.length}
        </Badge>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <div className="p-3 bg-white border-bottom">
            <Input
              placeholder="Search by name, email, or mobile..."
              className="rounded-pill bg-light border-0 px-4"
              style={{ maxWidth: "350px" }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="table-responsive">
            <Table
              hover
              className="align-middle mb-0"
              style={{ fontSize: "13px" }}>
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="px-4">SR.</th>
                  <th>ATTORNEY NAME</th>
                  <th>EMAIL ADDRESS</th>
                  <th>MOBILE NO.</th>
                  <th>LOCATION</th>
                  <th className="text-center">STATUS</th>
                  <th className="text-end px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((u, index) => (
                    <tr key={u.id}>
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td className="fw-bold text-dark text-capitalize">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="text-primary">{u.email}</td>
                      <td>
                        {u.countryCode} {u.mobile || "N/A"}
                      </td>
                      <td>
                        <div className="small">
                          {u.city}, {u.state}
                        </div>
                      </td>
                      <td className="text-center">
                        <Badge
                          color={(u.isActive ?? true) ? "success" : "danger"}
                          pill
                          style={{
                            cursor: "pointer",
                            minWidth: "85px",
                            padding: "6px 10px",
                          }}
                          onClick={() => handleStatusToggle(u)}
                          title="Click to toggle status">
                          {(u.isActive ?? true) ? "Active ●" : "Deactive ○"}
                        </Badge>
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="white"
                          className="border shadow-sm me-2"
                          onClick={() => handleEdit(u)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="white"
                          className="text-danger border shadow-sm"
                          onClick={() => handleDelete(u.id)}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      No attorneys found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* UPDATE MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader
          toggle={toggle}
          className="fw-bold"
          style={{ color: GOLD }}>
          Update Attorney Profile
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}>
                <Label className="small fw-bold">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Col>
              <Col md={2}>
                <Label className="small fw-bold">Code</Label>
                <Input
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
                />
              </Col>
              <Col md={4}>
                <Label className="small fw-bold">Mobile No.</Label>
                <Input
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">City</Label>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Account Status</Label>
                <Input
                  type="select"
                  value={formData.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.value === "true",
                    })
                  }>
                  <option value="true">Active</option>
                  <option value="false">Deactive</option>
                </Input>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}
                className="px-5 text-white fw-bold">
                {loading ? "Updating..." : "Save Changes"}
              </Button>
              <Button outline onClick={toggle} className="px-4">
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Attorney;
