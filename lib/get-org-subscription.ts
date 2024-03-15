import { cache } from "react";
import { db } from "./db";

export const getOrgSubscription = cache(async (orgId: string) => {
  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  return orgSubscription;
});
