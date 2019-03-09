// index.js
//  - server entry point
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const firebase = require('firebase');
const bodyParser = require('body-parser');

// creating the app
const app = express();

app.use(cors());
app.use(bodyParser.json());

// importing custom libraries
require('./models/todo.model');
require('./routes/todo.routes')(app);

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

// initializing the Firebase app
firebase.initializeApp({
  apiKey: env.FIRE_API_KEY,
  authDomain: env.FIRE_AUTH_DOMAIN,
  databaseURL: env.FIRE_DB_URL,
  projectId: env.FIRE_PROJECT_ID,
  storageBucket: env.FIRE_STORAGE,
  messagingSenderId: env.FIRE_MESSAGING_SENDER
});

// starting the app on the given port
app.listen(env.PORT, () => {
  console.log(`Server started on port `, env.PORT);
});
