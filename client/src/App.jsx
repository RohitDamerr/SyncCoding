import React, { useEffect } from 'react'; 

import Header from './components/Header';
import Layout from './components/Layout';
import socket from './socket';
function App() {

useEffect(() => {
    const onConnect = () => {
      console.log('✅ Connected to the WebSocket server!');
       console.log('➡️ Sending ping to server...');
      socket.emit('ping');
    };
    const onDisconnect = () => {
      console.log('❌ Disconnected from the WebSocket server.');
    };

    const onPong = () => {
      console.log('⬅️ Received pong from server!');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
socket.on('pong', onPong);

    socket.connect();
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
socket.off('pong', onPong);

      socket.disconnect();
    };
  }, []);
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Render the Header component */}
      <Header />

      {/* The Layout component will now take up the remaining space */}
      <div className="flex-1 min-h-0">
        <Layout />
      </div>

    </div>
  )
}

export default App;