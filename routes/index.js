import { Router } from "express"
const router = Router()
import userRoutes from "./user.js"

router.get("/", (req, res) => {
  res.send("This is the api root")
})

router.use("/", userRoutes)
// router.use("/", todosRoutes)


export default router;