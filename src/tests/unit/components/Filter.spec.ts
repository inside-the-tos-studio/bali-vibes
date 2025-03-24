import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Filter, { type FilterOptions } from '@/components/Filter.vue'

// Add this type to properly type the component instance
type FilterInstance = InstanceType<typeof Filter>

describe('Filter', () => {
  const defaultProps = {
    initialFilters: {
      types: [],
      dateIn: '',
      dateOut: '',
      isTicketAvailable: null,
      priceFrom: 0,
      priceTo: 1000
    } as FilterOptions
  }

  it('emits update event when filters change', async () => {
    const wrapper = mount(Filter, {
      props: defaultProps
    })

    // Type assertion here
    const vm = wrapper.vm as FilterInstance

    // Set some filter values
    vm.filters.types = ['single']
    vm.filters.dateIn = '2024-01-01'
    vm.filters.dateOut = '2024-01-02'
    vm.filters.priceFrom = 200
    vm.filters.priceTo = 800
    vm.filters.isTicketAvailable = true

    await wrapper.vm.$nextTick()

    // Verify the filter values
    expect(vm.filters.types).toContain('single')
    expect(vm.filters.dateIn).toBe('2024-01-01')
    expect(vm.filters.dateOut).toBe('2024-01-02')
    expect(vm.filters.priceFrom).toBe(200)
    expect(vm.filters.priceTo).toBe(800)
    expect(vm.filters.isTicketAvailable).toBe(true)

    // Verify emit
    expect(wrapper.emitted('update:filters')).toBeTruthy()
    expect(wrapper.emitted('update:filters')![0][0]).toEqual({
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

    const vm = wrapper.vm as FilterInstance
    expect(vm.filters).toEqual(initialFilters)
  })

  it('resets filters to default values', async () => {
    const wrapper = mount(Filter, {
      props: defaultProps
    })

    const vm = wrapper.vm as FilterInstance

    // Set some values first
    vm.filters.types = ['single']
    vm.filters.dateIn = '2024-01-01'
    await wrapper.vm.$nextTick()

    // Find and click reset button
    const resetButton = wrapper.find('[data-test="reset-filters"]')
    await resetButton.trigger('click')

    // Verify reset
    expect(vm.filters).toEqual(defaultProps.initialFilters)
    expect(wrapper.emitted('update:filters')).toBeTruthy()
    expect(wrapper.emitted('update:filters')![0][0]).toEqual(defaultProps.initialFilters)
  })
})
