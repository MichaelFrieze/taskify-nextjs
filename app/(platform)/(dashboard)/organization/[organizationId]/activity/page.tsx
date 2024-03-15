import { redirect } from "next/navigation";

import { getOrgById } from "@/lib/get-org-by-id";
import { checkSubscription } from "@/lib/subscription";

import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";
import { Separator } from "@/components/ui/separator";

const ActivityPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const org = await getOrgById(params.organizationId);

  if (!org) {
    redirect("/select-org");
  }

  const isPro = await checkSubscription(params.organizationId);

  return (
    <div className="w-full">
      <Info org={org} isPro={isPro} />
      <Separator className="my-2" />
      <ActivityList orgId={org.id} />
    </div>
  );
};

export default ActivityPage;
