"use client";
import React, { useState } from "react";
import { Button, Nav, NavItem, Collapse } from "reactstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const COLOR = "#eebb5d"; // आपका बताया हुआ कलर

// --- सारी लिस्ट (Old + New 29 Points) ---
const navigation = [
  // 1. Dashboard
  { title: "Dashboard", href: "/", icon: "bi bi-speedometer2" },

  // 2. User Management
  { header: "USER MANAGEMENT" },
  { title: "Clients", href: "/clients", icon: "bi bi-people" },
  { title: "Attorney", href: "/attorney", icon: "bi bi-person-fill" },
  { title: "Users", href: "/users", icon: "bi bi-person-circle" },
  { title: "Roles", href: "/roles", icon: "bi bi-person-badge" },
  { title: "Role Permission", href: "/role-permission", icon: "bi bi-shield-lock" },

  // 3. Case Management
  { header: "CASE MANAGEMENT" },
  { title: "Our Cases", href: "/our-cases", icon: "bi bi-briefcase" },
  { title: "Case Category", href: "/case-category", icon: "bi bi-grid" },
  { title: "Case Type", href: "/case-type", icon: "bi bi-tags" },
  { title: "Case Documents", href: "/case-documents", icon: "bi bi-file-earmark-text" },
  { title: "Case Activity Logs", href: "/case-activity-logs", icon: "bi bi-clock-history" },
  { title: "Daily Hearing", href: "/daily-hearing", icon: "bi bi-hammer" },
  { title: "Courtroom Mapping", href: "/courtroom-mapping", icon: "bi bi-building" },
  { title: "Case Load by Attorney", href: "/case-load", icon: "bi bi-bar-chart-steps" },
  { title: "Case Study", href: "/case-study", icon: "bi bi-journal-text" },

  // 4. Task & Schedule
  { header: "TASK & SCHEDULE" },
  { title: "Assign Task", href: "/assign-task", icon: "bi bi-list-task" },
  { title: "Task Calendar", href: "/task-calendar", icon: "bi bi-calendar3" },
  { title: "Timesheet", href: "/timesheet", icon: "bi bi-table" },
  { title: "Lawyer Availability", href: "/lawyer-availability", icon: "bi bi-calendar-check" },

  // 5. Finance
  { header: "FINANCE & PAYMENT" },
  // { title: "Payment Method", href: "/payment-method", icon: "bi bi-credit-card" },
  // { title: "Payment List", href: "/payment-list", icon: "bi bi-cash-stack" },
  { title: "Case Bill", href: "/case-bill", icon: "bi bi-receipt" },//case-bill
  { title: "Expenses", href: "/expenses", icon: "bi bi-cash-coin" },
  { title: "Transactions", href: "/transactions", icon: "bi bi-currency-exchange" },
  { title: "Platform Fees", href: "/platform-fees", icon: "bi bi-wallet2" }, 
  { title: "Payment Report", href: "/payment-report", icon: "bi bi-file-earmark-bar-graph" },

  // 6. Content & CMS
  { header: "CONTENT & CMS" },
  { title: "Blogs", href: "/blogs", icon: "bi bi-newspaper" },//blogs
  { title: "Blog Category", href: "/category", icon: "bi bi-bookmarks" },//category
  // { title: "Tags", href: "/tags", icon: "bi bi-tags" },
  { title: "Media", href: "/media", icon: "bi bi-images" },//media
  { title: "CMS", href: "/cms", icon: "bi bi-window-sidebar" }, 
  { title: "Client Communication", href: "/client-communication", icon: "bi bi-chat-dots" },
  { title: "Review & Rating", href: "/review-rating", icon: "bi bi-stars" },

  // 7. Other (Existing)
  { header: "OTHER" },
  { title: "Service", href: "/service", icon: "bi bi-hammer" },
  { title: "Newsletter", href: "/newsletter", icon: "bi bi-envelope-paper" },
  { title: "Testimonial", href: "/testimonial", icon: "bi bi-chat-quote" },
  { title: "Contact", href: "/contact", icon: "bi bi-calendar-event" },
  { title: "Message", href: "/message", icon: "bi bi-chat-dots" },

  // 8. Settings
  { header: "SETTINGS" },
  { title: "Settings", href: "/settings", icon: "bi bi-wrench" },
  { title: "Languages", href: "/languages", icon: "bi bi-translate" },
  { title: "Email Settings", href: "/email-settings", icon: "bi bi-envelope" },
  { title: "Faq", href: "/faq", icon: "bi bi-question-circle" },
  { title: "Page Settings", href: "/pages-list", icon: "bi bi-file-earmark-text" },
  
  { title: "Log Report", href: "", icon: "bi bi-journal-text" }, //log-report
];

export default function Sidebar({ showMobilemenu }) {
  const location = usePathname();
  const [collapseState, setCollapseState] = useState({});

  const toggle = (id) =>
    setCollapseState((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="p-3 bg-white h-100 d-flex flex-column border-end">

      {/* HEADER LOGO */}
      <div className="d-flex align-items-center mb-4 px-2">
        <Link href="/" className="text-decoration-none">
          <span style={{ color: COLOR, fontWeight: "bold", fontSize: "1.5rem" }}>
            Lawstick 
          </span>
        </Link>

        {/* Mobile Close Button */}
        <span className="ms-auto d-lg-none">
          <Button close size="sm" onClick={showMobilemenu}></Button>
        </span>
      </div>

      {/* SCROLLABLE SIDEBAR ITEMS */}
      <div className="flex-grow-1 overflow-auto">

        <Nav vertical pills>

          {navigation.map((navi, index) => {

            // 1. SECTION HEADERS
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

            // 2. COLLAPSIBLE MENU (If children exist)
            if (navi.children) {
              const isChildActive = navi.children.some(
                (child) => location === child.href
              );
              const finalActive = isActive || isChildActive;

              return (
                <NavItem key={index} className="mb-1">
                  {/* Parent Row */}
                  <div
                    className={`d-flex align-items-center justify-content-between rounded px-3 py-2`}
                    style={{
                      backgroundColor: finalActive ? COLOR : "transparent",
                      color: finalActive ? "#fff" : "#5e5e5e",
                      cursor: "pointer",
                      transition: "0.2s"
                    }}
                  >
                    {/* Main Link inside Parent */}
                    <Link
                      href={navi.href}
                      className="d-flex align-items-center flex-grow-1 text-decoration-none"
                      style={{ color: finalActive ? "#fff" : "#5e5e5e" }}
                    >
                      <i className={`${navi.icon} me-2`} style={{ fontSize: "1.1rem" }}></i>
                      {navi.title}
                    </Link>

                    {/* Toggle Arrow */}
                    <i
                      onClick={(e) => {
                         e.preventDefault(); // Prevent Link click when clicking arrow
                         toggle(navi.id);
                      }}
                      className={`bi ${collapseState[navi.id] ? "bi-chevron-up" : "bi-chevron-down"}`}
                      style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    ></i>
                  </div>

                  {/* Children Items */}
                  <Collapse isOpen={collapseState[navi.id]}>
                    <Nav vertical className="ms-3 mt-1">
                      {navi.children.map((child, childIndex) => {
                        const childActive = location === child.href;
                        return (
                          <NavItem key={childIndex} className="mb-1">
                            <Link
                              href={child.href}
                              className="d-flex align-items-center px-3 py-2 rounded text-decoration-none"
                              style={{
                                backgroundColor: childActive ? COLOR : "transparent",
                                color: childActive ? "#fff" : "#5e5e5e",
                                fontSize: "0.9rem",
                                transition: "0.2s"
                              }}
                            >
                              <i className={`${child.icon} me-2`} style={{ fontSize: "0.9rem" }}></i>
                              {child.title}
                            </Link>
                          </NavItem>
                        );
                      })}
                    </Nav>
                  </Collapse>
                </NavItem>
              );
            }

            // 3. NORMAL SINGLE LINKS
            return (
              <NavItem key={index} className="mb-1">
                <Link
                  href={navi.href}
                  className="d-flex align-items-center px-3 py-2 rounded text-decoration-none"
                  style={{
                    backgroundColor: isActive ? COLOR : "transparent",
                    color: isActive ? "#fff" : "#5e5e5e",
                    transition: "0.2s"
                  }}
                >
                  <i className={`${navi.icon} me-2`} style={{ fontSize: "1.1rem" }}></i>
                  {navi.title}
                </Link>
              </NavItem>
            );
          })}
        </Nav>
        
        {/* Extra bottom space for better scrolling */}
        <div style={{height: "50px"}}></div>

      </div>
    </div>
  );
}