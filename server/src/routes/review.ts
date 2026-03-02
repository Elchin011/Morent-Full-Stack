import { Router } from "express";
import reviewController from "../controllers/review"
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validation";
import { changeStatusSchema, createReviewSchema } from "../validation/review";


const router = Router()

router.get("/", authorize({ isAdmin: true }), reviewController.getAll);


router.get("/:rentId", reviewController.getByRentId)
router.post("/", authorize({}), validateSchema(createReviewSchema), reviewController.create)



router.delete("/:id", authorize({ isAdmin: true }), reviewController.remove)

export default router