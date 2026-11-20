import { Category, ResearchStatus, Scripture } from "@prisma/client";
import Link from "next/link";
type Props = {
  categories: Category[];
  scripture?: Scripture & { categories: { categoryId: string }[] };
  action: (form: FormData) => Promise<void>;
};
const statuses = Object.values(ResearchStatus);
export default function ScriptureForm({ categories, scripture, action }: Props) {
  const selected = new Set(scripture?.categories.map(c => c.categoryId) ?? []);
  return <form action={action} className="panel">
    <div className="grid">
      <div className="field"><label htmlFor="title">Title *</label><input id="title" name="title" required defaultValue={scripture?.title}/></div>
      <div className="field"><label htmlFor="slug">URL slug *</label><input id="slug" name="slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" required defaultValue={scripture?.slug} placeholder="example-upanishad"/></div>
      <div className="field"><label htmlFor="titleOriginal">Original-script title</label><input id="titleOriginal" name="titleOriginal" defaultValue={scripture?.titleOriginal ?? ""}/></div>
      <div className="field"><label htmlFor="transliteration">Transliteration</label><input id="transliteration" name="transliteration" defaultValue={scripture?.transliteration ?? ""}/></div>
      <div className="field"><label htmlFor="languageCode">Language code (ISO 639) *</label><input id="languageCode" name="languageCode" required defaultValue={scripture?.languageCode ?? "sa"}/></div>
      <div className="field"><label htmlFor="scriptCode">Script code (ISO 15924)</label><input id="scriptCode" name="scriptCode" defaultValue={scripture?.scriptCode ?? ""} placeholder="Deva"/></div>
      <div className="field"><label htmlFor="traditionalAuthor">Traditional attribution</label><input id="traditionalAuthor" name="traditionalAuthor" defaultValue={scripture?.traditionalAuthor ?? ""}/></div>
      <div className="field"><label htmlFor="status">Research status</label><select id="status" name="status" defaultValue={scripture?.status ?? "PROPOSED"}>{statuses.map(s=><option key={s} value={s}>{s.replaceAll("_"," ")}</option>)}</select></div>
    </div>
    <div className="field"><label htmlFor="summary">Summary / editorial notes</label><textarea id="summary" name="summary" defaultValue={scripture?.summary ?? ""}/></div>
    <div className="field"><label htmlFor="historicalNotes">Historical / dating notes</label><textarea id="historicalNotes" name="historicalNotes" defaultValue={scripture?.historicalNotes ?? ""}/></div>
    <h2>Working classifications</h2>
    <p className="muted">Multiple categories are allowed. Classification evidence will be added in a later iteration.</p>
    <div className="checklist">{categories.map(c=><label key={c.id} className="checkline"><input type="checkbox" name="categories" value={c.id} defaultChecked={selected.has(c.id)}/>{c.name}</label>)}</div>
    <div className="actions" style={{marginTop:24}}><button type="submit">{scripture ? "Save changes" : "Create scripture"}</button><Link href="/scriptures" className="button secondary">Cancel</Link></div>
  </form>;
}
