<template>
    <section>
        <base-card>
            <header>
                <h2>
                    Request recieved
                </h2>
            </header>
            <ul v-if="hasRequests">
                <request-item v-for="request in recievedRequest" 
                    :key="request.id"
                    :email="request.userEmail"
                    :message="request.message"
                ></request-item>
            </ul>
            <h3 v-else>
                You haven't recieved any requests yet!
            </h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
    components: {
        RequestItem
    },

    computed: {
        recievedRequest() {
            return this.$store.getters['requests'];
        },

        hasRequests() {
            return this.$store.getters['hasRequests']
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h2 {
    color: #ffffff;
}

h3 {
  text-align: center;
}
</style>