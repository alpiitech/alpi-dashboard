import { DataTable } from "@/components/dashboard/data-table"
import { EmptyState } from "@/components/dashboard/empty-state"
import { ErrorState } from "@/components/dashboard/error-state"
import { Button } from "@/components/ui/button"
import { activityColumns } from "@/features/activities/components/activities-columns"
import type { PartnerActivity } from "@/features/activities/activities.types"

export function ActivitiesTable({
  activities,
  onActivityClick,
  isLoading,
  isError,
  onRetry,
}: {
  activities: PartnerActivity[]
  onActivityClick?: (activity: PartnerActivity) => void
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}) {
  return (
    <DataTable
      columns={activityColumns}
      data={activities}
      isLoading={isLoading}
      isError={isError}
      getRowId={(activity) => activity.id}
      onRowClick={onActivityClick}
      pageSizeOptions={[5, 10, 20]}
      emptyState={
        <EmptyState
          title="No active activities yet."
          description="Partner-submitted activities will appear here after they are published or ready for review."
        />
      }
      errorState={
        <ErrorState
          title="We could not load activities."
          description="Try again, or refresh the page if the issue continues."
          action={
            onRetry ? (
              <Button variant="outline" onClick={onRetry}>
                Try again
              </Button>
            ) : undefined
          }
        />
      }
    />
  )
}
