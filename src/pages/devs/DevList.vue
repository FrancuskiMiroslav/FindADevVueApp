<template>
    <section>
        Filter
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