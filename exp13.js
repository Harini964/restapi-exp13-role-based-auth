// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET = "supersecret"; // never hardcode in production!

// Fake login endpoint
app.post("/login", (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    return res.status(400).json({ error: "Username and role required" });
  }

  // Generate a JWT with the role
  const token = jwt.sign({ username, role }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware to verify token & roles
function authRole(roles) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token required" });

    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      req.user = user;
      next();
    });
  };
}

// Routes
app.get("/admin", authRole(["admin"]), (req, res) => {
  res.json({ message: `Hello Admin ${req.user.username}` });
});

app.get("/user", authRole(["user", "admin"]), (req, res) => {
  res.json({ message: `Hello User ${req.user.username}` });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
