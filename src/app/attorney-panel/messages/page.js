'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
  const GOLD = "#eebb5d";
  
  // --- STATE: Search ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- STATE: Users ---
  const [users] = useState([
    { id: 1, name: "Robert", role: "User", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80", time: "5m ago", lastMsg: "Hi there!" },
    { id: 2, name: "Rifat Mia", role: "Attorney", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80", time: "1h ago", lastMsg: "Docs sent." },
    { id: 3, name: "John Doe", role: "User", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80", time: "1d ago", lastMsg: "Thanks!" },
    { id: 4, name: "Tasnia", role: "Admin", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=50&q=80", time: "2d ago", lastMsg: "Approved." },
  ]);

  // --- STATE: Chats ---
  const [chats, setChats] = useState({
    1: [{ text: "Hello!", sender: "other", time: "10:00 AM" }],
    2: [{ text: "Please check the file.", sender: "other", time: "11:00 AM" }],
  });

  // --- STATE: UI Controls ---
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Filter Users
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const activeUser = users.find(u => u.id === selectedUserId);
  const currentMessages = chats[selectedUserId] || [];

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, selectedUserId]);

  // Handlers
  const handleUserSelect = (id) => setSelectedUserId(id);

  const handleSendMessage = () => {
    if (!inputText.trim()) return toast.error("Type a message first!", { theme: "colored" });
    if (!selectedUserId) return toast.error("Select a user!", { theme: "colored" });

    const newMessage = { text: inputText, sender: "me", time: "Just now" };
    setChats(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage]
    }));
    setInputText("");
  };

  return (
    <div className="p-3 bg-light min-vh-100 d-flex flex-column">
      <ToastContainer />
      
      {/* CSS For Scrollbar & Animations */}
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 5px; }
        .chat-scroll::-webkit-scrollbar-thumb { background-color: #ccc; border-radius: 4px; }
        .hover-user:hover { background-color: #f8f9fa; }
      `}</style>

      {/* --- TITLE CARD --- */}
      <Card className="mb-4 border-0 shadow-sm w-100">
        <CardBody className="p-3">
          <h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Messages</h5>
        </CardBody>
      </Card>

      {/* --- MAIN CONTENT CARD --- */}
      {/* flex-grow-1 ensures it takes remaining height */}
      <Card className="border-0 shadow-sm w-100 flex-grow-1 overflow-hidden">
        
        {/* ROW g-0 ensures NO GAP between columns */}
        <Row className="g-0 h-100">
          
          {/* === LEFT SIDE: USER LIST === */}
          {/* md={4} means takes 4 cols on desktop, full width on mobile */}
          <Col xs={12} md={4} lg={3} className="border-end d-flex flex-column h-100 bg-white">
            
            {/* Search Box */}
            <div className="p-3 border-bottom">
              <Input 
                placeholder="Search contacts..." 
                className="rounded-pill bg-light border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Users List */}
            <div className="flex-grow-1 overflow-y-auto chat-scroll">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                  className="d-flex align-items-center p-3 border-bottom hover-user cursor-pointer transition-all"
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedUserId === user.id ? '#fff8e1' : 'transparent',
                    borderLeft: selectedUserId === user.id ? `4px solid ${GOLD}` : '4px solid transparent'
                  }}
                >
                  <img src={user.img} alt={user.name} className="rounded-circle me-3 border" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold text-truncate">{user.name}</h6>
                      <small className="text-muted" style={{fontSize: '10px'}}>{user.time}</small>
                    </div>
                    <small className="text-muted text-truncate d-block" style={{fontSize:'12px'}}>{user.lastMsg}</small>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* === RIGHT SIDE: CHAT AREA === */}
          <Col xs={12} md={8} lg={9} className="d-flex flex-column h-100 bg-white" style={{minHeight: '500px'}}>
            {selectedUserId ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-bottom d-flex align-items-center shadow-sm" style={{zIndex: 5}}>
                  <img src={activeUser?.img} alt="user" className="rounded-circle me-3" style={{width: 40, height: 40, objectFit:'cover'}} />
                  <div>
                    <h6 className="mb-0 fw-bold">{activeUser?.name}</h6>
                    <small className="text-success" style={{fontSize:'11px'}}>● Active Now</small>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-grow-1 p-4 overflow-y-auto chat-scroll" style={{backgroundColor: '#f8f9fa'}}>
                  {currentMessages.map((msg, idx) => (
                    <div key={idx} className={`d-flex mb-3 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className="p-3 shadow-sm" 
                           style={{
                             maxWidth: '75%',
                             borderRadius: msg.sender === 'me' ? '15px 0 15px 15px' : '0 15px 15px 15px',
                             backgroundColor: msg.sender === 'me' ? GOLD : '#fff',
                             color: msg.sender === 'me' ? '#fff' : '#333'
                           }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef}></div>
                </div>

                {/* Input Area */}
                <div className="p-3 border-top bg-white">
                  <div className="d-flex gap-2">
                    <Input 
                      className="rounded-pill bg-light border-0" 
                      placeholder="Type your message..." 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                        className="rounded-circle d-flex align-items-center justify-content-center" 
                        style={{backgroundColor: GOLD, border:'none', width: '40px', height: '40px'}} 
                        onClick={handleSendMessage}
                    >
                      <i className="bi bi-send-fill"></i>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                <i className="bi bi-chat-dots display-1 mb-3" style={{color: GOLD, opacity: 0.5}}></i>
                <h5>Select a user to start chatting</h5>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Message;