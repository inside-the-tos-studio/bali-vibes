import type { Experience } from "@/components/ExpCard.vue";
import { useExperiencesStore } from "@/stores/experiences";

export const useDataInjection = () => {
  const experiences = async (): Promise<Experience[]> => {
    const data = await fetch("/data.json");
    await new Promise((resolve) => setTimeout(resolve, 250));

    const experiences = await data.json();
    useExperiencesStore().setExperiences(experiences);
    return experiences;
  };

  const getDetailsById = async (id: number): Promise<Experience | null> => {
    let datas = useExperiencesStore().getExperiences();

    if (datas && datas.length === 0) {
      datas = await experiences();
    }
    return datas.find((item: Experience) => item.id === id) || null;
  };

  return {
    experiences,
    getDetailsById,
  };
};
