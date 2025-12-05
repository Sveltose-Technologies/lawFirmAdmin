'use client';
import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import SidebarUser from "@/app/(admin-panel)/layouts/sidebars/vertical/SidebarUser";

export default function HelpInfo() {
  const goldColor = "#eebb5d";

  return (
    <div className="bg-light min-vh-100 p-4 font-sans">
      <Row>
        <Col lg="3" md="4" className="mb-4">
             <SidebarUser />
        </Col>

        <Col lg="9" md="8">
            <Card className="border-0 shadow-sm rounded-4 h-100">
                <CardBody className="p-4">
                    
                    <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                        <i className="bi bi-info-circle-fill fs-4 me-2" style={{color: goldColor}}></i>
                        <h5 className="fw-bold mb-0 text-dark" style={{color: goldColor}}>Help &amp; Info</h5>
                    </div>

                    <div className="text-muted" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                        
                        <p className="mb-4">
                            At <strong className="text-dark">Lawstick</strong>, we&apos;re dedicated to ensuring a smooth and efficient experience for everyone using our platform—
                            whether you&apos;re a client seeking legal assistance or an attorney managing your cases. Our support team is always 
                            ready to help with anything from account setup, profile updates, and document uploads to case management and 
                            technical guidance.
                        </p>

                        <p className="mb-4">
                            If you&apos;re facing issues connecting with a lawyer, handling documents, or navigating the dashboard, our admin team 
                            is just a message away. Attorneys can also reach out for help with managing assigned case types, updating 
                            availability, or accessing client details.
                        </p>

                        <p className="mb-0">
                            Your success on Lawstick is our priority. For any questions, concerns, or technical assistance, feel free to contact 
                            us through our Support Center or at <strong className="text-dark">admin@gmail.com</strong>. We&apos;re here to help—every step of the way.
                        </p>

                    </div>

                </CardBody>
            </Card>
        </Col>
      </Row>
    </div>
  );
}
