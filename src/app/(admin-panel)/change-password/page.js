"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAdmin } from "../../../context/AdminContext";
import authService from "@/services/authService"; // authService import karein

const THEME_GOLD = "#eebb5d";;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { admin } = useAdmin();

  // Password state
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Password Reset Handle Function
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!passwords.newPassword || !passwords.confirmPassword) {
      return toast.warn("Please fill all fields");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New Password and Confirm Password do not match");
    }

    setLoading(true);
    try {
      // API call using authService
      const res = await authService.resetPassword(
        admin?.email,
        passwords.newPassword,
        passwords.confirmPassword,
      );

      if (res.success) {
        toast.success(res.message);
        setPasswords({ newPassword: "", confirmPassword: "" }); // Form clear
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Tabs Navigation */}
      <div className="d-flex justify-content-center mb-5 mt-3">
        <div
          onClick={() => setActiveTab("1")}
          className="d-flex align-items-center gap-3 px-4 py-2 pointer"
          style={{
            cursor: "pointer",
            borderBottom:
              activeTab === "1" ? `2px solid ${THEME_GOLD}` : "none",
          }}>
          <div
            style={{
              backgroundColor: activeTab === "1" ? THEME_GOLD : "#e9ecef",
              padding: "2px",
              borderRadius: "5px",
              display: "flex",
            }}>
            <i
              className="bi bi-person-vcard fs-4"
              style={{ color: activeTab === "1" ? "#fff" : "#666" }}></i>
          </div>
          <span
            className="fw-bold"
            style={{
              color: activeTab === "1" ? THEME_GOLD : "#666",
              fontSize: "1.1rem",
            }}>
            Basic Information
          </span>
        </div>

        <div
          onClick={() => setActiveTab("2")}
          className="d-flex align-items-center gap-3 px-4 py-2 pointer ms-5"
          style={{
            cursor: "pointer",
            borderBottom:
              activeTab === "2" ? `2px solid ${THEME_GOLD}` : "none",
          }}>
          <div
            style={{
              backgroundColor: activeTab === "2" ? THEME_GOLD : "#e9ecef",
              padding: "2px",
              borderRadius: "5px",
              display: "flex",
            }}>
            <i
              className="bi bi-lock fs-4"
              style={{ color: activeTab === "2" ? "#fff" : "#666" }}></i>
          </div>
          <span
            className="fw-bold"
            style={{
              color: activeTab === "2" ? THEME_GOLD : "#666",
              fontSize: "1.1rem",
            }}>
            Change Password
          </span>
        </div>
      </div>

      <TabContent activeTab={activeTab}>
        {/* TAB 1: BASIC INFORMATION */}
        <TabPane tabId="1">
          <Row className="justify-content-center">
            <Col md="11" lg="9">
              <Card
                className="border-0 shadow-sm"
                style={{ borderRadius: "10px" }}>
                <CardBody className="p-5">
                  <div className="d-flex align-items-center justify-content-start gap-2 mb-5">
                    <span
                      className="fw-bold"
                      style={{ color: "#a67c52", fontSize: "1.1rem" }}>
                      My Profile
                    </span>
                    <span className="text-muted">|</span>
                    <Link
                      href="/profile"
                      className="text-decoration-none d-flex align-items-center gap-1 fw-bold"
                      style={{ color: "#333", fontSize: "0.95rem" }}>
                      <i className="bi bi-pencil-square"></i> EDIT PROFILE
                    </Link>
                  </div>

                  <div className="text-center mb-5">
                    <img
                      src={
                        admin?.profileImage ||
                        `https://ui-avatars.com/api/?name=${admin?.firstName || "A"}&background=eebb5d&color=fff`
                      }
                      alt="Profile"
                      className="rounded-circle border"
                      width="160"
                      height="160"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <Row className="text-center justify-content-center mt-4">
                    <Col md="4" className="mb-3">
                      <span className="text-dark">Name :</span>
                      <span className="fw-bold ms-1" style={{ color: "#333" }}>
                        {admin?.firstName} {admin?.lastName}
                      </span>
                    </Col>
                    <Col md="4" className="mb-3">
                      <span className="text-dark">Email :</span>
                      <span className="fw-bold ms-1" style={{ color: "#333" }}>
                        {admin?.email}
                      </span>
                    </Col>
                    <Col md="4" className="mb-3">
                      <span className="text-dark">Phone :</span>
                      <span className="fw-bold ms-1" style={{ color: "#333" }}>
                        {admin?.phoneNo || "+254723842622"}
                      </span>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* TAB 2: CHANGE PASSWORD */}
        <TabPane tabId="2">
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Card
                className="border-0 shadow-sm"
                style={{ borderRadius: "10px" }}>
                <CardBody className="p-5">
                  <h4
                    className="fw-bold mb-4 text-center"
                    style={{ color: "#333" }}>
                    Change Password
                  </h4>
                  <Form onSubmit={handlePasswordReset}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold text-muted small">
                        New Password
                      </Label>
                      <Input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className="py-2 border-0 bg-light"
                        style={{ borderRadius: "8px" }}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="mb-5">
                      <Label className="fw-bold text-muted small">
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        className="py-2 border-0 bg-light"
                        style={{ borderRadius: "8px" }}
                        required
                      />
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 border-0 fw-bold text-white"
                        style={{
                          backgroundColor: THEME_GOLD,
                          borderRadius: "8px",
                        }}>
                        {loading ? <Spinner size="sm" /> : "Change Password"}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProfilePage;
