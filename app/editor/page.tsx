import Link from "next/link";
import {db} from "../../lib/db";
export const dynamic="force-dynamic";
export default async function EditorIndex(){
 if(process.env.NODE_ENV!=="development")return <p>Editor disabled until authentication is configured.</p>;
 const topics=await db.encyclopediaTopic.findMany({include:{articles:true},orderBy:{title:"asc"}});
 return <div><h1>Encyclopedia editor</h1><p>Article updates are saved directly to your local PostgreSQL database.</p><div className="grid">{topics.map(t=><section className="panel" key={t.id}><h2>{t.title}</h2><p className="muted">{t.articles[0]?.state||"No article"}</p><Link href={`/editor/${t.slug}`}>Edit article</Link></section>)}</div></div>;
}
