import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { FileDown, Filter, MoreHorizontal, Plus, Search, Tag } from "lucide-react"
import { Header } from "./components/header"
import { Pagination } from "./components/pagination"
import { Tabs } from "./components/tabs"
import { Button } from "./components/ui/button"
import { Control, Input } from "./components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"

interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

interface Tag {
  id: string
  title: string
  amountOfVideos: string
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
  const urlFilter = searchParams.get("filter") ?? ""

  const [filter, setFilter] = useState(urlFilter)

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ["get-tags", urlFilter, page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`)
      const data = await response.json()

      return data
    },
  })

  function handleFilter() {
    setSearchParams((params) => {
      params.set("page", "1")
      params.set("filter", filter)

      return params
    })
  }

  if (isLoading) return null

  return (
    <div className="space-y-8 py-10">
      <div>
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto max-w-6xl space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">
            Tags
          </h1>

          <Button variant="primary">
            <Plus className="size-3" /> {" "} Create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input variant="filter">
              <Search className="size-3" />

              <Control
                placeholder="Search tags..."
                onChange={(event) => setFilter(event.target.value)}
                value={filter}
              />
            </Input>

            <Button onClick={handleFilter}>
              <Filter className="size-3" /> Filter
            </Button>
          </div>

          <Button>
            <FileDown className="size-3" /> Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {tagsResponse?.data.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell />

                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{tag.title}</span>
                    <span className="text-xs text-zinc-500">{tag.id}</span>
                  </div>
                </TableCell>

                <TableCell className="text-zinc-300">
                  {tag.amountOfVideos} vídeo(s)
                </TableCell>

                <TableCell className="text-right">
                  <Button size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {tagsResponse && (
          <Pagination pages={tagsResponse.pages} items={tagsResponse.items} page={page} />
        )}
      </main>
    </div>
  )
}
