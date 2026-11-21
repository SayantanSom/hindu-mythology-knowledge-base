import Link from "next/link";
import {notFound} from "next/navigation";
import {getWikiPage,listWikiPages} from "../../../lib/wiki";
import {ArticleMarkdown} from "../../components/ArticleMarkdown";
export async function generateStaticParams(){return (await listWikiPages()).map(p=>({slug:p.slug}));}
export default async function TopicPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const page=await getWikiPage(slug);if(!page)notFound();
 const linked=await Promise.all(page.links.map(getWikiPage));
 return <article><p className="muted">Encyclopedia / {page.kind}</p><h1>{page.title}</h1>
 <p>{page.overview}</p><section className="panel"><ArticleMarkdown body={page.body}/></section>
 {page.accounts.length>0&&<section className="panel"><h2>Scriptural references and accounts</h2>{page.accounts.map(a=><section key={a.id}><h3>{a.scripture} · {a.locator}</h3><p>{a.explanation}</p><p className="muted">Speaker: {a.speaker||"Not specified"} · Questioner: {a.questioner||"Not specified"} · {a.status||"Working source"}</p>{a.url&&<p><a href={a.url} target="_blank" rel="noopener noreferrer">Read the cited source ↗</a></p>}</section>)}</section>}
 {linked.some(Boolean)&&<section className="panel"><h2>Related articles</h2><div className="actions">{linked.filter((p):p is NonNullable<typeof p>=>p!==null).map(p=><Link className="tag" key={p.id} href={`/topics/${p.slug}`}>{p.title}</Link>)}</div></section>}
 <p><Link href="/topics">All articles</Link></p></article>;
}
