import { Plus, UserRoundCheck } from "lucide-react"
import { PageShell } from "@/components/dashboard/page-shell"
import { IconSurface, Surface, SurfaceHeader } from "@/components/dashboard/surface"
import { Button } from "@/components/ui/button"
import { H3, Strong, Text } from "@/components/ui/typography"

const employeePreview = [
  { name: "Ari Wibowo", team: "Operations", status: "Active" },
  { name: "Maya Chen", team: "Finance", status: "Pending review" },
  { name: "Rafi Pratama", team: "Publishing", status: "Active" },
]

export function EmployeesPage() {
  return (
    <PageShell
      title="Employees"
      description="A future HR/personnel module preview. Employees remain separate from dashboard user accounts."
      action={
        <Button size="lg">
          <Plus />
          Add employee
        </Button>
      }
    >
      <Surface>
        <SurfaceHeader>
          <IconSurface>
            <UserRoundCheck className="size-5" />
          </IconSurface>
          <div>
            <H3 as="h2">Directory preview</H3>
            <Text className="text-muted-foreground">Sprint 1 validates layout only. DataTable and forms arrive later.</Text>
          </div>
        </SurfaceHeader>

        <div className="mt-5 grid gap-3">
          {employeePreview.map((employee) => (
            <div
              key={employee.name}
              className="grid gap-2 rounded-[var(--radius-card)] border border-border bg-surface-muted p-3 sm:grid-cols-[1fr_0.8fr_auto] sm:items-center"
            >
              <Strong as="div">{employee.name}</Strong>
              <Text className="text-muted-foreground">{employee.team}</Text>
              <span className="w-fit rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success">
                {employee.status}
              </span>
            </div>
          ))}
        </div>
      </Surface>
    </PageShell>
  )
}
