import { db } from "@/lib/db";
import EditorProvider from "@/app/providers/editor-provider";
import React from "react";
import EditorNavigation from "../../components/editor/editor-navigation";
import EditorSidebar from "@/app/components/editor/editor-sidebar";
import { auth } from "@clerk/nextjs/server";
import PageEditor from "@/app/components/editor/page-editor";
import { SignIn } from "@clerk/nextjs";

type Props = {
  params: Promise<{
    pageId: string;
  }>;
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
    return <SignIn />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <EditorProvider pageId={pageId} pageDetails={pageDetails}>
        <EditorNavigation pageDetails={pageDetails} />
        <div className="flex justify-center flex-1 overflow-hidden">
          <PageEditor pageId={pageId} />
        </div>
        <EditorSidebar />
      </EditorProvider>
    </div>
  );
};

export default Page;
