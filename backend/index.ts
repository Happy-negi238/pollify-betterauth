import express from "express";
import cookieParser from "cookie-parser"

function main() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}

main();
