import fs from "node:fs";
import path from "node:path";

export type Note = {
  readonly id: number;
  readonly title: string;
  readonly body: string;
  readonly tag: string;
};

const NOTES_DIR = path.join(process.cwd(), "src", "content", "notes");

function isNote(value: unknown): value is Note {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    Number.isInteger(candidate.id) &&
    typeof candidate.title === "string" &&
    typeof candidate.body === "string" &&
    typeof candidate.tag === "string"
  );
}

function readNote(fileName: string): Note {
  const filePath = path.join(NOTES_DIR, fileName);
  const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  if (!isNote(parsed)) {
    throw new Error(`Invalid note file: ${fileName}`);
  }
  return parsed;
}

/**
 * Reads every note in src/content/notes, ordered by id.
 * Uses synchronous fs on purpose: with cacheComponents enabled, sync reads
 * are prerendered into the static shell, while awaited reads would not be.
 */
export function getNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(NOTES_DIR)
    .filter((fileName) => fileName.endsWith(".json"))
    .map(readNote)
    .toSorted((a, b) => a.id - b.id);
}
