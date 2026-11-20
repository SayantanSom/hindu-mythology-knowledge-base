import Link from "next/link";
import {notFound} from "next/navigation";
import {db} from "../../../lib/db";
import {saveArticle} from "../actions";
export const dynamic="force-dynamic";
export default async function Editor({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<{saved?:string}>}){
 if(process.env.NODE_ENV!=="development")return <section className="panel"><h1>Editor unavailable</h1><p>Authentication is required before editing can be enabled on a deployed site.</p></section>;
 const {slug}=await params;const {saved}=await searchParams;
 const topic=await db.encyclopediaTopic.findUnique({where:{slug},include:{articles:{include:{revisions:{orderBy:{createdAt:"desc"},take:8}}}}});
 if(!topic||!topic.articles[0])notFound();
 const article=topic.articles[0];
 return <div><p className="muted">Local encyclopedia editor</p><h1>Edit {topic.title}</h1>
 <p><Link href={`/topics/${slug}`}>View topic page</Link> · <Link href="/editor">All articles</Link></p>
 {saved==="1"&&<p className="panel">Saved to PostgreSQL. Refresh the topic page to see your changes. No Git pull needed.</p>}
 <form action={saveArticle} className="panel"><input type="hidden" name="slug" value={slug}/>
 <div className="field"><label htmlFor="body">Article body (Markdown)</label><textarea id="body" name="body" rows={24} style={{minHeight:520,fontFamily:"monospace"}} defaultValue={article.body} required/></div>
 <div className="field"><label htmlFor="state">Editorial status</label><select id="state" name="state" defaultValue={article.state}><option value="DRAFT">Draft</option><option value="IN_REVIEW">In review</option><option value="PUBLISHED">Published</option></select></div>
 <button type="submit">Save article and revision</button>
 <p className="muted">Supported Markdown: headings (#, ##, ###), paragraphs, bold, italic, and bullet or numbered lists. Scriptural accounts and references remain separate records. Local development only; do not expose this editor publicly without authentication.</p>
 </form><section className="panel"><h2>Recent revisions</h2>{article.revisions.map(r=><p key={r.id}>{r.createdAt.toLocaleString("en-GB")} · {r.state} · {r.note||"Revision saved"}</p>)}</section></div>;
}
