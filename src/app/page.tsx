import { getNotes, type Note } from "@/lib/notes";

function formatNoteNumber(id: number): string {
  return String(id).padStart(3, "0");
}

function NoteItem({ note }: { note: Note }) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-t border-foreground/10 py-10 sm:grid-cols-[5rem_1fr]">
      <span className="pt-1 font-mono text-sm tabular-nums text-accent">
        {formatNoteNumber(note.id)}
      </span>
      <article>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {note.title}
        </h2>
        <p className="mt-3 max-w-prose leading-7 text-foreground/70">
          {note.body}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
          #{note.tag}
        </p>
      </article>
    </li>
  );
}

export default function Home() {
  const notes = getNotes();
  const countLabel = `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-32">
      <header className="mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Github-c
        </p>
        <h1 className="mt-5 text-6xl font-semibold leading-none tracking-tighter sm:text-8xl">
          Field notes
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-foreground/70">
          Short, practical notes on building for the web. Each one arrives in
          its own pull request.
        </p>
        <p className="mt-10 font-mono text-sm tabular-nums text-foreground/45">
          {countLabel}
        </p>
      </header>

      {notes.length === 0 ? (
        <p className="border-t border-foreground/10 pt-10 text-foreground/60">
          No notes yet.
        </p>
      ) : (
        <ol aria-label="Notes">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ol>
      )}
    </main>
  );
}
