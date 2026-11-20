import {PrismaClient} from "@prisma/client";
import {topics} from "../lib/research/topics";
const db=new PrismaClient();
async function main(){
 for(const topic of topics){
  const row=await db.encyclopediaTopic.upsert({where:{slug:topic.slug},create:{slug:topic.slug,title:topic.title,kind:topic.kind,overview:topic.overview},update:{}});
  const existing=await db.encyclopediaArticle.findUnique({where:{topicId:row.id}});
  if(!existing){
   const initial=topic.accounts.map(a=>`## ${a.scripture} — ${a.locator}\n\n${a.explanation}`).join("\n\n");
   const article=await db.encyclopediaArticle.create({data:{topicId:row.id,body:initial,state:"DRAFT"}});
   await db.articleRevision.create({data:{articleId:article.id,body:initial,state:"DRAFT",note:"Initial import from v0.5 research content"}});
  }
  for(const a of topic.accounts){
   const found=await db.encyclopediaAccount.findFirst({where:{topicId:row.id,locator:a.locator,sourceUrl:a.url}});
   if(!found)await db.encyclopediaAccount.create({data:{topicId:row.id,locator:a.locator,speaker:a.speaker,questioner:a.questioner,explanation:a.explanation,sourceUrl:a.url,sourceStatus:"WORKING"}});
  }
 }
 for(const topic of topics){
  const from=await db.encyclopediaTopic.findUniqueOrThrow({where:{slug:topic.slug}});
  for(const link of topic.related){
   const slug=link.href.startsWith("/topics/")?link.href.slice("/topics/".length):null;
   if(!slug)continue;
   const to=await db.encyclopediaTopic.findUnique({where:{slug}});
   if(to)await db.topicConnection.upsert({where:{fromId_toId_relation:{fromId:from.id,toId:to.id,relation:"RELATED"}},create:{fromId:from.id,toId:to.id,relation:"RELATED"},update:{}});
  }
 }
 console.log("Encyclopedia topics imported; existing article edits preserved.");
}
main().finally(()=>db.$disconnect());
