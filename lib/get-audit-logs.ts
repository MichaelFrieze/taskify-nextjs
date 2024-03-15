import { cache } from "react";
import { db } from "./db";

export const getAuditLogs = cache(async (orgId: string) => {
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return auditLogs;
});
