import Link from "next/link";
export default function Home(){
 return <div><div className="topline"><div><p className="muted">Hindu Mythology Encyclopedia</p><h1>Explore mythology through its stories and scriptures</h1><p>Read accessible English explanations, explore linked people and deities, and follow references to their sources.</p></div></div>
 <section className="panel"><h2><Link href="/topics">People, deities and concepts</Link></h2><p>Explore interconnected encyclopedia pages, including the Rudras, Vasus and Ādityas.</p></section>
 <section className="panel"><h2><Link href="/scriptures">Scriptures</Link></h2><p>Browse scripture introductions and chapter-wise English reading guides.</p><Link href="/scriptures/brihadaranyaka-upanishad">Explore the Bṛhadāraṇyaka Upaniṣad</Link></section>
 <section className="panel"><h2><Link href="/articles/33-vedic-deities">The 33 Vedic Deities</Link></h2><p>Our original overview article remains available.</p></section></div>;
}
