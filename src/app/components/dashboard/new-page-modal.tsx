"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { createPage } from "@/app/actions/page";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function NewPageModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createPage({ title, subdomain });
    if (res.success === false) {
      toast("Error", { description: res.msg });
      return;
    } else if (res.page) {
      toast("Success", { description: title + " has been created." });
      redirect(`/editor/${res.page.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Page</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
          <DialogDescription>
            Enter the details for your new page.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subdomain">Subdomain</Label>
              <div className="flex">
                <Input
                  id="subdomain"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="rounded-r-none"
                />
                <div className="inline-flex items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                  .framely.site
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Button type="submit" className="w-full">
              Create Page
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
