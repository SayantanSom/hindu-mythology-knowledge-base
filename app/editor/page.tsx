import Link from "next/link";
import {listWikiPages} from "../../lib/wiki";
export const dynamic="force-dynamic";
export default async function EditorIndex(){
 if(process.env.NODE_ENV!=="development")return <p>Editor disabled outside local development.</p>;
 const pages=await listWikiPages();
 return <main><h1>Edit wiki pages</h1><p>Changes are saved to local JSON files in <code>content/pages</code>. No database required.</p><div className="grid">{pages.map(p=><section className="panel" key={p.id}><h2>{p.title}</h2><Link href={`/editor/${p.slug}`}>Edit page</Link></section>)}</div></main>;
}
