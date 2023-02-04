<template>
    <section>
        <base-card>
            <h2>
                {{ fullName }}
            </h2>
            <h3>
                ${{ selectedDev.hourlyRate }}/hour
            </h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2 class="header-title">
                    Interested? Reach out now!
                </h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in selectedDev.areas" :key="area" :type="area" :title="area"></base-badge>
            <p>{{ selectedDev.description }}</p>
        </base-card>
    </section>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return  {
            selectedDev: null,
        }
    },
    created() {
        this.selectedDev = this.$store.getters.devs.find(dev => dev.id === this.id);
    },
    computed: {
        fullName() {
            return this.selectedDev.firstName + ' ' + this.selectedDev.lastName;
        },
        contactLink() {
            return this.$route.path + '/' + this.id + '/contact';
        }
    }
}
</script>

<style scoped>
.header-title {
    color: #ffffff;
}
</style>