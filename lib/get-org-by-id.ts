import { clerkClient, auth } from "@clerk/nextjs";
import { cache } from "react";

const getCachedOrg = cache(async (organizationId: string) => {
  const org = await clerkClient.organizations.getOrganization({
    organizationId,
  });

  return org;
});

export const getOrgById = async (organizationId: string) => {
  try {
    const organization = await getCachedOrg(organizationId);

    const { userId } = auth();
    const orgCreatedBy = organization.createdBy;

    if (orgCreatedBy === userId) {
      return organization;
    }

    if (!userId) {
      return null;
    }

    const memberships =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId,
      });

    const memberUserIdList = memberships.map(
      (membership) => membership.publicUserData?.userId,
    );

    if (memberUserIdList?.includes(userId)) {
      return organization;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
