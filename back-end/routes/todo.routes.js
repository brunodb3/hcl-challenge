// /routes/todo.routes.js
//  - todo routes definition
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
const mongoose = require('mongoose');

// importing custom libraries
const TodoModel = mongoose.model('Todo');

// global variables

// exporting the module
module.exports = app => {
  /**
   * @description Returns a 404 - Not Found error
   */
  app.get('/404', async (req, res) => res.send('404 - Not Found'));

  /**
   * @description Creates a new todo on the database
   * @param todo Todo object to insert
   */
  app.post('/todo', async (req, res) => {
    const { todo } = req.body;

    try {
      const createdAt = new Date();

      const newItem = new TodoModel({
        ...todo,
        createdAt,
        updatedAt: createdAt
      });

      await newItem.save();

      return res.status(200).json({ message: 'Todo saved', todo: newItem });
    } catch (err) {
      return res.status(401).json({ message: 'Error saving Todo' });
    }
  });
};
