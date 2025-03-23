import type { Experience } from '@/components/ExpCard.component.vue'
import { defineStore } from 'pinia'

export const useExperiencesStore = defineStore('experiences', {
  state: () => ({
    experiences: [] as Experience[],
    isLoaded: false
  }),
  
  actions: {
    async fetchExperiences() {
      if (this.isLoaded) return // Only fetch if not already loaded
      
      try {
        const response = await fetch('/api/b/34CU')
        const data = await response.json()
        this.experiences = data
        this.isLoaded = true
      } catch (error) {
        console.error('Error fetching experiences:', error)
      }
    }
  }
})
