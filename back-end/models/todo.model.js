// /models/todo.model.js
//  - todo model definition for the database
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating the schema
const todoSchema = new Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// applying the schema to the model
mongoose.model('Todo', todoSchema);
