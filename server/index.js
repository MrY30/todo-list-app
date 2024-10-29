import express from "express"
// import connnect from "./database/mongodb-connect.js"

import todosRouter from "./routes/todos.js"
import usersRouter from "./routes/users.js"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// app.use(express.static("public"))
app.use("/js", express.static(path.resolve(__dirname, "routes")));
app.use(express.static(path.resolve(__dirname, "../frontend")));

// app.get('/',(req,res) =>{
//     res.sendFile(path.join(__dirname, "..", "frontend", "pages", "main.html"));
// });

app.use("/api", todosRouter)
app.use("/api", usersRouter)

// connnect();

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend","index.html"));
});

app.listen(port, () => {    
    console.log(`Listening to port ${port}`);
});