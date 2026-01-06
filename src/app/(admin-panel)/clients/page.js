

// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Table, Input, Button } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import authService from "../../../services/authService";
// import PaginationComponent from "../../../context/Pagination";

// const Clients = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   useEffect(() => {

//   const fetchUsers = async () => {
//     try {
//       console.log("Fetching client data...");
//       const res = await authService.getAllUsers();
      
//       if (res.success) {
//         // API response में से डेटा निकालें
//         const allData = res.data?.users || res.data || [];
        
//         // फिल्टर: सिर्फ 'client' रोल वाले यूजर्स दिखाएँ
//         const clientsOnly = allData.filter(u => u.role?.toLowerCase() === "client");
        
//         console.log("Filtered Clients:", clientsOnly);
//         setUsers(clientsOnly);
//       } else {
//         toast.error(res.message || "Failed to load clients");
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       toast.error("Something went wrong while fetching clients");
//     }
//   };
 
//     fetchUsers();
//   }, []);

//   // Delete Function
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       try {
//         const res = await authService.deleteUser(id);
//         if (res.success) {
//           toast.success("Client deleted successfully");
//           setUsers(users.filter(u => u.id !== id));
//         } else {
//           toast.error(res.message || "Delete failed");
//         }
//       } catch (err) {
//         toast.error("Error deleting client");
//       }
//     }
//   };

//   // Search Logic (Name or Email)
//   const filteredData = users.filter(u =>
//     `${u.firstName} ${u.lastName} ${u.email}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const GOLD = "#eebb5d";

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />

//       <Card className="mb-4 border-0 shadow-sm">
//         <CardBody className="p-3">
//           <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>
//             Client Management
//           </h5>
//         </CardBody>
//       </Card>

//       <Card className="border-0 shadow-sm">
//         <CardBody className="p-4">
//           <div className="mb-4" style={{ maxWidth: "350px" }}>
//             <Input
//               placeholder="Search by name or email..."
//               className="rounded-pill"
//               onChange={e => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1); // सर्च करने पर पहले पेज पर जाएँ
//               }}
//             />
//           </div>

//           <Table responsive className="align-middle text-nowrap">
//             <thead className="table-light">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>City</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map(u => (
//                   <tr key={u.id}>
//                     <td>
//                       <span className="fw-bold">{u.firstName} {u.lastName}</span>
//                     </td>
//                     <td>{u.email}</td>
//                     <td>{u.mobile || "-"}</td>
//                     <td>{u.city || "-"}</td>
//                     <td className="text-center">
//                       <Button 
//                         color="danger" 
//                         size="sm" 
//                         outline 
//                         onClick={() => handleDelete(u.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     No clients found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>

//           {/* Pagination Component */}
//           <PaginationComponent
//             totalItems={filteredData.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default Clients;
"use client";
import React, { useEffect, useState } from "react";
import { 
  Container, Row, Col, Card, CardBody, Table, Input, Button 
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from "@/services/authService";
import PaginationComponent from "../../../context/Pagination";

const Clients = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await authService.getAllUsers();
      if (res.success) {
        const allData = res.data?.users || res.data?.data || res.data || [];
        const clientsOnly = allData.filter(u => u.role?.toLowerCase() === "client");
        setUsers(clientsOnly);
      }
    } catch (err) {
      toast.error("Failed to load clients");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const res = await authService.deleteUser(id);
        if (res.success) {
          toast.success("Client deleted");
          setUsers(users.filter(u => u.id !== id));
        }
      } catch (err) {
        toast.error("Error deleting client");
      }
    }
  };

  // Search Logic
  const filteredData = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid className="p-3 p-md-4 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" />

      {/* Header Area - Consistent with Promoter Page */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: "#333" }}>Client Management</h4>
       
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <CardBody className="p-0">
          
          {/* Search Bar Container */}
          <div className="p-3 border-bottom bg-white">
            <Row>
              <Col xs={12} md={5} lg={4}>
                <Input
                  placeholder="Search client by name, email..."
                  className="rounded-pill border-0 bg-light px-3"
                  style={{ fontSize: '14px' }}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </Col>
            </Row>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No.</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Contact Information</th>
                  <th className="py-3">Location</th>
                  {/* Status column commented as requested */}
                  {/* <th className="py-3 text-center">Status</th> */}
                  <th className="py-3 text-end px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((u, index) => (
                    <tr key={u.id} className="border-bottom">
                      <td className="px-4 text-muted">
                        {/* Serial Number Logic */}
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td>
                        <div className="fw-bold text-dark text-capitalize">{u.firstName} {u.lastName}</div>
                      </td>
                      <td>
                        <div className="small fw-bold">{u.email}</div>
                        <div className="text-muted small" style={{ fontSize: '11px' }}>{u.mobile || u.phoneNo || "N/A"}</div>
                      </td>
                      <td>
                        <span className="text-muted small text-capitalize">{u.city || "-"}</span>
                      </td>
                      <td className="text-end px-4">
                        {/* Promoter style Delete Button (Small, Icon-based) */}
                        <Button 
                          size="sm" 
                          color="white" 
                          className="text-danger border shadow-sm"
                          style={{ padding: '4px 8px' }}
                          onClick={() => handleDelete(u.id)}
                        >
                          <i className="bi bi-trash fs-6"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-5 text-center text-muted small">
                      No matching clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Pagination Container - Fixed at the bottom of list */}
      <div className="mt-3">
        <PaginationComponent
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Container>
  );
};

export default Clients;