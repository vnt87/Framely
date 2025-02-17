import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatTimeAgo } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import NewPageModal from "./new-page-modal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function PageList() {
  const { userId } = await auth();
  const posts = await db.page.findMany({ where: { userId: userId || "" } });

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Pages</h1>
            <NewPageModal />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {posts.map((page) => (
              <a
                className="w-full rounded-lg p-4 bg-muted border hover:shadow-lg flex justify-between items-center hover:cursor-pointer hover:brightness-150 transition-all duration-300"
                key={page.title}
                href={`/editor/${page.id}`}
              >
                <div>
                  <h2 className="text-xl font-semibold">{page.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {formatTimeAgo(Number(page.updatedAt))}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageList;
