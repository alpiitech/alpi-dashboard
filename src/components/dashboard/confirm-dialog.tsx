import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { H3, Text } from "@/components/ui/typography"

export type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  tone?: "default" | "danger"
  isPending?: boolean
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "default",
  isPending = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="px-5 pb-5 pt-5 pr-14">
          <H3 as={DialogTitle}>
            {title}
          </H3>
          <Text as={DialogDescription} className="mt-2 text-muted-foreground">
            {description}
          </Text>
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={isPending}>
              {cancelLabel}
            </Button>
            <Button
              variant={tone === "danger" ? "destructive" : "default"}
              size="lg"
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? "Working..." : confirmLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
