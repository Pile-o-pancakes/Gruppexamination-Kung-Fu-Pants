const express = require('express');
const { json } = require('express');
const app = express();
const db = require('./api/model/db.js');
app.use(express.json());

app.use('/api', require('./api/routers/index.js'));
app.use(json());

const port = process.env.PORT || 8000;
app.listen(port, () => {
  db;
  console.log('The server listening on port ' + port);
});
