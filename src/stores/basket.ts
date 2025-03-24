import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Item {
  name: string;
  price: number;
}

export interface Basket {
  items: Item[];
}

export const useBasketStore = defineStore('basket', () => {
  const savedBasket = localStorage.getItem('basket')
  const initialBasket: Basket = savedBasket ? JSON.parse(savedBasket) : { items: [] }

  const basket = ref<Basket>({
    items: []
  })
  const totalPrice = computed(() => basket.value.items.reduce((acc, item) => acc + item.price, 0))

  function addItem(item: Item) {
    basket.value.items.push(item)
  }

  function removeItem(index: number) {
    basket.value.items.splice(index, 1)
    saveBasket()
  }

  function clearBasket() {
    basket.value.items = []
    localStorage.removeItem('basket')
  }

  function saveBasket() {
    localStorage.setItem('basket', JSON.stringify(basket.value))
  }

  return { basket, totalPrice, addItem, removeItem, clearBasket }
})
