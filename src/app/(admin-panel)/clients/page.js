// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
// // import { ToastContainer, toast } from "react-toastify";
// // import 'react-toastify/dist/ReactToastify.css';
// // import authService from "../../../services/authService";


// // const Clients = () => {
// //   const [clients, setClients] = useState([]);
// //   const [modal, setModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentId, setCurrentId] = useState(null);
// //   const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
// //   const [searchTerm, setSearchTerm] = useState("");
  
// //   const currentUser = authService.getCurrentUser(); // from localStorage
// //   const isAdmin = currentUser?.role === "admin";
// //   const isAttorney = currentUser?.role === "attorney";
// //   const isClient = currentUser?.role === "client";

// //   // Fetch clients/attorneys based on role
// // useEffect(() => {
// // const fetchClients = async () => {
// //   try {
// //     const res = await authService.getAllUsers(); // GET /auth/getall
// //     if (res.success) {
// //       let data = res.data || []; // res.data is already an array of users
// //       console.log("All users data:", data);

// //       // Filter only clients
// //       const clientsData = data.users.filter(u => u.role.toLowerCase() === "client");
// //       console.log("Filtered clients:", clientsData);

// //       setClients(clientsData); // Update state
// //     } else {
// //       toast.error(res.message || "Failed to load users");
// //     }
// //   } catch (err) {
// //     console.error("Error fetching clients:", err);
// //     toast.error("Something went wrong while fetching clients");
// //   }
// // };

// //   fetchClients();
// // }, []); // no more red line

// //   const toggle = () => {
// //     setModal(!modal);
// //     if(!modal) {
// //       setFormData({ name:"", email:"", mobile:"", city:"" });
// //       setIsEditing(false);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if(!formData.name || !formData.email) return toast.error("Name & Email Required!", {theme: "colored"});
    
// //     try {
// //       if(isEditing) {
// //         await authService.updateUser(currentId, formData);
// //         toast.success("Client Updated!", { theme: "colored" });
// //       } else {
// //         await authService.addUser({ ...formData, role: "client" }); // always add as client
// //         toast.success("Client Added!", { theme: "colored" });
// //       }
// //       fetchClients(); // refresh data
// //       toggle();
// //     } catch(err) {
// //       toast.error(err.message || "Failed!");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if(confirm("Delete Client?")) {
// //       try {
// //         await authService.deleteUser(id);
// //         toast.success("Client Deleted!", { theme: "colored" });
// //         fetchClients(); // refresh data
// //       } catch(err) {
// //         toast.error(err.message || "Failed to delete!");
// //       }
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setFormData(item);
// //     setCurrentId(item.id);
// //     setIsEditing(true);
// //     setModal(true);
// //   };

// //   const GOLD = "#eebb5d";
// //   const filteredData = clients.filter(i => i.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

// //   return (
// //     <div className="p-3 bg-light min-vh-100">
// //       <ToastContainer />
// //       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: GOLD}}>Clients</h5></CardBody></Card>
// //       <Card className="border-0 shadow-sm"><CardBody className="p-4">
        
// //         <div className="d-flex flex-column flex-sm-row justify-content-between mb-4 gap-3">
// //             <div className="w-100" style={{maxWidth:'300px'}}>
// //                 <Input 
// //                     placeholder="Search..." 
// //                     className="rounded-pill" 
// //                     onChange={e => setSearchTerm(e.target.value)} 
// //                 />
// //             </div>
            
// //             {isAdmin && (
// //             <div>
// //                 <Button 
// //                     onClick={toggle} 
// //                     className="w-100"
// //                     style={{backgroundColor: GOLD, border:'none', whiteSpace: 'nowrap'}}
// //                 >
// //                     Add Client
// //                 </Button>
// //             </div>
// //             )}
// //         </div>

// //         <Table responsive className="align-middle text-nowrap">
// //           <thead className="table-light">
// //             <tr>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Phone</th>
// //               <th>Address</th>
// //               {isAdmin && <th className="text-end">Action</th>}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredData.map(item => (
// //               <tr key={item.id}>
// //                 <td>{item.firstName} {item.lastName}</td>
// //                 <td>{item.email}</td>
// //                 <td>{item.mobile || "-"}</td>
// //                 <td>{item.city || "-"}</td>
// //                 {isAdmin && (
// //                   <td className="text-end">
// //                     <button onClick={()=>handleEdit(item)} className="btn btn-sm me-2" style={{color:GOLD, borderColor:GOLD}}><i className="bi bi-pencil"></i></button>
// //                     <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger border-danger"><i className="bi bi-trash"></i></button>
// //                   </td>
// //                 )}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       </CardBody></Card>

// //       {isAdmin && (
// //       <Modal isOpen={modal} toggle={toggle} centered>
// //         <ModalHeader toggle={toggle} style={{borderBottom:'none'}}>{isEditing ? "Edit" : "Add"} Client</ModalHeader>
// //         <ModalBody className="p-4 pt-0">
// //           <Form>
// //             <FormGroup><Label>First Name</Label><Input value={formData.firstName || ""} onChange={e=>setFormData({...formData, firstName:e.target.value})} /></FormGroup>
// //             <FormGroup><Label>Last Name</Label><Input value={formData.lastName || ""} onChange={e=>setFormData({...formData, lastName:e.target.value})} /></FormGroup>
// //             <FormGroup><Label>Email</Label><Input value={formData.email || ""} onChange={e=>setFormData({...formData, email:e.target.value})} /></FormGroup>
// //             <FormGroup><Label>Phone</Label><Input value={formData.mobile || ""} onChange={e=>setFormData({...formData, mobile:e.target.value})} /></FormGroup>
// //             <FormGroup><Label>Address</Label><Input type="textarea" value={formData.city || ""} onChange={e=>setFormData({...formData, city:e.target.value})} /></FormGroup>
// //             <Button block style={{backgroundColor: GOLD, border:'none'}} onClick={handleSubmit}>Submit</Button>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //       )}
// //     </div>
// //   );
// // };

// // export default Clients;



// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   Table,
//   Input,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label
// } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import authService from "../../../services/authService";

// const Clients = () => {
//   const [clients, setClients] = useState([]);

//   // 🔴 COMMENTED (Add / Edit related)
//   // const [modal, setModal] = useState(false);
//   // const [isEditing, setIsEditing] = useState(false);
//   // const [currentId, setCurrentId] = useState(null);
//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   email: "",
//   //   phone: "",
//   //   address: ""
//   // });

//   const [searchTerm, setSearchTerm] = useState("");

//   const currentUser = authService.getCurrentUser();
//   const isAdmin = currentUser?.role === "admin";
//   const isAttorney = currentUser?.role === "attorney";
//   const isClient = currentUser?.role === "client";

//   // Fetch clients
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await authService.getAllUsers();
//         if (res.success) {
//           let data = res.data || [];
//           console.log("All users data:", data);

//           const clientsData = data.users.filter(
//             u => u.role.toLowerCase() === "client"
//           );
//           console.log("Filtered clients:", clientsData);

//           setClients(clientsData);
//         } else {
//           toast.error(res.message || "Failed to load users");
//         }
//       } catch (err) {
//         console.error("Error fetching clients:", err);
//         toast.error("Something went wrong while fetching clients");
//       }
//     };

//     fetchClients();
//   }, []);

//   // 🔴 COMMENTED (Modal toggle)
//   // const toggle = () => {
//   //   setModal(!modal);
//   //   if (!modal) {
//   //     setFormData({ name: "", email: "", mobile: "", city: "" });
//   //     setIsEditing(false);
//   //   }
//   // };

//   // 🔴 COMMENTED (Add / Update submit)
//   // const handleSubmit = async () => {
//   //   if (!formData.name || !formData.email)
//   //     return toast.error("Name & Email Required!", { theme: "colored" });

//   //   try {
//   //     if (isEditing) {
//   //       await authService.updateUser(currentId, formData);
//   //       toast.success("Client Updated!", { theme: "colored" });
//   //     } else {
//   //       await authService.addUser({ ...formData, role: "client" });
//   //       toast.success("Client Added!", { theme: "colored" });
//   //     }
//   //     fetchClients();
//   //     toggle();
//   //   } catch (err) {
//   //     toast.error(err.message || "Failed!");
//   //   }
//   // };

//   const handleDelete = async (id) => {
//     if (confirm("Delete Client?")) {
//       try {
//         await authService.deleteUser(id);
//         toast.success("Client Deleted!", { theme: "colored" });
//         setClients(clients.filter(item => item.id !== id));
//       } catch (err) {
//         toast.error(err.message || "Failed to delete!");
//       }
//     }
//   };

//   // 🔴 COMMENTED (Edit handler)
//   // const handleEdit = (item) => {
//   //   setFormData(item);
//   //   setCurrentId(item.id);
//   //   setIsEditing(true);
//   //   setModal(true);
//   // };

//   const GOLD = "#eebb5d";
//   const filteredData = clients.filter(i =>
//     i.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />

//       <Card className="mb-4 border-0 shadow-sm">
//         <CardBody className="p-3">
//           <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>
//             Clients
//           </h5>
//         </CardBody>
//       </Card>

//       <Card className="border-0 shadow-sm">
//         <CardBody className="p-4">
//           <div className="d-flex flex-column flex-sm-row justify-content-between mb-4 gap-3">
//             <div className="w-100" style={{ maxWidth: "300px" }}>
//               <Input
//                 placeholder="Search..."
//                 className="rounded-pill"
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* 🔴 COMMENTED (Add Client button) */}
//             {/* {isAdmin && (
//               <div>
//                 <Button
//                   onClick={toggle}
//                   className="w-100"
//                   style={{
//                     backgroundColor: GOLD,
//                     border: "none",
//                     whiteSpace: "nowrap"
//                   }}
//                 >
//                   Add Client
//                 </Button>
//               </div>
//             )} */}
//           </div>

//           <Table responsive className="align-middle text-nowrap">
//             <thead className="table-light">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 {isAdmin && <th className="text-end">Action</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map(item => (
//                 <tr key={item.id}>
//                   <td>{item.firstName} {item.lastName}</td>
//                   <td>{item.email}</td>
//                   <td>{item.mobile || "-"}</td>
//                   <td>{item.city || "-"}</td>

//                   {isAdmin && (
//                     <td className="text-end">
//                       {/* 🔴 COMMENTED (Edit button) */}
//                       {/* <button
//                         onClick={() => handleEdit(item)}
//                         className="btn btn-sm me-2"
//                         style={{ color: GOLD, borderColor: GOLD }}
//                       >
//                         <i className="bi bi-pencil"></i>
//                       </button> */}

//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="btn btn-sm text-danger border-danger"
//                       >
//                         <i className="bi bi-trash"></i>
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       {/* 🔴 COMMENTED (Modal & Form) */}
//       {/* {isAdmin && (
//         <Modal isOpen={modal} toggle={toggle} centered>
//           <ModalHeader toggle={toggle} style={{ borderBottom: "none" }}>
//             {isEditing ? "Edit" : "Add"} Client
//           </ModalHeader>
//           <ModalBody className="p-4 pt-0">
//             <Form>
//               <FormGroup>
//                 <Label>First Name</Label>
//                 <Input
//                   value={formData.firstName || ""}
//                   onChange={e =>
//                     setFormData({ ...formData, firstName: e.target.value })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label>Last Name</Label>
//                 <Input
//                   value={formData.lastName || ""}
//                   onChange={e =>
//                     setFormData({ ...formData, lastName: e.target.value })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label>Email</Label>
//                 <Input
//                   value={formData.email || ""}
//                   onChange={e =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label>Phone</Label>
//                 <Input
//                   value={formData.mobile || ""}
//                   onChange={e =>
//                     setFormData({ ...formData, mobile: e.target.value })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label>Address</Label>
//                 <Input
//                   type="textarea"
//                   value={formData.city || ""}
//                   onChange={e =>
//                     setFormData({ ...formData, city: e.target.value })
//                   }
//                 />
//               </FormGroup>
//               <Button
//                 block
//                 style={{ backgroundColor: GOLD, border: "none" }}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//             </Form>
//           </ModalBody>
//         </Modal>
//       )} */}
//     </div>
//   );
// };

// export default Clients;
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, Input, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../../services/authService";
import PaginationComponent from "../../../context/Pagination";

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {

  const fetchUsers = async () => {
    try {
      console.log("Fetching client data...");
      const res = await authService.getAllUsers();
      
      if (res.success) {
        // API response में से डेटा निकालें
        const allData = res.data?.users || res.data || [];
        
        // फिल्टर: सिर्फ 'client' रोल वाले यूजर्स दिखाएँ
        const clientsOnly = allData.filter(u => u.role?.toLowerCase() === "client");
        
        console.log("Filtered Clients:", clientsOnly);
        setUsers(clientsOnly);
      } else {
        toast.error(res.message || "Failed to load clients");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Something went wrong while fetching clients");
    }
  };
 
    fetchUsers();
  }, []);

  // Delete Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const res = await authService.deleteUser(id);
        if (res.success) {
          toast.success("Client deleted successfully");
          setUsers(users.filter(u => u.id !== id));
        } else {
          toast.error(res.message || "Delete failed");
        }
      } catch (err) {
        toast.error("Error deleting client");
      }
    }
  };

  // Search Logic (Name or Email)
  const filteredData = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const GOLD = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3">
          <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>
            Client Management
          </h5>
        </CardBody>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <div className="mb-4" style={{ maxWidth: "350px" }}>
            <Input
              placeholder="Search by name or email..."
              className="rounded-pill"
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // सर्च करने पर पहले पेज पर जाएँ
              }}
            />
          </div>

          <Table responsive className="align-middle text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(u => (
                  <tr key={u.id}>
                    <td>
                      <span className="fw-bold">{u.firstName} {u.lastName}</span>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.mobile || "-"}</td>
                    <td>{u.city || "-"}</td>
                    <td className="text-center">
                      <Button 
                        color="danger" 
                        size="sm" 
                        outline 
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Component */}
          <PaginationComponent
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Clients;