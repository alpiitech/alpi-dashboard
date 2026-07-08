import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { FieldMessage } from "@/components/forms/field-message"
import { Select } from "@/components/ui/select"
import { Text } from "@/components/ui/typography"

export type SelectOption = {
  label: string
  value: string
}

export type SelectFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
}: SelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <label className="block">
          <Text as="span" className="font-medium">{label}</Text>
          <Select {...field} value={field.value ?? ""} disabled={disabled} className="mt-2">
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FieldMessage>{fieldState.error?.message}</FieldMessage>
        </label>
      )}
    />
  )
}
