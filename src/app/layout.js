// "use client";
// import React from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';

// import "bootstrap-icons/font/bootstrap-icons.css"; 

// import { GlobalProvider } from "@/context/GlobalContext"; 
// import Sidebar from "./layouts/sidebars/vertical/Sidebar";
// import Header from './layouts/header/Header';

// export default function RootLayout({ children }) {
//   // ... baaki code waisa hi rahega
//   const [showMobilemenu, setShowMobilemenu] = React.useState(false);

//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <body>
//         <GlobalProvider>
//           <div className="d-flex">
            
//             {/* Sidebar */}
//             <aside
//               className={`sidebarArea shadow bg-white ${
//                 showMobilemenu ? "showSidebar" : ""
//               }`}
//               style={{ 
//                   width: "250px",
//                   flexShrink: 0,
//                   height: "100vh",
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 10
//               }}
//             >
//               <Sidebar showMobilemenu={() => setShowMobilemenu(!showMobilemenu)} />
//             </aside>

//             {/* Content Area */}
//             <div className="contentArea" style={{ flexGrow: 1, minWidth: 0 }}>
              
//               <Header showMobmenu={() => setShowMobilemenu(!showMobilemenu)} />

//               <div className="p-4 wrapper container-fluid">
//                 <div>{children}</div>
//               </div>
            
//             </div>
//           </div>
//         </GlobalProvider> 
//       </body>
//     </html>
//   );
// }



"use client";
import React from "react";
import { usePathname } from "next/navigation"; // 1. Ye Import zaroori hai

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"; 

import { GlobalProvider } from "@/context/GlobalContext"; 
import Sidebar from "./layouts/sidebars/vertical/Sidebar";
import Header from './layouts/header/Header';

export default function RootLayout({ children }) {
  const [showMobilemenu, setShowMobilemenu] = React.useState(false);
  
  // 2. Current Path pata karein
  const pathname = usePathname();

  // 3. Check karein ki kya ye Attorney Panel ya User Panel hai?
  // Agar haan, to Admin ka sidebar hide karna hai
  const isCustomPanel = pathname.startsWith("/attorney-panel") || pathname.startsWith("/user-panel");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <GlobalProvider>
          
          {/* 4. CONDITIONAL RENDERING */}
          {isCustomPanel ? (
            // SCENARIO A: Agar Attorney Panel hai, to bas content dikhao (Sidebar wahan ka layout khud sambhalega)
            <div className="custom-panel-wrapper">
                {children}
            </div>
          ) : (
            // SCENARIO B: Agar Admin Panel hai, to Admin Sidebar aur Header dikhao
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
          )}

        </GlobalProvider> 
      </body>
    </html>
  );
}