import Link from "next/link";
import {listWikiPages} from "../../lib/wiki";
export const dynamic="force-dynamic";
export const metadata={title:"Encyclopedia Topics | Hindu Mythology"};
export default async function TopicsPage(){
 const pages=await listWikiPages();
 return <main><h1>Explore the encyclopedia</h1><p>Read articles and follow their references and connections.</p><div className="grid">{pages.map(p=><section className="panel" key={p.id}><p className="muted">{p.kind}</p><h2><Link href={`/topics/${p.slug}`}>{p.title}</Link></h2><p>{p.overview}</p></section>)}</div></main>;
}
