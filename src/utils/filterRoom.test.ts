import { describe, it, expect } from 'vitest';
import { filterRoom } from './filterRoom';
import type { Room } from '@/views/ExperiencesView.vue';
import type { Filter } from '@/components/globals/Filters.vue';

describe('filterRoom', () => {
    const rooms: Room[] = [
        { id: 1, name: 'test 1', type: 'single', price: 100, availability: true, img: '', },
        { id: 2, name: 'test 2', type: 'double', price: 150, availability: false, img: '', },
        { id: 3, name: 'test 3', type: 'suite', price: 200, availability: true, img: '', },
        { id: 4, name: 'test 4', type: 'single', price: 50, availability: true, img: '', },
    ];

    it('should return rooms that match the selected type', () => {
        const filters = {
            value: {
                type: 'single',
                price: Infinity,
                available: false,
            } as Filter,
        };
        const filteredRooms = filterRoom(rooms, filters);
        expect(filteredRooms.length).toBe(2);
        expect(filteredRooms).toEqual([
            { id: 1, name: 'test 1', type: 'single', price: 100, availability: true, img: '' },
            { id: 4, name: 'test 4', type: 'single', price: 50, availability: true, img: '' },
        ]);
    });

    it('should return rooms within the specified price range', () => {
        const filters = {
            value: {
                type: '',
                price: 150,
                available: false,
            }
        };
        const filteredRooms = filterRoom(rooms, filters);
        expect(filteredRooms.length).toBe(3);
        expect(filteredRooms).toEqual([
            { id: 1, name: 'test 1', type: 'single', price: 100, availability: true, img: '', },
            { id: 2, name: 'test 2', type: 'double', price: 150, availability: false, img: '', },
            { id: 4, name: 'test 4', type: 'single', price: 50, availability: true, img: '', },
        ]);
    });

    it('should return only available rooms if the availability filter is applied', () => {
        const filters = {
            value: {
                type: '',
                price: Infinity,
                available: true,
            },
        };

        const filteredRooms = filterRoom(rooms, filters);

        expect(filteredRooms.length).toBe(3);
        expect(filteredRooms).toEqual([
            { id: 1, name: 'test 1', type: 'single', price: 100, availability: true, img: '', },
            { id: 3, name: 'test 3', type: 'suite', price: 200, availability: true, img: '', },
            { id: 4, name: 'test 4', type: 'single', price: 50, availability: true, img: '', },
        ]);
    });

    it('should return all rooms if no filters are applied', () => {
        const filters = {
            value: {
                type: '',
                price: Infinity,
                available: false,
            },
        };
        const filteredRooms = filterRoom(rooms, filters);
        expect(filteredRooms.length).toBe(4);
    });
});
