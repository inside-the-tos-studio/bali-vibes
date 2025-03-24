import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export interface Item {
  id: number;
  name: string;
  price: number;
  type: string;
  img?: string;
}

export interface Basket {
  items: Item[];
}

export const useBasketStore = defineStore('basket', () => {
  // Initialize from localStorage
  const loadBasketFromStorage = (): Basket => {
    const savedBasket = localStorage.getItem('bali-vibes-basket')
    return savedBasket ? JSON.parse(savedBasket) : { items: [] }
  }

  const basket = ref<Basket>(loadBasketFromStorage())

  const totalPrice = computed(() => basket.value.items.reduce((acc, item) => acc + item.price, 0))

  // Watch for changes and save to localStorage
  watch(
    () => basket.value,
    (newBasket) => {
      localStorage.setItem('bali-vibes-basket', JSON.stringify(newBasket))
    },
    { deep: true }
  )

  const isItemInBasket = (itemId: number) => {
    return basket.value.items.some(item => item.id === itemId)
  }

  const addItem = (item: Item): boolean => {
    if (isItemInBasket(item.id)) {
      return false // Item already exists
    }
    basket.value.items.push(item)
    return true // Item successfully added
  }

  const removeItem = (index: number) => {
    basket.value.items.splice(index, 1)
  }

  const clearBasket = () => {
    basket.value.items = []
    localStorage.removeItem('bali-vibes-basket')
  }

  return { 
    basket,
    totalPrice,
    addItem,
    removeItem,
    clearBasket,
    isItemInBasket
  }
})
