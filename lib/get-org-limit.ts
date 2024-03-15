import { cache } from "react";
import { db } from "./db";

export const getOrgLimit = cache(async (orgId: string) => {
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  return orgLimit;
});
