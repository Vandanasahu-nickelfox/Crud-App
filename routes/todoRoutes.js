
import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodos } from '../controllers/todoController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/todos', authenticateJWT, createTodo);
router.get('/todos/:id?', authenticateJWT, getTodos);
router.put('/todos/:id', authenticateJWT, updateTodo);
router.delete('/todos/:id?', authenticateJWT, deleteTodos);

export default router;
