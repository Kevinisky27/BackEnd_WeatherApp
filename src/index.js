require('dotenv').config();

const userRouts = require("./routes/user");
const express = require('express'); //Express
const mongoose = require('mongoose'); //Conexión con db 

const port = process.env.PORT || 9000; //Si nosotros desplegamos la API, este nos dará un puerto automático, sino tomaría la que nosotros tenemos el el número de puerto

const app = express();

//Middleware
app.use(express.json());
app.use("/api", userRouts);

// Routes 
app.get("/", (req, res) => {
  res.send("Bienvenido a Weather App, la API de Clima 😎 ☀️")
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB Connect ...")).catch((err) => console.error(err));

// Servidor
app.listen(port, () => console.log('Servidor funcionando en el puerto: ', port));