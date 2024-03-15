import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getOrgById } from "./get-org-by-id";
import { getOrgSubscription } from "./get-org-subscription";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (paramsOrgId?: string) => {
  let orgSubscription;

  if (paramsOrgId) {
    const org = await getOrgById(paramsOrgId);

    if (!org) {
      redirect("/select-org");
    }

    orgSubscription = await getOrgSubscription(org.id);
  } else {
    const { orgId } = auth();

    if (!orgId) {
      return false;
    }

    orgSubscription = await getOrgSubscription(orgId);
  }

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
