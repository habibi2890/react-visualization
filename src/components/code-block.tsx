import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  activeLines = [],
}: {
  code: string;
  activeLines?: number[];
}) {
  const lines = code.split("\n");

  return (
    <pre className="overflow-x-auto rounded-3xl border border-slate-800 bg-surface-code p-4 text-sm leading-7 text-slate-100 shadow-2xl shadow-slate-950/20">
      <code>
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const active = activeLines.includes(lineNumber);
          return (
            <span
              key={`${lineNumber}-${line}`}
              className={cn(
                "block rounded-lg px-3 font-mono",
                active && "bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/20",
              )}
            >
              <span className="mr-4 select-none text-slate-500">
                {String(lineNumber).padStart(2, "0")}
              </span>
              {line || " "}
            </span>
          );
        })}
      </code>
    </pre>
  );
}
