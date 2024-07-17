const mongoose = require('./database');

// name, contact ,email
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
