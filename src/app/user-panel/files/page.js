'use client';
import React, { useState } from "react";
import { Row, Col, Card, CardBody, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SidebarUser from "@/app/layouts/sidebars/vertical/SidebarUser";

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CaseFiles() {
  const goldColor = "#eebb5d";
  const [modal, setModal] = useState(false);
  const [fileList, setFileList] = useState([{ id: 1, date: "01 Sep 2025", name: "Proof.pdf", type: "Evidence" }]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = () => {
    // --- VALIDATION (RED TOAST) ---
    if(!selectedFile) {
        toast.error("Please select a file first!", {
            theme: "colored",
            position: "top-right"
        });
        return;
    }

    // --- UPLOAD LOGIC ---
    setFileList([{ id: Date.now(), date: "Just now", name: selectedFile.name, type: "Evidence" }, ...fileList]);
    setModal(false);
    setSelectedFile(null); // Reset input

    // --- SUCCESS (GREEN TOAST) ---
    toast.success("File uploaded successfully!", {
        theme: "colored",
        position: "top-right"
    });
  };

  return (
    <div className="bg-light min-vh-100 p-3 p-lg-4 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Row>
        <Col lg="3" className="d-none d-lg-block mb-4"><SidebarUser /></Col>
        <Col lg="9" md="12">
            <div className="d-lg-none mb-3"><SidebarUser /></div>
            <Card className="border-0 shadow-sm rounded-4">
                <CardBody className="p-4">
                    <h4 className="fw-bold mb-4">Case Files</h4>
                    <div className="table-responsive">
                        <Table hover className="align-middle text-nowrap">
                            <thead className="text-muted small"><tr><th>Date</th><th>Name</th><th>Type</th><th>View</th></tr></thead>
                            <tbody>
                                {fileList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.date}</td><td>{item.name}</td>
                                        <td><span className="badge bg-light text-dark border">{item.type}</span></td>
                                        <td><Button color="light" size="sm" className="rounded-circle border"><i className="bi bi-eye"></i></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Button className="mt-4 border-0 text-white fw-bold" style={{ backgroundColor: goldColor }} onClick={() => setModal(true)}>Upload File</Button>
                </CardBody>
            </Card>
        </Col>
      </Row>
      
      {/* --- UPLOAD MODAL --- */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
        <ModalHeader toggle={() => setModal(!modal)}>Upload File</ModalHeader>
        <ModalBody>
            <Input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button style={{ backgroundColor: goldColor, border: 'none' }} onClick={handleUpload}>Upload</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}