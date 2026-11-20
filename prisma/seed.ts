import { PrismaClient, ResearchStatus } from "@prisma/client";

const db = new PrismaClient();

// Catalogue examples only. No verses, editions, or theological claims are invented.
const categories = [
  { slug: "shruti", name: "Śruti", description: "Vedic textual traditions" },
  { slug: "veda-samhita", name: "Veda Saṃhitā", description: "Vedic hymn and mantra collections" },
  { slug: "brahmana", name: "Brāhmaṇa", description: "Vedic ritual-expository literature" },
  { slug: "upanishad", name: "Upaniṣad", description: "Texts associated with Vedic philosophical and contemplative teaching" },
  { slug: "itihasa", name: "Itihāsa", description: "Epic narrative traditions" },
  { slug: "purana", name: "Purāṇa", description: "Puranic narrative and theological literature" },
  { slug: "regional-shaiva", name: "Regional Śaiva literature", description: "Regional-language Śaiva traditions" },
];

const scriptures = [
  { slug: "rigveda-samhita", title: "Rigveda Saṃhitā", titleOriginal: "ऋग्वेदसंहिता", transliteration: "Ṛgveda Saṃhitā", languageCode: "sa", scriptCode: "Deva", categories: ["shruti", "veda-samhita"] },
  { slug: "shatapatha-brahmana", title: "Shatapatha Brahmana", titleOriginal: "शतपथब्राह्मण", transliteration: "Śatapatha Brāhmaṇa", languageCode: "sa", scriptCode: "Deva", categories: ["shruti", "brahmana"] },
  { slug: "brihadaranyaka-upanishad", title: "Brihadaranyaka Upanishad", titleOriginal: "बृहदारण्यकोपनिषद्", transliteration: "Bṛhadāraṇyaka Upaniṣad", languageCode: "sa", scriptCode: "Deva", categories: ["shruti", "upanishad"] },
  { slug: "mahabharata", title: "Mahabharata", titleOriginal: "महाभारत", transliteration: "Mahābhārata", languageCode: "sa", scriptCode: "Deva", categories: ["itihasa"] },
  { slug: "vishnu-purana", title: "Vishnu Purana", titleOriginal: "विष्णुपुराण", transliteration: "Viṣṇu Purāṇa", languageCode: "sa", scriptCode: "Deva", categories: ["purana"] },
  { slug: "tirumantiram", title: "Tirumantiram", titleOriginal: "திருமந்திரம்", transliteration: "Tirumantiram", languageCode: "ta", scriptCode: "Taml", categories: ["regional-shaiva"] },
];

async function main() {
  for (const category of categories) {
    await db.category.upsert({ where: { slug: category.slug }, update: category, create: category });
  }
  for (const { categories: groupSlugs, ...work } of scriptures) {
    const scripture = await db.scripture.upsert({
      where: { slug: work.slug },
      update: { ...work, status: ResearchStatus.CATALOGUED },
      create: { ...work, status: ResearchStatus.CATALOGUED },
    });
    for (const slug of groupSlugs) {
      const category = await db.category.findUniqueOrThrow({ where: { slug } });
      await db.scriptureCategory.upsert({
        where: { scriptureId_categoryId: { scriptureId: scripture.id, categoryId: category.id } },
        update: {},
        create: { scriptureId: scripture.id, categoryId: category.id, rationale: "Initial working classification; detailed source review pending" },
      });
    }
  }
  console.log("Seeded 7 categories and 6 illustrative scripture catalogue records.");
}

main().finally(async () => { await db.$disconnect(); }).catch((error) => { console.error(error); process.exitCode = 1; });
