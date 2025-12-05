'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
  // --- STATE 1: Users List ---
  const [users] = useState([
    { id: 1, name: "Robert", role: "User", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80", time: "5 days ago", lastMsg: "hi" },
    { id: 2, name: "Rifat Mia", role: "User", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80", time: "19 days ago", lastMsg: "dljgoei jr" },
    { id: 3, name: "John", role: "User", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80", time: "3 months ago", lastMsg: "WOW" },
    { id: 4, name: "Tasnia Sharin", role: "Attorney", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=50&q=80", time: "4 months ago", lastMsg: "hloooo" },
    { id: 5, name: "Adnan", role: "User", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50&q=80", time: "6 months ago", lastMsg: "hi" },
    { id: 6, name: "Bob", role: "User", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&q=80", time: "8 months ago", lastMsg: "Hello" },
  ]);

  // --- STATE 2: Chat History ---
  const [chats, setChats] = useState({
    1: [{ text: "Hello Robert here", sender: "other", time: "5 days ago" }],
    2: [{ text: "Can you help me?", sender: "other", time: "19 days ago" }],
    3: [
        { text: "Gi", sender: "other", time: "6 months ago" },
        { text: "Ok", sender: "me", time: "6 months ago" },
        { text: "hioi", sender: "other", time: "6 months ago" },
        { text: "WOW", sender: "other", time: "3 months ago" },
        { text: "Click to download file.pdf", sender: "other", time: "3 months ago", isFile: true },
        { text: "🏆", sender: "me", time: "Just now", isEmoji: true }
    ],
    4: [{ text: "I am an attorney", sender: "other", time: "4 months ago" }],
  });

  // --- STATE 3: UI Control ---
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [inputText, setInputText] = useState("");
  
  // Auto-scroll to bottom ref
  const messagesEndRef = useRef(null);

  const activeUser = users.find(u => u.id === selectedUserId);
  const currentMessages = chats[selectedUserId] || [];

  // Scroll to bottom effect
  useEffect(() => {
    if(messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages, selectedUserId]);

  // --- HANDLER: Select User ---
  const handleUserSelect = (id) => {
    if (selectedUserId !== id) {
        setSelectedUserId(id);
        const user = users.find(u => u.id === id);
        // --- INFO TOAST ---
        toast.info(`Chat with ${user.name} opened`, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored"
        });
    }
  };

  // --- FUNCTION: Send Message ---
  const handleSendMessage = () => {
    // --- RED TOAST VALIDATION ---
    if (inputText.trim() === "") {
        toast.error("Please type a message!", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored"
        });
        return;
    }
    
    if (!selectedUserId) return;

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

    // --- GREEN TOAST SUCCESS ---
    // Optional: Agar har message pe toast nahi chahiye to hata sakte hain
    // toast.success("Message sent!", {
    //     position: "bottom-center",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     theme: "colored"
    // });
  };

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      {/* --- CSS Animation for Spinning --- */}
      <style>{`
        @keyframes slowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinning-icon {
          animation: slowSpin 8s linear infinite;
          font-size: 5rem;
          color: #eebb5d;
        }
        .hover-card:hover {
            background-color: #f8f9fa;
        }
        /* Custom Scrollbar for Chat */
        .chat-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 4px;
        }
      `}</style>

      <h4 className="mb-3 fw-bold ps-2">Inbox</h4>
      
      <Card className="border-0 shadow-sm" style={{ height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
        <Row className="g-0 h-100">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <Col md={4} className="border-end h-100 d-flex flex-column bg-white">
            <div className="p-3 border-bottom">
                <Input 
                    placeholder="Search chats..." 
                    className="border-secondary-subtle rounded-3"
                    style={{ fontSize: '0.9rem' }}
                />
            </div>
            
            <div className="flex-grow-1 overflow-y-auto chat-scroll">
                {users.map((user) => (
                    <div 
                        key={user.id}
                        onClick={() => handleUserSelect(user.id)}
                        className={`d-flex align-items-center p-3 cursor-pointer border-bottom hover-card transition-all`}
                        style={{ 
                            cursor: 'pointer',
                            backgroundColor: selectedUserId === user.id ? '#fff8e1' : 'transparent', 
                            borderLeft: selectedUserId === user.id ? '4px solid #eebb5d' : '4px solid transparent'
                        }}
                    >
                        <img 
                            src={user.img} 
                            alt={user.name} 
                            className="rounded-circle me-3 border" 
                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1 overflow-hidden">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className="mb-0 fw-bold text-truncate" style={{fontSize: '0.95rem'}}>{user.name}</h6>
                                <small className="text-muted" style={{fontSize: '10px'}}>{user.time}</small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted" style={{fontSize: '11px'}}>{user.role}</small>
                                <small className="text-muted text-truncate" style={{maxWidth: '100px', fontSize: '11px'}}>{user.lastMsg}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </Col>

          {/* ================= RIGHT SIDE (CHAT AREA) ================= */}
          <Col md={8} className="h-100 d-flex flex-column bg-white position-relative">
            
            {/* CONDITIONAL RENDERING: Active Chat vs Empty State */}
            
            {selectedUserId ? (
                // --- VIEW 1: ACTIVE CHAT INTERFACE ---
                <>
                    {/* Chat Header */}
                    <div className="p-3 border-bottom d-flex align-items-center bg-white shadow-sm" style={{zIndex: 10}}>
                        <img 
                            src={activeUser?.img} 
                            alt={activeUser?.name} 
                            className="rounded-circle me-3" 
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                            <h6 className="mb-0 fw-bold">{activeUser?.name}</h6>
                            <small className="text-success d-flex align-items-center" style={{fontSize: '11px'}}>
                                <span className="d-inline-block rounded-circle bg-success me-1" style={{width: '6px', height: '6px'}}></span>
                                Active Now
                            </small>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-grow-1 p-4 overflow-y-auto chat-scroll" style={{ backgroundColor: '#fff' }}>
                        {currentMessages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`d-flex flex-column mb-3 ${msg.sender === 'me' ? 'align-items-end' : 'align-items-start'}`}
                            >
                                <div 
                                    className={`p-3 shadow-sm`}
                                    style={{ 
                                        maxWidth: '70%',
                                        backgroundColor: msg.sender === 'me' ? '#a88645' : '#f1f1f1', 
                                        color: msg.sender === 'me' ? '#fff' : '#333',
                                        borderRadius: msg.sender === 'me' ? '15px 0px 15px 15px' : '0px 15px 15px 15px',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {msg.isFile ? (
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi bi-file-earmark-arrow-down-fill fs-5"></i>
                                            <span className="text-decoration-underline" style={{cursor: 'pointer'}}>{msg.text}</span>
                                        </div>
                                    ) : (
                                        <span>{msg.text}</span>
                                    )}
                                </div>
                                <small className="text-muted mt-1" style={{fontSize: '10px'}}>{msg.time}</small>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 border-top bg-white">
                        <div className="input-group">
                            <Input 
                                type="text" 
                                placeholder="Type a message..." 
                                className="form-control border-end-0 bg-light"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                style={{ borderRadius: '20px 0 0 20px', border: '1px solid #dee2e6' }}
                            />
                            <span className="input-group-text bg-light border-start-0 text-muted cursor-pointer" style={{ borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6' }}>
                                <i className="bi bi-paperclip hover-text-gold"></i>
                            </span>
                            <Button 
                                style={{ backgroundColor: '#a88645', border: 'none', borderRadius: '0 20px 20px 0' }}
                                onClick={handleSendMessage}
                                className="px-4"
                            >
                                <i className="bi bi-send-fill"></i>
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                // --- VIEW 2: EMPTY STATE (SPINNING ICON) ---
                <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
                     {/* Combined Icons to look like Mobile + SMS */}
                    <div className="position-relative mb-4">
                        {/* Spinning Mobile Icon */}
                        <i className="bi bi-phone spinning-icon d-block"></i>
                        {/* SMS Bubble overlay */}
                        <i 
                            className="bi bi-chat-quote-fill position-absolute text-success" 
                            style={{ 
                                top: '10px', 
                                right: '-15px', 
                                fontSize: '2.5rem', 
                                transform: 'rotate(15deg)',
                                textShadow: '2px 2px 5px rgba(0,0,0,0.1)'
                            }}
                        ></i>
                        <span 
                            className="position-absolute fw-bold text-white" 
                            style={{ top: '22px', right: '-4px', fontSize: '0.8rem', transform: 'rotate(15deg)'}}
                        >SMS</span>
                    </div>
                    
                    <h5 className="text-muted">Click an inbox card to view the messages.</h5>
                    <p className="text-muted small">Select a conversation from the left sidebar to start chatting.</p>
                </div>
            )}

          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Message;