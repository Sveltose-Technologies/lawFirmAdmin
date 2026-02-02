// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Nav, NavItem, Collapse, Button } from "reactstrap";

// const COLOR = "#EEBB5D";

// const navigation = [
//   { title: "Dashboard", href: "/", icon: "bi bi-speedometer2" },
//   { header: "USER MANAGEMENT" },
//   { title: "Clients", href: "/clients", icon: "bi bi-people" },
//   { title: "Attorney", href: "/attorney", icon: "bi bi-person-workspace" },
//   { title: "Users", href: "/users", icon: "bi bi-person-circle" },
//   { title: "Roles", href: "/roles", icon: "bi bi-ui-checks" },
//   {
//     title: "Role Permission",
//     href: "/role-permission",
//     icon: "bi bi-shield-lock",
//   },

//   { header: "CASE MANAGEMENT" },
//   { title: "Our Cases", href: "/our-cases", icon: "bi bi-briefcase" },
//   { title: "Case Category", href: "/case-category", icon: "bi bi-grid" },
//   { title: "Case Type", href: "/case-type", icon: "bi bi-tags" },
//   { title: "CMS Category", href: "/cms-category", icon: "bi bi-clock-history" },
//   {
//     title: "CMS SubCategory",
//     href: "/cms-subcategory",
//     icon: "bi bi-clock-history",
//   },
//   {
//     title: "Case Documents",
//     href: "/case-documents",
//     icon: "bi bi-file-earmark-text",
//   },
//   {
//     title: "Case Activity Logs",
//     href: "/case-activity-logs",
//     icon: "bi bi-clock-history",
//   },
//   { title: "Daily Hearing", href: "/daily-hearing", icon: "bi bi-hammer" },
//   { title: "Courtroom Mapping", href: "/courtroom-mapping", icon: "bi bi-map" },
//   { title: "Case Load", href: "/case-load", icon: "bi bi-bar-chart-steps" },
//   { title: "Case Study", href: "/case-study", icon: "bi bi-journal-text" },

//   { header: "TASK & SCHEDULE" },
//   { title: "Assign Task", href: "/assign-task", icon: "bi bi-list-task" },
//   { title: "Task Calendar", href: "/task-calendar", icon: "bi bi-calendar3" },
//   { title: "Timesheet", href: "/timesheet", icon: "bi bi-stopwatch" },
//   {
//     title: "Lawyer Availability",
//     href: "/lawyer-availability",
//     icon: "bi bi-calendar-check",
//   },

//   { header: "FINANCE & PAYMENT" },
//   { title: "Case Bill", href: "/case-bill", icon: "bi bi-receipt" },
//   { title: "Expenses", href: "/expenses", icon: "bi bi-cash-coin" },
//   {
//     title: "Transactions",
//     href: "/transactions",
//     icon: "bi bi-currency-exchange",
//   },
//   { title: "Platform Fees", href: "/platform-fees", icon: "bi bi-wallet2" },
//   {
//     title: "Payment Report",
//     href: "/payment-report",
//     icon: "bi bi-file-earmark-bar-graph",
//   },

//   { header: "CONTENT & CMS" },
//   { title: "Media", href: "/media", icon: "bi bi-images" },

//   {
//     title: "Communications",
//     href: "/client-communication",
//     icon: "bi bi-chat-dots",
//   },
//   { title: "Review & Rating", href: "/review-rating", icon: "bi bi-stars" },

//   { header: "OTHER" },
//   { title: "Service", href: "/service", icon: "bi bi-gear" },
//   { title: "Newsletter", href: "/newsletter", icon: "bi bi-envelope-paper" },
//   { title: "Testimonial", href: "/testimonial", icon: "bi bi-chat-quote" },
//   { title: "Contact Leads", href: "/contact", icon: "bi bi-person-lines-fill" },
//   { title: "Messages", href: "/message", icon: "bi bi-chat-left-dots" },

//   { header: "SETTINGS" },
//   {
//     title: "General Settings",
//     href: "/settings",
//     icon: "bi bi-wrench-adjustable",
//   },
//   { title: "Languages", href: "/languages", icon: "bi bi-translate" },
//   { title: "Email Config", href: "/email-settings", icon: "bi bi-envelope-at" },
//   { title: "FAQ", href: "/faq", icon: "bi bi-question-circle" },
//   {
//     title: "Page Settings",
//     href: "/pages-list", // Title par click karne par yahan jayega
//     icon: "bi bi-file-earmark-code",
//     children: [
//       {
//         title: "About Us",
//         icon: "bi bi-info-circle",
//         children: [
//           { title: "Our Firm", href: "/our-firm", icon: "bi bi-building" },
//           { title: "Award", href: "/award", icon: "bi bi-trophy" },
//           { title: "Promoter", href: "/promoter", icon: "bi bi-person-badge" },
//         ],
//       },
//       {
//         title: "Capabilities",
//         icon: "bi bi-layers",
//         children: [
//           {
//             title: "Capabilities Category",
//             href: "/capabilities-category",
//             icon: "bi bi-list-check",
//           },
//           {
//             title: "Capabilities Subcategory",
//             href: "/capabilities-subcategory",
//             icon: "bi bi-list-nested",
//           },
//         ],
//       },
//       { title: "News", href: "/news", icon: "bi bi-newspaper" },
//       { title: "Event", href: "/event", icon: "bi bi-calendar-event" },
//       { title: "Career", href: "/career", icon: "bi bi-briefcase" },
//       {
//         title: "Term & Condition",
//         href: "/terms-condition",
//         icon: "bi bi-file-lock2",
//       },
//       {
//         title: "Privacy Policy",
//         href: "/privacy-policy",
//         icon: "bi bi-shield-check",
//       },
//       {
//         title: "Location",
//         href: "/location-management",
//         icon: "bi bi-window-sidebar",
//       },
//       { title: "Location cms", href: "/cms", icon: "bi bi-window-sidebar" },
//     ],
//   },

//   { title: "Log Report", href: "/login", icon: "bi bi-journal-code" },
// ];

// export default function Sidebar({ showMobilemenu }) {
//   const pathname = usePathname();
//   const [collapseState, setCollapseState] = useState({});

//   const toggleCollapse = (e, index) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setCollapseState((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   const handleLinkClick = () => {
//     if (typeof window !== "undefined" && window.innerWidth < 992) {
//       showMobilemenu();
//     }
//   };

//   const renderMenuItems = (items, isChild = false, parentIndex = "") => {
//     if (!Array.isArray(items)) return null;

//     return items.map((item, index) => {
//       const currentIndex = `${parentIndex}-${index}`;
//       const isActive = pathname === item.href;

//       if (item.header) {
//         return (
//           <div
//             key={currentIndex}
//             className="text-uppercase text-muted fw-bold mt-4 mb-2 px-3"
//             style={{ fontSize: "0.65rem", letterSpacing: "1.2px" }}>
//             {item.header}
//           </div>
//         );
//       }

//       if (item.children) {
//         const isOpen = collapseState[currentIndex];
//         return (
//           <NavItem key={currentIndex} className="mb-1">
//             <div className="d-flex align-items-center justify-content-between rounded position-relative">
//               {/* Left Side: Clickable Link */}
//               <Link
//                 href={item.href || "#"}
//                 onClick={
//                   item.href
//                     ? handleLinkClick
//                     : (e) => toggleCollapse(e, currentIndex)
//                 }
//                 className={`d-flex align-items-center px-3 py-2 text-decoration-none flex-grow-1 ${isActive ? "active-link" : "text-dark"}`}
//                 style={{
//                   fontSize: isChild ? "0.85rem" : "0.92rem",
//                   fontWeight: "500",
//                 }}>
//                 <i
//                   className={`${item.icon} me-3`}
//                   style={{ color: isActive ? "#fff" : COLOR }}></i>
//                 <span>{item.title}</span>
//               </Link>

//               {/* Right Side: Clickable Arrow Toggle */}
//               <div
//                 onClick={(e) => toggleCollapse(e, currentIndex)}
//                 className="px-3 py-2 cursor-pointer dropdown-arrow"
//                 style={{ cursor: "pointer" }}>
//                 <i
//                   className={`bi bi-chevron-${isOpen ? "up" : "down"} small text-muted`}></i>
//               </div>
//             </div>

//             <Collapse isOpen={isOpen}>
//               <Nav vertical className="ms-3 mt-1">
//                 {renderMenuItems(item.children, true, currentIndex)}
//               </Nav>
//             </Collapse>
//           </NavItem>
//         );
//       }

//       return (
//         <NavItem key={currentIndex} className="mb-1">
//           <Link
//             href={item.href || "#"}
//             onClick={handleLinkClick}
//             className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none sidebar-link ${isActive ? "active-link" : ""}`}
//             style={{
//               backgroundColor: isActive ? COLOR : "transparent",
//               color: isActive ? "#fff" : isChild ? "#666" : "#555",
//               fontWeight: isActive ? "600" : "500",
//               fontSize: isChild ? "0.85rem" : "0.92rem",
//             }}>
//             <i
//               className={`${item.icon} me-3`}
//               style={{
//                 fontSize: "1.1rem",
//                 color: isActive ? "#fff" : COLOR,
//               }}></i>
//             {item.title}
//           </Link>
//         </NavItem>
//       );
//     });
//   };

//   return (
//     <div className="bg-white h-100 d-flex flex-column border-end shadow-sm sidebar-wrapper">
//       <div className="d-flex align-items-center justify-content-between p-4 bg-white sticky-top shadow-sm-bottom">
//         <Link href="/" className="text-decoration-none">
//           <span
//             style={{ color: "#333", fontWeight: "800", fontSize: "1.4rem" }}>
//             Lawfirm
//           </span>
//         </Link>
//         <Button
//           close
//           size="sm"
//           className="d-lg-none"
//           onClick={showMobilemenu}></Button>
//       </div>

//       <div className="flex-grow-1 overflow-auto px-3 pt-2 custom-scrollbar">
//         <Nav vertical pills>
//           {renderMenuItems(navigation)}
//         </Nav>
//         <div style={{ height: "40px" }}></div>
//       </div>

//       <style jsx global>{`
//         .sidebar-link:hover {
//           background-color: #fdf8ef !important;
//           color: ${COLOR} !important;
//         }
//         .active-link {
//           background-color: ${COLOR} !important;
//           color: white !important;
//           box-shadow: 0 4px 10px rgba(238, 187, 93, 0.3);
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #e0e0e0;
//           border-radius: 10px;
//         }
//         .dropdown-arrow:hover {
//           background-color: #f0f0f0;
//           border-radius: 4px;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, Collapse, Button } from "reactstrap";

const COLOR = "#EEBB5D";

const navigation = [
  { title: "Dashboard", href: "/", icon: "bi bi-speedometer2" },
  { header: "USER MANAGEMENT" },
  { title: "Clients", href: "/clients", icon: "bi bi-people" },
  { title: "Attorney", href: "/attorney", icon: "bi bi-person-workspace" },
  { title: "Users", href: "/users", icon: "bi bi-person-circle" },
  { title: "Roles", href: "/roles", icon: "bi bi-ui-checks" },
  {
    title: "Role Permission",
    href: "/role-permission",
    icon: "bi bi-shield-lock",
  },
  { header: "CASE MANAGEMENT" },
  { title: "Our Cases", href: "/our-cases", icon: "bi bi-briefcase" },
  { title: "Case Category", href: "/case-category", icon: "bi bi-grid" },
  { title: "Case Type", href: "/case-type", icon: "bi bi-tags" },
  { title: "CMS Category", href: "/cms-category", icon: "bi bi-clock-history" },
  {
    title: "CMS SubCategory",
    href: "/cms-subcategory",
    icon: "bi bi-clock-history",
  },
  {
    title: "Case Documents",
    href: "/case-documents",
    icon: "bi bi-file-earmark-text",
  },
  {
    title: "Case Activity Logs",
    href: "/case-activity-logs",
    icon: "bi bi-clock-history",
  },
  { title: "Daily Hearing", href: "/daily-hearing", icon: "bi bi-hammer" },
  { title: "Courtroom Mapping", href: "/courtroom-mapping", icon: "bi bi-map" },
  { title: "Case Load", href: "/case-load", icon: "bi bi-bar-chart-steps" },
  { title: "Case Study", href: "/case-study", icon: "bi bi-journal-text" },
  { header: "TASK & SCHEDULE" },
  { title: "Assign Task", href: "/assign-task", icon: "bi bi-list-task" },
  { title: "Task Calendar", href: "/task-calendar", icon: "bi bi-calendar3" },
  { title: "Timesheet", href: "/timesheet", icon: "bi bi-stopwatch" },
  {
    title: "Lawyer Availability",
    href: "/lawyer-availability",
    icon: "bi bi-calendar-check",
  },
  { header: "FINANCE & PAYMENT" },
  { title: "Case Bill", href: "/case-bill", icon: "bi bi-receipt" },
  { title: "Expenses", href: "/expenses", icon: "bi bi-cash-coin" },
  {
    title: "Transactions",
    href: "/transactions",
    icon: "bi bi-currency-exchange",
  },
  { title: "Platform Fees", href: "/platform-fees", icon: "bi bi-wallet2" },
  {
    title: "Payment Report",
    href: "/payment-report",
    icon: "bi bi-file-earmark-bar-graph",
  },
  { header: "CONTENT & CMS" },
  { title: "Media", href: "/media", icon: "bi bi-images" },
  {
    title: "Communications",
    href: "/client-communication",
    icon: "bi bi-chat-dots",
  },
  { title: "Review & Rating", href: "/review-rating", icon: "bi bi-stars" },
  { header: "OTHER" },
  { title: "Service", href: "/service", icon: "bi bi-gear" },
  { title: "Newsletter", href: "/newsletter", icon: "bi bi-envelope-paper" },
  { title: "Testimonial", href: "/testimonial", icon: "bi bi-chat-quote" },
  { title: "Contact Leads", href: "/contact", icon: "bi bi-person-lines-fill" },
  { title: "Messages", href: "/message", icon: "bi bi-chat-left-dots" },
  { header: "SETTINGS" },
  {
    title: "General Settings",
    href: "/settings",
    icon: "bi bi-wrench-adjustable",
  },
  { title: "Languages", href: "/languages", icon: "bi bi-translate" },
  { title: "Email Config", href: "/email-settings", icon: "bi bi-envelope-at" },
  { title: "FAQ", href: "/faq", icon: "bi bi-question-circle" },
  {
    title: "Page Settings",
    href: "/pages-list",
    icon: "bi bi-file-earmark-code",
    children: [
      {
        title: "About Us",
        icon: "bi bi-info-circle",
        children: [
          { title: "Our Firm", href: "/our-firm", icon: "bi bi-building" },
          { title: "Award", href: "/award", icon: "bi bi-trophy" },
          { title: "Promoter", href: "/promoter", icon: "bi bi-person-badge" },
        ],
      },
      {
        title: "Capabilities",
        icon: "bi bi-layers",
        children: [
          {
            title: "Capabilities Category",
            href: "/capabilities-category",
            icon: "bi bi-list-check",
          },
          {
            title: "Capabilities Subcategory",
            href: "/capabilities-subcategory",
            icon: "bi bi-list-nested",
          },
        ],
      },
      { title: "News", href: "/news", icon: "bi bi-newspaper" },
      { title: "Event", href: "/event", icon: "bi bi-calendar-event" },
      { title: "Career", href: "/career", icon: "bi bi-briefcase" },
      {
        title: "Term & Condition",
        href: "/terms-condition",
        icon: "bi bi-file-lock2",
      },
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
        icon: "bi bi-shield-check",
      },
      {
        title: "Location",
        href: "/location-management",
        icon: "bi bi-window-sidebar",
      },
      { title: "Location cms", href: "/cms", icon: "bi bi-window-sidebar" },
    ],
  },
  { title: "Log Report", href: "/login", icon: "bi bi-journal-code" },
];

export default function Sidebar({ showMobilemenu }) {
  const pathname = usePathname();
  const [collapseState, setCollapseState] = useState({});

  const toggleCollapse = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapseState((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLinkClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 992) {
      showMobilemenu();
    }
  };

  const renderMenuItems = (items, isChild = false, parentIndex = "") => {
    if (!Array.isArray(items)) return null;

    return items.map((item, index) => {
      const currentIndex = `${parentIndex}-${index}`;
      const isActive = pathname === item.href;

      if (item.header) {
        return (
          <div
            key={currentIndex}
            className="text-uppercase text-muted fw-bold mt-4 mb-2 px-3"
            style={{ fontSize: "0.65rem", letterSpacing: "1.2px" }}>
            {item.header}
          </div>
        );
      }

      if (item.children) {
        const isOpen = collapseState[currentIndex];
        return (
          <NavItem key={currentIndex} className="mb-1">
            <div className="d-flex align-items-center justify-content-between rounded position-relative">
              <Link
                href={item.href || "#"}
                onClick={
                  item.href
                    ? handleLinkClick
                    : (e) => toggleCollapse(e, currentIndex)
                }
                className={`d-flex align-items-center px-3 py-2 text-decoration-none flex-grow-1 ${isActive ? "active-link" : "text-dark"}`}
                style={{
                  fontSize: isChild ? "0.85rem" : "0.92rem",
                  fontWeight: "500",
                }}>
                <i
                  className={`${item.icon} me-3`}
                  style={{ color: isActive ? "#fff" : COLOR }}></i>
                <span>{item.title}</span>
              </Link>
              <div
                onClick={(e) => toggleCollapse(e, currentIndex)}
                className="px-3 py-2 cursor-pointer dropdown-arrow"
                style={{ cursor: "pointer" }}>
                <i
                  className={`bi bi-chevron-${isOpen ? "up" : "down"} small text-muted`}></i>
              </div>
            </div>
            <Collapse isOpen={isOpen}>
              <Nav vertical className="ms-3 mt-1">
                {renderMenuItems(item.children, true, currentIndex)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }

      return (
        <NavItem key={currentIndex} className="mb-1">
          <Link
            href={item.href || "#"}
            onClick={handleLinkClick}
            className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none sidebar-link ${isActive ? "active-link" : ""}`}
            style={{
              backgroundColor: isActive ? COLOR : "transparent",
              color: isActive ? "#fff" : isChild ? "#666" : "#555",
              fontWeight: isActive ? "600" : "500",
              fontSize: isChild ? "0.85rem" : "0.92rem",
            }}>
            <i
              className={`${item.icon} me-3`}
              style={{
                fontSize: "1.1rem",
                color: isActive ? "#fff" : COLOR,
              }}></i>
            {item.title}
          </Link>
        </NavItem>
      );
    });
  };

  return (
    <div className="bg-white h-100 d-flex flex-column border-end shadow-sm">
      <div className="d-flex align-items-center justify-content-between p-4 bg-white sticky-top border-bottom">
        <Link href="/" className="text-decoration-none">
          <span
            style={{ color: "#333", fontWeight: "800", fontSize: "1.4rem" }}>
            Lawfirm
          </span>
        </Link>
        <Button
          close
          size="sm"
          className="d-lg-none"
          onClick={showMobilemenu}></Button>
      </div>

      <div className="flex-grow-1 overflow-auto px-3 pt-2 custom-scrollbar">
        <Nav vertical pills>
          {renderMenuItems(navigation)}
        </Nav>
        <div style={{ height: "40px" }}></div>
      </div>

      <style jsx global>{`
        .sidebar-link:hover {
          background-color: #fdf8ef !important;
          color: ${COLOR} !important;
        }
        .active-link {
          background-color: ${COLOR} !important;
          color: white !important;
          box-shadow: 0 4px 10px rgba(238, 187, 93, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }
        .dropdown-arrow:hover {
          background-color: #f0f0f0;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}