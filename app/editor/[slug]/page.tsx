import Link from "next/link";
import {notFound} from "next/navigation";
import {getWikiPage} from "../../../lib/wiki";
import {saveArticle} from "../actions";
export const dynamic="force-dynamic";
export default async function Editor({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<{saved?:string}>}){
 if(process.env.NODE_ENV!=="development")return <p>Editor unavailable outside local development.</p>;
 const {slug}=await params;const {saved}=await searchParams;
 const page=await getWikiPage(slug);if(!page)notFound();
 return <main><h1>Edit {page.title}</h1><p><Link href={`/topics/${slug}`}>View page</Link> · <Link href="/editor">All pages</Link></p>
 {saved==="1"&&<p className="panel">Saved to <code>content/pages/{slug}.json</code>.</p>}
 <form action={saveArticle} className="panel"><input type="hidden" name="slug" value={slug}/>
 <div className="field"><label htmlFor="body">Article body (Markdown)</label><textarea id="body" name="body" rows={25} style={{minHeight:540,fontFamily:"monospace"}} defaultValue={page.body} required/></div>
 <button type="submit">Save local file</button><p className="muted">Page metadata, references and links can also be edited directly in the JSON file. File edits require a Git commit to share with other machines.</p></form></main>;
}
