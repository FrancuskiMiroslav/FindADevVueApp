<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },

  created() {
    this.$store.dispatch('checkLocalStorageToAutoLogin');
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    } 
  },

  watch: {
    didAutoLogout(curValue, oldValue) {
      if(curValue && curValue !== oldValue) {
        this.$router.replace('/devs');
      }
    }
  }
}
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to { 
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.4s ease-out;
}

.route-leave-active {
  transition: all 0.4s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
