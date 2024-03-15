import { redirect } from "next/navigation";

import { getOrgById } from "@/lib/get-org-by-id";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

import { Info } from "../_components/info";
import { BoardList } from "./_components/board-list";
import { Separator } from "@/components/ui/separator";

const BoardsPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const org = await getOrgById(params.organizationId)

  if (!org) {
    redirect("/select-org");
  }

  const availableCount = await getAvailableCount(params.organizationId);
  const isPro = await checkSubscription(params.organizationId);

  return (
    <div className="mb-20 w-full">
      <Info org={org} isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList
          orgId={org.id}
          availableCount={availableCount}
          isPro={isPro}
        />
      </div>
    </div>
  );
};

export default BoardsPage;
