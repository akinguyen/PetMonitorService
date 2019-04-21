const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const morgan = require("morgan");
const app = express();
const Pet = require("./Schema/Pet");

mongoose.connect(
  "mongodb+srv://duyn:meyeu2000@cluster0-jmn7d.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.post("/data", (req, res) => {
  let pet = new Pet(req.body);
  pet
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).send(err));
});

app.get("/activity", (req, res) => {
  Pet.find((err, pets) => {
    if (err) {
      res.status(404).send(err);
    }
    let activity = { play: 0, eat: 0, sleep: 0, drink: 0 };
    for (pet of pets) {
      if (pet.activity == 0) {
        activity["play"]++;
      } else if (pet.activity == 1) {
        activity["eat"]++;
      } else if (pet.activity == 2) {
        activity["sleep"]++;
      } else if (pet.activity == 3) {
        activity["drink"]++;
      }
    }
    res.send(activity);
  });
});

app.get("/activity/time", (req, res) => {
  Pet.find((err, pets) => {
    if (err) {
      res.status(404).send(err);
    }
    let activity = { play: 0, eat: 0, sleep: 0, drink: 0 };
    for (pet of pets) {
      if (pet.activity == 0) {
        activity["play"] = pet.date;
      } else if (pet.activity == 1) {
        activity["eat"] = pet.date;
      } else if (pet.activity == 2) {
        activity["sleep"] = pet.date;
      } else if (pet.activity == 3) {
        activity["drink"] = pet.date;
      }
    }
    res.send(activity);
  });
});
// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  var io = require("socket.io")(server);
  io.sockets.on("connection", function(socket) {
    socket.emit("news", { activity: "" });
  });
  io.sockets.emit("data", { hello: "world" });
}

module.exports = app;
