import Link from "next/link";
import {notFound} from "next/navigation";
import {findTopic,topics} from "../../../lib/research/topics";
export function generateStaticParams(){return topics.map(t=>({slug:t.slug}))}
export default async function TopicPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const topic=findTopic(slug);if(!topic)notFound();
 return <article>
 <p className="muted">Encyclopedia / {topic.kind==="group"?"Groups and concepts":"Stories and dialogues"} / Research draft</p>
 <h1>{topic.title}</h1><section className="panel"><h2>Overview</h2><p>{topic.overview}</p></section>
 <section className="panel"><h2>Accounts by scripture</h2><p className="muted">Each account is kept separate so later traditions can be compared without replacing earlier explanations.</p>
 {topic.accounts.map(a=><div key={a.id} style={{borderTop:"1px solid #dce5df",padding:"20px 0"}}>
 <h3>{a.scripture} · {a.locator}</h3><p><strong>{a.summary}</strong></p>
 {topic.slug==="eleven-rudras" ? <>
 <h4>The question and the answer</h4>
 <p>In a discussion about the number of gods, Vidagdha Śākalya asks Yājñavalkya who the Rudras are. Instead of supplying eleven individual divine names, Yājñavalkya points to the living person: ten <em>prāṇas</em>, or vital functions, and <em>Ātman</em> as the eleventh.</p>
 <h4>What are the ten?</h4>
 <p>The English explanation accompanying our working source identifies the ten with two sets of five faculties. The <em>jñānendriyas</em> are the faculties of perception—hearing, touch, sight, taste and smell. The <em>karmendriyas</em> are the faculties of action—speech, grasping, movement, elimination and reproduction.</p>
 <p><strong>Source distinction:</strong> The Sanskrit verse speaks of ten prāṇas and Ātman. It does not enumerate these ten faculties individually. Their division into two groups of five belongs to the accompanying explanation.</p>
 <h4>Why are they called Rudras?</h4>
 <p>Yājñavalkya's explanation turns from the living person to the experience of death. When these vital functions and the self depart from the mortal body, their departure causes people to weep. The passage connects this act of causing tears—<em>rodayanti</em>—with the name <em>Rudra</em>.</p>
 <p>The name is therefore explained here through the sorrow of separation and mortality. This is a particular Upaniṣadic explanation, not a claim that every scripture defines the Rudras in the same way.</p>
 <h4>What this passage does—and does not—tell us</h4>
 <p>It gives a count, a constitution and a reason for the name. It does not give eleven personal deity names. When we research Purāṇic and epic lists, we will present those as separate scriptural accounts rather than silently replacing this one.</p>
 </> : topic.slug==="eight-vasus" ? <>
 <h4>The question: who are the Vasus?</h4>
 <p>After identifying the thirty-three gods as eight Vasus, eleven Rudras, twelve Ādityas, Indra and Prajāpati, Vidagdha Śākalya asks Yājñavalkya to explain who the Vasus are. Yājñavalkya answers by naming eight features of the cosmos rather than presenting a family tree or eight individual mythological biographies.</p>
 <h4>The eight named in the passage</h4>
 <ol>
 <li><strong>Agni — fire:</strong> the fire named in the passage. Agni can also be a deity elsewhere, but here the explanation belongs to this cosmic enumeration.</li>
 <li><strong>Pṛthivī — earth:</strong> the terrestrial world, the ground on which living beings dwell.</li>
 <li><strong>Vāyu — air or wind:</strong> the moving air, distinguished here from the intermediate region.</li>
 <li><strong>Antarikṣa — the intermediate region:</strong> the space between earth and heaven, often rendered as sky or mid-space.</li>
 <li><strong>Āditya — sun:</strong> the sun as one of these eight Vasus. This use of Āditya must not be confused with the twelve Ādityas named as a separate group in the preceding enumeration.</li>
 <li><strong>Dyauḥ — heaven:</strong> the celestial realm, distinguished from the intermediate region.</li>
 <li><strong>Candramas — moon:</strong> the moon, named as one of the eight.</li>
 <li><strong>Nakṣatrāṇi — stars:</strong> the stars, given collectively as the eighth member, not a list of individual stars.</li>
 </ol>
 <h4>Why are they called Vasus?</h4>
 <p>Yājñavalkya does not stop at listing eight things. He explains that everything dwelling in this world rests or is established in them. The designation <em>Vasus</em> is therefore explained through the idea that the world's wealth or contents are lodged in these cosmic realities. The Sanskrit expression <em>eteṣu hīdaṃ sarvaṃ vasu hitam</em> underlies this explanation; the working English translation expresses the point as everything that dwells resting in them.</p>
 <p>In this passage, the answer is about the world as a whole: fire and air, earth and the region above it, sun and moon, heaven and stars. The text presents them as the realities in which the world is situated. Reading the eight as a description of cosmic supports is an interpretation of the passage's stated rationale, not a claim that the verse gives eight separate stories.</p>
 <h4>What this account does—and does not—establish</h4>
 <p><strong>Directly supported:</strong> the eight names above and the explanation that the world rests in them. <strong>Not supplied here:</strong> individual genealogies, consorts, or the alternative lists of eight Vasus found in other traditions. Those should become separate, independently cited scriptural accounts as our research expands.</p>
 </> : <p>{a.explanation}</p>}
 <p><strong>Speaker:</strong> {a.speaker} · <strong>Questioner:</strong> {a.questioner}</p>
 <p className="muted">Working source · Sanskrit base edition and recension unverified</p>
 <a href={a.url} target="_blank" rel="noopener noreferrer">Read the source passage ↗</a>
 </div>)}
 </section>
 {topic.slug==="eleven-rudras"&&<section className="panel"><h2>Future scriptural comparisons</h2><p>Bhāgavata Purāṇa, Mahābhārata and other accounts will be added after their exact passages, names, narrative speakers and edition details are reviewed. They are not yet represented as verified accounts.</p></section>}
 <section className="panel"><h2>Explore related topics</h2><div className="actions">{topic.related.map(r=><Link key={r.href} href={r.href} className="tag">{r.title}</Link>)}</div></section>
 <p><Link href="/topics">All encyclopedia topics</Link></p>
 </article>;
}
