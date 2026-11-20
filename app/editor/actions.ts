"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {db} from "../../lib/db";
export async function saveArticle(formData:FormData){
 if(process.env.NODE_ENV!=="development")throw new Error("Editor disabled outside local development until authentication is configured.");
 const slug=String(formData.get("slug")||"");
 const body=String(formData.get("body")||"");
 const state=String(formData.get("state")||"DRAFT");
 if(!/^[a-z0-9-]+$/.test(slug)||body.length>150000||!["DRAFT","IN_REVIEW","PUBLISHED"].includes(state))throw new Error("Invalid article data");
 const topic=await db.encyclopediaTopic.findUnique({where:{slug},include:{articles:true}});
 if(!topic||topic.articles.length===0)throw new Error("Topic article not found");
 const article=topic.articles[0];
 await db.$transaction([
  db.articleRevision.create({data:{articleId:article.id,body,state:state as "DRAFT"|"IN_REVIEW"|"PUBLISHED",note:"Saved in local editor"}}),
  db.encyclopediaArticle.update({where:{id:article.id},data:{body,state:state as "DRAFT"|"IN_REVIEW"|"PUBLISHED"}})
 ]);
 revalidatePath(`/topics/${slug}`);
 revalidatePath("/topics");
 redirect(`/editor/${slug}?saved=1`);
}

export async function saveSourceAccount(formData:FormData){
 if(process.env.NODE_ENV!=="development")throw new Error("Source editing requires local development.");
 const slug=String(formData.get("slug")||"");
 const id=String(formData.get("id")||"");
 const locator=String(formData.get("locator")||"").trim();
 const explanation=String(formData.get("explanation")||"").trim();
 const sourceUrl=String(formData.get("sourceUrl")||"").trim();
 const speaker=String(formData.get("speaker")||"").trim();
 const questioner=String(formData.get("questioner")||"").trim();
 const narrator=String(formData.get("narrator")||"").trim();
 const sourceStatus=String(formData.get("sourceStatus")||"WORKING").trim();
 if(!/^[a-z0-9-]+$/.test(slug)||!locator||!explanation||locator.length>250||explanation.length>30000||sourceStatus.length>100)throw new Error("Invalid source account.");
 if(sourceUrl){const u=new URL(sourceUrl);if(u.protocol!=="https:")throw new Error("Only HTTPS source links are supported.");}
 const topic=await db.encyclopediaTopic.findUniqueOrThrow({where:{slug}});
 const data={locator,explanation,sourceUrl:sourceUrl||null,speaker:speaker||null,questioner:questioner||null,narrator:narrator||null,sourceStatus};
 if(id){
  const existing=await db.encyclopediaAccount.findFirst({where:{id,topicId:topic.id}});
  if(!existing)throw new Error("Source account not found.");
  await db.encyclopediaAccount.update({where:{id},data});
 }else{
  await db.encyclopediaAccount.create({data:{topicId:topic.id,...data}});
 }
 revalidatePath(`/topics/${slug}`);
 redirect(`/editor/${slug}?accountSaved=1`);
}
