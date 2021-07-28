import { Router } from "express";
const router = Router()
import restrict from "../helpers/restrict.js"


//GET all todos
router.get("/", )
// get id todo
router.get("/todos/:id", )
// post create todo
router.post("/todos", restrict, createTodo)
// put update todo
router.put("/todos/:id", restrict, updateTodo)
// delete todo
router.delete("/todos/:id", restrict, deleteTodo)

export default router