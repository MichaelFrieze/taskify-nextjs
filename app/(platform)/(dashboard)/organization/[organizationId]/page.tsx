import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="mb-20 w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationIdPage;
