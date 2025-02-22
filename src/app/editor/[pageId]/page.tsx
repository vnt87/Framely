import { db } from "@/lib/db";
import EditorProvider from "@/app/providers/editor-provider";
import { redirect } from "next/navigation";
import React from "react";
import EditorNavigation from "../../components/editor/editor-navigation";
import EditorSidebar from "@/app/components/editor/editor-sidebar";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: {
    pageId: string;
  };
};

const Page = async ({ params }: Props) => {
  const session = await auth();

  const { pageId } = await params;
  const pageDetails = await db.page.findFirst({
    where: {
      id: pageId,
    },
  });

  // TODO: Display access denied page, add ability for users to request access (?)
  if (!pageDetails || !(session.userId === pageDetails.userId)) {
    return redirect("/");
  }

  return (
    <div className="overflow-hidden">
      <EditorProvider pageId={pageId} pageDetails={pageDetails}>
        <EditorNavigation pageId={pageId} pageDetails={pageDetails} />
        <EditorSidebar userId={session.userId} />
      </EditorProvider>
    </div>
  );
};

export default Page;
