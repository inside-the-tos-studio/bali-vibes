import { ref } from "vue";
import { defineStore } from "pinia";
import type { Experience } from "@/components/ExpCard.vue";

export const useExperiencesStore = defineStore("experiences", () => {
  const experiences = ref<Experience[]>([]);

  function setExperiences(datas: Experience[]) {
    experiences.value = datas;
  }

  function getExperiences() {
    return experiences.value;
  }

  function getFilteredExperiences(filters: {
    type?: string;
    availability?: boolean | string;
    priceFrom?: number;
    priceTo?: number;
  }) {
    return experiences.value.filter((exp) => {
      let match = true;
      if (filters.type !== undefined && filters.type !== "all")
        match = match && exp.type === filters.type;
      if (filters.availability !== undefined && filters.availability !== "all")
        match = match && exp.availability === filters.availability;
      if (filters.priceFrom !== undefined) match = match && exp.price >= filters.priceFrom;
      if (filters.priceTo !== undefined) match = match && exp.price <= filters.priceTo;
      return match;
    });
  }

  return {
    experiences,
    setExperiences,
    getExperiences,
    getFilteredExperiences,
  };
});
