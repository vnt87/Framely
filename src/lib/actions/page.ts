"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Page } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

type PageProps = {
  title: string;
  subdomain: string;
};

export async function createPage({ title, subdomain }: PageProps) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  const existingPage = await db.page.findFirst({
    where: { subdomain: subdomain },
  });

  if (existingPage) {
    return { success: false, msg: "Subdomain is already in use" };
  }

  try {
    const page = await db.page.create({
      data: { userId: userId, title: title, subdomain: subdomain },
    });
    return { success: true, page: page };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

type UpsertProps = Partial<Page>;

export async function upsertPage({
  id,
  title,
  subdomain,
  previewImage,
  content,
  visible,
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
      visible: visible,
    },
  });

  revalidateTag(page.subdomain);

  return { success: true, page: page };
}

export async function deletePage(pageId: string) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  try {
    const response = await db.page.delete({
      where: {
        id: pageId,
        userId: userId,
      },
    });

    revalidateTag(response.subdomain);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getPageDetails(pageId: string) {
  try {
    const res = await db.page.findUnique({ where: { id: pageId } });
    if (!res) {
      throw new Error("Database Error");
    }
    return { success: true, content: res.content };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export const getPageByDomain = async (subdomainName: string) => {
  try {
    const response = await unstable_cache(
      async () => {
        const response = await db.page.findUnique({
          where: {
            subdomain: subdomainName,
          },
        });

        return response;
      },
      [subdomainName],
      {
        revalidate: 900, // 15 Minutes
        tags: [subdomainName],
      }
    )();

    if (!response) {
      return { success: false, msg: "Page not found" };
    }

    if (!response.visible) {
      const session = await auth();
      if (!(session.userId === response.userId))
        return {
          success: true,
          msg: "The requested page is private (for now), come back later!",
          private: true,
        };

      return { success: true, page: response };
    }

    return { success: true, page: response };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
