import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getOrgById } from "./get-org-by-id";
import { getOrgLimit } from "./get-org-limit";
import { db } from "@/lib/db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await getOrgLimit(orgId);

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await getOrgLimit(orgId);

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await getOrgLimit(orgId);

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async (paramsOrgId?: string) => {
  if (paramsOrgId) {
    const org = await getOrgById(paramsOrgId);

    if (!org) {
      redirect("/select-org");
    }

    const orgLimit = await getOrgLimit(org.id);

    if (!orgLimit) {
      return 0;
    }

    return orgLimit.count;
  } else {
    const { orgId } = auth();

    if (!orgId) {
      return 0;
    }

    const orgLimit = await getOrgLimit(orgId);

    if (!orgLimit) {
      return 0;
    }

    return orgLimit.count;
  }
};
