import { fetchData } from "@/lib/fetch-util";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";
import type { ActivityLog } from "@/types";
import type { ReactNode } from "react";

/**
 * Small helper that maps activity actions to an icon (keeps it local
 * to avoid an extra module import that may not exist).
 */
const getActivityIcon = (action?: string): ReactNode => {
  switch (action) {
    case "created":
      return "🟢";
    case "updated":
      return "✏️";
    case "commented":
      return "💬";
    case "deleted":
      return "🗑️";
    default:
      return "🔔";
  }
};

export const TaskActivity = ({ resourceId }: { resourceId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["task-activity", resourceId],
    queryFn: () => fetchData(`/tasks/${resourceId}/activity`),
  }) as {
    data: ActivityLog[];
    isPending: boolean;
  };

  if (isPending) return <Loader />;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-lg text-muted-foreground mb-4">Activity</h3>

      <div className="space-y-4">
        {data?.map((activity) => (
          <div key={activity._id} className="flex gap-2">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {getActivityIcon(activity.action)}
            </div>

            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{" "}
                {activity.details?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};