import Link from "next/link";
import {db} from "../../lib/db";
export const dynamic="force-dynamic";
export const metadata={title:"Encyclopedia Topics | Hindu Mythology"};
export default async function TopicsPage(){
 const topics=await db.encyclopediaTopic.findMany({include:{articles:true,accounts:true},orderBy:{title:"asc"}});
 return <div><p className="muted">Hindu Mythology Encyclopedia</p><h1>Explore topics</h1><p>Browse concepts and dialogues, each supported by separate scriptural accounts.</p>
 {topics.length===0&&<section className="panel"><p>No topics imported yet. Run <code>npm run db:seed:encyclopedia</code> after applying the migration.</p></section>}
 <div className="grid">{topics.map(t=><section className="panel" key={t.slug}><p className="muted">{t.kind} · {t.articles[0]?.state||"Draft"}</p><h2><Link href={`/topics/${t.slug}`}>{t.title}</Link></h2><p>{t.overview}</p><p className="muted">{t.accounts.length} source account(s)</p></section>)}</div></div>;
}
