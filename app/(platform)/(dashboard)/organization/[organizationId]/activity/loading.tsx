import { Separator } from "@/components/ui/separator";

import { InfoSkeleton } from "../_components/info";
import { ActivityListSkeleton } from "./_components/activity-list";

export default function Loading() {
  return (
    <div className="w-full">
      <InfoSkeleton />
      <Separator className="my-2" />
      <ActivityListSkeleton />
    </div>
  );
}
