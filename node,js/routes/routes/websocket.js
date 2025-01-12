// websocket.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Logic to send real-time stock updates to clients
  // For example, you can fetch stock prices from an API and send updates

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});