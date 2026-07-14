import { PageShell } from "@/components/dashboard/page-shell"

const SECTIONS = [
  {
    title: "Platform Identity",
    rows: [
      { label: "Platform Name", value: "Alpii" },
      { label: "Contact Email", value: "hello@alpii.com" },
      { label: "Default Timezone", value: "Asia/Makassar (WITA)" },
      { label: "Default Language", value: "English (en)" },
    ],
  },
  {
    title: "Email & Notifications",
    rows: [
      { label: "Email Provider", value: "Resend" },
      { label: "From Address", value: "noreply@alpii.com" },
      { label: "Booking Confirmation", value: "Enabled" },
      { label: "Refund Notification", value: "Enabled" },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { label: "Payment Provider", value: "Midtrans" },
      { label: "File Storage", value: "Cloudflare R2" },
      { label: "FX Provider", value: "Open Exchange Rates" },
      { label: "Webhook Verification", value: "Enabled" },
    ],
  },
  {
    title: "Security Basics",
    rows: [
      { label: "Maintenance Mode", value: "Off" },
      { label: "Audit Logging", value: "Enabled" },
      { label: "Session Timeout", value: "24 hours" },
    ],
  },
]

export function GeneralSettingsPage() {
  return (
    <PageShell
      title="General Settings"
      description="Platform-wide configuration, integrations, and security settings."
    >
      <div className="space-y-6 p-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              {section.title}
            </h2>
            <div className="rounded-lg border border-border bg-card divide-y divide-border">
              {section.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          Full settings editor coming in a future sprint.
        </p>
      </div>
    </PageShell>
  )
}
