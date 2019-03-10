// index.js
//  - server entry point
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// creating the app
const app = express();

app.use(cors());
app.use(bodyParser.json());

// importing custom libraries
require('./models/todo.model');
require('./routes/todo.routes')(app);

// global routes
app.get('/', (req, res) => res.status(200)
  .send({ message: 'Welcome to the HCL Challenge by Bruno Duarte Brito' }));

// 404 middleware
app.use((req, res, next) => {
  return res.status(404).send({ message: `Route ${req.url} not found.` });
});

// global variables
const { env } = process;
const connectOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
};

mongoose.Promise = global.Promise;

// connecting to MongoDB via Mongoose
mongoose.connect(env.DB_URI, connectOptions, (err, db) => {
  if (err) {
    console.log(`Error`, err);
    process.exit();
  }

  console.log(`Connected to MongoDB`);
});

// starting the app on the given port
app.listen(env.PORT, () => {
  console.log(`Server started on port `, env.PORT);
});
