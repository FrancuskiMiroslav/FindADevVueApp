<template>
    <div>
        <base-dialog 
        :show="!!error" 
        title="An error occured!"
        @close="handleError"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>
                        Request recieved
                    </h2>
                </header>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasRequests && !isLoading">
                    <request-item class="requestItem" v-for="request in recievedRequest" 
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
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
    components: {
        RequestItem
    },

    data() {
        return {
            isLoading: false,
            error: null,
        }
    },

    computed: {
        recievedRequest() {
            return this.$store.getters['requests'];
        },

        hasRequests() {
            return this.$store.getters['hasRequests']
        }
    },

    created() {
        this.loadRequests();
    },

    methods: {
        async loadRequests(){
            this.isLoading = true;
            try {
                await this.$store.dispatch('fetchRquestsFromServer');
            } catch (error) {
                this.error = error.message || 'Some error message'
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