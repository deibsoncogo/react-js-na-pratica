import { ListVideo, Tags, Settings, Code2 } from "lucide-react"

export function Tabs() {
  return (
    <div className="border-b border-zinc-800 py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-100">
          <ListVideo className="size-4" /> Uploads
        </button>

        <button type="button" disabled className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-zinc-300 hover:border-zinc-800">
          <Tags className="size-4" /> Tags
        </button>

        <button type="button" disabled className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-zinc-300 hover:border-zinc-800">
          <Settings className="size-4" /> Settings
        </button>

        <button type="button" disabled className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-zinc-300 hover:border-zinc-800">
          <Code2 className="size-4" /> Developers
        </button>
      </nav>
    </div>
  )
}
