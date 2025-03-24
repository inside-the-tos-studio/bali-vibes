import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ExpCard, { type Experience } from '@/components/ExpCard.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'

const mockExperience: Experience = {
  id: 1,
  name: 'Beach Adventure',
  img: 'beach.jpg',
  type: 'penthouse',
  price: 99,
  availability: true
}

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

describe('ExpCard', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
  })


  it('renders experience details correctly', () => {
    const wrapper = mount(ExpCard, {
      props: {
        experience: mockExperience
      },
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Beach Adventure')
    expect(wrapper.text()).toContain('penthouse')
    expect(wrapper.text()).toContain('99')
    expect(wrapper.text()).toContain('Available')
  })

  it('links to the correct experience detail page', () => {
    const wrapper = mount(ExpCard, {
      props: {
        experience: mockExperience
      },
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('a').attributes('href')).toBe('/experience/1')
  })
})
