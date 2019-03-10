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
   * @description Creates a new todo list on the database
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

  /**
   * @description Delete a todo from the database
   * @param id ID of the todo to delete
   */
  app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;

    try {
      await TodoModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });

      return res.status(200).json({ message: 'Todo removed' });
    } catch (err) {
      return res.status(401).json({ message: 'Error saving Todo' });
    }
  });

  /**
   * @description Updates a todo on the database
   * @param todo Updated todo object
   */
  app.put('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;

    try {
      const query = { _id: mongoose.Types.ObjectId(id) };
      const updatedItem = {
        ...todo,
        updatedAt: new Date()
      }

      // finding and updating the document
      await TodoModel.findOneAndUpdate(query, updatedItem);

      return res.status(200).json({ message: 'Todo saved', todo: updatedItem });
    } catch (err) {
      return res.status(401).json({ message: 'Error updating Todo' });
    }
  });

  /**
   * @description Retrieves all todos from an author
   */
  app.get('/todos/:author', async (req, res) => {
    const { author } = req.params;

    try {
      const query = { author: author };

      // finding and updating the document
      const todos = await TodoModel.find(query);

      return res.status(200).json({ message: `Todos for ${author} retrieved`, todos: todos });
    } catch (err) {
      return res.status(401).json({ message: 'Error getting Todos' });
    }
  });
};
