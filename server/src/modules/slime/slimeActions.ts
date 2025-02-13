import type { RequestHandler } from "express";
import slimeRepository from "./slimeRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const slime = {
      player_id: Number(req.params.player_id),
    };

    const slimes = await slimeRepository.read(slime.player_id);

    res.status(200).json(slimes);
  } catch (error) {
    console.error("Error reading slime:", error);
    res.status(500).json({ message: "Failed to read slime" });
  }
};

const updateName: RequestHandler = async (req, res) => {
  try {
    const slime = {
      name: req.body.name,
      player_id: Number(req.params.player_id),
    };

    const slimes = await slimeRepository.editName(slime);

    res.status(200).json(slimes);
  } catch (error) {
    console.error("Error updating slime name:", error);
    res.status(500).json({ message: "Failed to update slime name" });
  }
};

const updateColor: RequestHandler = async (req, res) => {
  try {
    const slime = {
      color: req.body.color,
      player_id: Number(req.params.player_id),
    };
    const slimes = await slimeRepository.editColor(slime);

    res.status(200).json(slimes);
  } catch (error) {
    console.error("Error updating slime color:", error);
    res.status(500).json({ message: "Failed to update slime color" });
  }
};

const updateStatus: RequestHandler = async (req, res) => {
  try {
    const slime = {
      player_id: Number(req.params.player_id),
    };
    const slimes = await slimeRepository.editStatus(slime);

    res.status(200).json(slimes);
  } catch (error) {
    console.error("Error updating slime status:", error);
    res.status(500).json({ message: "Failed to update slime status" });
  }
};

const updateStatusHidden: RequestHandler = async (req, res) => {
  try {
    const slime = {
      player_id: Number(req.params.player_id),
    };
    const slimes = await slimeRepository.editStatusHidden(slime);

    res.status(200).json(slimes);
  } catch (error) {
    console.error("Error updating slime status:", error);
    res.status(500).json({ message: "Failed to update slime status" });
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const slime = { player_id: Number(req.params.player_id) };
    const slimes = await slimeRepository.delete(slime.player_id);

    res.status(200).json(slimes);
  } catch (error) {
    console.error("Error deleting slime:", error);
    res.status(500).json({ message: "Failed to delete slime" });
  }
};

export default {
  read,
  updateName,
  updateColor,
  updateStatus,
  updateStatusHidden,
  destroy,
};
