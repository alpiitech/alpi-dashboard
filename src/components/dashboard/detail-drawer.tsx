import type { ReactNode } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { H2, Text } from "@/components/ui/typography"

export type DetailDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  status?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

export function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  status,
  actions,
  children,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-full p-0 sm:w-[min(90vw,30rem)]"
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border px-4 py-4 pr-14 sm:px-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <H2 as={SheetTitle} className="truncate">
                  {title}
                </H2>
                {description ? (
                  <Text
                    as={SheetDescription}
                    className="mt-1 text-muted-foreground"
                  >
                    {description}
                  </Text>
                ) : null}
              </div>
              {status ? <div className="shrink-0 pt-0.5">{status}</div> : null}
            </div>
            {actions ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {actions}
              </div>
            ) : null}
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
