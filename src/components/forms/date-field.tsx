import { format, parseISO } from "date-fns"
import { CalendarDays } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { FieldMessage } from "@/components/forms/field-message"
import { Text } from "@/components/ui/typography"
import { cn } from "@/shared/utils/cn"

export type DateFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  disabled?: boolean
}

function formatValue(value: unknown) {
  if (typeof value !== "string" || !value) {
    return "Select date"
  }

  return format(parseISO(value), "dd MMM yyyy")
}

function toInputValue(date: Date) {
  return format(date, "yyyy-MM-dd")
}

export function DateField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: DateFieldProps<TFieldValues>) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLLabelElement | null>(null)

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedDate = typeof field.value === "string" && field.value ? parseISO(field.value) : undefined

        return (
          <label ref={wrapperRef} className="relative block">
            <Text as="span" className="font-medium">{label}</Text>
            <button
              type="button"
              disabled={disabled}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                "mt-2 flex h-9 w-full items-center justify-between rounded-[var(--radius-input)] border border-border bg-surface px-3 py-2 text-left text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
                selectedDate ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span>{formatValue(field.value)}</span>
              <CalendarDays className="size-4 text-muted-foreground" />
            </button>

            {open ? (
              <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 rounded-[var(--radius-dialog)] border border-border bg-surface p-2 text-foreground shadow-[var(--shadow-soft)]">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(toInputValue(date))
                      setOpen(false)
                    }
                  }}
                  captionLayout="dropdown"
                  classNames={{
                    today: "text-primary",
                    selected: "bg-primary text-primary-foreground rounded-[var(--radius-button)]",
                    chevron: "fill-foreground",
                  }}
                />
              </div>
            ) : null}
            <FieldMessage>{fieldState.error?.message}</FieldMessage>
          </label>
        )
      }}
    />
  )
}
