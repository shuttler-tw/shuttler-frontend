import type { Activity } from "@/types/activities";

export const getActivities = () => {
  return useShuttlerTwAPI.put<Activity[]>("/activities");
};
