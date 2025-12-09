"use client";
import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const COLOR = "#eebb5d"; // Theme Color

const navigation = [
  // 1. Dashboard
  { title: "Dashboard", href: "/attorney-panel", icon: "bi bi-speedometer2" },

  // 2. Case Management Section
  { header: "CASE MANAGEMENT" },
  { title: "Case Details", href: "/attorney-panel/case-details", icon: "bi bi-journal-bookmark" },


  // 3. Client & Team Section
  { header: "CLIENT & TEAM" },
  { title: "Client Management", href: "/attorney-panel/client-management", icon: "bi bi-people" },
  { title: "message", href: "/attorney-panel/messages", icon: "bi bi-person-badge" },
  { title: "Appointment", href: "/attorney-panel/appointment", icon: "bi bi-calendar-check" },

  // 4. Support Section
  { header: "SUPPORT & SETTINGS" },
  { title: "Ticket Management", href: "/attorney-panel/ticket-management", icon: "bi bi-ticket-detailed" },
  { title: "Update Profile", href: "/attorney-panel/profile", icon: "bi bi-person-gear" },
];

export default function AttorneySidebar({ showMobilemenu }) {
  const location = usePathname();

  return (
    <div className="p-3 bg-white h-100 d-flex flex-column border-end">
      
      {/* CSS for Hover Effect */}
      <style jsx global>{`
        .sidebar-link:hover {
          color: ${COLOR} !important;
        }
        .sidebar-link.active-link:hover {
          color: #fff !important;
        }
      `}</style>

      {/* HEADER LOGO */}
      <div className="d-flex align-items-center mb-4 px-2">
        <Link href="/" className="text-decoration-none">
          <span style={{ color: COLOR, fontWeight: "bold", fontSize: "1.5rem" }}>
            Lawstick
          </span>
        </Link>
        <span className="text-muted ms-2 small fw-bold" style={{fontSize: '0.7rem', marginTop: '5px'}}>
            (Attorney)
        </span>

        {/* Mobile Close Button */}
        <span className="ms-auto d-lg-none">
          <Button close size="sm" onClick={showMobilemenu}></Button>
        </span>
      </div>

      {/* SCROLLABLE SIDEBAR ITEMS */}
      <div className="flex-grow-1 overflow-auto">
        <Nav vertical pills>
          {navigation.map((navi, index) => {
            
            // SECTION HEADERS
            if (navi.header) {
              return (
                <div
                  key={index}
                  className="fw-bold mt-3 mb-2 text-uppercase text-muted small px-3"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  {navi.header}
                </div>
              );
            }

            const isActive = location === navi.href;

            // MENU LINKS
            return (
              <NavItem key={index} className="mb-1">
                <Link
                  href={navi.href}
                  className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none sidebar-link ${isActive ? 'active-link' : ''}`}
                  style={{
                    backgroundColor: isActive ? COLOR : "transparent",
                    color: isActive ? "#fff" : "#5e5e5e",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                >
                  <i className={`${navi.icon} me-2`} style={{ fontSize: "1.1rem" }}></i>
                  <span className="fw-medium">{navi.title}</span>
                </Link>
              </NavItem>
            );
          })}
          
          {/* Logout Button at the bottom */}
           <NavItem className="mt-4 pt-3 border-top">
                <Link
                  href="/"
                  className="d-flex align-items-center px-3 py-2 rounded text-decoration-none text-danger"
                  style={{ transition: "0.2s" }}
                >
                  <i className="bi bi-box-arrow-right me-2" style={{ fontSize: "1.1rem" }}></i>
                  <span className="fw-bold">Logout</span>
                </Link>
            </NavItem>

        </Nav>
        
        {/* Extra Space for scroll */}
        <div style={{height: "50px"}}></div>
      </div>
    </div>
  );
}