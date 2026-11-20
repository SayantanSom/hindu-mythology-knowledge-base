import ScriptureForm from "../ScriptureForm";
import { createScripture } from "../actions";
import { db } from "../../../lib/db";
export const dynamic = "force-dynamic";
export default async function NewScripture() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return <><h1>Add scripture</h1><p className="muted">Enter bibliographic metadata; leave uncertain fields blank.</p><ScriptureForm categories={categories} action={createScripture}/></>;
}
