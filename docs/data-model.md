# Conceptual data model — draft v0.1

Design first; database migration after review.

## Main entities

- **Work:** stable intellectual text identity; title, alternate titles, traditional attribution, language(s), historical scholarship notes.
- **Category:** non-exclusive classification label with tradition/source metadata.
- **WorkCategory:** many-to-many classification and its evidence.
- **Recension:** identifiable textual version/lineage of a work.
- **Edition:** bibliographic edition, editor, publisher, date, source URL, license.
- **Translation:** language, translator, publication, copyright/license and edition relationship.
- **Passage:** locator relative to a specified work/recension/edition; supports nonstandard divisions and parallel numbering.
- **Deity:** identity record, avoiding automatic conflation of epithets, incarnations, forms, and regional identifications.
- **DeityName:** name, script, language, role (name/epithet/etc.) and documented usage.
- **Story:** narrative/event with source-specific variants.
- **Concept:** philosophical/cosmological term with source-specific meanings.
- **Claim:** statement with type, tradition, uncertainty and editorial status.
- **ClaimEvidence:** many-to-many claim-to-passage relation, evidence role, quotation and commentary.
- **Relationship:** typed, time-/source-/tradition-qualified links among entities.
- **Contributor / Review / Revision:** accountability and editorial audit trail.

## Invariants

- Never treat 'has the name X' as an identity equivalence without evidence.
- A source passage and the statement derived from it are separate data records.
- Multiple interpretations can coexist; no globally preferred theology.
- Published entries require linked, reviewed citations.
- Cataloguing a work does not imply having researched its content.
- Store original script and transliteration separately.

## Implementation outline

PostgreSQL with explicit join tables; Prisma schema after reviewing entity boundaries. JSON metadata may hold unusual locator details, but key identity and provenance links must be relational.
