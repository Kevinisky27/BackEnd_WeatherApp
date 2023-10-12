const config = {
  server: "localhost",
  user: "sa",
  password: "Ing3nI3ri@23",
  database: "weatherapp",
  port: 1435,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

module.exports.config = config;