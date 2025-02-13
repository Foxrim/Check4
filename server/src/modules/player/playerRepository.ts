import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Player = {
  id: number;
  pseudo: string;
};

type PlayerWithRelations = {
  id: number;
  pseudo: string;
  slime: {
    id: number;
    name: string;
    color: string;
    status: string;
  } | null;
  quest: {
    id: number;
    keep_slime: boolean;
    choose_name: boolean;
    choose_color: boolean;
  } | null;
};

class PlayerRepository {
  async create(player: { pseudo: string }) {
    const [result] = await databaseClient.query<Result>(
      "insert into player (pseudo) values (?)",
      [player.pseudo],
    );

    const playerId = result.insertId;

    const [slimeResult] = await databaseClient.query<Result>(
      "insert into slime (name, color, player_id) values (?, ?, ?)",
      ["Slime", "grey", playerId],
    );

    const [questResult] = await databaseClient.query<Result>(
      "insert into quest (keep_slime, choose_color, player_id) value(?,?,?)",
      [false, false, playerId],
    );

    await questResult;
    await slimeResult;
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT p.*, s.*, s.player_id slimePlayerID, q.*, q.player_id questPlayerID
       FROM player p
       LEFT JOIN slime s ON s.player_id = p.id
       LEFT JOIN quest q ON q.player_id = p.id`,
    );

    return rows.map((row) => {
      const slime = row.slimePlayerID
        ? {
            name: row.name,
            color: row.color,
            status: row.status,
            slimePlayerID: row.slimePlayerID,
          }
        : null;

      const quest = row.questPlayerID
        ? {
            keep_slime: row.keep_slime,
            choose_name: row.choose_name,
            choose_color: row.choose_color,
            questPlayerID: row.questPlayerID,
          }
        : null;

      return {
        id: row.id,
        pseudo: row.pseudo,
        slime: slime,
        quest: quest,
      };
    }) as PlayerWithRelations[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from player where id = ?",
      [id],
    );

    return rows[0] as Player[];
  }

  async readByPseudo(pseudo: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
        FROM player
        WHERE pseudo = ?
      `,
      [pseudo],
    );

    return rows[0] as Player;
  }

  async login(pseudo: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT p.*, s.* 
        FROM player p
        LEFT JOIN slime s ON p.id = s.player_id
        LEFT JOIN quest q ON p.id = q.player_id
        WHERE p.pseudo = ?
      `,
      [pseudo],
    );

    const player = rows.map((row) => ({
      id: row.id,
      pseudo: row.pseudo,
      slime: {
        name: row.name,
        status: row.status,
        color: row.color,
        playerID: row.player_id,
      },
      quest: {
        keep_slime: row.keep_slime,
        choose_name: row.choose_name,
        choose_color: row.choose_color,
      },
    }));

    return player;
  }

  async edit(player: Player) {
    const [result] = await databaseClient.query<Result>(
      "update player set pseudo = ? where id = ?",
      [player.pseudo, player.id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [slimeResult] = await connection.query<Result>(
        "delete from slime where player_id = ?",
        [id],
      );

      const [playerResult] = await connection.query<Result>(
        "delete from player where id = ?",
        [id],
      );

      await connection.commit();

      return playerResult.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new PlayerRepository();
