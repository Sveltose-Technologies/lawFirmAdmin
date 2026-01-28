"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Container,
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
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";
import authService from "@/services/authService"; // Ensure path is correct

// Rich Text Editor Setup
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-center border rounded small">
      Loading Editor...
    </div>
  ),
});

const LocationManagement = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [activeTab, setActiveTab] = useState("country");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    countryName: "",
    content: "",
    countryId: "",
    cityName: "",
    address: "",
    phoneNo: "",
    faxNo: "",
    image: null,
  });

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    [],
  );

  // API Response handling based on your logs {success: true, data: []}
  const getSafeArray = (res) => {
    if (res?.success && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res)) return res;
    return [];
  };

  const fetchData = useCallback(async () => {
    try {
      const countryRes = await authService.getAllCountries();
      const cityRes = await authService.getAllCities();
      setCountries(getSafeArray(countryRes));
      setCities(getSafeArray(cityRes));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        countryName: "",
        content: "",
        countryId: "",
        cityName: "",
        address: "",
        phoneNo: "",
        faxNo: "",
        image: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (activeTab === "country") {
        // Country Keys: adminId, countryName, content
        const payload = isEditing
          ? { countryName: formData.countryName, content: formData.content }
          : {
              adminId: 3,
              countryName: formData.countryName,
              content: formData.content,
            };

        res = isEditing
          ? await authService.updateLocationCountry(currentId, payload)
          : await authService.createLocationCountry(payload);
      } else {
        // City Keys: adminId, countryId, cityName, address, phoneNo, faxNo, image
        const data = new FormData();
        if (!isEditing) {
          data.append("adminId", 3);
          data.append("countryId", formData.countryId);
        }
        data.append("cityName", formData.cityName);
        data.append("address", formData.address || "");
        data.append("phoneNo", formData.phoneNo || "");
        data.append("faxNo", formData.faxNo || "");

        if (formData.image instanceof File) {
          data.append("image", formData.image);
        }

        res = isEditing
          ? await authService.updateLocationCity(currentId, data)
          : await authService.createLocationCity(data);
      }

      if (res.success || res) {
        toast.success(`${activeTab.toUpperCase()} Saved Successfully!`);
        toggle();
        fetchData();
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res =
        activeTab === "country"
          ? await authService.deleteLocationCountry(id)
          : await authService.deleteLocationCity(id);
      if (res) {
        toast.success("Deleted successfully");
        fetchData();
      }
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    if (activeTab === "country") {
      setFormData({
        countryName: item.countryName,
        content: item.content,
      });
    } else {
      setFormData({
        countryId: item.countryId,
        cityName: item.cityName,
        address: item.address,
        phoneNo: item.phoneNo,
        faxNo: item.faxNo,
        image: null,
      });
    }
    setModal(true);
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <ToastContainer theme="colored" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Location Management</h4>
          <p className="text-muted small">
            Manage Countries and City details with Images.
          </p>
        </div>
        <Button className="btn-gold px-4" onClick={toggle}>
          + Add {activeTab === "country" ? "Country" : "City"}
        </Button>
      </div>

      <Nav tabs className="border-0 mb-3">
        {["country", "city"].map((tab) => (
          <NavItem key={tab}>
            <NavLink
              className={classnames("fw-bold border-0 px-4", {
                active: activeTab === tab,
              })}
              onClick={() => setActiveTab(tab)}
              style={{
                cursor: "pointer",
                color: activeTab === tab ? GOLD : "#999",
                backgroundColor: "transparent",
              }}>
              {tab.toUpperCase()} MANAGEMENT
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4 py-3">Sr. No.</th>
                {activeTab === "country" ? (
                  <>
                    <th>Country Name</th>
                    <th>Description Preview</th>
                  </>
                ) : (
                  <>
                    <th>Image</th>
                    <th>City Name</th>
                    <th>Country</th>
                    <th>Contacts</th>
                  </>
                )}
                <th className="text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === "country"
                ? countries.map((c, i) => (
                    <tr key={c.id}>
                      <td className="px-4">{i + 1}</td>
                      <td className="fw-bold">{c.countryName}</td>
                      <td>
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "250px" }}
                          dangerouslySetInnerHTML={{ __html: c.content }}
                        />
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="white"
                          className="border shadow-sm me-2"
                          onClick={() => handleEdit(c)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="white"
                          className="text-danger border shadow-sm"
                          onClick={() => handleDelete(c.id)}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                : cities.map((city, i) => (
                    <tr key={city.id}>
                      <td className="px-4">{i + 1}</td>
                      <td>
                        <img
                          src={authService.getImgUrl(city.image)}
                          alt="city"
                          style={{
                            width: "55px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/70x45?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="fw-bold">{city.cityName}</td>
                      <td>
                        {countries.find(
                          (c) => String(c.id) === String(city.countryId),
                        )?.countryName || `ID: ${city.countryId}`}
                      </td>
                      <td className="small">
                        📞 {city.phoneNo} <br /> 📠 {city.faxNo}
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="white"
                          className="border shadow-sm me-2"
                          onClick={() => handleEdit(city)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="white"
                          className="text-danger border shadow-sm"
                          onClick={() => handleDelete(city.id)}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        isOpen={modal}
        toggle={toggle}
        size={activeTab === "country" ? "lg" : "md"}
        centered
        scrollable>
        <ModalHeader
          toggle={toggle}
          className="border-0 fw-bold"
          style={{ color: GOLD }}>
          {isEditing ? "Edit" : "Add New"} {activeTab.toUpperCase()}
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            {activeTab === "country" ? (
              <>
                <FormGroup>
                  <Label className="small fw-bold">Country Name *</Label>
                  <Input
                    required
                    value={formData.countryName}
                    onChange={(e) =>
                      setFormData({ ...formData, countryName: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="small fw-bold">Description *</Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(val) =>
                      setFormData({ ...formData, content: val })
                    }
                    modules={modules}
                    style={{ height: "250px", marginBottom: "50px" }}
                  />
                </FormGroup>
              </>
            ) : (
              <Row className="gy-3">
                <Col md={12}>
                  <FormGroup>
                    <Label className="small fw-bold">Country *</Label>
                    <Input
                      type="select"
                      required
                      disabled={isEditing}
                      value={formData.countryId}
                      onChange={(e) =>
                        setFormData({ ...formData, countryId: e.target.value })
                      }>
                      <option value="">-- Select Country --</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.countryName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label className="small fw-bold">City Name *</Label>
                    <Input
                      required
                      value={formData.cityName}
                      onChange={(e) =>
                        setFormData({ ...formData, cityName: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label className="small fw-bold">Phone No</Label>
                    <Input
                      value={formData.phoneNo}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNo: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label className="small fw-bold">Fax No</Label>
                    <Input
                      value={formData.faxNo}
                      onChange={(e) =>
                        setFormData({ ...formData, faxNo: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label className="small fw-bold">Address</Label>
                    <Input
                      type="textarea"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label className="small fw-bold">City Image</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files[0] })
                      }
                      accept="image/*"
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}

            <Button
              type="submit"
              className="btn-gold w-100 mt-4 py-2 fw-bold"
              disabled={loading}>
              {loading ? "Processing..." : "Save Details"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <style jsx global>{`
        .btn-gold {
          background-color: #eebb5d !important;
          color: white !important;
          border: none !important;
        }
        .nav-link.active {
          border-bottom: 3px solid #eebb5d !important;
          background: transparent !important;
          color: #eebb5d !important;
        }
      `}</style>
    </Container>
  );
};

export default LocationManagement;
