"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePage } from "@/lib/actions/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Globe, Clock, ExternalLink } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { Page } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function PageItem({ page }: { page: Page }) {
  const router = useRouter();

  const handleDelete = async (pageId: string) => {
    const result = await deletePage(pageId);
    if (result.success) {
      toast.success("Success", { description: "Page deleted successfully" });
    } else {
      toast.error("Error", { description: "Failed to delete page" });
    }

    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 group">
        <div className="flex-1">
          <Link
            href={`http://editor.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                {page.title}
              </h2>
              <ExternalLink className="w-4 h-4 opacity-0 transition-opacity group-hover:opacity-50" />
            </div>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-accent/50"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive"
              onClick={() => handleDelete(page.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm gap-x-6 gap-y-0 text-muted-foreground">
          <div className="flex items-center gap-2 group hover:cursor-pointer">
            <Globe className="flex-shrink-0 w-4 h-4 mt-1 group-hover:text-primary" />
            <Link
              href={`https://${page.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-primary"
            >
              {page.subdomain}.framely.site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="flex-shrink-0 w-4 h-4 mt-1" />
            <span>Updated {formatTimeAgo(Number(page.updatedAt))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PageItem;
