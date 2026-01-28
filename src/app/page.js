

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   Card, 
//   CardBody, 
//   Form, 
//   FormGroup, 
//   Label, 
//   Input, 
//   Button, 
//   Container, 
//   Row, 
//   Col, 
//   Spinner 
// } from "reactstrap";
// import authService from "@/services/authService";
// import { toast } from "react-toastify"; // ❌ यह लाइन पहले मिसिंग थी, अब ठीक है

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await authService.login(email, password);

//       if (result.success) {
//         toast.success("Login Successful!"); 
        
//         // ✅ लॉगिन के बाद डैशबोर्ड पर भेजने के लिए:
//         // window.location.href का उपयोग करें ताकि layout.js को नया लॉगिन स्टेटस मिल सके
//         window.location.href = "/"; 
//       } else {
//         toast.error(result.message || "Invalid Email or Password");
//       }
//     } catch (err) {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goldColor = "#eebb5d";

//   return (
//     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", alignItems: "center" }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={5}>
//             <Card className="shadow-lg border-0 rounded-4">
//               <CardBody className="p-5">
//                 <div className="text-center mb-4">
//                   {/* "Lawstick" की जगह "Login" कर दिया गया है */}
//                   <h2 style={{ color: goldColor, fontWeight: "bold" }}>Login</h2>
//                   <p className="text-muted">Login to your account</p>
//                 </div>

//                 <Form onSubmit={handleLogin}>
//                   <FormGroup>
//                     <Label className="small fw-bold">Email Address</Label>
//                     <Input
//                       type="email"
//                       placeholder="admin@example.com"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </FormGroup>
//                   <FormGroup className="mb-4">
//                     <Label className="small fw-bold">Password</Label>
//                     <Input
//                       type="password"
//                       placeholder="********"
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </FormGroup>
//                   <Button
//                     className="w-100 py-2 fw-bold border-0"
//                     style={{ backgroundColor: goldColor, color: "#fff" }}
//                     type="submit"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <Spinner size="sm" className="me-2" />
//                         Logging in...
//                       </>
//                     ) : (
//                       "Login to Dashboard"
//                     )}
//                   </Button>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

"use client";
import React from "react";
import { Col, Row } from "reactstrap";

import ProfitChart from "@/app/HeroSection/ProfitChart"; 
import SalesChart from "@/app/(admin-panel)/components/dashboard/SalesChart";
import ProjectTables from "@/app/(admin-panel)/components/dashboard/ProjectTable";
import TopCards from "@/app/(admin-panel)/components/dashboard/TopCards";

const statsData = [
  { title: "Total Attorney", count: "6", icon: "bi bi-people-fill" },
  { title: "Total Clients", count: "51", icon: "bi bi-people" },
  { title: "Total Cases", count: "9", icon: "bi bi-briefcase-fill" },
  { title: "Ongoing Cases", count: "1", icon: "bi bi-journal-text" },
  { title: "Success Cases", count: "2", icon: "bi bi-check-circle-fill" },
  { title: "Wallet", count: "$11,133", icon: "bi bi-wallet-fill" },
];

export default function Home() {
  return (
    <div>
      <Row>
        <Col sm="12">
          <ProfitChart />
        </Col>
      </Row>

      <Row className="mt-4">
        {statsData.map((item, index) => (
          <Col sm="6" lg="4" key={index} className="mb-4">
            <TopCards
              bg="bg-light-warning text-warning"
              subtitle={item.title}
              earning={item.count}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>

      <SalesChart />

      <Row className="mt-4">
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
}