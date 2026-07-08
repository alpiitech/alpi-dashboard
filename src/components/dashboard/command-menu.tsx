import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Caption, H5, Strong, Text } from "@/components/ui/typography"
import { navigationItems } from "@/core/config/navigation"
import { cn } from "@/shared/utils/cn"

export function CommandMenu() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f") {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const results = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return navigationItems
    return navigationItems.filter((item) =>
      [item.label, item.href].some((value) =>
        value.toLowerCase().includes(term),
      ),
    )
  }, [search])

  function handleNavigate(href: string) {
    navigate(href)
    setOpen(false)
    setSearch("")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-full max-w-xl min-w-0 items-center gap-3 rounded-[var(--radius-input)] border border-border bg-surface px-3 text-left text-sm text-muted-foreground shadow-[0_1px_1px_oklch(0_0_0/0.03)] transition-colors duration-150 hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 lg:flex"
      >
        <Search size={17} />
        <span className="min-w-0 flex-1 truncate">
          Search or type a command
        </span>
        <kbd className="inline-flex h-6 shrink-0 items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-background px-1.5 text-xs font-medium text-foreground shadow-[0_1px_1px_oklch(0_0_0/0.04)]">
          <span className="leading-none">⌘</span>
          <span>F</span>
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <div className="border-b border-border px-4 py-3">
            <DialogTitle className="sr-only">Command search</DialogTitle>
            <DialogDescription className="sr-only">
              Search dashboard pages and navigate to a route.
            </DialogDescription>
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search or type a command"
                className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                {results.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleNavigate(item.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-[var(--radius-button)] px-3 py-2 text-left transition-colors duration-150 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                      )}
                    >
                      <Icon size={17} className="text-muted-foreground" />
                      <span className="min-w-0 flex-1">
                        <Strong as="span" className="block text-sm">
                          {item.label}
                        </Strong>
                        <Caption as="span" className="block">
                          {item.href}
                        </Caption>
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="px-4 py-10 text-center">
                <H5 as="div">No command found.</H5>
                <Text className="mt-1 text-muted-foreground">
                  Try a different page or route name.
                </Text>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
