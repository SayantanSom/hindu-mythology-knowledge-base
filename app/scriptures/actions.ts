"use server";

import { ResearchStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../../lib/db";

const allowedStatuses = new Set(Object.values(ResearchStatus));
function value(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}
function parse(form: FormData) {
  const title = value(form, "title");
  const slug = value(form, "slug").toLowerCase();
  const languageCode = value(form, "languageCode").toLowerCase();
  const status = value(form, "status") as ResearchStatus;
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !/^[a-z]{2,3}$/.test(languageCode)) {
    throw new Error("Title, valid URL slug and ISO language code are required.");
  }
  if (!allowedStatuses.has(status)) throw new Error("Invalid research status.");
  const categories = form.getAll("categories").map(String);
  return {
    data: {
      title, slug, languageCode, status,
      titleOriginal: value(form, "titleOriginal") || null,
      transliteration: value(form, "transliteration") || null,
      scriptCode: value(form, "scriptCode") || null,
      traditionalAuthor: value(form, "traditionalAuthor") || null,
      historicalNotes: value(form, "historicalNotes") || null,
      summary: value(form, "summary") || null,
    },
    categories,
  };
}
export async function createScripture(form: FormData) {
  const { data, categories } = parse(form);
  const created = await db.scripture.create({
    data: { ...data, categories: { create: categories.map(categoryId => ({
      category: { connect: { id: categoryId } },
      rationale: "Working classification; requires source review",
    })) } },
  });
  revalidatePath("/scriptures");
  redirect("/scriptures/" + created.slug);
}
export async function updateScripture(id: string, form: FormData) {
  const { data, categories } = parse(form);
  const existing = await db.scripture.findUniqueOrThrow({ where: { id } });
  await db.$transaction(async tx => {
    await tx.scriptureCategory.deleteMany({ where: { scriptureId: id } });
    await tx.scripture.update({
      where: { id },
      data: { ...data, categories: { create: categories.map(categoryId => ({
        category: { connect: { id: categoryId } },
        rationale: "Working classification; requires source review",
      })) } },
    });
  });
  revalidatePath("/scriptures");
  revalidatePath("/scriptures/" + existing.slug);
  redirect("/scriptures/" + data.slug);
}
