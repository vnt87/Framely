"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

type PageProps = {
  title: string;
  subdomain: string;
};

export async function createPage({ title, subdomain }: PageProps) {
  const { userId } = await auth();

  if (!userId) return { error: "User not signed in" };

  const page = await db.page.create({
    data: { userId: userId, title: title, subdomain: subdomain },
  });

  return { page };
}
