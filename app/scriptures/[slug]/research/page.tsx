import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "../../../../lib/db";
import { addClaim, addEdition, addNote, addPassage, addRecension, addTranslation } from "./actions";
export const dynamic = "force-dynamic";
type Props = {params:Promise<{slug:string}>};
export default async function Research({params}:Props) {
  const {slug}=await params;
  const s=await db.scripture.findUnique({where:{slug},include:{
    recensions:{include:{editions:{include:{passages:{include:{evidence:{include:{claim:true}}}},translations:true}}}},
    researchNotes:{orderBy:{createdAt:"desc"}}
  }});
  if(!s) notFound();
  const editions=s.recensions.flatMap(r=>r.editions.map(e=>({...e,recensionLabel:r.label})));
  const passages=editions.flatMap(e=>e.passages.map(p=>({...p,editionTitle:e.title})));
  const bind=(fn:(slug:string,f:FormData)=>Promise<void>)=>fn.bind(null,slug);
  return <>
    <div className="topline"><div><Link href={"/scriptures/"+slug}>← {s.title}</Link><h1>Research & evidence</h1><p className="muted">Edition-aware catalogue · all new claims begin as proposed</p></div></div>
    <section className="panel"><h2>1. Recensions ({s.recensions.length})</h2>
      {s.recensions.map(r=><p key={r.id}><strong>{r.label}</strong> {r.notes && <span className="muted">— {r.notes}</span>}</p>)}
      <form action={bind(addRecension)}><div className="grid"><div className="field"><label>Recension label *<input name="label" required placeholder="Enter documented recension"/></label></div><div className="field"><label>Notes<input name="notes"/></label></div></div><button>Add recension</button></form>
    </section>
    <section className="panel"><h2>2. Bibliographic editions ({editions.length})</h2>
      {editions.map(e=><p key={e.id}><strong>{e.title}</strong> <span className="muted">({e.recensionLabel}; {e.editor||"editor not recorded"}; {e.publicationYear||"date unknown"})</span> {e.sourceUrl && <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">Source link</a>}</p>)}
      {s.recensions.length===0 ? <p className="muted">Add a recension before an edition.</p> : <form action={bind(addEdition)}>
        <div className="grid">
          <div className="field"><label>Recension *<select name="recensionId" required>{s.recensions.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}</select></label></div>
          <div className="field"><label>Edition title *<input name="title" required/></label></div>
          <div className="field"><label>Editor<input name="editor"/></label></div>
          <div className="field"><label>Publisher<input name="publisher"/></label></div>
          <div className="field"><label>Publication year<input name="publicationYear" type="number" min="1" max="2100"/></label></div>
          <div className="field"><label>Source URL<input name="sourceUrl" type="url"/></label></div>
        </div><div className="field"><label>Rights / license notes<input name="rightsNote"/></label></div><button>Add edition</button>
      </form>}
    </section>
    <section className="panel"><h2>3. Passages ({passages.length})</h2>
      {passages.map(p=><p key={p.id}><strong>{p.locator}</strong> <span className="muted">— {p.editionTitle}</span>{p.originalText && <div lang="sa">{p.originalText}</div>}</p>)}
      {editions.length===0 ? <p className="muted">Add an edition before recording passages.</p> : <form action={bind(addPassage)}>
        <div className="field"><label>Edition *<select name="editionId" required>{editions.map(e=><option key={e.id} value={e.id}>{e.title} ({e.recensionLabel})</option>)}</select></label></div>
        <div className="field"><label>Exact passage locator *<input name="locator" required placeholder="Chapter / section / verse in this edition"/></label></div>
        <div className="field"><label>Original text (only if permitted)<textarea name="originalText"/></label></div>
        <div className="field"><label>Transliteration<textarea name="transliteration"/></label></div>
        <div className="field"><label>Text rights / provenance<input name="rightsNote"/></label></div>
        <button>Add passage</button>
      </form>}
    </section>
    <section className="panel"><h2>4. Translations ({editions.reduce((n,e)=>n+e.translations.length,0)})</h2>
      {editions.flatMap(e=>e.translations.map(t=><p key={t.id}><strong>{t.title}</strong> — {t.translator||"translator not recorded"} ({t.languageCode}) · {e.title}</p>))}
      {editions.length===0 ? <p className="muted">Add an edition before its translation metadata.</p> : <form action={bind(addTranslation)}>
        <div className="grid"><div className="field"><label>Edition *<select name="editionId" required>{editions.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select></label></div><div className="field"><label>Translation title *<input name="title" required/></label></div><div className="field"><label>Language code *<input name="languageCode" defaultValue="en" required/></label></div><div className="field"><label>Translator<input name="translator"/></label></div></div>
        <div className="field"><label>Rights notes<input name="rightsNote"/></label></div><button>Add translation metadata</button>
      </form>}
    </section>
    <section className="panel"><h2>5. Source-linked claims</h2>
      {passages.flatMap(p=>p.evidence.map(ev=><p key={ev.claimId}><strong>{ev.claim.statement}</strong> <span className="tag">{ev.claim.status}</span> <span className="muted">Evidence: {p.locator}, {p.editionTitle}</span></p>))}
      {passages.length===0 ? <p className="muted">Add a passage before attaching a claim.</p> : <form action={bind(addClaim)}>
        <div className="field"><label>Supporting passage *<select name="passageId" required>{passages.map(p=><option key={p.id} value={p.id}>{p.locator} — {p.editionTitle}</option>)}</select></label></div>
        <div className="field"><label>Claim statement *<textarea name="statement" required/></label></div>
        <div className="grid"><div className="field"><label>Claim type *<select name="claimType"><option value="DIRECT_TEXT">Direct textual statement</option><option value="INTERPRETATION">Interpretation</option><option value="COMMENTARY">Commentary</option><option value="COMPARISON">Editorial comparison</option></select></label></div><div className="field"><label>Tradition / perspective<input name="tradition"/></label></div></div>
        <div className="field"><label>Evidence notes<input name="notes"/></label></div><button>Add proposed claim</button>
      </form>}
    </section>
    <section className="panel"><h2>6. Research notes ({s.researchNotes.length})</h2>
      {s.researchNotes.map(n=><article key={n.id}><strong>{n.title}</strong> <span className="tag">{n.status.replaceAll("_"," ")}</span><p>{n.body}</p>{n.sourceRef&&<p className="muted">Source: {n.sourceRef}</p>}<hr/></article>)}
      <form action={bind(addNote)}><div className="field"><label>Note title *<input name="title" required/></label></div><div className="field"><label>Research note *<textarea name="body" required/></label></div><div className="grid"><div className="field"><label>Source reference<input name="sourceRef"/></label></div><div className="field"><label>Review state<select name="status"><option value="DRAFT">Draft</option><option value="NEEDS_SOURCE">Needs source</option><option value="READY_FOR_REVIEW">Ready for review</option><option value="REVIEWED">Reviewed</option></select></label></div></div><button>Save research note</button></form>
    </section>
  </>;
}
