import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Filter, { type FilterOptions, type FilterInstance } from '@/components/Filter.vue'

describe('Filter', () => {
  const DEFAULT_FILTERS: FilterOptions = {
    types: [],
    dateIn: '',
    dateOut: '',
    isTicketAvailable: null,
    priceFrom: 0,
    priceTo: 1000
  }

  it('emits update event when filters change', async () => {
    const wrapper = mount(Filter, {
      props: {
        initialFilters: DEFAULT_FILTERS
      }
    })

    const vm = wrapper.vm as unknown as FilterInstance

    // Set filter values
    vm.filters.types = ['single']
    vm.filters.dateIn = '2024-01-01'
    vm.filters.dateOut = '2024-01-02'
    vm.filters.priceFrom = 200
    vm.filters.priceTo = 800
    vm.filters.isTicketAvailable = true

    await wrapper.vm.$nextTick()

    // Verify values
    expect(vm.filters.types).toContain('single')
    expect(vm.filters.dateIn).toBe('2024-01-01')
    expect(vm.filters.dateOut).toBe('2024-01-02')
    expect(vm.filters.priceFrom).toBe(200)
    expect(vm.filters.priceTo).toBe(800)
    expect(vm.filters.isTicketAvailable).toBe(true)

    // Verify emit
    expect(wrapper.emitted('update:filters')).toBeTruthy()
    const emitted = wrapper.emitted('update:filters')![0][0] as FilterOptions
    expect(emitted).toEqual({
      types: ['single'],
      dateIn: '2024-01-01',
      dateOut: '2024-01-02',
      priceFrom: 200,
      priceTo: 800,
      isTicketAvailable: true
    })
  })

  it('initializes with provided filters', () => {
    const initialFilters: FilterOptions = {
      types: ['single'],
      dateIn: '2024-01-01',
      dateOut: '2024-01-02',
      priceFrom: 200,
      priceTo: 800,
      isTicketAvailable: true
    }

    const wrapper = mount(Filter, {
      props: {
        initialFilters
      }
    })

    const vm = wrapper.vm as unknown as FilterInstance
    expect(vm.filters).toEqual(initialFilters)
  })

  it('resets filters to default values', async () => {
    const wrapper = mount(Filter, {
      props: {
        initialFilters: DEFAULT_FILTERS
      }
    })

    const vm = wrapper.vm as unknown as FilterInstance

    // Set values
    vm.filters.types = ['single']
    vm.filters.dateIn = '2024-01-01'
    await wrapper.vm.$nextTick()

    // Find and click reset button
    const resetButton = wrapper.find('button.reset-button')
    expect(resetButton.exists()).toBe(true)
    await resetButton.trigger('click')

    // Verify reset
    expect(vm.filters).toEqual(DEFAULT_FILTERS)
    expect(wrapper.emitted('update:filters')).toBeTruthy()
    const emitted = wrapper.emitted('update:filters')!.pop()![0] as FilterOptions
    expect(emitted).toEqual(DEFAULT_FILTERS)
  })

  it('toggles experience type when clicking type button', async () => {
    const wrapper = mount(Filter, {
      props: {
        initialFilters: DEFAULT_FILTERS
      }
    })

    const typeButton = wrapper.find('button.filter__type-btn')
    await typeButton.trigger('click')

    const vm = wrapper.vm as unknown as FilterInstance
    expect(vm.filters.types).toContain('single')

    await typeButton.trigger('click')
    expect(vm.filters.types).not.toContain('single')
  })
})
