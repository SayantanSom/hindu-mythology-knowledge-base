import {PrismaClient} from "@prisma/client";
import {topics} from "../lib/research/topics";
const db=new PrismaClient();
const initialArticles:Record<string,string>={
"eleven-rudras":`## The question and the answer

In a discussion about the number of gods, Vidagdha Śākalya asks Yājñavalkya who the Rudras are. Rather than giving eleven personal names, Yājñavalkya identifies ten prāṇas (vital functions) and Ātman as the eleventh. His answer connects the group to embodied life.

## What are the ten vital functions?

The accompanying English explanation interprets these ten as two groups of five. The five jñānendriyas are faculties of perception: hearing, touch, sight, taste and smell. The five karmendriyas are faculties of action: speech, grasping, movement, elimination and reproduction.

This division into ten individually described faculties comes from the explanatory translation. The Sanskrit verse itself refers to ten prāṇas; it does not name ten separate Rudra gods.

## Why are they called Rudras?

Yājñavalkya explains the name through weeping. When these vital functions and the self depart from the mortal body, those left behind cry. The passage connects the designation Rudra with rodayanti, meaning that they cause people to weep.

The explanation links the eleven to life, death and loss. It belongs to this particular Upaniṣadic dialogue and should not be confused with genealogical or named lists from other scriptures.

## Limits of this account

Bṛhadāraṇyaka Upaniṣad 3.9.4 gives a count, a constitution and a reason for the name. It does not provide eleven individual divine biographies. Later scriptural accounts will be added independently.`,
"eight-vasus":`## Who are the eight Vasus?

After naming the groups that make up the thirty-three gods, Vidagdha Śākalya asks Yājñavalkya who the Vasus are. Yājñavalkya answers with eight cosmic realities rather than eight individual mythological biographies.

## The eight named in the passage

1. **Agni (fire):** Fire, one of the realities named in the enumeration.
2. **Pṛthivī (earth):** The terrestrial world.
3. **Vāyu (air or wind):** Moving air, distinct from the intermediate region.
4. **Antarikṣa (mid-space):** The intermediate region between earth and heaven.
5. **Āditya (sun):** The sun as a Vasu; this does not collapse the separate group of twelve Ādityas into this one entry.
6. **Dyauḥ (heaven):** The celestial realm.
7. **Candramas (moon):** The moon.
8. **Nakṣatrāṇi (stars):** The stars collectively, not a list of individual stars.

## Why are they called Vasus?

Yājñavalkya explains that everything dwelling in the world rests or is established in these eight. The Sanskrit explanation connects the name Vasus with the idea that the world's contents are lodged in them.

The enumeration therefore draws attention to the cosmic setting of life: earth and heaven, the intermediate region, air and fire, sun, moon and stars. This is an explanation of their grouping in this passage, not an assertion that every tradition uses the same list.

## What remains to be researched?

The passage does not supply genealogies, consorts or separate stories for the eight. Other scriptural enumerations should be documented as their own accounts with precise citations.`,
"twelve-adityas":`## Who are the twelve Ādityas?

Vidagdha Śākalya asks Yājñavalkya to identify the twelve Ādityas. In this dialogue, the answer is the twelve months of the year. The passage does not enumerate twelve personal divine names.

## Why the months?

The explanation connects the Ādityas to the passing year. As the months proceed, time takes away the lives of beings. The twelve are therefore explained through the passage of time and its effects on mortal life.

## How to read this account

This is the particular explanation of Bṛhadāraṇyaka Upaniṣad 3.9.5. Other scriptures may give individually named Ādityas. We will preserve those lists as separate source-specific accounts rather than replace this explanation.`,
"yajnavalkya-sakalya-dialogue":`## The setting

In the wider debate narrative of Bṛhadāraṇyaka Upaniṣad chapter 3, learned participants question Yājñavalkya in a setting associated with King Janaka of Videha. The immediate exchange in 3.9 is between Vidagdha Śākalya, the questioner, and Yājñavalkya, who answers.

## How many gods?

Śākalya repeatedly asks how many gods there are. Yājñavalkya gives successively smaller enumerations. One count is thirty-three: eight Vasus, eleven Rudras, twelve Ādityas, Indra and Prajāpati.

## Why this dialogue matters

The discussion does not stop at a number. Śākalya asks who these groups are, and Yājñavalkya explains them through the cosmos, vital functions, the months, thunder and sacrifice.

## Speaker is not author

Yājñavalkya's role as speaker does not prove he composed or compiled the entire Upaniṣad. Authorship, recension and textual transmission require separate evidence.`
};

async function main(){
 for(const topic of topics){
  const row=await db.encyclopediaTopic.upsert({where:{slug:topic.slug},create:{slug:topic.slug,title:topic.title,kind:topic.kind,overview:topic.overview},update:{}});
  const existing=await db.encyclopediaArticle.findUnique({where:{topicId:row.id}});
  if(!existing){
   const initial=initialArticles[topic.slug]||topic.accounts.map(a=>`## ${a.scripture} — ${a.locator}\n\n${a.explanation}`).join("\n\n");
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
