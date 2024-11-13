import app from "./app.js";
import { WebSocketServer } from "ws";
import http from 'http';

const port = 3000;
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });

const handleWebSocketMessages = (client, data) => {
  if (data.type === 'voteUpdate') {
      client.send(JSON.stringify({ type: 'voteUpdate', postId: data.postId, voteCount: data.voteCount }));
  } else if (data.type === 'newComment') {
      client.send(JSON.stringify({ type: 'newComment', commentId: data.commentId, content: data.content }));
  }
  // Add more conditions for other message types as needed
};

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("messsage", (data) => {
    msgData = JSON.parse(data);
    handleWebSocketMessages(ws, msgData);
  })
})

try {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
  console.error("Error starting server:", error);
}
