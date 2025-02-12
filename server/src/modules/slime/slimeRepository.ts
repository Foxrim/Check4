import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class SlimeRepository {
  async read(player_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from slime where player_id = ?",
      [player_id],
    );

    return rows[0];
  }

  async editName(slime: { name: string; player_id: number }) {
    const [result] = await databaseClient.query<Result>(
      "update slime set name = ? where player_id = ?",
      [slime.name, slime.player_id],
    );

    return result.affectedRows;
  }

  async editColor(slime: { color: string; player_id: number }) {
    const [result] = await databaseClient.query<Result>(
      "update slime set color = ? where player_id = ?",
      [slime.color, slime.player_id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from slime where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new SlimeRepository();
