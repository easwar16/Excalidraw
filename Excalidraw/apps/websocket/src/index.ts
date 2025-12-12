import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonWebToken";

dotenv.config({ path: "../../.env" });

const wss = new WebSocketServer({ port: 8080 });

interface JwtUserPayload extends JwtPayload {
  name: string;
  id: string;
}

wss.on("connection", (socket, Request) => {
  let url = Request.url;
  if (!url) {
    return;
  }

  const headerToken = Request.headers["token"];

  console.log(headerToken);

  const queryParams = new URLSearchParams(url.split("?")[1]);

  const token = queryParams.get("token") as string;

  const decoded: JwtUserPayload = jwt.verify(
    token,
    process.env.JWT_SECRET ?? ""
  ) as JwtUserPayload;

  if (!decoded || !decoded.id) {
    wss.close();
    return;
  }
  socket.on("message", (data) => {
    console.log("Recieved : " + data);
    socket.send("pong");
  });
});
