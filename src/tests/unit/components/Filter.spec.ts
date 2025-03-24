import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Filter from '@/components/Filter.vue'

interface Filters {
    types?: string[];
    dateIn?: string;
    dateOut?: string;
    priceFrom?: number;
    priceTo?: number;
    isTicketAvailable?: boolean;
}

describe('Filter', () => {
  const createWrapper = (props: { initialFilters?: Filters }  = {}) => {
    return mount(Filter, {
      props
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.filter').exists()).toBe(true)
    expect(wrapper.findAll('.filter__type-btn').length).toBe(6) // 6 experience types
  })

  it('emits update:filters when a type is selected', async () => {
    const wrapper = createWrapper()
    await wrapper.findAll('.filter__type-btn')[0].trigger('click')
    
    const emittedEvents = wrapper.emitted('update:filters')
    
    // Vérifications de type et de contenu
    expect(emittedEvents).toBeDefined()
    expect(emittedEvents).toHaveLength(1)
    
    if (emittedEvents) {
      const firstEmittedFilter = emittedEvents[0][0] as Filters
      expect(firstEmittedFilter.types).toContain('single')
    }
  })

  it('toggles type selection correctly', async () => {
    const wrapper = createWrapper()
    const typeButton = wrapper.findAll('.filter__type-btn')[0]
    
    // Click to select
    await typeButton.trigger('click')
    expect(typeButton.classes()).toContain('filter__type-btn--active')
    
    // Click to deselect
    await typeButton.trigger('click')
    expect(typeButton.classes()).not.toContain('filter__type-btn--active')
  })

  it('updates date filters correctly', async () => {
    const wrapper = createWrapper()
    const dateIn = wrapper.find('#dateIn')
    const dateOut = wrapper.find('#dateOut')
    
    await dateIn.setValue('2024-01-01')
    await dateOut.setValue('2024-01-02')
    
    const emittedEvents = wrapper.emitted('update:filters')
    
    expect(emittedEvents).toBeDefined()
    expect(emittedEvents).toHaveLength(2)
    
    if (emittedEvents) {
      const lastEmittedFilter = emittedEvents[emittedEvents.length - 1][0] as Filters
      expect(lastEmittedFilter.dateIn).toBe('2024-01-01')
      expect(lastEmittedFilter.dateOut).toBe('2024-01-02')
    }
  })

  it('updates price range correctly', async () => {
    const wrapper = createWrapper()
    const priceFrom = wrapper.find('#priceFrom')
    const priceTo = wrapper.find('#priceTo')
    
    await priceFrom.setValue(100)
    await priceTo.setValue(500)
    
    const emittedEvents = wrapper.emitted('update:filters')
    
    expect(emittedEvents).toBeDefined()
    expect(emittedEvents).toHaveLength(2)
    
    if (emittedEvents) {
      const lastEmittedFilter = emittedEvents[emittedEvents.length - 1][0] as Filters
      expect(lastEmittedFilter.priceFrom).toBe(100)
      expect(lastEmittedFilter.priceTo).toBe(500)
    }
  })

  it('handles availability filter changes', async () => {
    const wrapper = createWrapper()
    const select = wrapper.find('.filter__select')
    
    await select.setValue('true')
    
    const emittedEvents = wrapper.emitted('update:filters')
    
    expect(emittedEvents).toBeDefined()
    
    if (emittedEvents) {
      const lastEmittedFilter = emittedEvents[emittedEvents.length - 1][0] as Filters
      expect(lastEmittedFilter.isTicketAvailable).toBe(true)
    }
  })

  it('initializes with provided filters', () => {
    const initialFilters = {
      types: ['single'],
      dateIn: '2024-01-01',
      dateOut: '2024-01-02',
      priceFrom: 200,
      priceTo: 800,
      isTicketAvailable: true
    }
    
    const wrapper = createWrapper({ initialFilters })
    expect(wrapper.vm.filters.types).toContain('single')
    expect(wrapper.vm.filters.dateIn).toBe('2024-01-01')
    expect(wrapper.vm.filters.dateOut).toBe('2024-01-02')
    expect(wrapper.vm.filters.priceFrom).toBe(200)
    expect(wrapper.vm.filters.priceTo).toBe(800)
    expect(wrapper.vm.filters.isTicketAvailable).toBe(true)
  })
})