const app = require('./app');

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running -> http://localhost:${process.env.SERVER_PORT}`);
})