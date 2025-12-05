"use client";
import React from "react";
import "@/styles/style.scss"; // Styles
import { GlobalProvider } from "@/context/GlobalContext"; 

// --- IMPORTS CHECK KAREIN ---
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
// ✅ Sahi Import (Bina brackets ke)
import Header from './layouts/header/Header';




export default function RootLayout({ children }) {
  const [showMobilemenu, setShowMobilemenu] = React.useState(false);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <GlobalProvider>
          <div className="d-flex">
            
            {/* Sidebar */}
            <aside
              className={`sidebarArea shadow bg-white ${
                showMobilemenu ? "showSidebar" : ""
              }`}
              style={{ 
                  width: "250px",
                  flexShrink: 0,
                  height: "100vh",
                  position: "sticky",
                  top: 0,
                  zIndex: 10
              }}
            >
              <Sidebar showMobilemenu={() => setShowMobilemenu(!showMobilemenu)} />
            </aside>

            {/* Content Area */}
            <div className="contentArea" style={{ flexGrow: 1, minWidth: 0 }}>
              
              <Header showMobmenu={() => setShowMobilemenu(!showMobilemenu)} />

              <div className="p-4 wrapper container-fluid">
                <div>{children}</div>
              </div>
            
            </div>
          </div>
        </GlobalProvider> 
      </body>
    </html>
  );
}