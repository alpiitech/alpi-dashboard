import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { FieldMessage } from "@/components/forms/field-message"
import { Input } from "@/components/ui/input"
import { Caption, Text } from "@/components/ui/typography"

export type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  description?: string
  placeholder?: string
  disabled?: boolean
}

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
}: TextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <label className="block">
          <Text as="span" className="font-medium">{label}</Text>
          {description ? <Caption as="span" className="mt-1 block">{description}</Caption> : null}
          <Input
            {...field}
            value={field.value ?? ""}
            placeholder={placeholder}
            disabled={disabled}
            className="mt-2"
          />
          <FieldMessage>{fieldState.error?.message}</FieldMessage>
        </label>
      )}
    />
  )
}
