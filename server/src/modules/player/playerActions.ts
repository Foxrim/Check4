import type { RequestHandler } from "express";
import playerRepository from "./playerRepository";

const browse: RequestHandler = async (req, res) => {
  const players = await playerRepository.readAll();

  res.json(players);
};

const read: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const player = await playerRepository.read(id);

  res.json(player);
};

const add: RequestHandler = async (req, res) => {
  try {
    const { pseudo } = req.body;

    if (!pseudo || typeof pseudo !== "string") {
      res.status(400).json({ message: "Pseudo invalide" });
      return;
    }

    const existingPlayer = await playerRepository.readByPseudo(pseudo);

    if (existingPlayer) {
      res.status(400).json({ message: "Ce pseudo existe déjà" });
      return;
    }

    const player = await playerRepository.create({ pseudo });

    res.status(201).json(player);
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ message: "Failed to create player" });
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { pseudo } = req.body;

    const existingPlayer = await playerRepository.readByPseudo(pseudo);

    if (!existingPlayer) {
      res.status(400).json({ message: "Ce compte n'existe pas" });
      return;
    }

    const findPlayer = await playerRepository.login(pseudo);
    res.status(200).json(findPlayer);
  } catch (err) {
    console.error("Erreur lors de la connection", err);
    res.status(500).json({ message: "Echec de la connexion" });
  }
};

const edit: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { pseudo } = req.body;

    if (!pseudo || typeof pseudo !== "string") {
      res.status(400).json({ message: "Pseudo invalide" });
      return;
    }

    const existingPlayer = await playerRepository.readByPseudo(pseudo);

    if (existingPlayer) {
      res.status(400).json({ message: "Ce pseudo existe déjà" });
      return;
    }

    const newPlayer = await playerRepository.edit({
      id: id,
      pseudo: pseudo,
    });

    res.status(200).json(newPlayer);
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Failed to update player" });
  }
};

const destroy: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const affectedRows = await playerRepository.delete(id);

  res.json(affectedRows);
};

export default { browse, read, add, edit, destroy, login };
