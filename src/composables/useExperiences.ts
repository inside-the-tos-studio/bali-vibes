import type { Experience } from '@/components/ExpCard.component.vue'
import { ref, onMounted } from 'vue'

export function useExperiences() {
  const experiences = ref<Experience[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchExperiences = async () => {
    loading.value = true
    error.value = null
    
    try {
    const response = await fetch('/api/b/34CU')
      experiences.value = await response.json()
    } catch (e) {
      error.value = 'Failed to fetch experiences'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchExperiences)

  return {
    experiences,
    loading,
    error,
    fetchExperiences
  }
}
