import type { AvailablePeriod } from "@/components/ExpCard.vue";
import { format, isBefore, parseISO } from "date-fns";
import { computed } from "vue";

export const useDate = () => {
  const nextPeriod = computed(() => {
    return (availablePeriods: AvailablePeriod[], today: Date) => {
      const period = availablePeriods.find((period: AvailablePeriod) => {
        return isBefore(today, parseISO(period.startDate));
      });
      return period
        ? {
            startDate: format(parseISO(period.startDate), "dd/MM/yyyy"),
            endDate: format(parseISO(period.endDate), "dd/MM/yyyy"),
          }
        : null;
    };
  });

  return {
    nextPeriod,
  };
};
