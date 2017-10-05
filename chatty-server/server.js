// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const userCount = wss.clients.size;
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({id: uuid(), type: 'userCount', message: userCount}));
    }
  });

  ws.on('message', (incoming) => {
    console.log("bounce");
    const msgs = JSON.parse(incoming);
    msgs.forEach((msg) => {
      msg.id = uuid();
      switch (msg.type) {
      case 'postMessage':
        msg.type = 'incomingMessage';
        break;
      case 'postNotification':
        msg.type = 'incomingNotification';
        break;
      default:
        msg.type = msg.type;
      }
    });
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(msgs));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    const userCount = wss.clients.size;
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({id: uuid(), type: 'userCount', message: userCount}));
      }
    });
  });
});