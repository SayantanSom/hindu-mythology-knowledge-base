import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const slug = "brihadaranyaka-upanishad";
const source = "https://upanishads.org.in/u/brihadaranyaka/p/";
const provisionalRecension = "Recension not yet established — Upanishads.org.in working witness";
const witnessTitle = "Upanishads.org.in — online Sanskrit presentation (base edition unverified)";

const sanskrit391 = `अथ हैनं विदग्धः शाकल्यः पप्रच्छ -- कति देवा याज्ञवल्क्येति ।
स हैतयैव निविदा प्रतिपेदे यावन्तो वैश्वदेवस्य निविद्य् उच्यन्ते ।
त्रयश् च त्री च शता त्रयश् च त्री च सहस्रेति ।
ओम् इति होवाच ।
कत्य् एव देवा याज्ञवल्क्येति ।
त्रयस्त्रिंशद् इति ।
ओम् इति होवाच ।
कत्य् एव देवा याज्ञवल्क्येति ।
षड् इति ।
ओम् इति होवाच ।
कत्य् एव देवा याज्ञवल्क्येति ।
त्रय इति ।
ओम् इति होवाच ।
कत्य् एव देवा याज्ञवल्क्येति ।
द्वाव् इति ।
ओम् इति होवाच ।
कत्य् एव देवा याज्ञवल्क्येति ।
अध्यर्ध इति ।
ओम् इति होवाच ।
कत्य् एव देवा याज्ञवल्क्येति ।
एक इति ।
ओम् इति होवाच ।
कतमे ते त्रयश् च त्री च शता त्रयश् च त्री च सहस्रेति ॥`;

const sanskrit392 = `स होवाच -- महिमान एवैषाम् एते ।
त्रयस्त्रिंशत् त्व् एव देवा इति ।
कतमे ते त्रयस्त्रिंशद् इति ।
अष्टौ वसव एकादश रुद्रा द्वादशादित्याः त एकत्रिंशद् ऐन्द्रश् चैव प्रजापतिश् च त्रयस्त्रिंशाव् इति ॥`;

async function main() {
  const scripture = await db.scripture.findUniqueOrThrow({ where: { slug } });

  // Provisional grouping is NOT a claim that a recension has been identified.
  const recension = await db.recension.upsert({
    where: { scriptureId_label: { scriptureId: scripture.id, label: provisionalRecension } },
    update: {},
    create: {
      scriptureId: scripture.id,
      label: provisionalRecension,
      notes: "Temporary holding record required by current data model. Do not classify as Mādhyandina or Kāṇva without verifying the site's Sanskrit base edition.",
    },
  });

  let edition = await db.edition.findFirst({
    where: { recensionId: recension.id, title: witnessTitle },
  });
  if (!edition) {
    edition = await db.edition.create({
      data: {
        recensionId: recension.id,
        title: witnessTitle,
        sourceUrl: source + "3.9.1",
        rightsNote: "Working online witness only; not a verified print edition. Sanskrit textual base and recension unverified. English translation on the page is credited to F. Max Müller, Sacred Books of the East vol. 15 (1884). Do not assume site transcription is a diplomatic edition.",
      },
    });
  }

  const translationTitle = "F. Max Müller — The Upanishads, Sacred Books of the East 15 (1884); as presented on Upanishads.org.in";
  const existingTranslation = await db.translation.findFirst({
    where: { editionId: edition.id, title: translationTitle },
  });
  if (!existingTranslation) {
    await db.translation.create({
      data: {
        editionId: edition.id,
        title: translationTitle,
        translator: "F. Max Müller",
        languageCode: "en",
        rightsNote: "Translation attribution displayed by Upanishads.org.in; bibliographic and textual alignment not independently verified. Full English translation not reproduced here.",
      },
    });
  }

  const p391 = await db.passage.upsert({
    where: { editionId_locator: { editionId: edition.id, locator: "3.9.1" } },
    update: {},
    create: {
      editionId: edition.id,
      locator: "3.9.1",
      originalText: sanskrit391,
      rightsNote: "Ancient Sanskrit passage transcribed from text supplied by project researcher, matching the preferred working website. Site: " + source + "3.9.1. Base edition unverified.",
    },
  });
  const p392 = await db.passage.upsert({
    where: { editionId_locator: { editionId: edition.id, locator: "3.9.2" } },
    update: {},
    create: {
      editionId: edition.id,
      locator: "3.9.2",
      originalText: sanskrit392,
      rightsNote: "Ancient Sanskrit passage from preferred working website: " + source + "3.9.2. Base edition unverified.",
    },
  });

  const claims = [
    {
      passageId: p391.id,
      statement: "In the dialogue with Vidagdha Śākalya, Yājñavalkya gives successive counts of the gods: 3,303; 33; 6; 3; 2; 1½; and 1.",
      notes: "Preliminary reading of 3.9.1, based on Upanishads.org.in. The larger count and its interpretation must be read with 3.9.2; no list of 3,303 named gods is asserted.",
    },
    {
      passageId: p392.id,
      statement: "The thirty-three gods are enumerated as eight Vasus, eleven Rudras, twelve Ādityas, Indra, and Prajāpati.",
      notes: "Preliminary direct-text claim from 3.9.2. Recension and Sanskrit base edition unverified; no later deity-name lists imported.",
    },
  ];
  for (const c of claims) {
    let claim = await db.claim.findFirst({
      where: { statement: c.statement, evidence: { some: { passageId: c.passageId } } },
    });
    if (!claim) {
      claim = await db.claim.create({
        data: {
          statement: c.statement,
          claimType: "DIRECT_TEXT",
          status: "PROPOSED",
          evidence: { create: { passageId: c.passageId, role: "SUPPORTS", notes: c.notes } },
        },
      });
    }
  }

  const noteTitle = "Bṛhadāraṇyaka 3.9.1–2 — source verification pending";
  const noteExists = await db.researchNote.findFirst({
    where: { scriptureId: scripture.id, title: noteTitle },
  });
  if (!noteExists) {
    await db.researchNote.create({
      data: {
        scriptureId: scripture.id,
        title: noteTitle,
        status: "NEEDS_SOURCE",
        sourceRef: source + "3.9.1 ; " + source + "3.9.2",
        body: "Upanishads.org.in is the preferred working witness. Both pages display Sanskrit, IAST and an English translation credited to F. Max Müller, The Upanishads, SBE 15 (1884). Verify the Sanskrit base edition, recension, textual variants and numbering before treating the passages as critically established. IIT Kanpur Heritage and Wisdom Library remain unverified cross-references. The provisional recension record is a data-model placeholder, not a textual identification.",
      },
    });
  }

  console.log("Bṛhadāraṇyaka 3.9.1–2 working witness, translation metadata, 2 passages, 2 proposed claims, and research note are present.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => { await db.$disconnect(); });
