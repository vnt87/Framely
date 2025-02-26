import { getPageByDomain } from "@/lib/actions/page";
import { notFound } from "next/navigation";
import EditorProvider from "../providers/editor-provider";
import PageEditor from "../components/editor/page-editor";
import { Suspense } from "react";

function LoadingState() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
}

async function Page({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const response = await getPageByDomain(domain.toString());
  if (!response.success) return notFound();

  if (response.private) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-xl font-medium text-gray-900">{response.msg}</h1>
      </div>
    );
  }

  if (!response.page) return notFound();

  return (
    <Suspense fallback={<LoadingState />}>
      <EditorProvider pageDetails={response.page} pageId={response.page.id}>
        <PageEditor pageId={response.page.id} liveMode />
      </EditorProvider>
    </Suspense>
  );
}

export default Page;
