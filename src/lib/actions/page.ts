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
      msg: error instanceof Error ? error.message : "An unknown error occured",
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

export async function deletePage(pageId: string) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  try {
    await db.page.delete({
      where: {
        id: pageId,
        userId: userId,
      },
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occured",
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
      msg: error instanceof Error ? error.message : "An unknown error occured",
    };
  }
}

export const getPageByDomain = async (subdomainName: string) => {
  try {
    const response = await db.page.findUnique({
      where: {
        subdomain: subdomainName,
      },
    });

    if (!response) {
      return { success: false, msg: "Page not found" };
    }

    return { success: true, page: response };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occured",
    };
  }
};
