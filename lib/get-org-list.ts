import { clerkClient } from "@clerk/nextjs";

export const getOrgList = async () => {
  // This gives a list of all user organizations and can be a security risk
  const orgList = await clerkClient.organizations.getOrganizationList({});

  return orgList;
};
