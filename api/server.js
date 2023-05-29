require('dotenv').config();

const cors = require('cors');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 'SERVER STATUS': 'ON' });
});

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
