// 'use client';
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "reactstrap";

// const Header = ({ showMobmenu }) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const Handletoggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <Navbar
//       color="white"
//       light
//       expand="md"
//       className="shadow-sm"
//       style={{ borderRadius: "15px", margin: "10px", padding: "10px 20px" }}
//     >
//       <div className="d-flex align-items-center">
//         <Button
//           color="white"
//           className="d-lg-none border-0 me-2"
//           onClick={showMobmenu}
//           style={{ padding: '0px' }}
//         >
//           <i className="bi bi-list fs-1 text-secondary"></i>
//         </Button>

//         <NavbarBrand href="/" className="d-flex align-items-center">
//           <span style={{ color: "#eebb5d", fontWeight: "bold", fontSize: "1.5rem" }}>
//             Lawstick
//           </span>
//         </NavbarBrand>
//       </div>

//       <Button
//         color="white"
//         className="d-md-none border-0 ms-auto"
//         onClick={Handletoggle}
//       >
//         {isOpen ? (
//           <i className="bi bi-x fs-2 text-secondary"></i>
//         ) : (
//           <i className="bi bi-three-dots-vertical fs-2 text-secondary"></i>
//         )}
//       </Button>

//       <Collapse navbar isOpen={isOpen}>
//         <Nav className="ms-auto align-items-center gap-3" navbar>
//           <NavItem>
//             <Link href="#" className="nav-link text-secondary">
//               <i className="bi bi-chat-text fs-5"></i>
//             </Link>
//           </NavItem>

//           <NavItem>
//             <Link href="#" className="nav-link text-secondary d-flex align-items-center gap-2">
//               <i className="bi bi-box-arrow-up-right"></i>
//               <span className="fw-medium">Live Site</span>
//             </Link>
//           </NavItem>

//           <UncontrolledDropdown nav inNavbar>
//             <DropdownToggle caret nav className="text-secondary fw-medium">
//               English
//             </DropdownToggle>
//             <DropdownMenu end className="shadow-sm border-0 mt-2">
//               <DropdownItem>English</DropdownItem>
//               <DropdownItem>French</DropdownItem>
//               <DropdownItem>Spanish</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>

//           <UncontrolledDropdown nav inNavbar>
//             <DropdownToggle nav caret className="d-flex align-items-center gap-2 text-secondary">
//               <span className="fw-bold text-dark">Admin</span>
//               <div style={{ lineHeight: "0px" }}>
//                 <Image
//                   src="/images/users/user1.jpg"
//                   alt="profile"
//                   className="rounded-circle"
//                   width={35}
//                   height={35}
//                   style={{ objectFit: "cover" }}
//                 />
//               </div>
//             </DropdownToggle>
            
//             <DropdownMenu end className="shadow-sm border-0 mt-2">
//               <DropdownItem header>My Account</DropdownItem>
//               <DropdownItem>Profile</DropdownItem>
//               <DropdownItem>Change Password</DropdownItem>
//                <DropdownItem>
//                   <Link 
//                       href="#" 
//                       style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }}
//                   >
//                     {/* /attorney-panel */}
//                       Attonry Panel
//                   </Link>
//               </DropdownItem>
//               <DropdownItem>
//                   <Link 
//                       href="#" 
//                       style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }} 
//                   >
//                     {/* /user-panel/dashboard" */}
//                       User Panel  
//                   </Link>
//               </DropdownItem>
             

//               <DropdownItem divider />
//               <DropdownItem>Logout</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </Nav>
//       </Collapse>
//     </Navbar>
//   );
// };

// // --- YE LINE SABSE ZAROORI HAI ---
// export default Header;


"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // 🔹 reusable hover hook (INLINE ONLY)
  const useHover = () => {
    const [active, setActive] = React.useState(false);
    return {
      style: {
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: active ? "#eebb5d" : "transparent",
        color: active ? "#fff" : "inherit",
      },
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
    };
  };

  // 🔹 hover instances
  const chatHover = useHover();
  const liveHover = useHover();
  const langHover = useHover();
  const profileHover = useHover();
  const passHover = useHover();
  const attorneyHover = useHover();
  const userHover = useHover();
  const logoutHover = useHover();

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
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
          style={{ padding: "0px" }}
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

          {/* Chat */}
          <NavItem>
            <Link href="#" className="nav-link" {...chatHover}>
              <i className="bi bi-chat-text fs-5"></i>
            </Link>
          </NavItem>

          {/* Live Site */}
          <NavItem>
            <Link
              href="#"
              className="nav-link d-flex align-items-center gap-2"
              {...liveHover}
            >
              <i className="bi bi-box-arrow-up-right"></i>
              <span className="fw-medium">Live Site</span>
            </Link>
          </NavItem>

          {/* Language */}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret nav {...langHover}>
              English
            </DropdownToggle>
            <DropdownMenu end className="shadow-sm border-0 mt-2">
              <DropdownItem {...useHover()}>English</DropdownItem>
              <DropdownItem {...useHover()}>French</DropdownItem>
              <DropdownItem {...useHover()}>Spanish</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* Admin */}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle
              nav
              caret
              className="d-flex align-items-center gap-2"
              
            >
              <span className="fw-bold text-dark">Admin</span>
              <Image
                src="/images/users/user1.jpg"
                alt="profile"
                className="rounded-circle"
                width={35}
                height={35}
              />
            </DropdownToggle>

            <DropdownMenu end className="shadow-sm border-0 mt-2">
              <DropdownItem header>My Account</DropdownItem>

<DropdownItem 
  {...profileHover} 
  tag={Link} 
  href="/profile" 
  style={{ textDecoration: "none", color: "inherit" }}
>
  Profile
</DropdownItem>          
    <DropdownItem {...passHover}>Change Password</DropdownItem>

              <DropdownItem {...attorneyHover}>
                <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
                  Attorney Panel
                </Link>
              </DropdownItem>

              <DropdownItem {...userHover}>
                <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
                  User Panel
                </Link>
              </DropdownItem>

              <DropdownItem divider />

              <DropdownItem onClick={handleLogout} {...logoutHover}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
