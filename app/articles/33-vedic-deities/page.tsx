import Link from "next/link";
import { deitySlots, passages } from "../../../lib/research/vedic-33";
export const metadata = {title:"The 33 Vedic Deities | Hindu Mythology Knowledge Base",description:"An English-language, passage-referenced explanation of the thirty-three gods in Bṛhadāraṇyaka Upaniṣad 3.9."};
const groups = [
  {name:"Vasus",count:8,summary:"Eight cosmic realities in which the world is said to rest."},
  {name:"Rudras",count:11,summary:"Ten vital functions and the self, explained through their departure from the body."},
  {name:"Ādityas",count:12,summary:"The twelve months, associated with the passage of time and its consuming movement."},
  {name:"Other",count:2,summary:"Indra and Prajāpati, described through thunder and sacrifice."}
] as const;
export default function Vedic33Page(){
 return <article>
  <div className="topline"><div><p className="muted">Vedic mythology · Knowledge article · Initial research draft</p><h1>The Classification of the 33 Vedic Deities</h1><p className="muted">An English explanation grounded in Bṛhadāraṇyaka Upaniṣad 3.9.1–3.9.6</p></div></div>
  <section className="panel"><h2>What does the scripture say?</h2>
   <p>In a dialogue, Vidagdha Śākalya asks the sage Yājñavalkya how many gods there are. The answers move through a series of numbers, including thirty-three. The following passage explains that these thirty-three are grouped as eight Vasus, eleven Rudras, twelve Ādityas, Indra and Prajāpati.</p>
   <p>The dialogue then explains these groups through the natural world, the living person, time, thunder and sacrifice. This is the <strong>classification given in this passage</strong>, not a claim that all Hindu traditions use identical lists.</p>
   <p><strong>Key distinction:</strong> The passage does not provide thirty-three separate personal names. The numbered entries below distinguish actual named items from positions that the passage describes collectively.</p>
  </section>
  <section className="panel"><h2>Who is speaking?</h2>
   <p><strong>Vidagdha Śākalya</strong> asks the questions. <strong>Yājñavalkya</strong> answers them. Their exchange belongs to the wider debate narrative involving King Janaka of Videha; that broader setting is introduced earlier in chapter 3. It does not establish either speaker as the author or compiler of the entire Upaniṣad.</p>
   <p><strong>Authorship and transmission:</strong> The text is associated with the Śukla Yajurveda. The specific Sanskrit base edition and recension used by our preferred website are still unverified. We will document traditional transmission and historical editorial history separately rather than guess an individual compiler.</p>
  </section>
  <section className="panel"><h2>How the thirty-three are classified</h2>
   <div className="grid">{groups.map(g=><div key={g.name} style={{background:"#f1f6f2",borderRadius:10,padding:18}}><div style={{fontSize:30,fontWeight:700}}>{g.count}</div><h3 style={{margin:"0 0 8px"}}>{g.name==="Other"?"Indra and Prajāpati":g.name}</h3><p style={{margin:0}}>{g.summary}</p></div>)}</div>
  </section>
  {groups.map(g=><section className="panel" key={g.name} id={g.name.toLowerCase()}>
    <h2>{g.name==="Other"?"Indra and Prajāpati":`The ${g.count} ${g.name}`}</h2>
    <p className="muted">{g.summary} Source: Bṛhadāraṇyaka Upaniṣad {g.name==="Vasus"?"3.9.3":g.name==="Rudras"?"3.9.4":g.name==="Ādityas"?"3.9.5":"3.9.6"}.</p>
    {g.name==="Rudras" && <div style={{background:"#f1f6f2",borderRadius:10,padding:18,marginBottom:18}}>
      <h3>What makes up the eleven Rudras?</h3>
      <p>Yājñavalkya identifies the eleven as <strong>ten prāṇas (vital functions) and Ātman (the self) as the eleventh</strong>. In the English translation used by our preferred source, the ten are explained as the five <em>jñānendriyas</em> (faculties of perception) and five <em>karmendriyas</em> (faculties of action).</p>
      <ul><li><strong>Five faculties of perception:</strong> hearing, touch, sight, taste and smell.</li><li><strong>Five faculties of action:</strong> speech, grasping, locomotion, elimination and reproduction.</li><li><strong>Eleventh:</strong> Ātman, the self.</li></ul>
      <h3>Why are they called Rudras?</h3>
      <p>The passage explains the name through weeping: when these depart from the mortal body, people weep. It connects the name Rudra with <em>rodayanti</em>, “they cause to weep.” This is the explanation given in this particular dialogue, not an assertion that all traditions define Rudra in the same way.</p>
      <p className="muted">Source distinction: the Sanskrit refers to ten prāṇas and Ātman; the division into five perceptive and five active faculties is supplied by the accompanying English translation/explanation. <a href="https://upanishads.org.in/u/brihadaranyaka/p/3.9.4" target="_blank" rel="noopener noreferrer">Read 3.9.4 ↗</a></p>
    </div>}
    <div className="grid">{deitySlots.filter(x=>x.group===g.name).map(x=><div key={x.id} style={{border:"1px solid #dce5df",borderRadius:10,padding:15}}>
      <h3 style={{margin:"0 0 5px",fontSize:16}}>{x.label}</h3>
      <span className="tag">{x.identification}</span>
      <p>{x.explanation}</p>
      <a href={`https://upanishads.org.in/u/brihadaranyaka/p/${x.passage}`} target="_blank" rel="noopener noreferrer">Bṛhadāraṇyaka {x.passage} ↗</a>
    </div>)}</div>
  </section>)}
  <section className="panel"><h2>What can we conclude—and what remains open?</h2>
    <p><strong>Supported by this passage:</strong> the thirty-three are arranged into the specified groups; the Vasus are individually enumerated as cosmic realities; the Rudras and Ādityas are explained through the person and the year; Indra and Prajāpati receive contextual identifications.</p>
    <p><strong>Not established here:</strong> a fixed list of eleven individually named Rudra gods, twelve individually named Āditya gods, the identity of all gods across every later tradition, or a list of 330 million named deities. These require separate research and citations.</p>
    <p><strong>Further research:</strong> compare named lists in other Vedic and later texts, examine variants across recensions, and investigate the transmission of the Bṛhadāraṇyaka Upaniṣad.</p>
  </section>
  <section className="panel"><h2>Scriptural references</h2>
    <p className="muted">Preferred working source: Upanishads.org.in. Its pages credit the English translation to F. Max Müller, <em>The Upanishads</em>, Sacred Books of the East 15 (1884). Sanskrit base edition and recension are pending verification. Secondary reference sites remain unverified.</p>
    <table><thead><tr><th>Passage</th><th>Why it matters</th><th>Source</th></tr></thead><tbody>{passages.map(p=><tr key={p.locator}><td>{p.locator}</td><td><strong>{p.role}</strong><div>{p.description}</div></td><td><a href={`https://upanishads.org.in/u/brihadaranyaka/p/${p.locator}`} target="_blank" rel="noopener noreferrer">Read original ↗</a></td></tr>)}</tbody></table>
    <p className="muted">Future editorial features: suggest an additional reference, report a broken link, and propose a correction. These are not yet active.</p>
    <p><Link href="/scriptures/brihadaranyaka-upanishad">Scripture catalogue entry</Link> · <Link href="/scriptures/brihadaranyaka-upanishad/research">Internal research and evidence</Link></p>
  </section>
 </article>;
}
