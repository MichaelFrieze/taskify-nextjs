import { cache } from "react";
import { db } from "./db";

export const getBoard = cache(async (boardId: string, orgId: string) => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return board;
});
