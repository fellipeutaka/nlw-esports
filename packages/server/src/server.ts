import express from "express";

const app = express();

app.use(express.json());

app.get("/ads", (req, res) => {
  return res.json({
    data: [{ id: 1, name: "batata " }],
  });
});

app.listen(3333, () => {
  console.log("Server is running");
});
