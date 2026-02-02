// "use client";
// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Navbar, Nav, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
// import { useAdmin } from "../../../context/AdminContext";

// const Header = ({ showMobmenu }) => {
//   const { admin } = useAdmin();
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push("/login");
//   };

//   return (
//     <Navbar
//       color="white"
//       light
//       expand="md"
//       className="shadow-sm bg-white"
//       style={{ borderRadius: "12px", margin: "10px", padding: "8px 20px" }}>
//       <div className="d-flex align-items-center justify-content-between w-100">
//         {/* Left Side: Burger Menu and Brand */}
//         <div className="d-flex align-items-center">
//           <Button
//             color="white"
//             className="d-lg-none border-0 p-0 me-3"
//             onClick={showMobmenu}>
//             <i className="bi bi-list fs-2" style={{ color: "#333" }}></i>
//           </Button>
//           <NavbarBrand
//             href="/"
//             className="fw-bold d-flex align-items-center"
//             style={{ color: "#eebb5d" }}>
//             <span className="fs-4">Lawfirm</span>
//           </NavbarBrand>
//         </div>

//         {/* Right Side: Admin Info */}
//         <Nav className="ms-auto" navbar>
//           <UncontrolledDropdown nav inNavbar>
//             <DropdownToggle nav className="d-flex align-items-center gap-2 p-0">
//               <div className="d-none d-sm-block text-end">
//                 <div
//                   className="fw-bold text-dark small"
//                   style={{ lineHeight: "1.1" }}>
//                   {admin?.firstName || "Admin"}
//                 </div>
//                 <small className="text-muted" style={{ fontSize: "10px" }}>
//                   Super Admin
//                 </small>
//               </div>
//               <img
//                 src={
//                   admin?.profileImage ||
//                   `https://ui-avatars.com/api/?name=${admin?.firstName || "A"}&background=eebb5d&color=fff`
//                 }
//                 alt="profile"
//                 className="rounded-circle border"
//                 width="38"
//                 height="38"
//                 style={{ objectFit: "cover" }}
//                 onError={(e) => {
//                   e.target.src =
//                     "https://ui-avatars.com/api/?name=Admin&background=eebb5d&color=fff";
//                 }}
//               />
//             </DropdownToggle>
//             <DropdownMenu end className="shadow border-0 mt-2">
//               <DropdownItem tag={Link} href="/change-password" className="py-2">
//                 <i className="bi bi-person me-2"></i> Profile
//               </DropdownItem>
//               <DropdownItem tag={Link} href="/change-password" className="py-2">
//                 <i className="bi bi-person me-2"></i>Changes Password
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem onClick={handleLogout} className="text-danger py-2">
//                 <i className="bi bi-box-arrow-right me-2"></i> Logout
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </Nav>
//       </div>
//     </Navbar>
//   );
// };

// export default Header;

"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { useAdmin } from "../../../context/AdminContext";

const Header = ({ showMobmenu }) => {
  const { admin } = useAdmin();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Navbar
      color="white"
      light
      expand="md"
      className="shadow-sm sticky-top"
      style={{
        margin: "10px",
        borderRadius: "10px",
        padding: "8px 15px",
        zIndex: 1030,
      }}>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center">
          {/* Hamburger Menu Toggle */}
          <Button
            color="light"
            className="d-lg-none border-0 p-1 me-2"
            onClick={showMobmenu}
            style={{ borderRadius: "8px" }}>
            <i className="bi bi-list fs-3" style={{ color: "#333" }}></i>
          </Button>

          <NavbarBrand
            href="/"
            className="fw-bold d-flex align-items-center m-0"
            style={{ color: "#eebb5d" }}>
            <span className="fs-4 d-none d-sm-inline">Lawfirm</span>
            <span className="fs-5 d-sm-none">Lawfirm</span>
          </NavbarBrand>
        </div>

        <div className="d-flex align-items-center">
          <Nav className="ms-auto d-flex align-items-center flex-row" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                className="d-flex align-items-center gap-2 p-0">
                <div className="d-none d-sm-block text-end me-1">
                  <div
                    className="fw-bold text-dark small"
                    style={{ lineHeight: "1.1" }}>
                    {admin?.firstName || "Admin"}
                  </div>
                  <small className="text-muted" style={{ fontSize: "10px" }}>
                    Super Admin
                  </small>
                </div>
                <img
                  src={
                    admin?.profileImage ||
                    `https://ui-avatars.com/api/?name=${admin?.firstName || "A"}&background=eebb5d&color=fff`
                  }
                  alt="profile"
                  className="rounded-circle border"
                  width="35"
                  height="35"
                  style={{ objectFit: "cover" }}
                />
              </DropdownToggle>
              <DropdownMenu end className="shadow border-0 mt-2">
                <DropdownItem tag={Link} href="/change-password">
                  Profile
                </DropdownItem>
                <DropdownItem tag={Link} href="/change-password">
                  Change Password
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout} className="text-danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;