import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import playerActions from "./modules/player/playerActions";

router.get("/api/players", playerActions.browse);
router.get("/api/players/:id", playerActions.read);
router.post("/api/players", playerActions.add);
router.put("/api/players/:id", playerActions.edit);
router.delete("/api/players/:id", playerActions.destroy);

/* ************************************************************************* */

export default router;
