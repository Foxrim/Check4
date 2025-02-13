import databaseClient from "../../../database/client";

import type { Result } from "../../../database/client";

class QuestRepository {
  async editKeepSlime(player_id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE quest SET keep_slime = true WHERE player_id = ?",
      [player_id],
    );
  }

  async editChooseColor(player_id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE quest SET choose_color = true WHERE player_id = ?",
      [player_id],
    );
  }
}

export default new QuestRepository();
