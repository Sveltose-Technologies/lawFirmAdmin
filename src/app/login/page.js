// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // चूँकि आपने कहा कोई भी ईमेल पासवर्ड चले, इसलिए हम सीधे सेव कर रहे हैं
//     localStorage.setItem("isLoggedIn", "true");
//     router.push("/"); // लॉगिन के बाद डैशबोर्ड पर भेजें
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
//                   <h2 style={{ color: goldColor, fontWeight: "bold" }}>Lawstick</h2>
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
//                   >
//                     Login to Dashboard
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
import React, { useState } from "react";
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner } from "reactstrap";
import authService from "@/services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        toast.success("Login Successful!"); 
        window.location.href = "/"; 
      } else {
        toast.error(result.message || "Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg border-0 rounded-4 p-5">
                <h2 className="text-center fw-bold" style={{ color: "#eebb5d" }}>Login</h2>
                <Form onSubmit={handleLogin} className="mt-4">
                  <FormGroup>
                    <Label className="small fw-bold">Email Address</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label className="small fw-bold">Password</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </FormGroup>
                  <Button className="w-100 border-0" style={{ backgroundColor: "#eebb5d" }} type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Login to Dashboard"}
                  </Button>
                </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}