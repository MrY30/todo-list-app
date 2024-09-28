import express from "express"

const port = 3000;
const app = express();

app.get('/',(req,res) =>{
    res.send('Hello Todo App!!!');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});