"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // चूँकि आपने कहा कोई भी ईमेल पासवर्ड चले, इसलिए हम सीधे सेव कर रहे हैं
    localStorage.setItem("isLoggedIn", "true");
    router.push("/"); // लॉगिन के बाद डैशबोर्ड पर भेजें
  };

  const goldColor = "#eebb5d";

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <CardBody className="p-5">
                <div className="text-center mb-4">
                  <h2 style={{ color: goldColor, fontWeight: "bold" }}>Lawstick</h2>
                  <p className="text-muted">Login to your account</p>
                </div>
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <Label className="small fw-bold">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label className="small fw-bold">Password</Label>
                    <Input
                      type="password"
                      placeholder="********"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button
                    className="w-100 py-2 fw-bold border-0"
                    style={{ backgroundColor: goldColor, color: "#fff" }}
                    type="submit"
                  >
                    Login to Dashboard
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}