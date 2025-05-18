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

  return { experiences, setExperiences, getExperiences };
});
