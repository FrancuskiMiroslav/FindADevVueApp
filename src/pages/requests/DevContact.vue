<template>
    <form action="" @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">Your E-Mail</label>
            <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <input type="textarea" id="textarea" rows="5" v-model.trim="message" />
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and do not leave empty message field.</p>
        <div class="actions">
            <base-button class="button">Send message</base-button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
      return {
        email: '',
        message: '',
        formIsValid: true,
      }
    },
    methods: {
      submitForm() {
        this.formIsValid = true;

        if (this.email === '' || !this.email.includes('@') || this.message === '') {
          this.formIsValid = false;
          return
        }

        this.$store.dispatch('contactDev', {
          email: this.email,
          message: this.message,
          devId: this.$route.params.id,
        });

        this.$router.replace('/devs');
        
      }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #b1f3e0;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>