// server/index.js

import express from 'express';
import dotenv from 'dotenv';
// --- NEW IMPORTS ---
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.get('/api/status', (req, res) => {
  res.json({ message: 'Server is healthy and ready to collaborate!' });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log(`🔌 A new client has connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`🤝 Client ${socket.id} joined room: ${roomId}`);
    // Acknowledge join so clients can safely start syncing after they're in the room
    socket.emit('room-joined', roomId);
  });

  // Listen for Yjs document updates and relay them to others in the room
  socket.on('ydoc-update', (payload) => {
    const { roomId, update } = payload || {};
    if (!roomId || !update) {
      return;
    }
    console.log(`🔄 Relaying ydoc update for room: ${roomId}`);
    socket.broadcast.to(roomId).emit('ydoc-update', update);
  });

  socket.on('ping', () => {
    console.log(`⬅️ Received ping from ${socket.id}. Sending pong...`);
    socket.emit('pong');
  });

  socket.on('disconnect', () => {
    console.log(`👋 Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});