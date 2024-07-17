const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controller/todoController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createTodo);
router.get('/', authenticateToken, getTodos);
router.put('/:id', authenticateToken, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);

module.exports = router;
//frontend (add todo)[api-createTodo] request->tino data sath me token       server (create todo)        database