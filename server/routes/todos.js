import express from "express";
const router = express.Router();
import Todo from "../models/todos.js";
import User from "../models/user.js";

router.get("/todos/:userId", async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.query.id; // Extracts the id from the query string of the URL (like ?id=TODO_ID)

  try {
    if (todoId) {
      // Read the specific todo item of the user with the given todo id
      const todo = await Todo.findOne({ _id: todoId, userId: userId });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } else {
      // If the todoId is not defined, return all todo items for the user
      const todos = await Todo.find({ userId: userId });
      res.json(todos);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// Route for creating a new todo for a user
router.post("/todos/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { title, description } = req.body; // Get the todo object from the request body

  try {
    // Create a new todo in MongoDB with the user ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const newTodo = new Todo({
      userId: userId,
      user: user.name,
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

// Route for updating a todo by userId and todoId
router.put("/todos/:userId/:todoId", async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  const { title, description } = req.body; // Get the updated todo object from the request body

  try {
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Update the todo with the given todoId and userId
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId: userId, user: user.name },
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// Route for deleting a todo by todoId only
router.delete("/todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;

  try {
    // Delete the todo item by id
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

export default router;
