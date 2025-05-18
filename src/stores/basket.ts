import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface Item {
  id: string;
  name: string;
  price: number;
}

export interface Basket {
  items: Item[];
}

export const useBasketStore = defineStore("basket", () => {
  const basket = ref<Basket>({
    items: [],
  });
  const totalPrice = computed(() => basket.value.items.reduce((acc, item) => acc + item.price, 0));

  function addItem(item: Item) {
    basket.value.items.push(item);
  }

  function removeItem(id: string) {
    basket.value.items = basket.value.items.filter((item) => item.id !== id);
    localStorage.setItem("basket", JSON.stringify(basket.value.items));
  }

  return { basket, totalPrice, addItem, removeItem };
});
