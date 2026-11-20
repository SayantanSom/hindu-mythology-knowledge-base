import Link from "next/link";
import {topics} from "../../lib/research/topics";
export const metadata={title:"Encyclopedia Topics | Hindu Mythology"};
export default function TopicsPage(){return <div><p className="muted">Hindu Mythology Encyclopedia</p><h1>Explore topics</h1><p>Browse concepts and dialogues, each supported by separate scriptural accounts.</p><div className="grid">{topics.map(t=><section className="panel" key={t.slug}><p className="muted">{t.kind}</p><h2><Link href={`/topics/${t.slug}`}>{t.title}</Link></h2><p>{t.overview}</p><p className="muted">{t.accounts.length} documented working account</p></section>)}</div></div>}
