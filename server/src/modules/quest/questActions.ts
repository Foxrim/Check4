import type { RequestHandler } from "express";
import questRepository from "./questRepository";

const editKeepSlime: RequestHandler = async (req, res) => {
  try {
    const player_id = Number(req.params.player_id);
    const quests = await questRepository.editKeepSlime(player_id);

    res.status(200).json(quests);
  } catch (err) {
    console.error("Error updating quest keep:", err);
    res.status(500).json({ message: "Failed to update quest keep" });
  }
};

const editChooseColor: RequestHandler = async (req, res) => {
  try {
    const player_id = Number(req.params.player_id);
    const quests = await questRepository.editChooseColor(player_id);

    res.status(200).json(quests);
  } catch (err) {
    console.error("Error updating quest color:", err);
    res.status(500).json({ message: "Failed to update quest color" });
  }
};

const read: RequestHandler = async (req, res) => {
  try {
    const player_id = Number(req.params.player_id);
    const quests = await questRepository.read(player_id);

    res.status(200).json(quests);
  } catch (err) {
    console.error("Une erreur s'est produit", err);
    res.status(500).json({ message: "Failed to read quest" });
  }
};

export default { editKeepSlime, editChooseColor, read };
