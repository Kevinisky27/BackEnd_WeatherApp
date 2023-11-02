const bcrypt = require('bcryptjs');
const sql = require("mssql");
const express = require("express");
const router = express.Router();
const { config } = require("../config/mssql");
const saltRounds = 10;

// listado de personas que están registradas
router.get('/login', async (req, res) => {
  let data = []

  try {
    // Abrimos la conexión  
    await sql.connect(config);
    
    // Consulta
    const resultado = await sql.query('SELECT id, email, rol, password, token FROM login');
    data = resultado.recordset;
    await sql.close();

  } catch (err) {
    console.log(err)
    data = err;
    res.statusCode = 500;  //Internal Server Error
  }
  res.send(data);
});

// registrar un nuevo usuario de login
router.post('/login', async (req, res) => {
  const user = req.body;
  let resultado = {}
  let encryptedPass = bcrypt.hashSync(user.password, saltRounds);

  try {
    let connection = await sql.connect(config);
    const result = await 
    connection
      .request()
      .input("email", sql.VarChar, user.email)
      .input("rol", sql.VarChar, user.rol)
      .input("password", sql.VarChar, encryptedPass)
      .query("INSERT INTO login(email, rol, password) VALUES (@email, @rol, @password)")
    resultado = result.rowsAffected
    await connection.close();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    resultado = err;
  }
  res.send(resultado);
});

// Búsqueda de un usuario por id
router.get('/login/:id', async (req, res) => {
  let data = []

  try {
    // Abrimos la conexión  
    const connection = await sql.connect(config);
    
    // Consulta
    const resultado = await connection.request()
          .input("id", sql.Int, req.params.id)
          .query("SELECT email, rol, password FROM login WHERE id = @id")
    data = resultado.recordset[0];
    await sql.close();

  } catch (err) {
    console.log(err)
    data = err;
    res.statusCode = 500;  //Internal Server Error
  }
  res.send(data);
});


// Actualizar registro dentro de la tabla login
router.put('/login/:id', async (req, res) => {
  let data = []
  let {email, rol, password} = req.body;
  let encryptedPass = bcrypt.hashSync(password, saltRounds);

  try {
    // Abrimos la conexión  
    const connection = await sql.connect(config);
    
    // Consulta
    const resultado = await connection.request()
          .input("id", sql.Int, req.params.id)
          .query("SELECT email, rol, password FROM login WHERE id = @id")
    if(resultado.recordsets.length > 0) {
      let connection = await sql.connect(config);
      const result = await 
      connection
        .request()
        .input("email", sql.VarChar, email)
        .input("rol", sql.VarChar, rol)
        .input("password", sql.VarChar, encryptedPass)
        .input("id", sql.Int, req.params.id)
        .query("UPDATE login SET email=@email, rol=@rol, password=@password WHERE id=@id");
      data = result.rowsAffected
      await connection.close();
    }

  } catch (err) {
    console.log(err)
    data = err;
    res.statusCode = 500;  //Internal Server Error
  }
  res.send(data);
});

//Eliminando registros de la tabla body
router.delete('/login/:id', async (req, res) => {
  let data = []

  try {
    // Abrimos la conexión  
    const connection = await sql.connect(config);
    
    // Consulta
    const resultado = await connection.request()
          .input("id", sql.Int, req.params.id)
          .query("SELECT email, rol, password FROM login WHERE id = @id")
    if(resultado.recordsets.length > 0) {
      let connection = await sql.connect(config);
      const result = await 
      connection
        .request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM login WHERE id=@id");
      data = result.rowsAffected
      await connection.close();
    }

  } catch (err) {
    console.log(err)
    data = err;
    res.statusCode = 500;  //Internal Server Error
  }
  res.send(data);
});

module.exports = router;