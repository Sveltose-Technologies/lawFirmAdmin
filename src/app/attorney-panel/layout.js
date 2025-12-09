'use client';
import React from "react";
import { Container } from "reactstrap";
// Correct Paths
import AttorneySidebar from '@/app/layouts/sidebars/vertical/AttorneySidebar';
import Header from '@/app/layouts/header/Header'; 

export default function AttorneyLayout({ children }) {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => setOpen(!open);

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        
        {/* --- SIDEBAR SECTION --- */}
        <aside className={`sidebarArea shadow bg-white ${open ? "showSidebar" : ""}`}>
          <AttorneySidebar showMobilemenu={() => showMobilemenu()} />
        </aside>

        {/* --- CONTENT AREA --- */}
        <div className="contentArea">
          {/* Header */}
          <Header showMobmenu={() => showMobilemenu()} />

          {/* Main Page Content */}
          {/* CHANGE: 'p-4Wrapper' hata diya aur 'p-0' laga diya taaki gap khatam ho jaye */}
          <Container className="p-0" fluid>
            <div>{children}</div>
          </Container>
        </div>

      </div>
    </main>
  );
}