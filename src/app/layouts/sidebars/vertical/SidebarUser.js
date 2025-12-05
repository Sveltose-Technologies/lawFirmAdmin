'use client';
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardBody } from "reactstrap";

const SidebarUser = () => {
  const pathname = usePathname();
  const goldColor = "#eebb5d";

  // --- Image Upload State ---
  // CORRECT: Direct string path used here
  const [profileImg, setProfileImg] = useState("/images/users/user1.jpg"); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  // --- Menu Items ---
  const menuItems = [
    { title: "Dashboard", href: "/user/dashboard", icon: "bi bi-grid-fill" },
    { title: "Attorney", href: "/user/attorney", icon: "bi bi-person-fill" },
    { title: "Case History", href: "/user/case-history", icon: "bi bi-clock-history" },
    { title: "Appointments", href: "/user/appointments", icon: "bi bi-calendar-check" },
    { title: "Files", href: "/user/files", icon: "bi bi-files" },
    { title: "Message", href: "/user/message", icon: "bi bi-chat-dots" },
    { title: "Settings", href: "/user/settings", icon: "bi bi-gear-fill" },
  ];

  return (
    <div className="h-100">
      <Card className="border-0 shadow-sm rounded-4 h-100">
        <CardBody className="p-4 d-flex flex-column h-100">
          
          {/* --- Profile Section (With Upload) --- */}
          <div className="text-center mb-5 bg-light p-3 rounded-4">
            <div className="position-relative d-inline-block mb-3">
                <input 
                    type="file" 
                    id="profile-upload" 
                    hidden 
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <label htmlFor="profile-upload" style={{ cursor: 'pointer' }}>
                    <img 
                        src={profileImg} 
                        alt="User" 
                        className="rounded-circle shadow-sm"
                        style={{ width: "80px", height: "80px", objectFit: "cover", border: `3px solid ${goldColor}` }} 
                    />
                    <div className="position-absolute bottom-0 end-0 bg-white rounded-circle border p-1" style={{width:'25px', height:'25px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <i className="bi bi-camera-fill small text-muted" style={{fontSize: '12px'}}></i>
                    </div>
                </label>
            </div>
            <h5 className="fw-bold mb-0">John Doe</h5>
            <small className="text-muted">user@gmail.com</small>
          </div>

          {/* --- Navigation Links --- */}
          <div className="flex-grow-1">
            <ul className="list-unstyled">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li key={index} className="mb-2">
                    <Link 
                        href={item.href} 
                        className="d-flex align-items-center text-decoration-none px-3 py-2 rounded-3 transition-all"
                        style={{
                            color: isActive ? goldColor : "#5e5e5e",
                            backgroundColor: isActive ? "rgba(238, 187, 93, 0.1)" : "transparent",
                            fontWeight: isActive ? "600" : "500",
                            transition: "all 0.3s"
                        }}
                    >
                      <i className={`${item.icon} me-3 fs-5`}></i>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* --- Footer Links --- */}
          <div className="mt-auto border-top pt-3">
             <Link href="/user/help" className="d-flex align-items-center text-decoration-none text-muted mb-3 px-3">
                <i className="bi bi-info-circle me-3"></i> Help & Info
             </Link>
             <Link href="/login" className="d-flex align-items-center text-decoration-none text-danger px-3">
                <i className="bi bi-box-arrow-right me-3"></i> Logout
             </Link>
          </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default SidebarUser;