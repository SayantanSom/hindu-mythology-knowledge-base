import Link from "next/link";
import {notFound} from "next/navigation";
import {db} from "../../../lib/db";
import {ArticleMarkdown} from "../../components/ArticleMarkdown";
export const dynamic="force-dynamic";
export default async function TopicPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const topic=await db.encyclopediaTopic.findUnique({where:{slug},include:{articles:true,accounts:{include:{scripture:true}},linksFrom:{include:{to:true}}}});
 if(!topic)notFound();
 const article=topic.articles[0];
 return <article>
 <p className="muted">Encyclopedia / {topic.kind==="group"?"Groups and concepts":"Stories and dialogues"} / {article?.state==="PUBLISHED"?"Published":"Research draft"}</p>
 <h1>{topic.title}</h1>
 <section className="panel"><h2>Overview</h2><p>{topic.overview}</p></section>
 {article&&<section className="panel"><h2>Explanation</h2><ArticleMarkdown body={article.body}/></section>}
 <section className="panel"><h2>Scriptural accounts and references</h2><p className="muted">These are separate, source-linked research records. A working source is not a verified Sanskrit base edition.</p>
 {topic.accounts.map(a=><div key={a.id} style={{borderTop:"1px solid #dce5df",padding:"16px 0"}}>
 <h3>{a.scripture?.title||"Bṛhadāraṇyaka Upaniṣad"} · {a.locator}</h3>
 <p>{a.explanation}</p>
 <p><strong>Speaker:</strong> {a.speaker||"Not established"} · <strong>Questioner:</strong> {a.questioner||"Not established"}</p>
 <p className="muted">Source status: {a.sourceStatus} · Sanskrit edition/recension unverified</p>
 {a.sourceUrl&&<a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">Read source ↗</a>}
 </div>)}
 </section>
 {topic.linksFrom.length>0&&<section className="panel"><h2>Related topics</h2><div className="actions">{topic.linksFrom.map(l=><Link key={l.toId} href={`/topics/${l.to.slug}`} className="tag">{l.to.title}</Link>)}</div></section>}
 {process.env.NODE_ENV==="development"&&<p><Link href={`/editor/${slug}`}>Edit this article locally</Link></p>}
 <p><Link href="/topics">All encyclopedia topics</Link></p>
 </article>;
}
