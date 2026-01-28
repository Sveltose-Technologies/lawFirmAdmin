"use client";
import React, { useEffect, useState } from "react";
import { Container, Card, CardBody, Table, Input, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "@/services/authService";
import PaginationComponent from "../../../context/Pagination";

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await authService.getAllClients();
      const data = res.clients || res.data?.clients || res.data || [];
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load clients");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const res = await authService.deleteClient(id);
        if (res) {
          toast.success("Client deleted successfully");
          setUsers(users.filter(u => (u.id || u._id) !== id));
        }
      } catch (err) {
        toast.error("Error deleting client");
      }
    }
  };

  const filteredData = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />
      <h4 className="fw-bold mb-4">Client Management</h4>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          <div className="p-3 border-bottom bg-white">
            <Input
              placeholder="Search client..."
              className="rounded-pill border-0 bg-light px-3"
              style={{ maxWidth: "300px" }}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead style={{ backgroundColor: "#fdf8ef" }}>
                <tr>
                  <th className="py-3 px-4">Sr. No.</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th className="text-end px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((u, index) => (
                  <tr key={u.id || u._id}>
                    <td className="px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="fw-bold text-capitalize">{u.firstName} {u.lastName}</td>
                    <td>{u.email}</td>
                    <td className="text-end px-4">
                      {/* FIX: Only One Icon Here */}
                      <Button 
                        size="sm" 
                        color="white" 
                        className="text-danger border shadow-sm" 
                        onClick={() => handleDelete(u.id || u._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <div className="mt-3">
        <PaginationComponent totalItems={filteredData.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </Container>
  );
};

export default Clients;