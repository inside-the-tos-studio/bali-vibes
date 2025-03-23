import type { Experience } from '@/components/ExpCard.component.vue'
import { useExperiencesStore } from '@/stores/experiences.store'
import { ref, onMounted } from 'vue'

export function useExperiences() {
    const store = useExperiencesStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getExperiences = (): Experience[] => {
    return store.experiences
  }

  const fetchExperiences = async () => {
    if (store.isLoaded) {
      return // Use cached data if already loaded
    }

    loading.value = true
    error.value = null
    
    try {
      await store.fetchExperiences()
    } catch (e) {
      error.value = 'Failed to fetch experiences'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchExperiences)

  return {
    experiences: getExperiences(),
    loading,
    error,
    fetchExperiences
  }
}
