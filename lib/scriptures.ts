import "server-only";
import {readdir,readFile} from "node:fs/promises";
import path from "node:path";
export type ScriptureSection={number:number;title:string;description:string;links:string[];reference:string;sourceUrl:string};
export type ScripturePage={id:string;slug:string;title:string;subtitle:string;overview:string;chapters:{number:number;title:string;sections:ScriptureSection[]}[];references:{label:string;url:string}[]};
const dir=path.join(process.cwd(),"content","scriptures");
export async function getScripture(slug:string):Promise<ScripturePage|null>{
 if(!/^[a-z0-9-]+$/.test(slug))return null;
 try{const x=JSON.parse(await readFile(path.join(dir,slug+".json"),"utf8")) as ScripturePage;return x.slug===slug?x:null;}catch(e){if((e as NodeJS.ErrnoException).code==="ENOENT")return null;throw e;}
}
export async function listScriptures():Promise<ScripturePage[]>{
 const names=(await readdir(dir)).filter(n=>n.endsWith(".json"));
 const pages=await Promise.all(names.map(n=>getScripture(n.slice(0,-5))));
 return pages.filter((x):x is ScripturePage=>x!==null).sort((a,b)=>a.title.localeCompare(b.title));
}
