import { cache } from "react";
import { db } from "./db";

export const getBoards = cache(async (orgId: string) => {
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return boards;
});
