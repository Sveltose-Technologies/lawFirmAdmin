

// "use client";
// import React, { useState } from "react";
// import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner } from "reactstrap";
// import authService from "@/services/authService";
// import { toast } from "react-toastify";

// export default function LoginPage() {
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
//         window.location.href = "/"; 
//       } else {
//         toast.error(result.message || "Invalid Email or Password");
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", alignItems: "center" }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={5}>
//             <Card className="shadow-lg border-0 rounded-4 p-5">
//                 <h2 className="text-center fw-bold" style={{ color: "#eebb5d" }}>Login</h2>
//                 <Form onSubmit={handleLogin} className="mt-4">
//                   <FormGroup>
//                     <Label className="small fw-bold">Email Address</Label>
//                     <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                   </FormGroup>
//                   <FormGroup className="mb-4">
//                     <Label className="small fw-bold">Password</Label>
//                     <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                   </FormGroup>
//                   <Button className="w-100 border-0" style={{ backgroundColor: "#eebb5d" }} type="submit" disabled={loading}>
//                     {loading ? <Spinner size="sm" /> : "Login to Dashboard"}
//                   </Button>
//                 </Form>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner, InputGroup, InputGroupText } from "reactstrap";
import authService from "@/services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      console.log('result', result);
      
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
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label className="small fw-bold">Password</Label>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"} // Show/hide password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <InputGroupText
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <Button className="w-100 border-0" style={{ backgroundColor: "#eebb5d" }} type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Login"}
                  </Button>
                </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
