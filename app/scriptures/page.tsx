import Link from "next/link";
import {listScriptures} from "../../lib/scriptures";
export const metadata={title:"Scriptures | Hindu Mythology"};
export default async function ScripturesPage(){
 const scriptures=await listScriptures();
 return <main><h1>Scriptures</h1><p>Browse scriptures and their chapter-wise English reading guides. Full chapter content will appear as it is researched.</p><div className="grid">{scriptures.map(s=><section className="panel" key={s.id}><h2><Link href={`/scriptures/${s.slug}`}>{s.title}</Link></h2><p className="muted">{s.subtitle}</p><p>{s.overview}</p><p className="muted">{s.chapters.length} chapters listed</p></section>)}</div></main>;
}
