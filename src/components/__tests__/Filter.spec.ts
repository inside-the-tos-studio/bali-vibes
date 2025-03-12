import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Filters from '../globals/Filters.vue'

describe('Filters', () => {
    it('renders properly', () => {
        const wrapper = mount(Filters, { props: { currentFilters: { type: 'single', price: 20, available: true } } })
        expect(wrapper.text()).toContain('Filtrer par')
    })
})
