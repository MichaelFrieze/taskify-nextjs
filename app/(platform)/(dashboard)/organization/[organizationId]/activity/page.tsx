import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "../_components/info";
import {
  ActivityList,
  ActivityListSkeleton,
} from "./_components/activity-list";

const ActivityPage = async () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityListSkeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
