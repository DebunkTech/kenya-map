/**
 * Converts a SHOUTING source name ("THARAKA - NITHI") into a normal title
 * case name ("Tharaka-Nithi"). Word boundaries are spaces and hyphens;
 * apostrophes are NOT boundaries, so "MURANG'A" becomes "Murang'a", not
 * "Murang'A". Stray spaces around hyphens are collapsed, since the source
 * data is inconsistent about that ("THARAKA - NITHI" vs "ELEGEYO-MARAKWET").
 *
 * This only fixes casing/spacing, never spelling — e.g. the source's
 * "ELEGEYO-MARAKWET" (the official county is "Elgeyo-Marakwet") is kept
 * as-is rather than silently corrected.
 */
export function titleCaseName(raw) {
  return raw
    .trim()
    .replace(/\s*-\s*/g, "-")
    .toLowerCase()
    .replace(/(^|[\s-])([a-z])/g, (_, boundary, letter) => boundary + letter.toUpperCase());
}

/** Zero-pads a number to a fixed width string code, e.g. padCode(7, 3) -> "007". */
export function padCode(n, width) {
  return String(n).padStart(width, "0");
}
