import { db } from "@/lib/db";
import EditorProvider from "@/app/providers/editor-provider";
import { redirect } from "next/navigation";
import React from "react";
import EditorNavigation from "../../components/editor/editor-navigation";

type Props = {
  params: {
    pageId: string;
  };
};

const Page = async ({ params }: Props) => {
  const { pageId } = await params;
  const pageDetails = await db.page.findFirst({
    where: {
      id: pageId,
    },
  });

  if (!pageDetails) {
    return redirect("/");
  }

  return (
    <div className="overflow-hidden">
      <EditorProvider pageId={pageId} pageDetails={pageDetails}>
        <EditorNavigation pageId={pageId} pageDetails={pageDetails} />
      </EditorProvider>
    </div>
  );
};

export default Page;
