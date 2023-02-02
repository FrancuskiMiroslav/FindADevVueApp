<template>
    <section>
        <dev-filter @change-filter="setFilters"></dev-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="button">
                    Refresh
                </base-button>
                <base-button link to="/register" mode="button-two">
                    Register as DEV
                </base-button>
            </div>
            <ul v-if="hasDevs">
                <dev-item v-for="dev in filteredDevs" 
                    :key="dev.id"
                    :id="dev.id"
                    :first-name="dev.firstName"
                    :last-name="dev.lastName"
                    :rate="dev.hourlyRate"
                    :areas="dev.areas"
                ></dev-item>
            </ul>
            <h3 v-else>No DEVs found.</h3>
        </base-card>
    </section>
</template>

<script>
import DevItem from '../../components/DevItem.vue';
import DevFilter from '../../components/DevFilter.vue';

export default {
    components: {
        DevItem,
        DevFilter
    },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
                activeClass: 'true',
            }
        }
    },
    computed: {
        filteredDevs() {
            const devs = this.$store.getters.data;
            return devs.filter(dev => {
                if(this.activeFilters.frontend && dev.areas.includes('frontend')) {
                    return true
                }

                if(this.activeFilters.backend && dev.areas.includes('backend')) {
                    return true
                }

                if(this.activeFilters.career && dev.areas.includes('career')) {
                    return true
                }

                return false;
            })
        },
        hasDevs() {
            return this.$store.getters.hasData;
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        }
    }
}
</script>

<style scoped>
    ul {
    list-style: none;
    margin: 0;
    padding: 0;
    }

    .controls {
    display: flex;
    justify-content: space-between;
    }
</style>