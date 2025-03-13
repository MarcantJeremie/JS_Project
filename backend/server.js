const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', require('./routes/index.routes'));

app.get('/game/start', require('./routes/game.routes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});