const express = require('express');
const app = express();
const port = process.env.port || 8000;

app.listen(port, () => {
    console.log("Server startad");
})