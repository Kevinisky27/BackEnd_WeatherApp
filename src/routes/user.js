const express = require("express");
const userSchema = require("../models/userModel");
const router = express.Router();

//Create User  -- POST
router.post('/users', (req, res) => {
  const user = userSchema(req.body);

  user
  .save()
  .then((data) => res.json(data))
  .catch((err) => res.json({message: err}));
});

//Obtener Usurios  -- GET
router.get('/users', (req, res) => {
  userSchema
  .find()
  .then((data) => res.json(data))
  .catch((err) => res.json({message: err}));
});

//Obtener Usurio por id -- GET
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
  .findById(id)
  .then((data) => res.json(data))
  .catch((err) => res.json({message: err}));
});


// Actualizar Usurio -- PUT
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, lastname, age, profession } = req.body;

  userSchema
  .updateOne({ _id: id }, { $set: {name, lastname, age, profession} })
  .then((data) => res.json(data))
  .catch((err) => res.json({message: err}));
});

// eliminar un usuario por id  -- DELETE
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
  .deleteOne({ _id: id })
  .then((data) => res.json(data))
  .catch((err) => res.json({message: err}));
});

module.exports = router;