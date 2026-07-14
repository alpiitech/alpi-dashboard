import { PageShell } from "@/components/dashboard/page-shell"

const SECTIONS = [
  {
    title: "Price Composition",
    rows: [
      { label: "Platform Fee", value: "10%" },
      { label: "Tax", value: "2%" },
      { label: "Payment Processing Fee", value: "1.5%" },
      { label: "FX Markup", value: "1%" },
      { label: "Minimum Margin", value: "5%" },
    ],
  },
  {
    title: "Commission Rules",
    rows: [
      { label: "Agent Commission Base", value: "80%" },
      { label: "Affiliate Commission", value: "5% of Alpii net profit" },
      { label: "Max Promo Discount", value: "20%" },
    ],
  },
  {
    title: "Currency & FX",
    rows: [
      { label: "Base Currency", value: "IDR" },
      { label: "Enabled Currencies", value: "IDR, USD, AUD, EUR, SGD" },
      { label: "FX Provider", value: "Open Exchange Rates" },
      { label: "FX Freshness Window", value: "4 hours" },
    ],
  },
]

export function PricingPage() {
  return (
    <PageShell
      title="Pricing"
      description="Platform price composition, fees, commissions, and currency settings."
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
          Pricing configuration is read-only in this version. Full editor coming in a future sprint.
        </p>
      </div>
    </PageShell>
  )
}
