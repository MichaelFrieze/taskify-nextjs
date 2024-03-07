import { clerkClient, auth } from "@clerk/nextjs";

export const getOrg = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return null;
  }

  const organizationId = orgId;

  const organization = await clerkClient.organizations.getOrganization({
    organizationId,
  });

  return organization;
};
