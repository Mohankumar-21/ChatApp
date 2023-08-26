import React, { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import '../styles/Chat.css';

export const Chat = (props) => {
  const { room, setSelectedRoom, setMessages, messages } = props; // Add setMessages and messages props
  const [newMessage, setNewMessage] = useState([]);
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const newmes = [];
      snapshot.forEach((doc) => {
        newmes.push({ ...doc.data(), id: doc.id });
      });
      setMessages(newmes);
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [room, setMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage('');
  };

  const handleExitRoom = () => {
    setSelectedRoom(null); // Clear the selected room
    setMessages([]); // Clear the messages
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to : {room.toUpperCase()}</h1>
      </div>
      <button
        className="exit-room-button"
        onClick={handleExitRoom}
      >
        Exit Room
      </button>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user} : </span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
