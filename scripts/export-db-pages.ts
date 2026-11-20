import {PrismaClient} from "@prisma/client";
import {readFile,writeFile,copyFile} from "node:fs/promises";
import path from "node:path";
const db=new PrismaClient();
async function main(){
 const rows=await db.encyclopediaTopic.findMany({include:{articles:true,accounts:{include:{scripture:true}},linksFrom:{include:{to:true}}}});
 for(const t of rows){
  const file=path.join(process.cwd(),"content","pages",t.slug+".json");
  let current;try{current=JSON.parse(await readFile(file,"utf8"));}catch{console.log("Skipping missing file:",file);continue;}
  const article=t.articles[0];if(!article)continue;
  const next={...current,body:article.body,overview:t.overview,accounts:t.accounts.map(a=>({id:a.id,scripture:a.scripture?.title||"Scripture not linked",locator:a.locator,speaker:a.speaker,questioner:a.questioner,explanation:a.explanation,url:a.sourceUrl,status:a.sourceStatus})),links:[...new Set([...current.links,...t.linksFrom.map(l=>l.to.slug)])]};
  await copyFile(file,file+".before-db-export.bak");
  await writeFile(file,JSON.stringify(next,null,2)+"\n","utf8");
  console.log("Exported",t.slug,"(backup: .before-db-export.bak)");
 }
}
main().finally(()=>db.$disconnect());
