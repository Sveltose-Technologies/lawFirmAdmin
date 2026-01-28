"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, Input, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../../services/authService";
import PaginationComponent from "../../../context/Pagination";

const Attorney = () => {
  const [attorneys, setAttorneys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { fetchAttorneys(); }, []);

  const fetchAttorneys = async () => {
    try {
      const res = await authService.getAllAttorneys();
      const data = res.attorneys || res.data?.attorneys || res.data || [];
      setAttorneys(data);
    } catch (err) {
      toast.error("Failed to load attorneys");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this attorney?")) {
      try {
        const res = await authService.deleteAttorney(id);
        if (res) {
          toast.success("Attorney deleted successfully");
          setAttorneys(attorneys.filter(u => (u.id || u._id) !== id));
        }
      } catch (err) {
        toast.error("Error deleting attorney");
      }
    }
  };

  const filteredData = attorneys.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: "#eebb5d" }}>Attorneys Management</h5></CardBody>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <Input
            placeholder="Search by name..."
            className="rounded-pill mb-4"
            style={{ maxWidth: "300px" }}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <Table responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>S.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id || item._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="text-capitalize">{item.firstName}</td>
                  <td className="text-capitalize">{item.lastName}</td>
                  <td>{item.email}</td>
                  <td className="text-center">
                    {/* FIX: Only One Icon Here */}
                    <Button 
                      size="sm" 
                      color="white" 
                      className="border shadow-sm text-danger" 
                      onClick={() => handleDelete(item.id || item._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationComponent totalItems={filteredData.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Attorney;