import type { Filter } from "@/components/globals/Filters.vue";
import type { Room } from "@/views/ExperiencesView.vue";

export const filterRoom = (rooms: Room[], filters: {
    value: Filter
}) => {
    return rooms.filter((product) => {
        const matchesTypes = filters.value.type
            ? product.type === filters.value.type
            : true;
        const matchesPrice = product.price <= filters.value.price;
        const matchesAvailability = filters.value.available
            ? product.availability === true
            : true;

        return matchesTypes && matchesPrice && matchesAvailability;
    });
}