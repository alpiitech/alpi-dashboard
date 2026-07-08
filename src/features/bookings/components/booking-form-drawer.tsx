import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { CurrencyField } from "@/components/forms/currency-field"
import { DateField } from "@/components/forms/date-field"
import { FormActions } from "@/components/forms/form-actions"
import { FormSection } from "@/components/forms/form-section"
import { SelectField, type SelectOption } from "@/components/forms/select-field"
import { TextareaField } from "@/components/forms/textarea-field"
import { TextField } from "@/components/forms/text-field"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { H2, Text } from "@/components/ui/typography"
import {
  bookingStatusLabels,
  paymentStatusLabels,
} from "@/features/bookings/bookings.constants"
import {
  bookingFormSchema,
  bookingToFormValues,
  emptyBookingFormValues,
  type BookingFormValues,
} from "@/features/bookings/bookings.schema"
import type { Booking } from "@/features/bookings/bookings.types"

const bookingStatusOptions: SelectOption[] = [
  "pending_payment",
  "paid_upcoming",
  "ongoing",
  "finished",
  "cancelled",
  "expired",
].map((status) => ({
  value: status,
  label: bookingStatusLabels[status as keyof typeof bookingStatusLabels],
}))

const paymentStatusOptions: SelectOption[] = [
  "pending",
  "paid",
  "refunded",
].map((status) => ({
  value: status,
  label: paymentStatusLabels[status as keyof typeof paymentStatusLabels],
}))

const currencyOptions: SelectOption[] = [
  { value: "IDR", label: "IDR" },
  { value: "USD", label: "USD" },
]

export type BookingFormDrawerProps = {
  open: boolean
  mode: "create" | "edit"
  booking?: Booking | null
  onOpenChange: (open: boolean) => void
  onSubmit: (values: BookingFormValues) => Promise<void> | void
}

export function BookingFormDrawer({
  open,
  mode,
  booking,
  onOpenChange,
  onSubmit,
}: BookingFormDrawerProps) {
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false)
  const defaultValues = useMemo(
    () =>
      mode === "edit" && booking
        ? bookingToFormValues(booking)
        : emptyBookingFormValues,
    [booking, mode],
  )

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
    mode: "onSubmit",
  })
  const selectedCurrency = useWatch({ control: form.control, name: "currency" })

  useEffect(() => {
    if (open) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form, open])

  function requestClose() {
    if (form.formState.isDirty) {
      setShowDiscardConfirm(true)
      return
    }

    onOpenChange(false)
  }

  async function handleSubmit(values: BookingFormValues) {
    await onSubmit(values)
    form.reset(values)
  }

  function discardChanges() {
    setShowDiscardConfirm(false)
    form.reset(defaultValues)
    onOpenChange(false)
  }

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            requestClose()
            return
          }

          onOpenChange(true)
        }}
      >
        <SheetContent
          side="right"
          className="w-full max-w-full p-0 sm:max-w-[calc(100vw-2rem)] md:w-[38rem]"
        >
          <form
            className="flex h-full flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="border-b border-border px-4 py-4 pr-14 sm:px-5">
              <H2 as={SheetTitle}>
                {mode === "create" ? "New booking" : "Edit booking"}
              </H2>
              <Text
                as={SheetDescription}
                className="mt-1 text-muted-foreground"
              >
                {mode === "create"
                  ? "Create a mock booking record for preview."
                  : "Update booking details for preview."}
              </Text>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              <div className="space-y-5">
                <FormSection title="Booking details">
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      control={form.control}
                      name="customerName"
                      label="Customer name"
                    />
                    <TextField
                      control={form.control}
                      name="agentName"
                      label="Agent name"
                    />
                    <TextField
                      control={form.control}
                      name="activityTitle"
                      label="Activity title"
                    />
                    <TextField
                      control={form.control}
                      name="destination"
                      label="Destination"
                    />
                  </div>
                </FormSection>

                <FormSection title="Schedule">
                  <div className="grid gap-4 md:grid-cols-2">
                    <DateField
                      control={form.control}
                      name="bookingDate"
                      label="Booking date"
                    />
                    <DateField
                      control={form.control}
                      name="travelDate"
                      label="Travel date"
                    />
                  </div>
                </FormSection>

                <FormSection title="Status and payment">
                  <div className="grid gap-4 md:grid-cols-2">
                    <SelectField
                      control={form.control}
                      name="status"
                      label="Booking status"
                      options={bookingStatusOptions}
                    />
                    <SelectField
                      control={form.control}
                      name="paymentStatus"
                      label="Payment status"
                      options={paymentStatusOptions}
                    />
                    <SelectField
                      control={form.control}
                      name="currency"
                      label="Currency"
                      options={currencyOptions}
                    />
                    <CurrencyField
                      control={form.control}
                      name="totalAmount"
                      label="Total amount"
                      currency={selectedCurrency}
                    />
                  </div>
                </FormSection>

                <FormSection title="Internal note">
                  <TextareaField
                    control={form.control}
                    name="internalNote"
                    label="Note"
                    placeholder="Add internal context for the operations team."
                  />
                </FormSection>
              </div>
            </div>

            <FormActions
              submitLabel={
                mode === "create" ? "Create booking" : "Save changes"
              }
              isSubmitting={form.formState.isSubmitting}
              onCancel={requestClose}
            />
          </form>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={showDiscardConfirm}
        onOpenChange={setShowDiscardConfirm}
        title="Discard unsaved changes?"
        description="Your changes will not be saved."
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        tone="danger"
        onConfirm={discardChanges}
      />
    </>
  )
}
