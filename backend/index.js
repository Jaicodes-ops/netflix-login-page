const express=require("express")
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  { email: "user@netflix.com", password: "123" },
  { email: "demo@netflix.com", password: "demo123" }
];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;


  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      user: { email: user.email }
    });
  } else {
    res.json({
      success: false,
      message: "Wrong email or password"
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});