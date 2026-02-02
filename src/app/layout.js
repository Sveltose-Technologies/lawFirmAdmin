// "use client";
// import React, { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { ToastContainer } from "react-toastify";
// import './globals.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "react-toastify/dist/ReactToastify.css";

// import { GlobalProvider } from "@/context/GlobalContext";
// import { AdminProvider } from '../context/AdminContext'
// import Sidebar from "./layouts/sidebars/vertical/Sidebar";
// import Header from './layouts/header/Header';

// export default function RootLayout({ children }) {
//   const [showMobilemenu, setShowMobilemenu] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const pathname = usePathname();
//   const router = useRouter();

// useEffect(() => {

//     const loggedVal = localStorage.getItem("isLoggedIn");
//     const tokenVal = localStorage.getItem("token");

//     const authenticated = loggedVal === "true" && (tokenVal !== null && tokenVal !== "");

//     // 2. केवल तभी स्टेट अपडेट करें जब वो वर्तमान स्टेट से अलग हो (Fix for cascading render)
//     setIsLoggedIn((prev) => {
//       if (prev !== authenticated) return authenticated;
//       return prev;
//     });

//     // 3. आपका ओरिजिनल रिडायरेक्ट लॉजिक
//     if (!authenticated && pathname !== "/login") {
//       router.push("/login");
//     }
//     else if (authenticated && pathname === "/login") {
//       router.push("/");
//     }

//     // लोडिंग को अंत में बंद करें
//     setLoading(false);
//   }, [pathname, router]); // isLoggedIn को यहाँ न जोड़ें वरना लूप बन सकता है
//   const isLoginPage = pathname === "/login";
//   const isCustomPanel = pathname.startsWith("/attorney-panel") || pathname.startsWith("/user-panel");

//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <body>
//         <GlobalProvider>
//           <AdminProvider>
//             {loading ? (
//               <div style={{ height: "100vh", backgroundColor: "#fff" }}></div>
//             ) : (
//               <>
//                 {(isLoginPage || isCustomPanel || !isLoggedIn) ? (
//                   <div className="content-wrapper">{children}</div>
//                 ) : (
//                   <div className="d-flex">
//                     <aside
//                       className={`sidebarArea shadow bg-white ${showMobilemenu ? "showSidebar" : ""}`}
//                       style={{ width: "250px", flexShrink: 0, height: "100vh", position: "sticky", top: 0, zIndex: 10 }}
//                     >
//                       <Sidebar showMobilemenu={() => setShowMobilemenu(!showMobilemenu)} />
//                     </aside>

//                     <div className="contentArea" style={{ flexGrow: 1, minWidth: 0 }}>
//                       <Header showMobmenu={() => setShowMobilemenu(!showMobilemenu)} />
//                       <div className="p-4 wrapper container-fluid">{children}</div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//             <ToastContainer theme="colored" autoClose={3000} />
//           </AdminProvider>
//         </GlobalProvider>
//       </body>
//     </html>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import { GlobalProvider } from "@/context/GlobalContext";
import { AdminProvider } from "../context/AdminContext";
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import Header from "./layouts/header/Header";

export default function RootLayout({ children }) {
  const [showMobilemenu, setShowMobilemenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const loggedVal = localStorage.getItem("isLoggedIn");
    const tokenVal = localStorage.getItem("token");
    const authenticated =
      loggedVal === "true" && tokenVal !== null && tokenVal !== "";

    setIsLoggedIn((prev) => (prev !== authenticated ? authenticated : prev));

    if (!authenticated && pathname !== "/login") {
      router.push("/login");
    } else if (authenticated && pathname === "/login") {
      router.push("/");
    }
    setLoading(false);
  }, [pathname, router]);

  const isLoginPage = pathname === "/login";
  const isCustomPanel =
    pathname.startsWith("/attorney-panel") ||
    pathname.startsWith("/user-panel");

  const toggleMobileMenu = () => setShowMobilemenu(!showMobilemenu);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <GlobalProvider>
          <AdminProvider>
            {loading ? (
              <div style={{ height: "100vh", backgroundColor: "#fff" }}></div>
            ) : (
              <>
                {isLoginPage || isCustomPanel || !isLoggedIn ? (
                  <div className="content-wrapper">{children}</div>
                ) : (
                  <div className="d-flex min-vh-100 bg-light overflow-hidden">
                    {/* Sidebar Area */}
                    <aside
                      className={`sidebarArea shadow bg-white ${showMobilemenu ? "showSidebar" : ""}`}>
                      <Sidebar showMobilemenu={toggleMobileMenu} />
                    </aside>

                    {/* Content Area */}
                    <main className="contentArea flex-grow-1 d-flex flex-column min-vh-100 overflow-auto">
                      <Header showMobmenu={toggleMobileMenu} />
                      <div className="p-3 p-md-4 container-fluid flex-grow-1">
                        {children}
                      </div>
                    </main>

                    {/* Mobile Overlay */}
                    {showMobilemenu && (
                      <div
                        className="sidebarOverlay d-lg-none"
                        onClick={toggleMobileMenu}></div>
                    )}
                  </div>
                )}
              </>
            )}
            <ToastContainer theme="colored" autoClose={3000} />

            <style jsx global>{`
              :root {
                --sidebar-width: 260px;
              }

              .sidebarArea {
                width: var(--sidebar-width);
                min-width: var(--sidebar-width);
                height: 100vh;
                position: sticky;
                top: 0;
                z-index: 1050;
                transition: all 0.3s ease-in-out;
              }

              .sidebarOverlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.4);
                z-index: 1040;
              }

              @media (max-width: 991.98px) {
                .sidebarArea {
                  position: fixed;
                  left: calc(-1 * var(--sidebar-width));
                  width: var(--sidebar-width);
                }
                .sidebarArea.showSidebar {
                  left: 0;
                }
                .contentArea {
                  width: 100%;
                  min-width: 100%;
                }
              }
            `}</style>
          </AdminProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}