require('dotenv').config();

const userRouts = require("./controllers/user");
const express = require('express'); //Express
const mongoose = require('mongoose'); //Conexión con db 
const port = process.env.PORT || 9000; //Si nosotros desplegamos la API, este nos dará un puerto automático, sino tomaría la que nosotros tenemos el el número de puerto

const login = require("./routes/login_mssql");

const app = express();

//Middleware
app.use(express.json());
app.use("/api", userRouts);
app.use('/api', login);

// Routes 
app.get("/", (req, res) => {
  res.send("Bienvenido a Weather App, la API de Clima 😎 ☀️")
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB Conectado ...")).catch((err) => console.error(err));

// Servidor
app.listen(port, () => console.log('Servidor funcionando en el puerto: ', port));