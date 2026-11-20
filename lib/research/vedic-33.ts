export type DeitySlot = {
  id: string;
  label: string;
  group: "Vasus" | "Rudras" | "Ādityas" | "Other";
  passage: string;
  explanation: string;
  identification: "Named in passage" | "Described collectively" | "Editorial position";
};
const vasus = [
  ["Agni (fire)", "Fire, one of the eight cosmic realities identified as Vasus."],
  ["Pṛthivī (earth)", "Earth, identified as a Vasu."],
  ["Vāyu (air)", "Air or wind, identified as a Vasu."],
  ["Antarikṣa (mid-space)", "The intermediate region, identified as a Vasu."],
  ["Āditya (sun)", "The sun, identified as a Vasu in this enumeration; not to be confused with the separate group of twelve Ādityas."],
  ["Dyauḥ (heaven)", "Heaven or the celestial region, identified as a Vasu."],
  ["Candramas (moon)", "The moon, identified as a Vasu."],
  ["Nakṣatrāṇi (stars)", "The stars or lunar mansions, identified collectively as one of the eight Vasus."],
] as const;
export const deitySlots: DeitySlot[] = [
  ...vasus.map(([label, explanation], i) => ({
    id: `vasu-${i+1}`, label, group:"Vasus" as const, passage:"3.9.3", explanation,
    identification:"Named in passage" as const
  })),
  ...Array.from({length:10}, (_,i)=>({
    id:`rudra-vital-${i+1}`, label:`Vital function ${i+1} (of ten)`,
    group:"Rudras" as const, passage:"3.9.4",
    explanation:"One of ten prāṇas or vital functions in the person. The passage does not individually name these ten; numbering here is an editorial indexing device, not a scriptural name.",
    identification:"Editorial position" as const
  })),
  {id:"rudra-atman",label:"Ātman (the eleventh)",group:"Rudras",passage:"3.9.4",explanation:"The eleventh in the passage's account is the self (ātman). Their departure from the mortal body is associated with weeping, explaining the name Rudra in this dialogue.",identification:"Named in passage"},
  ...Array.from({length:12},(_,i)=>({
    id:`aditya-month-${i+1}`,label:`Month ${i+1} (of twelve)`,
    group:"Ādityas" as const,passage:"3.9.5",
    explanation:"One of the twelve months of the year. This passage identifies the Ādityas with the months but does not supply twelve personal deity names or specify month names.",
    identification:"Editorial position" as const
  })),
  {id:"indra",label:"Indra",group:"Other",passage:"3.9.6",explanation:"Identified with thunder in this dialogue, further associated with the thunderbolt. This is a contextual explanation, not a complete definition of Indra across Hindu texts.",identification:"Named in passage"},
  {id:"prajapati",label:"Prajāpati",group:"Other",passage:"3.9.6",explanation:"Identified with sacrifice, which the dialogue further relates to sacrificial animals. This is a contextual identification, not a complete definition of Prajāpati across Hindu texts.",identification:"Named in passage"}
];
if(deitySlots.length!==33) throw new Error("Expected exactly 33 indexed positions");
export const passages = [
  {locator:"3.9.1",role:"Opening dialogue",description:"Vidagdha Śākalya asks Yājñavalkya how many gods there are; the dialogue moves through several counts."},
  {locator:"3.9.2",role:"Enumeration",description:"The thirty-three are grouped as eight Vasus, eleven Rudras, twelve Ādityas, Indra and Prajāpati."},
  {locator:"3.9.3",role:"Vasus",description:"Eight cosmic realities are named, and the passage explains their designation as Vasus."},
  {locator:"3.9.4",role:"Rudras",description:"Ten prāṇas and ātman are described as eleven Rudras, associated with weeping at their departure."},
  {locator:"3.9.5",role:"Ādityas",description:"The twelve Ādityas are identified with the twelve months of the year."},
  {locator:"3.9.6",role:"Indra and Prajāpati",description:"Indra is associated with thunder and the thunderbolt; Prajāpati with sacrifice and sacrificial animals."}
];
