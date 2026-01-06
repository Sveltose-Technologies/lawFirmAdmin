

// "use client";
// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { ToastContainer } from "react-toastify"; // Toastify जोड़ें

// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css"; 
// import "react-toastify/dist/ReactToastify.css"; // Toast CSS

// import { GlobalProvider } from "@/context/GlobalContext"; 
// import Sidebar from "./layouts/sidebars/vertical/Sidebar";
// import Header from './layouts/header/Header';

// export default function RootLayout({ children }) {
//   const [showMobilemenu, setShowMobilemenu] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = () => {
//       const logged = localStorage.getItem("isLoggedIn") === "true";
//       setIsLoggedIn(logged);

//       if (!logged && pathname !== "/login") {
//         router.push("/login");
//       }
      
//       if (logged && pathname === "/login") {
//         router.push("/");
//       }
//       setLoading(false);
//     };

//     checkAuth();
//   }, [pathname, router]);

//   const isLoginPage = pathname === "/login";
//   const isCustomPanel = pathname.startsWith("/attorney-panel") || pathname.startsWith("/user-panel");

//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <body>
//         <GlobalProvider>
//           {loading ? (
//             <div style={{ height: "100vh", backgroundColor: "#fff" }}></div>
//           ) : (
//             <>
//               {/* 
//                 लॉजिक: अगर लॉगिन पेज है, या कस्टम पैनल है, या यूजर लॉगिन नहीं है 
//                 तो साइडबार और हेडर बिलकुल मत दिखाओ
//               */}
//               {(isLoginPage || isCustomPanel || !isLoggedIn) ? (
//                 <div className="content-wrapper">
//                   {children}
//                 </div>
//               ) : (
//                 /* एडमिन डैशबोर्ड तभी दिखेगा जब यूजर लॉगिन होगा और /login पर नहीं होगा */
//                 <div className="d-flex">
//                   <aside
//                     className={`sidebarArea shadow bg-white ${
//                       showMobilemenu ? "showSidebar" : ""
//                     }`}
//                     style={{ 
//                         width: "250px",
//                         flexShrink: 0,
//                         height: "100vh",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 10
//                     }}
//                   >
//                     <Sidebar showMobilemenu={() => setShowMobilemenu(!showMobilemenu)} />
//                   </aside>

//                   <div className="contentArea" style={{ flexGrow: 1, minWidth: 0 }}>
//                     <Header showMobmenu={() => setShowMobilemenu(!showMobilemenu)} />
//                     <div className="p-4 wrapper container-fluid">
//                       {children}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//           {/* ग्लोबल टोस्ट कंटेनर */}
//           <ToastContainer theme="colored" autoClose={3000} />
//         </GlobalProvider> 
//       </body>
//     </html>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "react-toastify/dist/ReactToastify.css";

import { GlobalProvider } from "@/context/GlobalContext"; 
import { AdminProvider } from '../context/AdminContext'
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import Header from './layouts/header/Header';

export default function RootLayout({ children }) {
  const [showMobilemenu, setShowMobilemenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

useEffect(() => {
   
    const loggedVal = localStorage.getItem("isLoggedIn");
    const tokenVal = localStorage.getItem("token");

    const authenticated = loggedVal === "true" && (tokenVal !== null && tokenVal !== "");

    // 2. केवल तभी स्टेट अपडेट करें जब वो वर्तमान स्टेट से अलग हो (Fix for cascading render)
    setIsLoggedIn((prev) => {
      if (prev !== authenticated) return authenticated;
      return prev;
    });

    // 3. आपका ओरिजिनल रिडायरेक्ट लॉजिक
    if (!authenticated && pathname !== "/login") {
      router.push("/login");
    } 
    else if (authenticated && pathname === "/login") {
      router.push("/");
    }

    // लोडिंग को अंत में बंद करें
    setLoading(false);
  }, [pathname, router]); // isLoggedIn को यहाँ न जोड़ें वरना लूप बन सकता है
  const isLoginPage = pathname === "/login";
  const isCustomPanel = pathname.startsWith("/attorney-panel") || pathname.startsWith("/user-panel");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <GlobalProvider>
          <AdminProvider>
            {loading ? (
              <div style={{ height: "100vh", backgroundColor: "#fff" }}></div>
            ) : (
              <>
                {(isLoginPage || isCustomPanel || !isLoggedIn) ? (
                  <div className="content-wrapper">{children}</div>
                ) : (
                  <div className="d-flex">
                    <aside
                      className={`sidebarArea shadow bg-white ${showMobilemenu ? "showSidebar" : ""}`}
                      style={{ width: "250px", flexShrink: 0, height: "100vh", position: "sticky", top: 0, zIndex: 10 }}
                    >
                      <Sidebar showMobilemenu={() => setShowMobilemenu(!showMobilemenu)} />
                    </aside>

                    <div className="contentArea" style={{ flexGrow: 1, minWidth: 0 }}>
                      <Header showMobmenu={() => setShowMobilemenu(!showMobilemenu)} />
                      <div className="p-4 wrapper container-fluid">{children}</div>
                    </div>
                  </div>
                )}
              </>
            )}
            <ToastContainer theme="colored" autoClose={3000} />
          </AdminProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
