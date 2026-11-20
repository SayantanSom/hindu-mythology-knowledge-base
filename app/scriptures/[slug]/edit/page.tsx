import { notFound } from "next/navigation";
import { db } from "../../../../lib/db";
import ScriptureForm from "../../ScriptureForm";
import { updateScripture } from "../../actions";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export default async function EditScripture({ params }: Props) {
  const { slug } = await params;
  const [scripture, categories] = await Promise.all([
    db.scripture.findUnique({ where: { slug }, include: { categories: true } }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!scripture) notFound();
  const action = updateScripture.bind(null, scripture.id);
  return <><h1>Edit {scripture.title}</h1><p className="muted">Changes are saved to your local PostgreSQL database.</p><ScriptureForm categories={categories} scripture={scripture} action={action}/></>;
}
