"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getWikiPage,saveWikiPage} from "../../lib/wiki";
export async function saveArticle(formData:FormData){
 if(process.env.NODE_ENV!=="development")throw new Error("Local editing only.");
 const slug=String(formData.get("slug")||"");
 const page=await getWikiPage(slug);if(!page)throw new Error("Page not found");
 const body=String(formData.get("body")||"").trim();
 if(!body||body.length>200000)throw new Error("Invalid article body");
 await saveWikiPage({...page,body});
 revalidatePath(`/topics/${slug}`);revalidatePath("/topics");
 redirect(`/editor/${slug}?saved=1`);
}
