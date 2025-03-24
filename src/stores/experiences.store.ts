import { API_BASE_URL } from '@/config/api'
import type { Experience } from '@/components/ExpCard.vue'
import { defineStore } from 'pinia'

export const useExperiencesStore = defineStore('experiences', {
  state: () => ({
    experiences: [] as Experience[],
    isLoaded: false
  }),
  
  actions: {
    async fetchExperiences() {
      if (this.isLoaded) return
      
      try {
        const response = await fetch(`${API_BASE_URL}/b/34CU`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.experiences = data
        this.isLoaded = true
      } catch (error) {
        console.error('Error fetching experiences:', error)
        throw error // Re-throw to handle in the composable
      }
    }
  }
})
