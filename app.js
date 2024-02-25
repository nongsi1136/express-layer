import express from "express";
import UsersRouter from "./routers/users.router.js";

const app = express();
const PORT = 3326;

app.use(express.json());

app.use("/api", UsersRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
