import Link from "next/link";
import {notFound} from "next/navigation";
import {getWikiPage,listWikiPages} from "../../../lib/wiki";
import {ArticleMarkdown} from "../../components/ArticleMarkdown";
export async function generateStaticParams(){return (await listWikiPages()).map(p=>({slug:p.slug}));}
export default async function TopicPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const page=await getWikiPage(slug);if(!page)notFound();
 const linked=await Promise.all(page.links.map(getWikiPage));
 const sections=[{id:"overview",title:"Overview"},{id:"article",title:"The account"},...(page.accounts.length?[{id:"sources",title:"Scriptural accounts"}]:[]),{id:"related",title:"Related reading"}];
 return <div className="article-shell">
 <aside className="article-rail" aria-label="Library navigation"><h2>Explore the library</h2><Link href="/topics">All articles</Link><Link href="/topics/eleven-rudras">Eleven Rudras</Link><Link href="/topics/eight-vasus">Eight Vasus</Link><Link href="/topics/twelve-adityas">Twelve Ādityas</Link><Link href="/scriptures">Scriptures</Link><Link href="/articles/33-vedic-deities">Thirty-three deities</Link></aside>
 <article className="article-main"><header className="article-header" id="overview"><p className="eyebrow">Encyclopedia / {page.kind}</p><h1>{page.title}</h1><p className="lead">{page.overview}</p><p className="article-kicker">Scripture-referenced encyclopedia article</p></header>
 <section className="article-section article-prose" id="article"><ArticleMarkdown body={page.body}/></section>
 {page.accounts.length>0&&<section className="article-section" id="sources"><p className="eyebrow">Textual traditions</p><h2>Scriptural references and accounts</h2>{page.accounts.map(a=><section className="article-ref" key={a.id}><strong>{a.scripture} · {a.locator}</strong><p>{a.explanation}</p><span>{a.speaker?"Speaker: "+a.speaker+" · ":""}{a.questioner?"Questioner: "+a.questioner+" · ":""}{a.status||"Working source"}</span>{a.url&&<a href={a.url} target="_blank" rel="noopener noreferrer">Read the cited source ↗</a>}</section>)}</section>}
 <section className="article-related" id="related"><p className="eyebrow">Continue exploring</p><h2>Related reading</h2>{linked.filter((p):p is NonNullable<typeof p>=>p!==null).map(p=><Link className="tag" key={p.id} href={`/topics/${p.slug}`}>{p.title}</Link>)}<p><Link href="/topics">← All articles</Link></p></section></article>
 <aside className="article-rail" aria-label="Article navigation"><div className="article-side-card"><h2>On this page</h2>{sections.map(s=><a key={s.id} href={`#${s.id}`}>{s.title}</a>)}</div><div className="article-side-card"><h2>Reading note</h2><p>Different scriptures may offer different accounts. Each source is identified separately rather than combined into a single narrative.</p></div></aside>
 </div>;
}