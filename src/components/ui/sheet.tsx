import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/shared/utils/cn"

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close

export function SheetContent({
  className,
  children,
  side = "left",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: "left" | "right" }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-[2px]" />
      <SheetPrimitive.Content
        className={cn(
          "fixed top-0 z-50 h-dvh w-[19rem] border-border bg-surface p-0 text-foreground shadow-[var(--shadow-soft)] outline-none transition-transform duration-200 ease-[var(--ease-standard)]",
          side === "left"
            ? "left-0 border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0"
            : "right-0 border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[var(--radius-button)] text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export const SheetTitle = SheetPrimitive.Title
export const SheetDescription = SheetPrimitive.Description
