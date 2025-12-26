// 'use client'
// import { Col, Row } from "reactstrap";

// // --- FIX 1: IMPORT PATHS ---
// import ProfitChart from "@/app/HeroSection/ProfitChart"; 
// import SalesChart from "@/app/(admin-panel)/components/dashboard/SalesChart";
// import ProjectTables from "@/app/(admin-panel)/components/dashboard/ProjectTable";
// import TopCards from "@/app/(admin-panel)/components/dashboard/TopCards";

// // --- Stats Data ---
// const statsData = [
//   { title: "Total Attorney", count: "6", icon: "bi bi-people-fill" },
//   { title: "Total Clients", count: "51", icon: "bi bi-people" },
//   { title: "Total Cases", count: "9", icon: "bi bi-briefcase-fill" },
//   { title: "Ongoing Cases", count: "1", icon: "bi bi-journal-text" },
//   { title: "Success Cases", count: "2", icon: "bi bi-check-circle-fill" },
//   { title: "Wallet", count: "$11133", icon: "bi bi-wallet-fill" },
// ];

// export default function Home() {
//   return (
//     <div>

//       {/* Rounded Card Style */}
//       <style>{`
//         .card {
//           border-radius: 20px !important;
//           border: none !important;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
//           overflow: hidden;
//         }
//       `}</style>

//       <div>

//         {/* --- SECTION 1: PROFIT CHART --- */}
//         <Row>
//           <Col sm="12">
//             <ProfitChart />
//           </Col>
//         </Row>

//         {/* --- SECTION 2: TOP CARDS --- */}
//         <Row>
//           {statsData.map((item, index) => (
//             <Col sm="6" lg="4" key={index} className="mb-4">
//               <TopCards
//                 bg="bg-light-warning text-warning"
//                 title=""
//                 subtitle={item.title}
//                 earning={item.count}
//                 icon={item.icon}
//               />
//             </Col>
//           ))}
//         </Row>

//         {/* --- SECTION 3: SALES CHART --- */}
//         <SalesChart />

//         {/* --- SECTION 4: TABLE --- */}
//         <Row>
//           <Col lg="12" sm="12">
//             <ProjectTables />
//           </Col>
//         </Row>

//       </div>
//     </div>
//   );
// }


'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Col, Row } from "reactstrap";
import ProfitChart from "@/app/HeroSection/ProfitChart"; 
import SalesChart from "@/app/(admin-panel)/components/dashboard/SalesChart";
import ProjectTables from "@/app/(admin-panel)/components/dashboard/ProjectTable";
import TopCards from "@/app/(admin-panel)/components/dashboard/TopCards";

export default function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // जब तक चेक न हो जाए, कुछ रेंडर न करें
  if (!authorized) return null;

  return (
    <div>
      <style>{`
        .card { border-radius: 20px !important; border: none !important; box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important; }
        .sidebarArea { z-index: 1000 !important; }
      `}</style>

      <Row><Col sm="12"><ProfitChart /></Col></Row>
      <Row className="mt-4">
        {/* आपके स्टैड्स कार्ड्स यहाँ आएंगे */}
      </Row>
      <Row className="mb-4"><Col sm="12"><SalesChart /></Col></Row>
      <Row><Col lg="12"><ProjectTables /></Col></Row>
    </div>
  );
}