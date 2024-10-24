import express from "express";
const router = express.Router();

router.get("/todos", (req,res) => {
    res.send("All Todos");
});

router.get("/todos/:id", (req,res)=>{
    const getID = req.params.id;

    res.send(`Getting TODO with id ${getID}`);
});

router.post("/todos", (req,res) => {
    res.send({ id: 1, title: "Todo", description: "My todo" });
});

router.put("/todos/:id", (req,res) => {
    const getID = req.params.id;

    res.send(`Updating TODO with id ${getID}`);
});

router.delete("/todos/:id", (req, res) => {
    const getID = req.params.id;
    
    res.send(`Deleting TODO with id ${getID}`);
});

export default router;