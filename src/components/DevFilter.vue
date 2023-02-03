<template>
    <base-card>
        <h2>
            Find DEV that suits your needs
        </h2>
        <span class="filter-option" :class="{ active: filters.frontend }">
            <input type="checkbox" id="frontend" checked @change="setFilter"/>
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option" :class="{ active: filters.backend }">
            <input type="checkbox" id="backend" checked @change="setFilter" />
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option" :class="{ active: filters.fullstack }">
            <input type="checkbox" id="fullstack" checked @change="setFilter"/>
            <label for="fullstack">Full-stack</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                fullstack: true,
            },
        };
        },
    methods: {
        setFilter(event) {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilters = {
            ...this.filters,
            [inputId]: isActive,
            };
            this.filters = updatedFilters;
            this.$emit('change-filter', updatedFilters);
        },
    },
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0.5rem 0;
}
</style>