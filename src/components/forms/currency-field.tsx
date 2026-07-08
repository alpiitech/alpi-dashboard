import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { FieldMessage } from "@/components/forms/field-message"
import { Input } from "@/components/ui/input"
import { Text } from "@/components/ui/typography"

export type CurrencyFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  currency?: string
  disabled?: boolean
}

export function CurrencyField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  currency,
  disabled,
}: CurrencyFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <label className="block">
          <Text as="span" className="font-medium">{label}</Text>
          <div className="relative mt-2">
            {currency ? (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                {currency}
              </span>
            ) : null}
            <Input
              value={field.value ?? ""}
              name={field.name}
              onBlur={field.onBlur}
              ref={field.ref}
              onChange={(event) => field.onChange(Number(event.target.value))}
              type="number"
              min="0"
              step="1"
              disabled={disabled}
              className={currency ? "pl-12" : undefined}
            />
          </div>
          <FieldMessage>{fieldState.error?.message}</FieldMessage>
        </label>
      )}
    />
  )
}
