// 'use client';
// import React, { useState } from 'react';
// import { Card, CardBody, Table, Button, Input, Row, Col, FormGroup, Label } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const RolePermission = () => {
//   const GOLD = "#eebb5d";
//   const [role, setRole] = useState("Attorney");
  
//   // Simulated Permission Handler
//   const handleSave = () => {
//     toast.success(`Permissions updated for ${role}!`, { theme: "colored" });
//   };

//   const modules = ["Dashboard", "Case Management", "Client Management", "Finance & Accounts", "Settings", "Reports"];

//   return (
//     <div className="p-3 bg-light min-vh-100 font-sans">
//       <ToastContainer />
//       <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Role Permissions</h5></CardBody></Card>
      
//       <Card className="border-0 shadow-sm"><CardBody className="p-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//             <div style={{width: '300px'}}>
//                 <Label className="fw-bold">Select Role</Label>
//                 <Input type="select" value={role} onChange={e=>setRole(e.target.value)}>
//                     <option>Super Admin</option><option>Attorney</option><option>Staff</option><option>Client</option>
//                 </Input>
//             </div>
//             <Button onClick={handleSave} style={{ backgroundColor: GOLD, border: 'none' }}>Save Changes</Button>
//         </div>

//         <div className="table-responsive">
//             <Table bordered className="align-middle">
//                 <thead className="table-light text-center">
//                     <tr><th className="text-start">Module Name</th><th>View</th><th>Add</th><th>Edit</th><th>Delete</th></tr>
//                 </thead>
//                 <tbody>
//                     {modules.map((mod, index) => (
//                         <tr key={index}>
//                             <td className="fw-bold">{mod}</td>
//                             <td className="text-center"><Input type="checkbox" defaultChecked /></td>
//                             <td className="text-center"><Input type="checkbox" defaultChecked={role !== "Client"} /></td>
//                             <td className="text-center"><Input type="checkbox" defaultChecked={role === "Super Admin" || role === "Attorney"} /></td>
//                             <td className="text-center"><Input type="checkbox" defaultChecked={role === "Super Admin"} /></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//       </CardBody></Card>
//     </div>
//   );
// };
// export default RolePermission;


'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Input, FormGroup, Label } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RolePermission = () => {
  const GOLD = "#eebb5d";
  const [role, setRole] = useState("Attorney");
  
  // Simulated Permission Handler
  const handleSave = () => {
    toast.success(`Permissions updated for ${role}!`, { theme: "colored" });
  };

  const modules = ["Dashboard", "Case Management", "Client Management", "Finance & Accounts", "Settings", "Reports"];

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Role Permissions</h5></CardBody></Card>
      
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        
        {/* RESPONSIVE HEADER: 
            1. flex-column for mobile (stack), flex-sm-row for desktop (side-by-side)
            2. align-items-sm-end ensures Button aligns with the Input box, not the Label (better UI) 
        */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end mb-4 gap-3">
            
            {/* Role Select Wrapper */}
            <div className="w-100" style={{maxWidth: '300px'}}>
                <Label className="fw-bold">Select Role</Label>
                <Input type="select" value={role} onChange={e=>setRole(e.target.value)}>
                    <option>Super Admin</option><option>Attorney</option><option>Staff</option><option>Client</option>
                </Input>
            </div>

            {/* Save Button Wrapper */}
            {/* Wrapper ensures button is full width on mobile, normal on desktop */}
            <div>
                <Button 
                    onClick={handleSave} 
                    className="w-100" 
                    style={{ backgroundColor: GOLD, border: 'none', whiteSpace: 'nowrap' }}
                >
                    Save Changes
                </Button>
            </div>
        </div>

        {/* Table with responsive prop for horizontal scrolling on mobile */}
        <Table responsive bordered className="align-middle text-nowrap">
            <thead className="table-light text-center">
                <tr><th className="text-start">Module Name</th><th>View</th><th>Add</th><th>Edit</th><th>Delete</th></tr>
            </thead>
            <tbody>
                {modules.map((mod, index) => (
                    <tr key={index}>
                        <td className="fw-bold">{mod}</td>
                        <td className="text-center"><Input type="checkbox" defaultChecked /></td>
                        <td className="text-center"><Input type="checkbox" defaultChecked={role !== "Client"} /></td>
                        <td className="text-center"><Input type="checkbox" defaultChecked={role === "Super Admin" || role === "Attorney"} /></td>
                        <td className="text-center"><Input type="checkbox" defaultChecked={role === "Super Admin"} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>

      </CardBody></Card>
    </div>
  );
};
export default RolePermission;