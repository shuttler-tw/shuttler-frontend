export function useParticipantStatus(bookedCount: number, participantCount: number) {
  if (bookedCount >= participantCount) {
    return "danger-light";
  } else if (bookedCount >= participantCount / 2) {
    return "primary-dark";
  } else {
    return "success-light";
  }
}
