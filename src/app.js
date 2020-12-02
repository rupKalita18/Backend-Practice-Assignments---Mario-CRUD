const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
// app.get('/',(req,res)=>{
//     console.log("gi")
//     res.send("hello World")
// })

app.get("/mario", (req, res) => {
  const mario = marioModel
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/mario/:id", (req, res) => {
  let id = req.body.params.id;
  console.log(id);
  const mario = marioModel
    .find({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "error message" });
    });
});

app.post("/mario", (req, res) => {
  const name = req.body.name;
  const weight = req.body.weight;
  if (name === undefined || weight === undefined) {
    res.status(400).json({ message: "either name or weight is missing" });
    return;
  }
  const character = new marioModel({
    name: name,
    weight: weight
  });
  character
    .save()
    .then((result) => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.send("err");
    });
});

app.patch("/mario/:id", (req, res) => {
  const id = req.params.id,
    updatebody = req.body,
    mario = marioModel
      .update({ _id: id }, { $set: updatebody })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).json({ message: "error.message" });
      });
});

app.delete("/mario/:id", (req, res) => {
  console.log("hello");
  const id = req.params.id,
    mario = marioModel
      .findByIdAndRemove({ _id: id })
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: "character deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "error.message" });
      });
});

module.exports = app;
