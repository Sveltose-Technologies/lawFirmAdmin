'use client';
import React, { useState } from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Media = () => {
  const { media, setMedia } = useGlobalData();
  const GOLD = "#eebb5d";

  const handleUpload = () => {
    toast.success("File Uploaded (Simulated)!", {theme: "colored"});
    setMedia([...media, { id: Date.now(), name: "new-image.jpg", url: "https://via.placeholder.com/150" }]);
  };
  const handleDelete = (id) => { if(confirm("Delete File?")) { setMedia(media.filter(i => i.id !== id)); toast.success("Deleted!", {theme: "colored"}); }};

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Media Library</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-end mb-4"><Button onClick={handleUpload} style={{backgroundColor: GOLD, border:'none'}}><i className="bi bi-cloud-upload me-2"></i>Upload File</Button></div>
        <Row>
            {media.map(item => (
                <Col key={item.id} md={2} className="mb-3 text-center">
                    <div className="border p-2 rounded position-relative bg-white">
                        <img src={item.url} className="img-fluid mb-2" alt={item.name} />
                        <p className="small text-truncate mb-1">{item.name}</p>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger"><i className="bi bi-trash"></i></button>
                    </div>
                </Col>
            ))}
        </Row>
      </CardBody></Card>
    </div>
  );
};
export default Media;