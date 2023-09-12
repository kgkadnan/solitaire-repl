'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    const socketUrl = 'ws://localhost:443/';
    const newSocket: Socket = io(socketUrl, {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('chatMessage', (newMessage: string) => {
      console.log('Received message:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      console.log('Disconnecting from WebSocket server...');
      newSocket.disconnect();
    };
  }, []);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() && socket) {
      console.log('message', message);

      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg: string, index: number) => (
          <div key={index} style={{ color: 'fff' }}>
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
