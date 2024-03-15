import Link from "next/link";
import { User2 } from "lucide-react";

import { getBoards } from "@/lib/get-boards";
import { MAX_FREE_BOARDS } from "@/constants/boards";

import { FormPopover } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardListProps {
  orgId: string;
  availableCount: number;
  isPro: boolean;
}

export const BoardList = async ({
  orgId,
  availableCount,
  isPro,
}: BoardListProps) => {
  const boards = await getBoards(orgId);

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}?orgId=${orgId}`}
            className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <div className="md:hidden">
          <FormPopover sideOffset={10}>
            <div
              role="button"
              className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
            >
              <p className="text-sm">Create new board</p>
              <span className="text-xs">
                {isPro
                  ? "Unlimited"
                  : `${MAX_FREE_BOARDS - availableCount} remaining`}
              </span>
            </div>
          </FormPopover>
        </div>
        <div className="hidden md:block">
          <FormPopover sideOffset={10} side="right">
            <div
              role="button"
              className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
            >
              <p className="text-sm">Create new board</p>
              <span className="text-xs">
                {isPro
                  ? "Unlimited"
                  : `${MAX_FREE_BOARDS - availableCount} remaining`}
              </span>
            </div>
          </FormPopover>
        </div>
      </div>
    </div>
  );
};

export const BoardListSkeleton = () => {
  return (
    <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
