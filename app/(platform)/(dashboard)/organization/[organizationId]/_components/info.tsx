import Image from "next/image";
import { checkSubscription } from "@/lib/subscription";
import { getOrg } from "@/lib/get-org";
import { CreditCard } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export const Info = async () => {
  const isPro = await checkSubscription();
  const organization = await getOrg();

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-3 w-3" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
