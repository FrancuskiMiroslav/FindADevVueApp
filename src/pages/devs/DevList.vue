<template>
    <section>
        Filter
    </section>
    <section>
        <div class="controls">
            <button class="button">
                Refresh
            </button>
            <router-link to="/register" class="button">
                Register as DEV
            </router-link>
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
    </section>
</template>

<script>
import DevItem from '../../components/DevItem.vue'

export default {
    components: {
        DevItem
    },
    computed: {
        filteredDevs() {
            return this.$store.getters.data;
        },
        hasDevs() {
            return this.$store.getters.hasData;
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