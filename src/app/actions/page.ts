"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Page } from "@prisma/client";

type PageProps = {
  title: string;
  subdomain: string;
};

export async function createPage({ title, subdomain }: PageProps) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  const page = await db.page.create({
    data: { userId: userId, title: title, subdomain: subdomain },
  });

  return { success: true, page: page };
}

type UpsertProps = Partial<Page>;

export async function upsertPage({
  id,
  title,
  subdomain,
  previewImage,
  content,
}: UpsertProps) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  const page = await db.page.update({
    where: { id: id, userId: userId },
    data: {
      id: id,
      title: title,
      subdomain: subdomain,
      previewImage: previewImage,
      content: content,
    },
  });

  return { success: true, page: page };
}
