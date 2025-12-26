'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Input,
  Button,
  Row,
  Col,
  Container
} from "reactstrap";
// Ensure this path is correct based on your project structure
import SidebarUser from "@/app/layouts/sidebars/vertical/SidebarUser";

const Message = () => {
  const goldColor = "#eebb5d";

  // --- 1. DUMMY USERS ---
  const [users] = useState([
    { id: 1, name: "Admin Support", role: "", img: "/images/users/user1.jpg", time: "", lastMsg: "" },
    { id: 2, name: "Pepe Gonzale", role: "Attorney", img: "/images/users/user2.jpg", time: "a month ago", lastMsg: "hello" },
    { id: 3, name: "Tasnia Sharin", role: "Attorney", img: "/images/users/user3.jpg", time: "a month ago", lastMsg: "." },
    { id: 4, name: "Test Attorney", role: "Attorney", img: "/images/users/user4.jpg", time: "3 months ago", lastMsg: "hi" },
    { id: 5, name: "Nusrat Imran", role: "Attorney", img: "/images/users/user5.jpg", time: "4 months ago", lastMsg: "vbnvb" },
    { id: 6, name: "Tanvir Ahamed", role: "Attorney", img: "/images/users/user1.jpg", time: "8 months ago", lastMsg: "dfdfd" },
  ]);

  // --- 2. CHAT HISTORY ---
  const [chats, setChats] = useState({
    2: [
        { text: "hello", sender: "other", time: "a month ago" },
        { text: "Hi, how can I help you?", sender: "me", time: "Just now" }
    ],
    3: [
        { text: ".", sender: "other", time: "a month ago" }
    ],
    4: [
        { text: "hi", sender: "other", time: "3 months ago" }
    ],
    5: [
        { text: "vbnvb", sender: "other", time: "4 months ago" }
    ]
  });

  // --- 3. STATE VARIABLES ---
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const activeUser = users.find(u => u.id === selectedUserId);
  const currentMessages = chats[selectedUserId] || [];

  // --- 4. AUTO SCROLL ---
  useEffect(() => {
    if(messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages, selectedUserId]);

  // --- 5. SEND MESSAGE ---
  const handleSendMessage = () => {
    if (inputText.trim() === "" || !selectedUserId) return;

    const newMessage = {
      text: inputText,
      sender: "me",
      time: "Just now"
    };

    setChats(prevChats => ({
      ...prevChats,
      [selectedUserId]: [...(prevChats[selectedUserId] || []), newMessage]
    }));

    setInputText("");
  };

  // --- 6. HANDLE BACK BUTTON (MOBILE) ---
  const handleBackToInbox = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="bg-light min-vh-100 p-2 p-md-4 font-sans">
      
      {/* --- Global Styles --- */}
      <style>{`
        /* Spinning Animation */
        @keyframes slowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinning-icon {
          animation: slowSpin 8s linear infinite;
        }

        .user-card:hover {
            background-color: #f8f9fa;
        }

        .custom-scroll::-webkit-scrollbar {
            width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 4px;
        }

        /* Message Bubble Responsiveness */
        .msg-bubble {
            max-width: 75%;
        }
        @media (max-width: 576px) {
            .msg-bubble {
                max-width: 85%;
            }
        }
      `}</style>

      <Container fluid>
        <Row>
            {/* Sidebar Navigation - Stacks on mobile */}
            <Col lg="3" md="4" className="mb-3 mb-md-0">
                <SidebarUser />
            </Col>

            {/* Main Chat Area */}
            <Col lg="9" md="8">
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden" style={{ height: '80vh', minHeight: '500px' }}>
                    <Row className="g-0 h-100">
                        
                        {/* --- LEFT: INBOX LIST --- 
                            Logic: Mobile pe agar user select hai to ye hide hoga (d-none), 
                            Desktop pe hamesha dikhega (d-md-flex).
                        */}
                        <Col 
                            md={4} 
                            className={`border-end h-100 flex-column bg-white 
                                ${selectedUserId ? 'd-none d-md-flex' : 'd-flex'}`}
                        >
                            <div className="p-3 border-bottom">
                                <h5 className="fw-bold mb-3">Inbox</h5>
                                <Input 
                                    placeholder="Search chats..." 
                                    className="rounded-1 bg-light border-0"
                                    style={{ fontSize: '0.9rem' }}
                                />
                            </div>
                            
                            <div className="flex-grow-1 overflow-y-auto custom-scroll">
                                {users.map((user) => (
                                    <div 
                                        key={user.id}
                                        onClick={() => setSelectedUserId(user.id)}
                                        className="d-flex align-items-center p-3 cursor-pointer border-bottom user-card position-relative"
                                        style={{ 
                                            backgroundColor: selectedUserId === user.id ? '#fff' : 'transparent', 
                                        }}
                                    >
                                        {selectedUserId === user.id && (
                                            <div className="position-absolute start-0 top-0 bottom-0" style={{width:'4px', backgroundColor: goldColor}}></div>
                                        )}

                                        <img 
                                            src={user.img} 
                                            alt={user.name} 
                                            className="rounded-circle me-3 border flex-shrink-0" 
                                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                        />
                                        <div className="flex-grow-1 overflow-hidden">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h6 className="mb-0 fw-bold text-dark text-truncate" style={{fontSize: '0.9rem', maxWidth: '100px'}}>{user.name}</h6>
                                                <small className="text-muted text-nowrap" style={{fontSize: '10px'}}>{user.time}</small>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <small className="text-muted" style={{fontSize: '11px', color: goldColor}}>{user.role}</small>
                                                <small className="text-muted text-truncate" style={{maxWidth: '150px', fontSize: '12px'}}>{user.lastMsg}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        {/* --- RIGHT: CHAT SCREEN --- 
                            Logic: Mobile pe agar user select nahi hai to ye hide hoga (d-none), 
                            otherwise full width lega. Desktop pe hamesha dikhega.
                        */}
                        <Col 
                            md={8} 
                            className={`h-100 flex-column bg-white position-relative 
                                ${!selectedUserId ? 'd-none d-md-flex' : 'd-flex'}`}
                        >
                            
                            {selectedUserId ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-3 border-bottom d-flex align-items-center bg-white shadow-sm" style={{zIndex: 10}}>
                                        {/* Back Button (Visible only on Mobile) */}
                                        <Button 
                                            color="link" 
                                            className="d-md-none text-dark p-0 me-3" 
                                            onClick={handleBackToInbox}
                                        >
                                            <i className="bi bi-arrow-left fs-4"></i>
                                        </Button>

                                        <img 
                                            src={activeUser?.img} 
                                            alt={activeUser?.name} 
                                            className="rounded-circle me-3 flex-shrink-0" 
                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                        />
                                        <div className="overflow-hidden">
                                            <h6 className="mb-0 fw-bold text-truncate">{activeUser?.name}</h6>
                                            <small className="text-success d-flex align-items-center" style={{fontSize: '11px'}}>
                                                <span className="d-inline-block rounded-circle bg-success me-1" style={{width: '8px', height: '8px'}}></span>
                                                Active Now
                                            </small>
                                        </div>
                                    </div>

                                    {/* Messages Area */}
                                    <div className="flex-grow-1 p-3 p-md-4 overflow-y-auto custom-scroll" style={{ backgroundColor: '#fdfdfd' }}>
                                        {currentMessages.length > 0 ? (
                                            currentMessages.map((msg, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`d-flex flex-column mb-3 ${msg.sender === 'me' ? 'align-items-end' : 'align-items-start'}`}
                                                >
                                                    <div 
                                                        className={`p-3 shadow-sm msg-bubble`}
                                                        style={{ 
                                                            wordWrap: 'break-word',
                                                            backgroundColor: msg.sender === 'me' ? goldColor : '#f1f1f1', 
                                                            color: msg.sender === 'me' ? '#fff' : '#333',
                                                            borderRadius: msg.sender === 'me' ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                    <small className="text-muted mt-1" style={{fontSize: '10px'}}>{msg.time}</small>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center mt-5 text-muted">
                                                <small>Start a new conversation with {activeUser?.name}</small>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-3 border-top bg-white">
                                        <div className="input-group">
                                            <Input 
                                                type="text" 
                                                placeholder="Type message..." 
                                                className="form-control border-end-0 bg-light"
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                                style={{ borderRadius: '20px 0 0 20px', border: '1px solid #dee2e6' }}
                                            />
                                            <span className="input-group-text bg-light border-start-0 text-muted cursor-pointer d-none d-sm-flex" style={{ borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
                                                <i className="bi bi-paperclip"></i>
                                            </span>
                                            <Button 
                                                style={{ backgroundColor: goldColor, border: 'none', borderRadius: '0 20px 20px 0' }}
                                                onClick={handleSendMessage}
                                                className="px-3 px-md-4"
                                            >
                                                <i className="bi bi-send-fill text-white"></i>
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // --- EMPTY STATE (Desktop only view usually) ---
                                <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-3">
                                    <div className="position-relative mb-4">
                                        <div className="spinning-icon" style={{
                                            width: '60px', height: '60px', 
                                            border: `4px solid ${goldColor}`, 
                                            borderTop: '4px solid transparent', 
                                            borderRadius: '50%'
                                        }}></div>
                                        <i className="bi bi-chat-dots-fill position-absolute top-50 start-50 translate-middle fs-3" style={{color: goldColor}}></i>
                                    </div>
                                    <h5 className="text-dark fw-bold">Select a chat to view messages</h5>
                                </div>
                            )}

                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Message;