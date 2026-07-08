import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/shared/utils/cn"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-[2px] data-[state=closed]:animate-none data-[state=open]:animate-none" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-dialog)] border border-border bg-surface p-0 text-foreground shadow-[var(--shadow-soft)] outline-none transition-[opacity,transform] duration-200 ease-[var(--ease-standard)] data-[state=closed]:scale-[0.985] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[var(--radius-button)] text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
