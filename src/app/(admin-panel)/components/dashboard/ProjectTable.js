import Image from "next/image";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

// --- FIX: Direct String Paths (Import hata diya hai) ---
const user1 = "/images/users/user1.jpg";
const user2 = "/images/users/user2.jpg";
const user3 = "/images/users/user3.jpg";
const user4 = "/images/users/user4.jpg";

const ProjectTables = () => {
  // --- Data for Top Clients ---
  const topClients = [
    { avatar: user1, name: "John", email: "user@gmail.com", price: "$343" },
    { avatar: user2, name: "John", email: "user@gmail.com", price: "$343" },
    { avatar: user3, name: "John", email: "user@gmail.com", price: "$343" },
    { avatar: user4, name: "John", email: "user@gmail.com", price: "$343" },
  ];

  // --- Data for Upcoming Cases ---
  const upcomingCases = [
    { avatar: user1, name: "John", email: "user@gmail.com" },
    { avatar: user2, name: "John", email: "user@gmail.com" },
    { avatar: user3, name: "John", email: "user@gmail.com" },
    { avatar: user4, name: "John", email: "user@gmail.com" },
  ];

  // --- Data for Messages ---
  const messages = [
    { avatar: user1, name: "Mr Admin", time: "2 days ago" },
    { avatar: user2, name: "Mr Admin", time: "16 days ago" },
    { avatar: user3, name: "Mr Admin", time: "16 days ago" },
    { avatar: user4, name: "Mr Admin", time: "17 days ago" },
  ];

  // Common Title Style (Gold Bar)
  const titleStyle = {
    borderLeft: "4px solid #c6a87c",
    paddingLeft: "10px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px"
  };

  // View Details Link Style
  const linkStyle = {
    color: "#b08d55", // Gold/Brown color
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "13px",
    cursor: "pointer"
  };

  return (
    <Row>
      {/* ---------------------------------------------------------
          COLUMN 1: Top Clients
      --------------------------------------------------------- */}
      <Col xs="12" lg="4">
        <Card className="mb-4 h-100">
          <CardBody>
            <CardTitle tag="h5" style={titleStyle}>Top Clients</CardTitle>
            
            <div className="d-flex flex-column gap-4">
              {topClients.map((client, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Image
                      src={client.avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>{client.name}</h6>
                      <small className="text-muted" style={{ fontSize: "12px" }}>{client.email}</small>
                    </div>
                  </div>
                  <div className="fw-bold text-warning" style={{ color: "#c6a87c !important" }}>
                    {client.price}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* ---------------------------------------------------------
          COLUMN 2: Upcoming Cases
      --------------------------------------------------------- */}
      <Col xs="12" lg="4">
        <Card className="mb-4 h-100">
          <CardBody>
            <CardTitle tag="h5" style={titleStyle}>Upcoming Cases</CardTitle>
            
            <div className="d-flex flex-column gap-4">
              {upcomingCases.map((item, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>{item.name}</h6>
                      <small className="text-muted" style={{ fontSize: "12px" }}>{item.email}</small>
                    </div>
                  </div>
                  <div style={linkStyle}>View details</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* ---------------------------------------------------------
          COLUMN 3: Messages
      --------------------------------------------------------- */}
      <Col xs="12" lg="4">
        <Card className="mb-4 h-100">
          <CardBody>
            <CardTitle tag="h5" style={titleStyle}>Messages</CardTitle>
            
            <div className="d-flex flex-column gap-4">
              {messages.map((msg, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Image
                      src={msg.avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>{msg.name}</h6>
                      <small className="text-muted" style={{ fontSize: "12px" }}>{msg.time}</small>
                    </div>
                  </div>
                  <div style={linkStyle}>View details</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectTables;