import type {ReactNode} from "react";
function inline(text:string):ReactNode[]{
 return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((piece,i)=>{
  if(piece.startsWith("**")&&piece.endsWith("**"))return <strong key={i}>{piece.slice(2,-2)}</strong>;
  if(piece.startsWith("*")&&piece.endsWith("*"))return <em key={i}>{piece.slice(1,-1)}</em>;
  return piece;
 });
}
export function ArticleMarkdown({body}:{body:string}){
 const blocks=body.replace(/\r\n/g,"\n").split(/\n\s*\n/).filter(Boolean);
 return <div className="article-content">{blocks.map((block,i)=>{
  const t=block.trim();
  if(t.startsWith("### "))return <h3 key={i}>{inline(t.slice(4))}</h3>;
  if(t.startsWith("## "))return <h2 key={i}>{inline(t.slice(3))}</h2>;
  if(t.startsWith("# "))return <h2 key={i}>{inline(t.slice(2))}</h2>;
  const lines=t.split("\n");
  if(lines.every(l=>/^[-*] /.test(l)))return <ul key={i}>{lines.map((l,j)=><li key={j}>{inline(l.slice(2))}</li>)}</ul>;
  if(lines.every(l=>/^\d+\. /.test(l)))return <ol key={i}>{lines.map((l,j)=><li key={j}>{inline(l.replace(/^\d+\. /,""))}</li>)}</ol>;
  return <p key={i}>{lines.map((l,j)=><span key={j}>{j>0?" ":null}{inline(l)}</span>)}</p>;
 })}</div>;
}
