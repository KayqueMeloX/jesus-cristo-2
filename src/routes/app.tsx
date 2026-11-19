import { createFileRoute } from "@tanstack/react-router";
import { MembersFrame } from "@/components/MembersFrame";

export const Route = createFileRoute("/app")({
  component: AppView,
  head: () => ({
    meta: [
      { title: "Members App | My Faith Sanctuary" },
      { name: "description", content: "Access your prayers, guided audios and daily declarations." },
      { property: "og:title", content: "Members App | My Faith Sanctuary" },
      { property: "og:description", content: "Access your prayers, guided audios and daily declarations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AppView() {
  return <MembersFrame />;
}
