import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBasketStore } from '@/stores/basket';

describe('useBasketStore', () => {
    setActivePinia(createPinia());
    const store = useBasketStore();

    beforeEach(() => {
        store.basket.rooms = [];
    });

    it('should initialize empty basket', () => {
        expect(store.basket.rooms).toEqual([]);
    });

    it('should add element to basket', () => {
        const newItem = { id: 1, price: 100, availability: true, name: 'test 1', img: '', type: 'single' };

        store.addItem(newItem);
        expect(store.basket.rooms).toHaveLength(1);
    });

    it('should delete element from basket', () => {
        const itemToRemove = { id: 1, price: 100, availability: true, name: 'test 1', img: '', type: 'single' };

        store.addItem(itemToRemove);
        store.removeItem(itemToRemove.id);
        expect(store.basket.rooms).not.toContain(itemToRemove);
    });

    it('should return totalPrice', () => {
        store.addItem({ id: 1, price: 100, availability: true, name: 'test 1', img: '', type: 'single' });
        store.addItem({ id: 2, price: 50, availability: true, name: 'test 2', img: '', type: 'single' });

        expect(store.totalPrice).toBe(150);
    });

    it('should check if elem is in basket', () => {
        const newItem = { id: 1, price: 100, availability: true, name: 'test 1', img: '', type: 'single' };

        store.addItem(newItem);
        expect(store.isInBasket(1)).toBe(true);
        expect(store.isInBasket(2)).toBe(false);
    });
});
