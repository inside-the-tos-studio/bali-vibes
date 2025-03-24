import { ref, onMounted, computed } from 'vue' // Add computed
import type { Experience } from '@/components/ExpCard.component.vue'
import { useExperiencesStore } from '@/stores/experiences.store'

export function useExperiences() {
    const store = useExperiencesStore()
    const loading = ref(false)
    const error = ref<string | null>(null)

    const experiences = computed(() => store.experiences)

    const fetchExperiences = async () => {
        if (store.isLoaded) {
            return
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
        experiences,
        loading,
        error,
        fetchExperiences
    }
}
