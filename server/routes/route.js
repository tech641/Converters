import express from "express";

// Import Controller Route
import * as controller from "../controllers/appController.js"

// Import Middleware Route
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

/* POST Routes */

// Route for User Registration - auth - POST
router.route("/auth/register").post(controller.registerUser);

// Route for User Login - auth - POST
router.route("/auth/login").post(controller.loginUser);


export default router;