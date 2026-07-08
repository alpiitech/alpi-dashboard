import { useNavigate } from "react-router"
import { PageHeader } from "@/components/dashboard/page-header"
import { useActivitiesQuery } from "@/features/activities/activities.queries"
import { ActivitiesTable } from "@/features/activities/components/activities-table"

export function ActivitiesPage() {
  const navigate = useNavigate()
  const activitiesQuery = useActivitiesQuery({ page: 1, pageSize: 10 })

  return (
    <div className="space-y-5">
        <PageHeader
          title="Activities"
          description="Review active marketplace activities submitted by partners."
        />

        <ActivitiesTable
          activities={activitiesQuery.data?.data ?? []}
          isLoading={activitiesQuery.isLoading}
          isError={activitiesQuery.isError}
          onRetry={() => void activitiesQuery.refetch()}
          onActivityClick={(activity) => navigate(`/activities/${activity.id}`)}
        />
    </div>
  )
}
