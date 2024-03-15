import { redirect } from "next/navigation";

import { checkSubscription } from "@/lib/subscription";
import { getOrgById } from "@/lib/get-org-by-id";

import { SubscriptionButton } from "./_components/subscription-button";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";

const BillingPage = async ({
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
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
