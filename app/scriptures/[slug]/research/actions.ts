"use server";
import { NoteStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../../../../lib/db";

function str(f: FormData, k: string) { return String(f.get(k) ?? "").trim(); }
function required(f: FormData, k: string) { const v=str(f,k); if (!v) throw new Error(k+" is required"); return v; }
async function work(slug: string) { return db.scripture.findUniqueOrThrow({ where: { slug } }); }
function finish(slug: string): never { revalidatePath("/scriptures/"+slug+"/research"); redirect("/scriptures/"+slug+"/research"); }

export async function addRecension(slug: string, form: FormData) {
  const scripture = await work(slug);
  await db.recension.create({data:{ scriptureId:scripture.id,label:required(form,"label"),notes:str(form,"notes")||null }});
  finish(slug);
}
export async function addEdition(slug: string, form: FormData) {
  const scripture=await work(slug);
  const recensionId=required(form,"recensionId");
  const recension=await db.recension.findFirst({where:{id:recensionId,scriptureId:scripture.id}});
  if (!recension) throw new Error("Recension does not belong to this scripture");
  const year=str(form,"publicationYear");
  if (year && (!/^\d{1,4}$/.test(year) || Number(year)>new Date().getFullYear()+1)) throw new Error("Invalid publication year");
  const url=str(form,"sourceUrl");
  if (url && !/^https?:\/\//i.test(url)) throw new Error("Source URL must be http(s)");
  await db.edition.create({data:{recensionId,title:required(form,"title"),editor:str(form,"editor")||null,publisher:str(form,"publisher")||null,publicationYear:year?Number(year):null,sourceUrl:url||null,rightsNote:str(form,"rightsNote")||null}});
  finish(slug);
}
export async function addPassage(slug: string, form: FormData) {
  const scripture=await work(slug);
  const editionId=required(form,"editionId");
  const edition=await db.edition.findFirst({where:{id:editionId,recension:{scriptureId:scripture.id}}});
  if (!edition) throw new Error("Edition does not belong to this scripture");
  await db.passage.create({data:{editionId,locator:required(form,"locator"),originalText:str(form,"originalText")||null,transliteration:str(form,"transliteration")||null,rightsNote:str(form,"rightsNote")||null}});
  finish(slug);
}
export async function addTranslation(slug: string, form: FormData) {
  const scripture=await work(slug);
  const editionId=required(form,"editionId");
  const edition=await db.edition.findFirst({where:{id:editionId,recension:{scriptureId:scripture.id}}});
  if (!edition) throw new Error("Edition does not belong to this scripture");
  await db.translation.create({data:{editionId,title:required(form,"title"),languageCode:required(form,"languageCode"),translator:str(form,"translator")||null,rightsNote:str(form,"rightsNote")||null}});
  finish(slug);
}
export async function addNote(slug: string, form: FormData) {
  const scripture=await work(slug);
  const status=str(form,"status") as NoteStatus;
  if (!Object.values(NoteStatus).includes(status)) throw new Error("Invalid status");
  await db.researchNote.create({data:{scriptureId:scripture.id,title:required(form,"title"),body:required(form,"body"),sourceRef:str(form,"sourceRef")||null,status}});
  finish(slug);
}
export async function addClaim(slug: string, form: FormData) {
  const scripture=await work(slug);
  const passageId=required(form,"passageId");
  const passage=await db.passage.findFirst({where:{id:passageId,edition:{recension:{scriptureId:scripture.id}}}});
  if (!passage) throw new Error("Passage does not belong to this scripture");
  await db.claim.create({data:{
    statement:required(form,"statement"),claimType:required(form,"claimType"),
    tradition:str(form,"tradition")||null,status:"PROPOSED",
    evidence:{create:{passage:{connect:{id:passageId}},role:"SUPPORTS",notes:str(form,"notes")||null}}
  }});
  finish(slug);
}
