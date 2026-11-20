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
