const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

//Config
dotenv.config();

//Middleware
app.use(cors({
    origin: [process.env.FRONTEND_DOMAIN]
}));
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api', authRoutes);

//Export
module.exports = app;




// app.use("/api", userRouts);
// app.use('/api', login);

// // Routes 
// app.get("/", (req, res) => {
//   res.send("Bienvenido a Weather App, la API de Clima 😎 ☀️")
// });

// // Servidor
// app.listen(port, () => console.log('Servidor funcionando en el puerto: ', port));