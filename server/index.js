import express from "express"
import connnect from "./database/mongodb-connect.js"

import todosRouter from "./routes/todos.js"
import usersRouter from "./routes/users.js"

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static("public"))

app.get('/',(req,res) =>{
    res.send('Hello Todo App!!!');
});

app.use("/api", todosRouter)
app.use("/api", usersRouter)

connnect();

app.listen(port, () => {    
    console.log(`Listening to port ${port}`);
});