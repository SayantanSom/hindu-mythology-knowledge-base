import Link from "next/link";
import {notFound} from "next/navigation";
import {getScripture,listScriptures} from "../../../lib/scriptures";
import {getWikiPage} from "../../../lib/wiki";
export async function generateStaticParams(){return (await listScriptures()).map(s=>({slug:s.slug}));}
export default async function ScriptureDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const scripture=await getScripture(slug);if(!scripture)notFound();
 return <article><p><Link href="/scriptures">← All scriptures</Link></p><h1>{scripture.title}</h1><p className="muted">{scripture.subtitle}</p><p>{scripture.overview}</p>
 <section className="panel"><h2>Chapters</h2>{await Promise.all(scripture.chapters.map(async chapter=><section key={chapter.number}><h3>Chapter {chapter.number}</h3>{chapter.sections.length?await Promise.all(chapter.sections.map(async section=><div key={section.number}><h4>Section {chapter.number}.{section.number} — {section.title}</h4><p>{section.description}</p><p className="muted">Reference: {section.reference}</p><div className="actions">{(await Promise.all(section.links.map(getWikiPage))).filter((x):x is NonNullable<typeof x>=>x!==null).map(p=><Link className="tag" key={p.id} href={`/topics/${p.slug}`}>{p.title}</Link>)}</div><p><a href={section.sourceUrl} target="_blank" rel="noopener noreferrer">Read cited passage ↗</a></p></div>)):null}{!chapter.sections.length&&<p className="muted">English reading content not yet prepared.</p>}</section>))}</section>
 <section className="panel"><h2>References</h2>{scripture.references.map(r=><p key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.label} ↗</a></p>)}</section></article>;
}
