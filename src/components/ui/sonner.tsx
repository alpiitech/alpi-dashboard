import { Toaster as Sonner, type ToasterProps } from "sonner"

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      closeButton
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "border-border bg-surface text-foreground shadow-[var(--shadow-soft)] font-sans",
          title: "text-sm font-semibold text-foreground",
          description: "text-xs text-muted-foreground",
          actionButton:
            "rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground",
          cancelButton:
            "rounded-md bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground",
          closeButton:
            "border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground",
        },
      }}
      {...props}
    />
  )
}
