// import { body, validationResult } from 'express-validator';
// import Todo from '../models/todo.js';

// // Create a new Todo
// export const createTodo = [
//   // Validation for todo and date fields
//   body('todo').notEmpty().withMessage('Todo is required'),  // Ensure the todo field is not empty
//   body('date').isDate().withMessage('Valid date is required'), // Ensure the date is a valid date format
  
//   async (req, res) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       // If there are validation errors, return them in the response
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { todo, date } = req.body;

//     try {
//       // Create a new Todo
//       const newTodo = await Todo.create({ todo, date });

//       // Respond with the created Todo object
//       res.status(201).json(newTodo); // Return the created todo
//     } catch (error) {
//       console.error('Error creating todo:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// ];

// // Fetch Todos (by ID or all)
// export const getTodos = async (req, res) => {
//   const { id } = req.params;  // Extract the ID from the URL params

//   try {
//     if (id) {  // If an ID is provided, fetch a specific todo
//       const todo = await Todo.findByPk(id);  // Find the todo by its primary key (ID)
//       if (!todo) {  // If no todo is found, return a 404 error
//         return res.status(404).json({ error: 'Todo not found' });
//       }
//       return res.status(200).json(todo);  // Return the specific todo
//     } else {  // If no ID is provided, fetch all todos
//       const todos = await Todo.findAll();  // Fetch all todos from the database
//       return res.status(200).json(todos);  // Return all todos
//     }
//   } catch (error) {
//     console.error('Error fetching todo(s):', error.message);
//     res.status(500).json({ error: 'Internal server error' });  // Return 500 for server errors
//   }
// };

// // Update a specific Todo
// export const updateTodo = [
//   // Validation for todo and date fields
//   body('todo').notEmpty().withMessage('Todo is required'),
//   body('date').isDate().withMessage('Valid date is required'),

//   async (req, res) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       // If there are validation errors, return them in the response
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { id } = req.params;
//     const { todo, date } = req.body;

//     try {
//       // Update the Todo with the provided data
//       const updatedTodo = await Todo.update(
//         { todo, date },
//         { where: { id }, returning: true }
//       );

//       if (!updatedTodo[0]) {
//         return res.status(404).json({ error: 'Todo not found' });
//       }

//       // Respond with the updated Todo
//       res.status(200).json(updatedTodo[1][0]);
//     } catch (error) {
//       console.error('Error updating todo:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// ];

// // Delete Todo(s) (by ID or all)
// export const deleteTodos = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (id) {  // Delete a specific Todo by ID
//       const deleted = await Todo.destroy({ where: { id } });
//       if (deleted === 0) {
//         return res.status(404).json({ error: 'Todo not found' });
//       }
//       return res.status(200).json({ message: 'Todo deleted successfully' });
//     } else {  // Delete all Todos
//       const deleted = await Todo.destroy({ where: {} });
//       if (deleted === 0) {
//         return res.status(404).json({ error: 'No todos found to delete' });
//       }
//       return res.status(200).json({ message: 'All todos were deleted successfully' });
//     }
//   } catch (error) {
//     console.error('Error deleting todo(s):', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };




// controllers/todoController.js
import { body } from 'express-validator';
import Todo from '../models/todo.js';
import validate from '../middleware/validationMiddleware.js';  // Import the validation middleware

// Create a new Todo
export const createTodo = [
  // Validation middleware for todo and date fields
  body('todo').notEmpty().withMessage('Todo is required'),
  body('date').isDate().withMessage('Valid date is required'),

  validate, // Apply the validation middleware

  async (req, res) => {
    const { todo, date } = req.body;

    try {
      // Create a new Todo
      const newTodo = await Todo.create({ todo, date });

      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error creating todo:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

// Fetch Todos (by ID or all)
export const getTodos = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const todo = await Todo.findByPk(id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return res.status(200).json(todo);
    } else {
      const todos = await Todo.findAll();
      return res.status(200).json(todos);
    }
  } catch (error) {
    console.error('Error fetching todo(s):', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a specific Todo
export const updateTodo = [
  // Validation middleware for todo and date fields
  body('todo').notEmpty().withMessage('Todo is required'),
  body('date').isDate().withMessage('Valid date is required'),

  validate, // Apply the validation middleware

  async (req, res) => {
    const { id } = req.params;
    const { todo, date } = req.body;

    try {
      const updatedTodo = await Todo.update(
        { todo, date },
        { where: { id }, returning: true }
      );

      if (!updatedTodo[0]) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.status(200).json(updatedTodo[1][0]);
    } catch (error) {
      console.error('Error updating todo:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

// Delete Todo(s) (by ID or all)
export const deleteTodos = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const deleted = await Todo.destroy({ where: { id } });
      if (deleted === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
      const deleted = await Todo.destroy({ where: {} });
      if (deleted === 0) {
        return res.status(404).json({ error: 'No todos found to delete' });
      }
      return res.status(200).json({ message: 'All todos were deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting todo(s):', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



