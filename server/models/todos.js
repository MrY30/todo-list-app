import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Todo = model('Todo', todoSchema);

export default Todo;