import { AppShell } from "@/components/navigation";
import { BookmarksList } from "@/components/bookmarks-list";
import { Badge } from "@/components/ui/badge";

export default function BookmarksPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Bookmarks</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Saved concepts for review.
        </h1>
        <div className="mt-8">
          <BookmarksList />
        </div>
      </div>
    </AppShell>
  );
}
