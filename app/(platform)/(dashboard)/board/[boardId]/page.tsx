import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getOrgById } from "@/lib/get-org-by-id";
import { getLists } from "@/lib/get-lists";

import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const BoardIdPage = async ({ params, searchParams }: BoardIdPageProps) => {
  let orgId: string;

  if (Array.isArray(searchParams.orgId)) {
    redirect("/select-org");
  } else if (!searchParams.orgId) {
    const { orgId: activeOrgId } = auth();

    if (!activeOrgId) {
      redirect("/select-org");
    }

    orgId = activeOrgId;
  } else {
    const org = await getOrgById(searchParams.orgId);

    if (!org) {
      redirect("/select-org");
    }

    orgId = org.id;
  }

  const lists = await getLists(params.boardId, orgId);

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
