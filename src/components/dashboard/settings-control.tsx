import type { ReactNode } from "react"
import { Caption, Text } from "@/components/ui/typography"
import { cn } from "@/shared/utils/cn"

export type SettingsOption<T extends string> = {
  id: T
  label: string
  description?: string
}

export function SettingsOptionCard<T extends string, TOption extends SettingsOption<T> = SettingsOption<T>>({
  option,
  selected,
  onSelect,
  children,
}: {
  option: TOption
  selected: boolean
  onSelect: (value: T) => void
  children?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={cn(
        "rounded-[var(--radius-card)] border p-3 text-left transition-colors",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-muted",
      )}
    >
      {children ? <div className="mb-2">{children}</div> : null}
      <Text className={cn("font-medium", selected && "text-primary")}>{option.label}</Text>
      {option.description ? (
        <Caption className="mt-1 text-muted-foreground">{option.description}</Caption>
      ) : null}
    </button>
  )
}

export function SettingsOptionGrid<T extends string, TOption extends SettingsOption<T> = SettingsOption<T>>({
  label,
  value,
  options,
  onChange,
  columns = 2,
  renderPreview,
}: {
  label: string
  value: T
  options: Array<TOption>
  onChange: (value: T) => void
  columns?: 2 | 3 | 4
  renderPreview?: (option: TOption) => ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Text className="font-medium">{label}</Text>
      <div
        className={cn(
          "grid gap-2",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4",
        )}
      >
        {options.map((option) => (
          <SettingsOptionCard
            key={option.id}
            option={option}
            selected={value === option.id}
            onSelect={onChange}
          >
            {renderPreview?.(option)}
          </SettingsOptionCard>
        ))}
      </div>
    </div>
  )
}
