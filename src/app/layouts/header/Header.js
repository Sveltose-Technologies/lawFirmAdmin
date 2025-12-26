'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const Header = ({ showMobmenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar
      color="white"
      light
      expand="md"
      className="shadow-sm"
      style={{ borderRadius: "15px", margin: "10px", padding: "10px 20px" }}
    >
      <div className="d-flex align-items-center">
        <Button
          color="white"
          className="d-lg-none border-0 me-2"
          onClick={showMobmenu}
          style={{ padding: '0px' }}
        >
          <i className="bi bi-list fs-1 text-secondary"></i>
        </Button>

        <NavbarBrand href="/" className="d-flex align-items-center">
          <span style={{ color: "#eebb5d", fontWeight: "bold", fontSize: "1.5rem" }}>
            Lawstick
          </span>
        </NavbarBrand>
      </div>

      <Button
        color="white"
        className="d-md-none border-0 ms-auto"
        onClick={Handletoggle}
      >
        {isOpen ? (
          <i className="bi bi-x fs-2 text-secondary"></i>
        ) : (
          <i className="bi bi-three-dots-vertical fs-2 text-secondary"></i>
        )}
      </Button>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="ms-auto align-items-center gap-3" navbar>
          <NavItem>
            <Link href="#" className="nav-link text-secondary">
              <i className="bi bi-chat-text fs-5"></i>
            </Link>
          </NavItem>

          <NavItem>
            <Link href="#" className="nav-link text-secondary d-flex align-items-center gap-2">
              <i className="bi bi-box-arrow-up-right"></i>
              <span className="fw-medium">Live Site</span>
            </Link>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret nav className="text-secondary fw-medium">
              English
            </DropdownToggle>
            <DropdownMenu end className="shadow-sm border-0 mt-2">
              <DropdownItem>English</DropdownItem>
              <DropdownItem>French</DropdownItem>
              <DropdownItem>Spanish</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="d-flex align-items-center gap-2 text-secondary">
              <span className="fw-bold text-dark">Admin</span>
              <div style={{ lineHeight: "0px" }}>
                <Image
                  src="/images/users/user1.jpg"
                  alt="profile"
                  className="rounded-circle"
                  width={35}
                  height={35}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </DropdownToggle>
            
            <DropdownMenu end className="shadow-sm border-0 mt-2">
              <DropdownItem header>My Account</DropdownItem>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Change Password</DropdownItem>
               <DropdownItem>
                  <Link 
                      href="#" 
                      style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }}
                  >
                    {/* /attorney-panel */}
                      Attonry Panel
                  </Link>
              </DropdownItem>
              <DropdownItem>
                  <Link 
                      href="#" 
                      style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }} 
                  >
                    {/* /user-panel/dashboard" */}
                      User Panel  
                  </Link>
              </DropdownItem>
             

              <DropdownItem divider />
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

// --- YE LINE SABSE ZAROORI HAI ---
export default Header;