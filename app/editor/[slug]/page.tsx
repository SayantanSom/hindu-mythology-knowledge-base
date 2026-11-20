import Link from "next/link";
import {notFound} from "next/navigation";
import {db} from "../../../lib/db";
import {saveArticle,saveSourceAccount} from "../actions";
export const dynamic="force-dynamic";
export default async function Editor({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<{saved?:string;accountSaved?:string}>}){
 if(process.env.NODE_ENV!=="development")return <section className="panel"><h1>Editor unavailable</h1><p>Authentication is required before editing can be enabled on a deployed site.</p></section>;
 const {slug}=await params;const {saved,accountSaved}=await searchParams;
 const topic=await db.encyclopediaTopic.findUnique({where:{slug},include:{articles:{include:{revisions:{orderBy:{createdAt:"desc"},take:8}}},accounts:true}});
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
 </form>
 <section className="panel"><h2>Scriptural accounts</h2><p className="muted">Each scripture or passage gets its own account. Editing an account does not change the main article or erase other traditions.</p>
 {accountSaved==="1"&&<p>Source account saved to PostgreSQL.</p>}
 {topic.accounts.map(a=><form key={a.id} action={saveSourceAccount} className="panel">
 <h3>{a.locator}</h3><input type="hidden" name="slug" value={slug}/><input type="hidden" name="id" value={a.id}/>
 <label>Passage locator<input name="locator" defaultValue={a.locator} required/></label>
 <label>Speaker<input name="speaker" defaultValue={a.speaker||""}/></label>
 <label>Questioner<input name="questioner" defaultValue={a.questioner||""}/></label>
 <label>Narrator<input name="narrator" defaultValue={a.narrator||""}/></label>
 <label>Source URL (HTTPS)<input name="sourceUrl" type="url" defaultValue={a.sourceUrl||""}/></label>
 <label>Research status<input name="sourceStatus" defaultValue={a.sourceStatus}/></label>
 <label>Full source-specific explanation<textarea name="explanation" rows={9} defaultValue={a.explanation} required/></label>
 <button type="submit">Save this account</button></form>)}
 <form action={saveSourceAccount} className="panel"><h3>Add another scriptural account</h3><input type="hidden" name="slug" value={slug}/>
 <label>Passage locator<input name="locator" placeholder="Scripture and chapter/verse" required/></label>
 <label>Speaker<input name="speaker"/></label><label>Questioner<input name="questioner"/></label><label>Narrator<input name="narrator"/></label>
 <label>Source URL (HTTPS)<input name="sourceUrl" type="url"/></label>
 <label>Research status<input name="sourceStatus" defaultValue="WORKING"/></label>
 <label>Explanation<textarea name="explanation" rows={9} required/></label>
 <button type="submit">Add source account</button></form></section>
 <section className="panel"><h2>Recent revisions</h2>{article.revisions.map(r=><p key={r.id}>{r.createdAt.toLocaleString("en-GB")} · {r.state} · {r.note||"Revision saved"}</p>)}</section></div>;
}
