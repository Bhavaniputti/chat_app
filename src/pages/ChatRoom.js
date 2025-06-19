import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import './Form.css'; // ✅ Make sure this holds styles

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (text.trim()) {
      await addDoc(collection(db, 'messages'), {
        text,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      setText('');
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: '2-digit',
      month: 'short',
    });
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  return (
    <div className="layout">
  {/* Navbar */}
  <div className="navbar">
    <div className="logo">Firebase Chat</div>
    <div className="nav-links">
      <button
        className="btn"
        onClick={async () => {
          await signOut(auth);
          navigate('/');
        }}
      >
        Sign Out
      </button>
    </div>
  </div>

      {/* Welcome */}
      <div className="chat-header">
        <h3>Welcome, {user.email}</h3>
        {typing && <p className="typing">Someone is typing...</p>}
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.email === user.email ? 'own-msg' : 'other-msg'}`}
          >
            <div className="message-meta">
              <span className="msg-sender">{msg.email}</span>
              <span className="msg-time">{formatTime(msg.createdAt)}</span>
            </div>
            <div className="msg-text">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="message-input">
        <input
          type="text"
          placeholder="Say something..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTyping(e.target.value.length > 0);
          }}
          onBlur={() => setTyping(false)}
        />
        <button className="emoji-btn" onClick={() => setShowEmoji(!showEmoji)}>😊</button>
        <button className="btn" onClick={handleSend}>Send</button>
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        Chat securely. Built with Firebase ❤️
      </div>
    </div>
  );
}

export default ChatRoom;
