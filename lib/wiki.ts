import "server-only";
import {readdir,readFile,writeFile} from "node:fs/promises";
import path from "node:path";
export type WikiAccount={id:string;scripture:string;locator:string;speaker?:string;questioner?:string;explanation:string;url?:string;status?:string};
export type WikiPage={id:string;slug:string;title:string;kind:string;overview:string;body:string;accounts:WikiAccount[];links:string[]};
const dir=path.join(process.cwd(),"content","pages");
const valid=(slug:string)=>/^[a-z0-9-]+$/.test(slug);
export async function getWikiPage(slug:string):Promise<WikiPage|null>{
 if(!valid(slug))return null;
 try{const page=JSON.parse(await readFile(path.join(dir,slug+".json"),"utf8")) as WikiPage;return page.slug===slug?page:null;}catch(e){if((e as NodeJS.ErrnoException).code==="ENOENT")return null;throw e;}
}
export async function listWikiPages():Promise<WikiPage[]>{
 const names=(await readdir(dir)).filter(n=>n.endsWith(".json"));
 const pages=await Promise.all(names.map(n=>getWikiPage(n.slice(0,-5))));
 return pages.filter((p):p is WikiPage=>p!==null).sort((a,b)=>a.title.localeCompare(b.title));
}
export async function saveWikiPage(page:WikiPage){
 if(!valid(page.slug)||!page.id||!page.title||page.body.length>200000)throw new Error("Invalid wiki page");
 await writeFile(path.join(dir,page.slug+".json"),JSON.stringify(page,null,2)+"\n","utf8");
}
