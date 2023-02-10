<template>
    <header>
        <nav>
            <h1>
                <router-link to="/">
                    Find a DEV
                </router-link>
            </h1>
            <ul>
                <li>
                    <router-link to="/devs">All DEVs</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/requests">All requests</router-link>
                </li>
                <li v-else>
                    <router-link to="/auth">Login</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    }
}
</script>