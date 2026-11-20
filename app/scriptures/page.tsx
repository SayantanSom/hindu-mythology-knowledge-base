import Link from "next/link";
import { db } from "../../lib/db";
export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ q?: string }> };
export default async function ScripturesPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const search = q.trim().slice(0,100);
  const scriptures = await db.scripture.findMany({
    where: search ? { OR: [
      { title: { contains: search, mode: "insensitive" } },
      { transliteration: { contains: search, mode: "insensitive" } },
      { titleOriginal: { contains: search, mode: "insensitive" } },
    ] } : undefined,
    include: { categories: { include: { category: true } } },
    orderBy: { title: "asc" },
    take: 100,
  });
  return <>
    <div className="topline"><div><h1>Scripture catalogue</h1><p className="muted">Research records · {scriptures.length}{search ? " matching" : ""} shown</p></div><Link href="/scriptures/new" className="button">+ Add scripture</Link></div>
    <form method="GET" className="panel actions"><input name="q" aria-label="Search scriptures" placeholder="Search title or transliteration" defaultValue={search} style={{flex:1,minWidth:200}}/><button type="submit">Search</button>{search && <Link href="/scriptures">Clear</Link>}</form>
    <div className="panel" style={{overflowX:"auto"}}><table><thead><tr><th>Scripture</th><th>Language</th><th>Classifications</th><th>Status</th></tr></thead><tbody>
      {scriptures.map(s=><tr key={s.id}><td><Link href={"/scriptures/"+s.slug}><strong>{s.title}</strong></Link><div className="muted">{s.titleOriginal}</div></td><td>{s.languageCode}</td><td>{s.categories.map(c=><span className="tag" key={c.categoryId}>{c.category.name}</span>)}</td><td>{s.status.replaceAll("_"," ")}</td></tr>)}
      {!scriptures.length && <tr><td colSpan={4}>No matching scriptures found.</td></tr>}
    </tbody></table></div>
    <p className="muted">This catalogue contains provisional metadata. It does not yet contain verified passage-level citations.</p>
  </>;
}
