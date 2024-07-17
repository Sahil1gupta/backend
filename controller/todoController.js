const Todo = require('../models/todo');

const createTodo = async (req, res) => {
    try {
        const { name, contact, email } = req.body;
        const newTodo = new Todo({
            name,
            contact,
            email,
            user: req.user._id
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// main page(create todo)             server   database

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact, email } = req.body;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { name, contact, email },
            { new: true }
        );

        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
