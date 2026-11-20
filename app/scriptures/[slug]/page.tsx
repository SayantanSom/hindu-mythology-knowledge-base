import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "../../../lib/db";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export default async function ScriptureDetail({ params }: Props) {
  const { slug } = await params;
  const s = await db.scripture.findUnique({ where: { slug }, include: { categories: { include: { category: true } }, recensions: true } });
  if (!s) notFound();
  return <>
    <div className="topline"><div><Link href="/scriptures">← Catalogue</Link><h1>{s.title}</h1><p className="muted">{s.transliteration} · {s.languageCode} · {s.status.replaceAll("_"," ")}</p></div><Link className="button" href={"/scriptures/"+s.slug+"/edit"}>Edit metadata</Link></div>
    <section className="panel"><h2>Bibliographic identity</h2><p><strong>Original title:</strong> {s.titleOriginal || "Not recorded"}</p><p><strong>Script:</strong> {s.scriptCode || "Not recorded"}</p><p><strong>Traditional attribution:</strong> {s.traditionalAuthor || "Not recorded"}</p><p><strong>Summary:</strong> {s.summary || "Not recorded"}</p><p><strong>Historical notes:</strong> {s.historicalNotes || "Not recorded"}</p></section>
    <section className="panel"><h2>Classifications</h2>{s.categories.length ? s.categories.map(c=><span key={c.categoryId} className="tag">{c.category.name}</span>) : <p className="muted">No classifications assigned.</p>}</section>
    <section className="panel"><h2>Recensions and evidence</h2><p className="muted">{s.recensions.length} recensions recorded. Edition-aware passages and source claims will be managed in a later release.</p></section>
  </>;
}
