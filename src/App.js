import React, { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { Chat } from './components/Chat';
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setSelectedRoom(null); // Clear the selected room when signing out
  };

  const createRoom = (roomName) => {
    if (roomName.trim() !== '') {
      setRooms((prevRooms) => [...prevRooms, roomName]);
      roomInputRef.current.value = ''; // Clear the input field
    }
  };

  const deleteRoom = (roomName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the room "${roomName}"?`);
    if (shouldDelete) {
      const updatedRooms = rooms.filter((room) => room !== roomName);
      setRooms(updatedRooms);
    }
  };

  return (
    <Router>
      <div className="container">
        {isAuth ? (
          selectedRoom ? (
            <Chat room={selectedRoom} />
          ) : (
            <div>
              <div className="room-list">
                {rooms.map((roomName) => (
                  <div key={roomName} className="room">
                    <button onClick={() => setSelectedRoom(roomName)}>Join {roomName}</button>
                    <div className='delete-room'>
                    <button onClick={() => deleteRoom(roomName)} >Delete</button>
                  </div>
                  </div>
                ))}
              </div>
              <div className="create-room">
                <input
                  type="text"
                  placeholder="Enter Room Name"
                  ref={roomInputRef}
                />
                <button onClick={() => createRoom(roomInputRef.current.value)}>
                  Create Room
                </button>
              </div>
            </div>
          )
        ) : (
          <Auth setIsAuth={setIsAuth} />
        )}

        {isAuth && (
          <div className="sign-out">
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
