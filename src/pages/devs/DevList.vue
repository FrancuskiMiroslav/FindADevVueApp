<template>
    <base-dialog 
        :show="!!error" 
        title="An error occured!"
        @close="handleError"
    >
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <dev-filter @change-filter="setFilters"></dev-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="button" @click="loadDevs(true)">
                    Refresh
                </base-button>
                <p>will auto refresh every 2min.</p>
                <base-button v-if="!isDev && !isLoading" link to="/register" mode="button-two">
                    Register as DEV
                </base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasDevs">
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
import { handleError } from 'vue';

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
            isLoading: false,
            error: null,
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
            return !this.isLoading && this.$store.getters.hasData;
        }
    },
    created() {
        this.loadDevs()
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },

        async loadDevs(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('loadDevsFromServer', { forceRefresh: refresh });
            } catch (error) {
                this.error = error.message || 'Something went wrong'
            }
            this.isLoading = false;
        },

        handleError() {
            this.error = null;
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