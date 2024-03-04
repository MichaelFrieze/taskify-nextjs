import { Separator } from "@/components/ui/separator";
import { SkeletonInfo } from "./_components/info";
import { BoardListSkeleton } from "./_components/board-list";

export default function Loading() {
  return (
    <div className="mb-20 w-full">
      <SkeletonInfo />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardListSkeleton />
      </div>
    </div>
  );
}
