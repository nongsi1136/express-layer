import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./src/routers/users.router.js";

const app = express();
const PORT = 3356;

app.use(cookieParser());
app.use(express.json());

app.use("/api", [UsersRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
