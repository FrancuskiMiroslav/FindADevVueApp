<template>
    <section>
        <dev-filter @change-filter="setFilters"></dev-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="button" @click="loadDevs">
                    Refresh
                </base-button>
                <base-button v-if="!isDev" link to="/register" mode="button-two">
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
                fullstack: true,
            },
        }
    },
    computed: {
        isDev () {
            return this.$store.getters.isDev;
        },
        filteredDevs() {
            const devs = this.$store.getters.devs;
            return devs.filter(dev => {
                if(this.activeFilters.frontend && dev.areas.includes('frontend')) {
                    return true
                }

                if(this.activeFilters.backend && dev.areas.includes('backend')) {
                    return true
                }

                if(this.activeFilters.fullstack && dev.areas.includes('fullstack')) {
                    return true
                }

                return false;
            })
        },
        hasDevs() {
            return this.$store.getters.hasData;
        }
    },
    created() {
        this.loadDevs()
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },

        loadDevs() {
            this.$store.dispatch('loadDevsFromServer');
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