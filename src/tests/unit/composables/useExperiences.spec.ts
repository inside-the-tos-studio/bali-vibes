import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useExperiences } from '@/composables/useExperiences'
import { createPinia, setActivePinia } from 'pinia'

// Create mock store factory
const createMockStore = (overrides = {}) => {
  return {
    experiences: [],
    isLoaded: false,
    fetchExperiences: vi.fn(),
    ...overrides
  }
}

// Mock the store module
let mockStore = createMockStore()
vi.mock('@/stores/experiences.store', () => ({
  useExperiencesStore: () => mockStore
}))

describe('useExperiences', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Reset mock store to default state
    mockStore = createMockStore()
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { experiences, loading, error } = useExperiences()
    
    expect(experiences).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('should fetch experiences if not loaded', async () => {
    const { fetchExperiences, loading } = useExperiences()

    await fetchExperiences()

    expect(mockStore.fetchExperiences).toHaveBeenCalled()
    expect(loading.value).toBe(false)
  })

  it('should not fetch experiences if already loaded', async () => {
    mockStore = createMockStore({ isLoaded: true })
    
    const { fetchExperiences } = useExperiences()
    await fetchExperiences()

    expect(mockStore.fetchExperiences).not.toHaveBeenCalled()
  })

  it('should handle error during fetch', async () => {
    mockStore.fetchExperiences.mockRejectedValueOnce(new Error('API Error'))

    const { fetchExperiences, error, loading } = useExperiences()
    await fetchExperiences()

    expect(error.value).toBe('Failed to fetch experiences')
    expect(loading.value).toBe(false)
  })

  it('should return experiences from store', () => {
    const mockExperiences = [{ id: 1, title: 'Test' }]
    mockStore = createMockStore({ 
      experiences: mockExperiences,
      isLoaded: true 
    })

    const { experiences } = useExperiences()
    expect(experiences).toEqual(mockExperiences)
  })
})
