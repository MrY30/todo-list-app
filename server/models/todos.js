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

// Create the Todo model using the schema
const Todo = model('Todo', todoSchema);

// Export the Todo model
export default Todo;