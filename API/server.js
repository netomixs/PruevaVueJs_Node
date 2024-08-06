const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/cliente.routes")(app)
const jwt = require('jsonwebtoken');
 
 
function generateAccessToken(username) {
  return jwt.sign(username, "ïajosjdhaijgdpjqahd[okqwhpdiugvqwekoawhpdiasjgb", { expiresIn: '1800s' });
}
app.post('/api/createNewUser', (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
 
});
// set port, listen for requests
const PORT = process.env.PORT ||3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});