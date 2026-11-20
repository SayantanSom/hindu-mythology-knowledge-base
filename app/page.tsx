import Link from "next/link";
export default function Home(){
 return <div>
 <div className="topline"><div><p className="muted">Hindu Mythology Knowledge Base</p><h1>Explore mythology through its sources</h1><p>Clear explanations of deities, traditions and scriptural discussions, with references you can follow.</p></div></div>
 <section className="panel"><p className="muted">Featured research article</p><h2><Link href="/articles/33-vedic-deities">The Classification of the 33 Vedic Deities</Link></h2><p>Discover the eight Vasus, eleven Rudras, twelve Ādityas, Indra and Prajāpati as explained in Bṛhadāraṇyaka Upaniṣad 3.9.</p><Link className="button" href="/articles/33-vedic-deities">Read the article</Link></section>
 <section className="panel"><h2>Scripture catalogue</h2><p>Browse the research registry and its source references.</p><Link href="/scriptures">Open scripture catalogue</Link></section>
 </div>;
}
