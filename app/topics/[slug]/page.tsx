import Link from "next/link";
import {notFound} from "next/navigation";
import {findTopic,topics} from "../../../lib/research/topics";
export function generateStaticParams(){return topics.map(t=>({slug:t.slug}))}
export default async function TopicPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const topic=findTopic(slug);if(!topic)notFound();
 return <article>
 <p className="muted">Encyclopedia / {topic.kind==="group"?"Groups and concepts":"Stories and dialogues"} / Research draft</p>
 <h1>{topic.title}</h1><section className="panel"><h2>Overview</h2><p>{topic.overview}</p></section>
 <section className="panel"><h2>Accounts by scripture</h2><p className="muted">Each account is kept separate so later traditions can be compared without replacing earlier explanations.</p>
 {topic.accounts.map(a=><div key={a.id} style={{borderTop:"1px solid #dce5df",padding:"20px 0"}}>
 <h3>{a.scripture} · {a.locator}</h3><p><strong>{a.summary}</strong></p><p>{a.explanation}</p>
 <p><strong>Speaker:</strong> {a.speaker} · <strong>Questioner:</strong> {a.questioner}</p>
 <p className="muted">Working source · Sanskrit base edition and recension unverified</p>
 <a href={a.url} target="_blank" rel="noopener noreferrer">Read the source passage ↗</a>
 </div>)}
 </section>
 {topic.slug==="eleven-rudras"&&<section className="panel"><h2>Future scriptural comparisons</h2><p>Bhāgavata Purāṇa, Mahābhārata and other accounts will be added after their exact passages, names, narrative speakers and edition details are reviewed. They are not yet represented as verified accounts.</p></section>}
 <section className="panel"><h2>Explore related topics</h2><div className="actions">{topic.related.map(r=><Link key={r.href} href={r.href} className="tag">{r.title}</Link>)}</div></section>
 <p><Link href="/topics">All encyclopedia topics</Link></p>
 </article>;
}
