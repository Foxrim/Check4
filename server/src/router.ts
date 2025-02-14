import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import playerActions from "./modules/player/playerActions";

router.get("/api/players", playerActions.browse);
router.get("/api/players/:id", playerActions.read);
router.post("/api/login", playerActions.login);
router.post("/api/players", playerActions.add);
router.put("/api/players/name/:id", playerActions.edit);
router.delete("/api/players/:id", playerActions.destroy);

import slimeActions from "./modules/slime/slimeActions";

router.get("/api/slime/:player_id", slimeActions.read);
router.put("/api/slime/name/:player_id", slimeActions.updateName);
router.put("/api/slime/color/:player_id", slimeActions.updateColor);
router.put("/api/slime/status/:player_id", slimeActions.updateStatus);
router.put(
  "/api/slime/status_alive/:player_id",
  slimeActions.updateStatusHidden,
);
router.delete("/api/slime/:player_id", slimeActions.destroy);

import questActions from "./modules/quest/questActions";

router.get("/api/quest/:player_id", questActions.read);
router.put("/api/quest/keep_slime/:player_id", questActions.editKeepSlime);
router.put("/api/quest/choose_name/:player_id", questActions.editChooseName);
router.put("/api/quest/choose_color/:player_id", questActions.editChooseColor);

/* ************************************************************************* */

export default router;
