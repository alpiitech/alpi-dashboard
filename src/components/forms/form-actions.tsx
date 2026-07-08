import { Button } from "@/components/ui/button"

export function FormActions({
  submitLabel,
  cancelLabel = "Cancel",
  isSubmitting = false,
  onCancel,
}: {
  submitLabel: string
  cancelLabel?: string
  isSubmitting?: boolean
  onCancel: () => void
}) {
  return (
    <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </div>
  )
}
