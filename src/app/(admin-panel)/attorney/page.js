// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Table, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import authService from "../../../services/authService";

// const Attorney = () => {
//   const [attorneys, setAttorneys] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", mobile: "", city: "" });
//   const [searchTerm, setSearchTerm] = useState("");

//   const currentUser = authService.getCurrentUser(); // from localStorage
//   const isAdmin = currentUser?.role === "admin";

//   // Fetch attorneys
//   useEffect(() => {
//     const fetchAttorneys = async () => {
//       try {
//         const res = await authService.getAllUsers(); // GET /auth/getall
//         if (res.success) {
//           let data = res.data || [];
//           console.log("All users data:", data);

//           // Filter only attorneys
//           const attorneysData = data.users.filter(u => u.role.toLowerCase() === "attorney");
//           console.log("Filtered attorneys:", attorneysData);

//           setAttorneys(attorneysData);
//         } else {
//           toast.error(res.message || "Failed to load users");
//         }
//       } catch (err) {
//         console.error("Error fetching attorneys:", err);
//         toast.error("Something went wrong while fetching attorneys");
//       }
//     };

//     fetchAttorneys();
//   }, []);

//   const toggle = () => {
//     setModal(!modal);
//     if (!modal) {
//       setFormData({ firstName: "", lastName: "", email: "", mobile: "", city: "" });
//       setIsEditing(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.firstName || !formData.email)
//       return toast.error("First Name & Email Required!", { theme: "colored" });

//     try {
//       if (isEditing) {
//         await authService.updateUser(currentId, formData);
//         toast.success("Attorney Updated!", { theme: "colored" });
//       } else {
//         await authService.addUser({ ...formData, role: "attorney" }); // always add as attorney
//         toast.success("Attorney Added!", { theme: "colored" });
//       }
//       // Refresh list
//       const res = await authService.getAllUsers();
//       if (res.success) {
//         setAttorneys(res.data.users.filter(u => u.role.toLowerCase() === "attorney"));
//       }
//       toggle();
//     } catch (err) {
//       toast.error(err.message || "Failed!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Delete Attorney?")) {
//       try {
//         await authService.deleteUser(id);
//         toast.success("Attorney Deleted!", { theme: "colored" });

//         // Refresh list
//         setAttorneys(attorneys.filter(item => item.id !== id));
//       } catch (err) {
//         toast.error(err.message || "Failed to delete!");
//       }
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData(item);
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const GOLD = "#eebb5d";
//   const filteredData = attorneys.filter(i => i.firstName?.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm">
//         <CardBody className="p-3">
//           <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Attorneys</h5>
//         </CardBody>
//       </Card>
//       <Card className="border-0 shadow-sm">
//         <CardBody className="p-4">
//           <div className="d-flex flex-column flex-sm-row justify-content-between mb-4 gap-3">
//             <div className="w-100" style={{ maxWidth: '300px' }}>
//               <Input
//                 placeholder="Search..."
//                 className="rounded-pill"
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//             </div>
//             {isAdmin && (
//               <div>
//                 <Button
//                   onClick={toggle}
//                   className="w-100"
//                   style={{ backgroundColor: GOLD, border: 'none', whiteSpace: 'nowrap' }}
//                 >
//                   Add Attorney
//                 </Button>
//               </div>
//             )}
//           </div>

//           <Table responsive className="align-middle text-nowrap">
//             <thead className="table-light">
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 {isAdmin && <th className="text-end">Action</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map(item => (
//                 <tr key={item.id}>
//                   <td>{item.firstName}</td>
//                   <td>{item.lastName}</td>
//                   <td>{item.email}</td>
//                   <td>{item.mobile || "-"}</td>
//                   <td>{item.city || "-"}</td>
//                   {isAdmin && (
//                     <td className="text-end">
//                       <button onClick={() => handleEdit(item)} className="btn btn-sm me-2" style={{ color: GOLD, borderColor: GOLD }}>
//                         <i className="bi bi-pencil"></i>
//                       </button>
//                       <button onClick={() => handleDelete(item.id)} className="btn btn-sm text-danger border-danger">
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

//       {isAdmin && (
//         <Modal isOpen={modal} toggle={toggle} centered>
//           <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}>{isEditing ? "Edit" : "Add"} Attorney</ModalHeader>
//           <ModalBody className="p-4 pt-0">
//             <Form>
//               <FormGroup><Label>First Name</Label><Input value={formData.firstName || ""} onChange={e => setFormData({ ...formData, firstName: e.target.value })} /></FormGroup>
//               <FormGroup><Label>Last Name</Label><Input value={formData.lastName || ""} onChange={e => setFormData({ ...formData, lastName: e.target.value })} /></FormGroup>
//               <FormGroup><Label>Email</Label><Input value={formData.email || ""} onChange={e => setFormData({ ...formData, email: e.target.value })} /></FormGroup>
//               <FormGroup><Label>Phone</Label><Input value={formData.mobile || ""} onChange={e => setFormData({ ...formData, mobile: e.target.value })} /></FormGroup>
//               <FormGroup><Label>Address</Label><Input value={formData.city || ""} onChange={e => setFormData({ ...formData, city: e.target.value })} /></FormGroup>
//               <Button block style={{ backgroundColor: GOLD, border: 'none' }} onClick={handleSubmit}>Submit</Button>
//             </Form>
//           </ModalBody>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Attorney;


// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   Table,
//   Input,
  
// } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import authService from "../../../services/authService";

// const Attorney = () => {
//   const [attorneys, setAttorneys] = useState([]);

//   // 🔴 COMMENTED (Add / Edit related)
//   // const [modal, setModal] = useState(false);
//   // const [isEditing, setIsEditing] = useState(false);
//   // const [currentId, setCurrentId] = useState(null);
//   // const [formData, setFormData] = useState({
//   //   firstName: "",
//   //   lastName: "",
//   //   email: "",
//   //   mobile: "",
//   //   city: ""
//   // });

//   const [searchTerm, setSearchTerm] = useState("");

//   const currentUser = authService.getCurrentUser(); // from localStorage
//   const isAdmin = currentUser?.role === "admin";

//   // Fetch attorneys
//   useEffect(() => {
//     const fetchAttorneys = async () => {
//       try {
//         const res = await authService.getAllUsers(); // GET /auth/getall
//         if (res.success) {
//           let data = res.data || [];
//           console.log("All users data:", data);

//           // Filter only attorneys
//           const attorneysData = data.users.filter(
//             u => u.role.toLowerCase() === "attorney"
//           );
//           console.log("Filtered attorneys:", attorneysData);

//           setAttorneys(attorneysData);
//         } else {
//           toast.error(res.message || "Failed to load users");
//         }
//       } catch (err) {
//         console.error("Error fetching attorneys:", err);
//         toast.error("Something went wrong while fetching attorneys");
//       }
//     };

//     fetchAttorneys();
//   }, []);

//   // 🔴 COMMENTED (Modal toggle)
//   // const toggle = () => {
//   //   setModal(!modal);
//   //   if (!modal) {
//   //     setFormData({
//   //       firstName: "",
//   //       lastName: "",
//   //       email: "",
//   //       mobile: "",
//   //       city: ""
//   //     });
//   //     setIsEditing(false);
//   //   }
//   // };

//   // 🔴 COMMENTED (Add / Update submit)
//   // const handleSubmit = async () => {
//   //   if (!formData.firstName || !formData.email)
//   //     return toast.error("First Name & Email Required!", { theme: "colored" });

//   //   try {
//   //     if (isEditing) {
//   //       await authService.updateUser(currentId, formData);
//   //       toast.success("Attorney Updated!", { theme: "colored" });
//   //     } else {
//   //       await authService.addUser({ ...formData, role: "attorney" });
//   //       toast.success("Attorney Added!", { theme: "colored" });
//   //     }

//   //     const res = await authService.getAllUsers();
//   //     if (res.success) {
//   //       setAttorneys(
//   //         res.data.users.filter(u => u.role.toLowerCase() === "attorney")
//   //       );
//   //     }
//   //     toggle();
//   //   } catch (err) {
//   //     toast.error(err.message || "Failed!");
//   //   }
//   // };

//   const handleDelete = async (id) => {
//     if (confirm("Delete Attorney?")) {
//       try {
//         await authService.deleteUser(id);
//         toast.success("Attorney Deleted!", { theme: "colored" });

//         setAttorneys(attorneys.filter(item => item.id !== id));
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
//   const filteredData = attorneys.filter(i =>
//     i.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-3 bg-light min-vh-100">
//       <ToastContainer />

//       <Card className="mb-4 border-0 shadow-sm">
//         <CardBody className="p-3">
//           <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>
//             Attorneys
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

//             {/* 🔴 COMMENTED (Add Attorney button) */}
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
//                   Add Attorney
//                 </Button>
//               </div>
//             )} */}
//           </div>

//           <Table responsive className="align-middle text-nowrap">
//             <thead className="table-light">
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 {isAdmin && <th className="text-end">Action</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map(item => (
//                 <tr key={item.id}>
//                   <td>{item.firstName}</td>
//                   <td>{item.lastName}</td>
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
//             {isEditing ? "Edit" : "Add"} Attorney
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

// export default Attorney;


"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Table,
  Input
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../../services/authService";

const Attorney = () => {
  const [attorneys, setAttorneys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch attorneys
  useEffect(() => {
    const fetchAttorneys = async () => {
      try {
        const res = await authService.getAllUsers(); // GET /auth/getall
        if (res.success) {
          const data = res.data || [];
          console.log("All users data:", data);

          // Filter only attorneys
          const attorneysData = data.users.filter(
            u => u.role.toLowerCase() === "attorney"
          );
          console.log("Filtered attorneys:", attorneysData);

          setAttorneys(attorneysData);
        } else {
          toast.error(res.message || "Failed to load users");
        }
      } catch (err) {
        console.error("Error fetching attorneys:", err);
        toast.error("Something went wrong while fetching attorneys");
      }
    };

    fetchAttorneys();
  }, []);

  // Filter attorneys by search term (first or last name)
  const filteredData = attorneys.filter(u =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const GOLD = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm">
        <CardBody className="p-3">
          <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>
            Attorneys
          </h5>
        </CardBody>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardBody className="p-4">
          <div className="mb-4" style={{ maxWidth: "300px" }}>
            <Input
              placeholder="Search by name..."
              className="rounded-pill"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Table responsive className="align-middle text-nowrap">
            <thead className="table-light">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile || "-"}</td>
                  <td>{item.city || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Attorney;
