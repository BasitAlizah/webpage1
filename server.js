// websocket-server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const connectedClients = new Set();

wss.on('connection', (ws) => {
  console.log('A new client connected');

  connectedClients.add(ws);

  ws.on('message', (message) => {
    // Broadcast the received message to all connected clients
    connectedClients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected');
    connectedClients.delete(ws);
  });
});
