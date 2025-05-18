import type { Activity, ActivityDetail } from "@/types/activities";

export const getActivities = () => {
  return useShuttlerTwAPI.get<{ message: string; data: Activity[] }>(
    "/activities"
  );
};

export const getActivity = (activityId: string) => {
  return useShuttlerTwAPI.get<{ message: string; data: ActivityDetail }>(
    `/activities/${activityId}`
  );
};
