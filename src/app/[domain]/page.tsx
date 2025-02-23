import { getPageByDomain } from "@/lib/actions/page";
import { notFound } from "next/navigation";
import EditorProvider from "../providers/editor-provider";
import PageEditor from "../components/editor/page-editor";

async function Page({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const domainData = await getPageByDomain(domain.toString());
  if (!domainData.success || !domainData.page) return notFound();

  return (
    <EditorProvider pageDetails={domainData.page} pageId={domainData.page.id}>
      <PageEditor pageId={domainData.page.id} liveMode />
    </EditorProvider>
  );
}

export default Page;
