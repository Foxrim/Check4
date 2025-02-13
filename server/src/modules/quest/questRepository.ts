import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type QuestProps = {
  id: number;
  keep_slime: boolean;
  choose_color: boolean;
  player_id: number;
};

class QuestRepository {
  async editKeepSlime(player_id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE quest SET keep_slime = true WHERE player_id = ?",
      [player_id],
    );

    return result.affectedRows;
  }

  async editChooseName(player_id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE quest SET choose_name = true WHERE player_id = ?",
      [player_id],
    );

    return result.affectedRows;
  }

  async editChooseColor(player_id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE quest SET choose_color = true WHERE player_id = ?",
      [player_id],
    );

    return result.affectedRows;
  }

  async read(player_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM quest WHERE player_id = ?",
      [player_id],
    );

    return rows[0] as QuestProps[];
  }
}

export default new QuestRepository();
