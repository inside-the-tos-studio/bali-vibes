import type { AvailablePeriod } from "@/components/ExpCard.vue";
import { format, isBefore, isWithinInterval, parseISO } from "date-fns";
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

  const isInPeriod = (availablePeriods: AvailablePeriod[], dateStart: string, dateEnd: string) => {
    return availablePeriods.some((period: AvailablePeriod) => {
      return isWithinInterval(parseISO(period.startDate), {
        start: parseISO(dateStart),
        end: parseISO(dateEnd),
      });
    });
  };

  const nextDates = (availablePeriods: AvailablePeriod[], today: Date) => {
    return availablePeriods
      .filter((period: AvailablePeriod) => {
        return isBefore(today, parseISO(period.startDate));
      })
      .map((period) => ({
        startDate: format(parseISO(period.startDate), "dd/MM/yyyy"),
        endDate: format(parseISO(period.endDate), "dd/MM/yyyy"),
      }));
  };

  return {
    nextPeriod,
    isInPeriod,
    nextDates,
  };
};
